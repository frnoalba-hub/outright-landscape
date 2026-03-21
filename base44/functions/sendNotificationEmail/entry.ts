import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

const NOTIFICATION_EMAILS = ["outrightlandscapecovina@gmail.com", "frno.alba@gmail.com"];

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        const { subject, body } = await req.json();

        await Promise.all(NOTIFICATION_EMAILS.map(to =>
            base44.asServiceRole.integrations.Core.SendEmail({ to, subject, body })
        ));

        return Response.json({ success: true });
    } catch (error) {
        console.error("Email send error:", error);
        return Response.json({ error: error.message }, { status: 500 });
    }
});