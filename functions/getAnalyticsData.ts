import { BetaAnalyticsDataClient } from 'npm:@google-analytics/data';
import { createClientFromRequest } from 'npm:@base44/sdk@0.8.4';

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

        // Clean up property ID if user pasted "properties/" prefix
        if (propertyId) propertyId = propertyId.replace('properties/', '');

        if (!propertyId || !serviceAccountJson) {
            return Response.json({ 
                error: 'Configuration Missing', 
                details: 'Please set GA4_PROPERTY_ID and GOOGLE_SERVICE_ACCOUNT_JSON secrets.' 
            }, { status: 400 });
        }

        // 3. Initialize Analytics Client
        let credentials;
        try {
            credentials = JSON.parse(serviceAccountJson);
            // Handle double-stringified JSON which can happen with some copy-paste operations
            if (typeof credentials === 'string') {
                credentials = JSON.parse(credentials);
            }
        } catch (e) {
            console.error("JSON Parse Error for GOOGLE_SERVICE_ACCOUNT_JSON:", e);
            throw new Error("Failed to parse GOOGLE_SERVICE_ACCOUNT_JSON. Please ensure it is a valid JSON object.");
        }

        const analyticsDataClient = new BetaAnalyticsDataClient({
            credentials,
            fallback: 'rest'
        });

        // 4. Run Report
        // Fetching last 28 days of data: Sessions, Users, Engagement Rate
        const [response] = await analyticsDataClient.runReport({
            property: `properties/${propertyId}`,
            dateRanges: [
                {
                    startDate: '28daysAgo',
                    endDate: 'today',
                },
            ],
            dimensions: [
                { name: 'date' },
            ],
            metrics: [
                { name: 'activeUsers' },
                { name: 'sessions' },
                { name: 'engagementRate' },
            ],
            orderBys: [
                { dimension: { orderType: 'ALPHANUMERIC', dimensionName: 'date' } }
            ],
        });

        // 5. Run a second report for traffic sources
        const [sourcesResponse] = await analyticsDataClient.runReport({
            property: `properties/${propertyId}`,
            dateRanges: [
                {
                    startDate: '28daysAgo',
                    endDate: 'today',
                },
            ],
            dimensions: [
                { name: 'sessionSourceMedium' },
            ],
            metrics: [
                { name: 'activeUsers' },
            ],
            limit: 5
        });

        // 6. Process Data for Frontend
        const timelineData = response.rows.map(row => {
            const dateStr = row.dimensionValues[0].value; // YYYYMMDD
            // Format to MM/DD
            const formattedDate = `${dateStr.substring(4, 6)}/${dateStr.substring(6, 8)}`;
            return {
                date: formattedDate,
                users: parseInt(row.metricValues[0].value),
                sessions: parseInt(row.metricValues[1].value),
                engagement: parseFloat(row.metricValues[2].value) * 100, // Convert to %
            };
        });

        const sourcesData = sourcesResponse.rows.map(row => ({
            source: row.dimensionValues[0].value,
            users: parseInt(row.metricValues[0].value),
        }));

        // 7. AI Analysis (Optional - using InvokeLLM)
        let aiInsights = null;
        try {
            // Simple summary statistics for the prompt
            const totalUsers = timelineData.reduce((acc, curr) => acc + curr.users, 0);
            const avgEngagement = (timelineData.reduce((acc, curr) => acc + curr.engagement, 0) / timelineData.length).toFixed(1);
            
            aiInsights = await base44.integrations.Core.InvokeLLM({
                prompt: `Analyze this web traffic data for a landscaping business.
                Total Users (28d): ${totalUsers}
                Avg Engagement: ${avgEngagement}%
                Top Sources: ${sourcesData.map(s => s.source).join(', ')}
                
                Provide a brief, 2-sentence insight about the performance and any potential seasonal slowdowns (it's currently winter).`,
            });
        } catch (e) {
            console.error("AI Insight failed", e);
            aiInsights = "AI Insights unavailable at the moment.";
        }

        return Response.json({
            timeline: timelineData,
            sources: sourcesData,
            insights: aiInsights
        });

    } catch (error) {
        console.error("Analytics Error:", error);
        // detailed error message for better debugging
        return Response.json({ 
            error: 'Analytics API Error',
            details: error.message || "Unknown error occurred"
        }, { status: 500 });
    }
});