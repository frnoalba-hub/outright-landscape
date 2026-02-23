import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

export default Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        
        const p1 = base44.asServiceRole.integrations.Core.GenerateImage({
            prompt: "A beautiful, modern outdoor living space featuring a high-quality paver patio, professional landscaping, retaining wall, and luxurious outdoor setting, photorealistic, architectural photography, bright sunny day"
        });
        const p2 = base44.asServiceRole.integrations.Core.GenerateImage({
            prompt: "Close up of a newly installed interlocking paver patio with a fire pit, modern backyard design, photorealistic, architectural photography"
        });
        const p3 = base44.asServiceRole.integrations.Core.GenerateImage({
            prompt: "A beautifully finished stamped concrete driveway and walkway leading to a modern home, high quality concrete work, sunny day, photorealistic"
        });
        const p4 = base44.asServiceRole.integrations.Core.GenerateImage({
            prompt: "A sturdy and aesthetically pleasing structural retaining wall made of large stone blocks in a landscaped garden, terraced yard, photorealistic, highly detailed"
        });

        const [img1, img2, img3, img4] = await Promise.all([p1, p2, p3, p4]);

        return Response.json({
            hero: img1.url,
            pavers: img2.url,
            concrete: img3.url,
            retaining: img4.url
        });
    } catch (e) {
        return Response.json({ error: e.message }, { status: 500 });
    }
});