import { createClientFromRequest } from 'npm:@base44/sdk@0.8.4';
import jwt from 'npm:jsonwebtoken';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        
        // 1. Auth Check
        const user = await base44.auth.me();
        if (!user || user.role !== 'admin') {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // 2. Credentials Check
        let propertyId = Deno.env.get("GA4_PROPERTY_ID");
        const serviceAccountJson = Deno.env.get("GOOGLE_SERVICE_ACCOUNT_JSON");

        if (propertyId) propertyId = propertyId.replace('properties/', '');

        if (!propertyId || !serviceAccountJson) {
            return Response.json({ 
                error: 'Configuration Missing', 
                details: 'Please set GA4_PROPERTY_ID and GOOGLE_SERVICE_ACCOUNT_JSON secrets.' 
            }, { status: 400 });
        }

        // 3. Initialize Auth
        let credentials;
        try {
            credentials = JSON.parse(serviceAccountJson);
            if (typeof credentials === 'string') credentials = JSON.parse(credentials);
        } catch (e) {
            throw new Error("Failed to parse GOOGLE_SERVICE_ACCOUNT_JSON.");
        }

        const now = Math.floor(Date.now() / 1000);
        const tokenPayload = {
            iss: credentials.client_email,
            scope: 'https://www.googleapis.com/auth/analytics.readonly',
            aud: 'https://oauth2.googleapis.com/token',
            exp: now + 3600,
            iat: now
        };

        const signedJwt = jwt.sign(tokenPayload, credentials.private_key, { algorithm: 'RS256' });

        // Get Access Token
        const getAccessToken = async (retries = 3) => {
            for (let i = 0; i < retries; i++) {
                try {
                    const params = new URLSearchParams();
                    params.append('grant_type', 'urn:ietf:params:oauth:grant-type:jwt-bearer');
                    params.append('assertion', signedJwt);

                    const res = await fetch('https://oauth2.googleapis.com/token', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                        body: params
                    });

                    if (!res.ok) throw new Error(`Auth failed: ${res.status} ${await res.text()}`);
                    const data = await res.json();
                    return data.access_token;
                } catch (e) {
                    if (i === retries - 1) throw e;
                    await new Promise(r => setTimeout(r, 1000 * (i + 1)));
                }
            }
        };

        const token = await getAccessToken();

        // 4. Run Reports (Standard & Realtime)
        const runReport = async (endpoint, body, retries = 3) => {
            for (let i = 0; i < retries; i++) {
                try {
                    const res = await fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:${endpoint}`, {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(body)
                    });
                    
                    if (!res.ok) {
                        const errorText = await res.text();
                        try {
                            const errorJson = JSON.parse(errorText);
                            throw new Error(errorJson.error?.message || errorText);
                        } catch (e) {
                            throw new Error(`GA4 API Error (${res.status}): ${errorText}`);
                        }
                    }
                    return await res.json();
                } catch (e) {
                    if (i === retries - 1) throw e;
                    await new Promise(r => setTimeout(r, 1000 * (i + 1)));
                }
            }
        };

        const [timelineData, sourcesData, realtimeData] = await Promise.all([
            runReport('runReport', {
                dateRanges: [{ startDate: '28daysAgo', endDate: 'today' }],
                dimensions: [{ name: 'date' }],
                metrics: [{ name: 'activeUsers' }, { name: 'sessions' }, { name: 'engagementRate' }],
                orderBys: [{ dimension: { orderType: 'ALPHANUMERIC', dimensionName: 'date' } }]
            }),
            runReport('runReport', {
                dateRanges: [{ startDate: '28daysAgo', endDate: 'today' }],
                dimensions: [{ name: 'sessionSourceMedium' }],
                metrics: [{ name: 'activeUsers' }],
                limit: 5
            }),
            runReport('runRealtimeReport', {
                metrics: [{ name: 'activeUsers' }]
            })
        ]);

        // 5. Process Data
        const processedTimeline = (timelineData.rows || []).map(row => {
            const dateStr = row.dimensionValues[0].value;
            return {
                date: `${dateStr.substring(4, 6)}/${dateStr.substring(6, 8)}`,
                users: parseInt(row.metricValues[0].value),
                sessions: parseInt(row.metricValues[1].value),
                engagement: parseFloat(row.metricValues[2].value) * 100,
            };
        });

        const processedSources = (sourcesData.rows || []).map(row => ({
            source: row.dimensionValues[0].value,
            users: parseInt(row.metricValues[0].value),
        }));
        
        const liveUsers = realtimeData.rows?.[0]?.metricValues?.[0]?.value || 0;

        // 6. AI Insights
        let aiInsights = null;
        try {
            const totalUsers = processedTimeline.reduce((acc, curr) => acc + curr.users, 0);
            
            aiInsights = await base44.integrations.Core.InvokeLLM({
                prompt: `Analyze this web traffic data.
                Live Users Right Now: ${liveUsers}
                Total Users (28d): ${totalUsers}
                Top Sources: ${processedSources.map(s => s.source).join(', ')}
                
                If live users > 0, mention that traffic is active now.
                If all 0, explain that for new accounts, data takes 24-48h to appear, but Realtime should work.`,
            });
        } catch (e) {
            aiInsights = "AI Insights unavailable.";
        }

        return Response.json({
            timeline: processedTimeline,
            sources: processedSources,
            liveUsers: parseInt(liveUsers),
            insights: aiInsights
        });

    } catch (error) {
        console.error("Analytics Error:", error);
        return Response.json({ 
            error: 'Analytics API Error',
            details: error.message || "Unknown error occurred"
        }, { status: 500 });
    }
});