import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);

        const img = await base44.asServiceRole.integrations.Core.GenerateImage({
            prompt: "A photo-realistic image of a residential lawn with a pop-up sprinkler head actively spraying water. The view is from a low angle on a sunny day. The lawn is green and well-maintained. The sprinkler is a standard black pop-up head with a fan spray pattern. High resolution, natural lighting, no weird artifacts.",
            existing_image_urls: ["https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/faf27a0ae_image.png"]
        });

        return Response.json({ url: img.url });
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
});