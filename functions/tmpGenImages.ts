import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);

        // We use Promise.all to generate images in parallel
        const [
            heroBg,
            turf,
            hardscapePavers,
            paverWalkway,
            backyardMakeover
        ] = await Promise.all([
            base44.asServiceRole.integrations.Core.GenerateImage({
                prompt: "A high-quality, realistic professional photograph of a luxurious backyard landscape design featuring a beautiful interlocking paver patio, lush green artificial turf, and elegant outdoor lighting. Sunny day, professional landscaping, Southern California style."
            }),
            base44.asServiceRole.integrations.Core.GenerateImage({
                prompt: "A close-up, realistic photograph of newly installed, vibrant green Marathon tall fescue sod in a residential backyard, perfectly manicured, bright sunny day."
            }),
            base44.asServiceRole.integrations.Core.GenerateImage({
                prompt: "A realistic, professional photograph of a newly constructed interlocking paver driveway and walkway in a suburban front yard, high end hardscaping."
            }),
            base44.asServiceRole.integrations.Core.GenerateImage({
                prompt: "A realistic, professional photograph of an elegant curving paver walkway winding through a beautifully landscaped garden with drought-tolerant plants."
            }),
            base44.asServiceRole.integrations.Core.GenerateImage({
                prompt: "A realistic professional photograph of a complete backyard makeover featuring a modern stamped concrete patio, a small decorative retaining wall, and fresh landscaping."
            })
        ]);

        return Response.json({
            hero_bg: heroBg.url,
            turf: turf.url,
            hardscape_pavers: hardscapePavers.url,
            paver_walkway: paverWalkway.url,
            backyard_makeover: backyardMakeover.url
        });
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
});