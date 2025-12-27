import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        const user = await base44.auth.me();

        if (!user || user.role !== 'admin') {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { keyword } = await req.json();
        if (!keyword) return Response.json({ error: "Keyword required" }, { status: 400 });

        // 1. Get Known Competitors
        const competitors = await base44.entities.Competitor.list();
        const competitorDomains = competitors.map(c => c.domain.toLowerCase().replace('https://', '').replace('http://', '').replace('www.', '').split('/')[0]);

        // 2. Scan SERP via LLM
        // We use the LLM with internet access to simulate a SERP check.
        const prompt = `
            Perform a google search for "${keyword}".
            Identify the top 10 organic results.
            
            Return a JSON object with:
            - top_result_domain: The domain of the #1 result.
            - rankings: Array of objects { rank: number, domain: string, title: string }.
            
            Also, specifically look for "outrightlandscape.com" and these competitors: ${competitorDomains.join(', ')}.
            If found, ensure they are in the rankings list with their correct rank.
        `;

        const serpData = await base44.integrations.Core.InvokeLLM({
            prompt,
            add_context_from_internet: true,
            response_json_schema: {
                type: "object",
                properties: {
                    top_result_domain: { type: "string" },
                    rankings: {
                        type: "array",
                        items: {
                            type: "object",
                            properties: {
                                rank: { type: "number" },
                                domain: { type: "string" },
                                title: { type: "string" }
                            }
                        }
                    }
                },
                required: ["rankings"]
            }
        });

        // 3. Process & Save Snapshot
        const rankings = serpData.rankings || [];
        
        // Find our rank
        const ourEntry = rankings.find(r => r.domain.includes("outrightlandscape.com"));
        const ourRank = ourEntry ? ourEntry.rank : 0; // 0 = not in top results found

        // Find competitor ranks
        const compRanks = [];
        for (const comp of competitors) {
            const cleanCompDomain = comp.domain.toLowerCase().replace('https://', '').replace('http://', '').replace('www.', '').split('/')[0];
            const entry = rankings.find(r => r.domain.includes(cleanCompDomain));
            if (entry) {
                compRanks.push({
                    domain: comp.domain,
                    name: comp.name,
                    rank: entry.rank
                });
            }
        }

        const snapshot = await base44.entities.KeywordRankSnapshot.create({
            keyword,
            snapshot_date: new Date().toISOString(),
            our_rank: ourRank,
            competitor_ranks: compRanks,
            top_result_domain: serpData.top_result_domain || (rankings[0]?.domain)
        });

        return Response.json(snapshot);

    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
});