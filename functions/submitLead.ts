import { createClientFromRequest } from 'npm:@base44/sdk@0.8.4';

export default Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        
        // Parse body
        const formData = await req.json();
        const { name, email, phone, city, message, service_type } = formData;

        // 1. Save to Database
        const inquiry = await base44.asServiceRole.entities.ContactInquiry.create(formData);

        // 2. Send Email Notification to Business Owner
        // Note: In a real app, change 'to' to the business owner's email
        const emailResult = await base44.integrations.Core.SendEmail({
            to: "outrightlandscape@yahoo.com", 
            subject: `New Lead from ${city}: ${name}`,
            body: `
                <h1>New Website Inquiry</h1>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>City:</strong> ${city}</p>
                <p><strong>Service:</strong> ${service_type}</p>
                <br/>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
                <br/>
                <p><small>This lead has been saved to your database.</small></p>
            `,
            from_name: "Outright Landscape Website"
        });

        return Response.json({ success: true, inquiry });

    } catch (error) {
        console.error('Lead submission error:', error);
        return Response.json({ error: error.message }, { status: 500 });
    }
});