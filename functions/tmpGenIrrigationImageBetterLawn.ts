import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);

        const img = await base44.asServiceRole.integrations.Core.GenerateImage({
            prompt: "A close-up, ground-level shot of a modern pop-up sprinkler head actively watering a lush, perfectly manicured emerald green lawn. The grass is thick, healthy, and vibrant. Golden hour lighting creates a warm glow and sparkles in the water spray. The sprinkler spray pattern is an even fan. Professional landscape photography, high detail, photorealistic, 4k.",
            existing_image_urls: ["https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/5824aca26_generated_image.png"]
        });

        return Response.json({ url: img.url });
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
});