import { createClientFromRequest } from 'npm:@base44/sdk@0.8.4';
import * as cheerio from 'npm:cheerio@1.0.0-rc.12';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        const user = await base44.auth.me();

        if (!user || user.role !== 'admin') {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { url } = await req.json();

        if (!url) {
            return Response.json({ error: 'URL is required' }, { status: 400 });
        }

        // 1. Fetch Page Content
        const start = performance.now();
        let response;
        try {
            response = await fetch(url, {
                headers: {
                    'User-Agent': 'Base44 SEO Auditor/1.0'
                }
            });
        } catch (e) {
            return Response.json({ error: `Failed to fetch URL: ${e.message}` }, { status: 400 });
        }
        const loadTime = performance.now() - start;
        const html = await response.text();
        const $ = cheerio.load(html);

        const issues = [];
        let score = 100;
        const deductions = { critical: 20, high: 10, medium: 5, low: 2 };

        const addIssue = (category, severity, message, recommendation) => {
            issues.push({ category, severity, message, recommendation });
            score = Math.max(0, score - deductions[severity]);
        };

        // --- TECHNICAL SEO ---

        // 1. SSL Check
        if (!url.startsWith('https')) {
            addIssue('technical', 'critical', 'Site is not using HTTPS', 'Enable SSL certificate and redirect HTTP to HTTPS.');
        }

        // 2. Status Code
        if (response.status !== 200) {
            addIssue('technical', 'critical', `Page returned status code ${response.status}`, 'Ensure the page is accessible and returns a 200 OK status.');
        }

        // 3. Load Time (Rough server-side measurement)
        if (loadTime > 2000) {
            addIssue('performance', 'high', `Slow server response time (${Math.round(loadTime)}ms)`, 'Optimize server performance, cache database queries, or use a CDN.');
        }

        // 4. Canonical Tag
        const canonical = $('link[rel="canonical"]').attr('href');
        if (!canonical) {
            addIssue('technical', 'medium', 'Missing canonical tag', 'Add a canonical tag to prevent duplicate content issues.');
        }

        // 5. Robots Meta
        const robotsMeta = $('meta[name="robots"]').attr('content');
        if (robotsMeta && robotsMeta.includes('noindex')) {
            addIssue('technical', 'critical', 'Page is set to noindex', 'Remove "noindex" from robots meta tag if you want this page to be found by search engines.');
        }

        // --- ON-PAGE SEO ---

        // 6. Title Tag
        const title = $('title').text().trim();
        if (!title) {
            addIssue('on_page', 'critical', 'Missing Title Tag', 'Add a descriptive title tag within the <head> section.');
        } else if (title.length < 30 || title.length > 60) {
            addIssue('on_page', 'medium', `Title length is ${title.length} chars (Recommended: 30-60)`, 'Optimize title length to display fully in search results.');
        }

        // 7. Meta Description
        const metaDesc = $('meta[name="description"]').attr('content')?.trim();
        if (!metaDesc) {
            addIssue('on_page', 'high', 'Missing Meta Description', 'Add a meta description to summarize the page content.');
        } else if (metaDesc.length < 50 || metaDesc.length > 160) {
            addIssue('on_page', 'medium', `Meta Description length is ${metaDesc.length} chars (Recommended: 50-160)`, 'Optimize description length for better CTR.');
        }

        // 8. H1 Tag
        const h1Count = $('h1').length;
        if (h1Count === 0) {
            addIssue('on_page', 'high', 'Missing H1 Tag', 'Ensure the page has exactly one H1 tag describing the main topic.');
        } else if (h1Count > 1) {
            addIssue('on_page', 'medium', `Multiple H1 Tags found (${h1Count})`, 'Use only one H1 tag per page for clear hierarchy.');
        }

        // 9. Image Alt Text
        const images = $('img');
        let missingAlt = 0;
        images.each((i, el) => {
            if (!$(el).attr('alt')) missingAlt++;
        });
        if (missingAlt > 0) {
            addIssue('on_page', 'medium', `${missingAlt} images missing Alt text`, 'Add descriptive alt text to all images for accessibility and SEO.');
        }

        // --- CONTENT ANALYSIS (LLM) ---
        // We take a sample of text content to analyze
        const bodyText = $('body').text().replace(/\s+/g, ' ').trim().substring(0, 2000); // First 2000 chars

        if (bodyText.length < 300) {
            addIssue('content', 'high', 'Thin Content', 'The page appears to have very little text content. Consider adding more valuable information.');
        } else {
            // LLM Analysis for quality
            const prompt = `
                Audit the following webpage text content for SEO quality.
                Identify 2-3 specific issues regarding keyword usage, readability, or content value.
                Also provide a brief overall sentiment.
                
                Content snippet: "${bodyText}..."
                
                Return JSON: { "issues": [{ "message": "...", "recommendation": "...", "severity": "high/medium/low" }] }
            `;

            try {
                const llmRes = await base44.integrations.Core.InvokeLLM({
                    prompt,
                    response_json_schema: {
                        type: "object",
                        properties: {
                            issues: {
                                type: "array",
                                items: {
                                    type: "object",
                                    properties: {
                                        message: { type: "string" },
                                        recommendation: { type: "string" },
                                        severity: { type: "string", enum: ["high", "medium", "low"] }
                                    }
                                }
                            }
                        }
                    }
                });

                if (llmRes.issues) {
                    llmRes.issues.forEach(issue => {
                        addIssue('content', issue.severity || 'medium', issue.message, issue.recommendation);
                    });
                }
            } catch (err) {
                console.error("LLM Audit Error:", err);
            }
        }

        // Calculate final scores
        const finalScore = Math.max(0, Math.min(100, score));

        const reportData = {
            url,
            overall_score: finalScore,
            metrics: {
                seo: finalScore, // simplified for now
                performance: loadTime < 1000 ? 90 : (loadTime < 2000 ? 70 : 50),
                content: 85, // placeholder
                technical: 80 // placeholder
            },
            issues: issues.sort((a, b) => {
                const sev = { critical: 4, high: 3, medium: 2, low: 1 };
                return sev[b.severity] - sev[a.severity];
            }),
            scanned_at: new Date().toISOString()
        };

        // Save to DB
        await base44.entities.SeoAuditReport.create(reportData);

        return Response.json(reportData);

    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
});