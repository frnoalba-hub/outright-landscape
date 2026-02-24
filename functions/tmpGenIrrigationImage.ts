import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);

        const img = await base44.asServiceRole.integrations.Core.GenerateImage({
            prompt: "A high-quality, realistic professional photograph of a modern, water-efficient sprinkler system actively watering a lush green lawn on a sunny day. Clear water droplets, professional landscaping."
        });

        return Response.json({ url: img.url });
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
});