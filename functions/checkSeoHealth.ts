import { createClientFromRequest } from 'npm:@base44/sdk@0.8.4';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        
        // 1. Auth Check
        const user = await base44.auth.me();
        if (!user || user.role !== 'admin') {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { sendEmail = false, thresholdPercent = 10 } = await req.json().catch(() => ({}));

        // 2. Fetch GSC Data (reusing existing function)
        const gscResponse = await base44.functions.invoke("getSearchConsoleData");
        
        if (!gscResponse.ok) {
            return Response.json({ error: "Failed to fetch GSC data" }, { status: 500 });
        }
        
        const gscData = gscResponse.data || gscResponse;
        const timeline = gscData.timeline || [];

        // 3. Analyze Trends (Last 7 days vs Previous 7 days)
        // Sort by date ascending just to be safe
        const sortedTimeline = timeline.sort((a, b) => new Date(a.keys[0]) - new Date(b.keys[0]));
        
        if (sortedTimeline.length < 14) {
            return Response.json({ 
                alerts: [], 
                status: "insufficient_data", 
                message: "Need at least 14 days of data to compare trends." 
            });
        }

        const last7 = sortedTimeline.slice(-7);
        const prev7 = sortedTimeline.slice(-14, -7);

        const metrics = ['clicks', 'impressions', 'ctr', 'position'];
        const alerts = [];

        metrics.forEach(metric => {
            // Calculate sums or averages
            const isAvg = ['ctr', 'position'].includes(metric);
            
            const currentVal = last7.reduce((sum, day) => sum + (day[metric] || 0), 0) / (isAvg ? 7 : 1);
            const prevVal = prev7.reduce((sum, day) => sum + (day[metric] || 0), 0) / (isAvg ? 7 : 1);

            if (prevVal === 0) return; // Avoid division by zero

            const change = ((currentVal - prevVal) / prevVal) * 100;
            
            // Check for negative trends (for position, increase is bad)
            let isBad = false;
            if (metric === 'position') {
                if (change > thresholdPercent) isBad = true; // Position went up (worse)
            } else {
                if (change < -thresholdPercent) isBad = true; // Metrics went down (worse)
            }

            if (isBad) {
                alerts.push({
                    metric,
                    currentVal,
                    prevVal,
                    change,
                    severity: Math.abs(change) > (thresholdPercent * 2) ? 'high' : 'medium'
                });
            }
        });

        // 4. Send Email if requested and alerts exist
        if (sendEmail && alerts.length > 0) {
            const emailBody = `
                SEO Health Alert Report
                
                The following metrics have shown significant negative trends in the last 7 days compared to the previous period:
                
                ${alerts.map(a => `
                - ${a.metric.toUpperCase()}: ${a.change.toFixed(1)}% change
                  (Current: ${a.currentVal.toFixed(2)} vs Previous: ${a.prevVal.toFixed(2)})
                `).join('\n')}
                
                Please check your SEO Dashboard for more details.
            `;

            await base44.integrations.Core.SendEmail({
                to: user.email,
                subject: `⚠️ SEO Alert: ${alerts.length} Issues Detected`,
                body: emailBody
            });
        }

        return Response.json({ 
            alerts, 
            period: {
                current: `${last7[0].keys[0]} to ${last7[6].keys[0]}`,
                previous: `${prev7[0].keys[0]} to ${prev7[6].keys[0]}`
            }
        });

    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
});