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

        const { keyword } = await req.json().catch(() => ({}));

        // 2. Credentials Check
        const serviceAccountJson = Deno.env.get("GOOGLE_SEARCH_CONSOLE_SERVICE_ACCOUNT_JSON");
        if (!serviceAccountJson) {
            return Response.json({ 
                error: 'Configuration Missing', 
                details: 'Please set GOOGLE_SEARCH_CONSOLE_SERVICE_ACCOUNT_JSON secret.' 
            }, { status: 400 });
        }

        // 3. Initialize Auth
        let credentials;
        try {
            credentials = JSON.parse(serviceAccountJson);
            if (typeof credentials === 'string') credentials = JSON.parse(credentials);
        } catch (e) {
            throw new Error("Failed to parse GOOGLE_SEARCH_CONSOLE_SERVICE_ACCOUNT_JSON.");
        }

        const now = Math.floor(Date.now() / 1000);
        const tokenPayload = {
            iss: credentials.client_email,
            scope: 'https://www.googleapis.com/auth/webmasters.readonly',
            aud: 'https://oauth2.googleapis.com/token',
            exp: now + 3600,
            iat: now
        };

        const signedJwt = jwt.sign(tokenPayload, credentials.private_key, { algorithm: 'RS256' });

        // Get Access Token
        const getAccessToken = async () => {
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
        };

        const token = await getAccessToken();

        // 4. Get Site URL
        const sitesRes = await fetch('https://www.googleapis.com/webmasters/v3/sites', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (!sitesRes.ok) throw new Error("Failed to fetch sites list");
        const sitesData = await sitesRes.json();
        
        // Find the matching site or use the first verified one
        // We prefer sc-domain: or https:// based properties
        let siteUrl = sitesData.siteEntry?.find(s => s.permissionLevel !== 'siteRestrictedUser')?.siteUrl;
        
        if (!siteUrl) {
            return Response.json({ 
                error: 'No Accessible Properties', 
                details: 'Make sure you added the service account email as a user in Search Console.' 
            }, { status: 404 });
        }

        // 5. Fetch Performance Data
        const today = new Date();
        const twentyEightDaysAgo = new Date(today.getTime() - (28 * 24 * 60 * 60 * 1000));
        const formatDate = (d) => d.toISOString().split('T')[0];

        const queryBody = {
            startDate: formatDate(twentyEightDaysAgo),
            endDate: formatDate(today),
            dimensions: ['date'],
            rowLimit: 30,
            dimensionFilterGroups: keyword ? [{
                filters: [{
                    dimension: 'query',
                    operator: 'contains',
                    expression: keyword
                }]
            }] : undefined
        };

        if (keyword) {
            queryBody.dimensionFilterGroups = [{
                filters: [{
                    dimension: 'query',
                    operator: 'contains',
                    expression: keyword
                }]
            }];
        }

        const topQueriesBody = {
            startDate: formatDate(twentyEightDaysAgo),
            endDate: formatDate(today),
            dimensions: ['query'],
            rowLimit: 10
        };

        const topPagesBody = {
            startDate: formatDate(twentyEightDaysAgo),
            endDate: formatDate(today),
            dimensions: ['page'],
            rowLimit: 10
        };

        const fetchAnalytics = async (body) => {
            const res = await fetch(`https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });
            if (!res.ok) throw new Error(`Search Console API Error: ${await res.text()}`);
            return await res.json();
        };

        // Fetch Sitemaps separately to handle potential errors gracefully
        const fetchSitemaps = async () => {
            try {
                const res = await fetch(`https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/sitemaps`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (!res.ok) return { sitemap: [] };
                return await res.json();
            } catch (e) {
                console.error("Sitemap fetch failed", e);
                return { sitemap: [] };
            }
        };

        const [performanceData, queriesData, pagesData, sitemapsData] = await Promise.all([
            fetchAnalytics(queryBody),
            fetchAnalytics(topQueriesBody),
            fetchAnalytics(topPagesBody),
            fetchSitemaps()
        ]);

        // Calculate Totals
        const rows = performanceData.rows || [];
        const totalClicks = rows.reduce((acc, row) => acc + row.clicks, 0);
        const totalImpressions = rows.reduce((acc, row) => acc + row.impressions, 0);
        const avgCtr = rows.length ? (rows.reduce((acc, row) => acc + row.ctr, 0) / rows.length) : 0;
        const avgPosition = rows.length ? (rows.reduce((acc, row) => acc + row.position, 0) / rows.length) : 0;

        return Response.json({
            siteUrl,
            overview: {
                totalClicks,
                totalImpressions,
                avgCtr,
                avgPosition
            },
            timeline: rows,
            topQueries: queriesData.rows || [],
            topPages: pagesData.rows || [],
            sitemaps: sitemapsData.sitemap || []
        });

    } catch (error) {
        console.error("Search Console Error:", error);
        return Response.json({ 
            error: 'Search Console API Error',
            details: error.message || "Unknown error occurred"
        }, { status: 500 });
    }
});