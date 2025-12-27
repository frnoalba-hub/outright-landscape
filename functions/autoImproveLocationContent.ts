import { createClientFromRequest } from 'npm:@base44/sdk@0.8.4';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        
        const { path, suggestions } = await req.json();

        if (!path || !path.includes("city=")) {
            return Response.json({ error: "Currently only Service Area (City) pages are supported for auto-improvement." }, { status: 400 });
        }

        // Robust slug extraction
        const slug = path.split("city=")[1].split("&")[0];

        const locations = await base44.entities.Location.filter({ slug: slug }, null, 1);
        
        if (!locations || locations.length === 0) {
            return Response.json({ error: `Location not found for slug: ${slug}` }, { status: 404 });
        }
        const location = locations[0];

        const prompt = `
            Act as an expert SEO Copywriter. 
            Rewrite the "Introduction" section for a landscaping service page in ${location.name}.
            
            Current Intro:
            "${location.intro || ''}"

            Goal: Improve the content based on these specific SEO suggestions:
            "${suggestions}"

            Requirements:
            1. Incorporate local landmarks, neighborhoods, or community features of ${location.name} if mentioned in suggestions or generally known.
            2. Be specific about services (Pavers, Turf, Hardscaping) if requested.
            3. Keep the tone professional, trustworthy, and engaging.
            4. Length: 150-250 words.
            5. Return ONLY the new text. Do not include quotes.
        `;

        const response = await base44.integrations.Core.InvokeLLM({ prompt });

        await base44.entities.Location.update(location.id, { intro: response });

        // Update SeoConfig to mark as fixed
        try {
            const configs = await base44.entities.SeoConfig.filter({ path: path }, null, 1);
            if (configs.length > 0) {
                const config = configs[0];
                const timestamp = new Date().toLocaleDateString();
                // Prepend status if not already there
                if (!config.ai_suggestions?.includes("✅ Auto-Fixed")) {
                    await base44.entities.SeoConfig.update(config.id, {
                        ai_suggestions: `✅ Auto-Fixed on ${timestamp}\n\n${config.ai_suggestions || ''}`
                    });
                }
            }
        } catch (e) {
            console.error("Failed to update SeoConfig status:", e);
            // Non-critical, continue
        }

        return Response.json({ success: true, newIntro: response });

    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
});