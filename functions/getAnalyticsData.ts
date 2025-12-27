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

        // Clean up property ID
        if (propertyId) propertyId = propertyId.replace('properties/', '');

        if (!propertyId || !serviceAccountJson) {
            return Response.json({ 
                error: 'Configuration Missing', 
                details: 'Please set GA4_PROPERTY_ID and GOOGLE_SERVICE_ACCOUNT_JSON secrets.' 
            }, { status: 400 });
        }

        // 3. Initialize Auth (Pure implementation to bypass library network issues)
        let credentials;
        try {
            credentials = JSON.parse(serviceAccountJson);
            if (typeof credentials === 'string') credentials = JSON.parse(credentials);
        } catch (e) {
            throw new Error("Failed to parse GOOGLE_SERVICE_ACCOUNT_JSON.");
        }

        // Generate JWT for Auth
        const now = Math.floor(Date.now() / 1000);
        const tokenPayload = {
            iss: credentials.client_email,
            scope: 'https://www.googleapis.com/auth/analytics.readonly',
            aud: 'https://oauth2.googleapis.com/token',
            exp: now + 3600,
            iat: now
        };

        const signedJwt = jwt.sign(tokenPayload, credentials.private_key, { algorithm: 'RS256' });

        // Exchange JWT for Access Token via standard Fetch with retries
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
                    await new Promise(r => setTimeout(r, 1000 * (i + 1))); // Exponential backoff
                }
            }
        };

        const token = await getAccessToken();

        // 4. Run Reports (Helper with retries)
        const runReport = async (body, retries = 3) => {
            for (let i = 0; i < retries; i++) {
                try {
                    const res = await fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`, {
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

        const [timelineData, sourcesData] = await Promise.all([
            runReport({
                dateRanges: [{ startDate: '28daysAgo', endDate: 'today' }],
                dimensions: [{ name: 'date' }],
                metrics: [{ name: 'activeUsers' }, { name: 'sessions' }, { name: 'engagementRate' }],
                orderBys: [{ dimension: { orderType: 'ALPHANUMERIC', dimensionName: 'date' } }]
            }),
            runReport({
                dateRanges: [{ startDate: '28daysAgo', endDate: 'today' }],
                dimensions: [{ name: 'sessionSourceMedium' }],
                metrics: [{ name: 'activeUsers' }],
                limit: 5
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

        // 6. AI Insights
        let aiInsights = null;
        try {
            const totalUsers = processedTimeline.reduce((acc, curr) => acc + curr.users, 0);
            const avgEngagement = processedTimeline.length ? (processedTimeline.reduce((acc, curr) => acc + curr.engagement, 0) / processedTimeline.length).toFixed(1) : 0;
            
            aiInsights = await base44.integrations.Core.InvokeLLM({
                prompt: `Analyze this web traffic data for a landscaping business.
                Total Users (28d): ${totalUsers}
                Avg Engagement: ${avgEngagement}%
                Top Sources: ${processedSources.map(s => s.source).join(', ')}
                
                Provide a brief, 2-sentence insight about the performance and any potential seasonal slowdowns (it's currently winter).`,
            });
        } catch (e) {
            console.error("AI Insight failed", e);
            aiInsights = "AI Insights unavailable at the moment.";
        }

        return Response.json({
            timeline: processedTimeline,
            sources: processedSources,
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