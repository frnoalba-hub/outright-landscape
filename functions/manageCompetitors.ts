import { createClientFromRequest } from 'npm:@base44/sdk@0.8.4';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        const user = await base44.auth.me();
        
        if (!user || user.role !== 'admin') {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { action, domain } = await req.json().catch(() => ({}));

        if (action === 'discover') {
            // 1. Discover Competitors using LLM with Internet Access
            const prompt = `
                I need to find direct local competitors for a landscaping company named "Outright Landscape Construction" based in Covina, CA (San Gabriel Valley).
                
                Please search for "landscaping companies Covina CA", "landscape construction Glendora CA", "San Dimas landscaping services".
                
                Identify top 5 REAL competitor companies (exclude directories like Yelp, Angi, Houzz, BBB, etc., and exclude "Outright Landscape").
                
                For each competitor, provide:
                1. Company Name
                2. Website Domain (e.g., example.com)
                3. Brief Description (1 sentence)
                4. Estimated Threat Level (High/Medium/Low based on their online presence/ranking)
                
                Return ONLY a JSON array of objects with keys: name, domain, description, threat_level.
            `;

            const response = await base44.integrations.Core.InvokeLLM({
                prompt,
                add_context_from_internet: true,
                response_json_schema: {
                    type: "object",
                    properties: {
                        competitors: {
                            type: "array",
                            items: {
                                type: "object",
                                properties: {
                                    name: { type: "string" },
                                    domain: { type: "string" },
                                    description: { type: "string" },
                                    threat_level: { type: "string", enum: ["High", "Medium", "Low"] }
                                }
                            }
                        }
                    }
                }
            });

            // 2. Save to Database (avoiding duplicates)
            const competitors = response.competitors || [];
            const results = [];

            for (const comp of competitors) {
                // Check if exists
                const existing = await base44.entities.Competitor.list({
                    filter: { domain: comp.domain }
                });

                if (existing.length === 0) {
                    const created = await base44.entities.Competitor.create({
                        ...comp,
                        last_analyzed: new Date().toISOString()
                    });
                    results.push(created);
                } else {
                    results.push(existing[0]);
                }
            }

            return Response.json({ status: 'success', discovered: results });
        }

        if (action === 'analyze' && domain) {
            // 1. Analyze specific competitor
            const prompt = `
                Analyze the landscaping competitor website: ${domain}.
                Compare it against a standard high-quality landscaping business.
                
                Identify:
                1. 3-5 Potential Overlap Keywords (services they emphasize, e.g., "pavers covina", "turf installation").
                2. Their Key Strengths (e.g., "Strong portfolio", "Fast loading site").
                3. Their Weaknesses (e.g., "Lack of blog", "Bad mobile UX").
                4. A specific Strategy to Beat them (e.g., "Create better location pages for Glendora").
                
                Return JSON.
            `;

            const analysis = await base44.integrations.Core.InvokeLLM({
                prompt,
                add_context_from_internet: true,
                response_json_schema: {
                    type: "object",
                    properties: {
                        overlap_keywords: { type: "array", items: { type: "string" } },
                        strengths: { type: "string" },
                        weaknesses: { type: "string" },
                        strategy_to_beat: { type: "string" }
                    }
                }
            });

            // 2. Update Entity
            const existing = await base44.entities.Competitor.list(); // Ideally filter by domain if SDK supports it well, or client filter
            const competitor = existing.find(c => c.domain === domain);

            if (competitor) {
                const updated = await base44.entities.Competitor.update(competitor.id, {
                    ...analysis,
                    last_analyzed: new Date().toISOString()
                });
                return Response.json({ status: 'success', data: updated });
            }
            
            return Response.json({ error: 'Competitor not found in DB' }, { status: 404 });
        }

        return Response.json({ error: 'Invalid action' }, { status: 400 });

    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
});