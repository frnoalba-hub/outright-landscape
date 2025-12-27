import { createClientFromRequest } from 'npm:@base44/sdk@0.8.4';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        
        // 1. Parse Input
        const { path, suggestions } = await req.json();

        if (!path || !path.includes("city=")) {
            return Response.json({ error: "Currently only Service Area (City) pages are supported for auto-improvement." }, { status: 400 });
        }

        const slug = path.split("city=")[1];

        // 2. Fetch Location Data
        const locations = await base44.entities.Location.list({ slug: slug }, 1);
        if (!locations || locations.length === 0) {
            return Response.json({ error: "Location not found" }, { status: 404 });
        }
        const location = locations[0];

        // 3. Call LLM to Rewrite Intro
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
            5. Return ONLY the new text. Do not include quotes or "Here is the rewritten text:".
        `;

        const response = await base44.integrations.Core.InvokeLLM({
            prompt: prompt
        });

        // 4. Update Entity
        await base44.entities.Location.update(location.id, {
            intro: response
        });

        return Response.json({ 
            success: true, 
            oldIntro: location.intro,
            newIntro: response 
        });

    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
});