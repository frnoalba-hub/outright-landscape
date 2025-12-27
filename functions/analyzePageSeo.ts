import { createClientFromRequest } from 'npm:@base44/sdk@0.8.4';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        
        // 1. Parse Input
        const { path, pageContent, currentMeta } = await req.json();

        if (!path || !pageContent) {
            return Response.json({ error: "Missing path or pageContent" }, { status: 400 });
        }

        // 2. Call LLM for Analysis
        const prompt = `
            Act as an expert SEO Specialist. Analyze the content of the following webpage and generate optimized metadata.
            
            Context:
            - URL Path: ${path}
            - Current Title: ${currentMeta?.title || 'N/A'}
            - Current Description: ${currentMeta?.description || 'N/A'}
            
            Page Content Preview:
            ${pageContent.substring(0, 8000)}... (truncated)

            Tasks:
            1. Generate an optimized <title> tag (max 60 chars).
            2. Generate an optimized <meta name="description"> (max 160 chars).
            3. Suggest 5-10 target keywords.
            4. Provide a brief analysis of the content and suggestions for improvement.

            Return ONLY the raw JSON object matching the requested schema.
        `;

        const result = await base44.integrations.Core.InvokeLLM({
            prompt: prompt,
            response_json_schema: {
                type: "object",
                properties: {
                    title: { type: "string" },
                    description: { type: "string" },
                    keywords: { type: "string" },
                    ai_suggestions: { type: "string" }
                }
            }
        });

        // 3. Save/Update Entity
        // Check if config exists for this path
        const existing = await base44.entities.SeoConfig.list({ path: path }, 1);
        let record;

        if (existing && existing.length > 0) {
            record = await base44.entities.SeoConfig.update(existing[0].id, {
                title: result.title,
                description: result.description,
                keywords: result.keywords,
                ai_suggestions: result.ai_suggestions,
                last_updated: new Date().toISOString()
            });
        } else {
            record = await base44.entities.SeoConfig.create({
                path: path,
                title: result.title,
                description: result.description,
                keywords: result.keywords,
                ai_suggestions: result.ai_suggestions,
                last_updated: new Date().toISOString()
            });
        }

        return Response.json({ success: true, data: record });

    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
});