import { createClientFromRequest } from 'npm:@base44/sdk@0.8.4';
import { JWT } from 'npm:google-auth-library';

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

        // 3. Initialize Auth
        let credentials;
        try {
            credentials = JSON.parse(serviceAccountJson);
            if (typeof credentials === 'string') credentials = JSON.parse(credentials);
        } catch (e) {
            throw new Error("Failed to parse GOOGLE_SERVICE_ACCOUNT_JSON.");
        }

        const auth = new JWT({
            email: credentials.client_email,
            key: credentials.private_key,
            scopes: ['https://www.googleapis.com/auth/analytics.readonly'],
        });

        const accessToken = await auth.getAccessToken();
        const token = accessToken.token;

        if (!token) throw new Error("Failed to generate access token");

        // Helper for GA4 Request
        const runReport = async (body) => {
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
                // Try to parse error text as JSON for better formatting
                try {
                    const errorJson = JSON.parse(errorText);
                    throw new Error(errorJson.error?.message || errorText);
                } catch (e) {
                    throw new Error(`GA4 API Error (${res.status}): ${errorText}`);
                }
            }
            return await res.json();
        };

        // 4. Run Reports
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