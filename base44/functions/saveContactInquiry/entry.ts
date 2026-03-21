import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        const body = await req.json();

        const record = await base44.asServiceRole.entities.ContactInquiry.create(body);

        return Response.json({ success: true, id: record.id });
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
});