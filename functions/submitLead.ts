import { createClientFromRequest } from 'npm:@base44/sdk@0.8.4';

export default Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        
        // Parse body
        const formData = await req.json();
        const { name, email, phone, city, message, service_type } = formData;

        // 1. Save to Database
        const inquiry = await base44.asServiceRole.entities.ContactInquiry.create(formData);

        // 2. Send Confirmation Email to User
        await base44.integrations.Core.SendEmail({
            to: email,
            subject: "Thank you for contacting Outright Landscape!",
            body: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <div style="background: linear-gradient(135deg, #16a34a 0%, #15803d 100%); padding: 40px 20px; text-align: center;">
                        <h1 style="color: white; margin: 0; font-size: 28px;">Thank You, ${name}!</h1>
                        <p style="color: #e5e7eb; margin: 10px 0 0 0; font-size: 16px;">We've received your inquiry</p>
                    </div>
                    
                    <div style="background: white; padding: 40px 30px;">
                        <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                            We're excited to help transform your outdoor space in <strong>${city}</strong>! 
                            One of our landscape specialists will reach out to you within 24 hours.
                        </p>
                        
                        <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                            <h3 style="color: #16a34a; margin: 0 0 15px 0; font-size: 18px;">Your Inquiry Details:</h3>
                            <p style="margin: 8px 0; color: #4b5563;"><strong>Service Interest:</strong> ${service_type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</p>
                            <p style="margin: 8px 0; color: #4b5563;"><strong>Location:</strong> ${city}</p>
                            <p style="margin: 8px 0; color: #4b5563;"><strong>Message:</strong> ${message}</p>
                        </div>
                        
                        <div style="border-top: 2px solid #e5e7eb; padding-top: 20px; margin-top: 30px;">
                            <p style="color: #6b7280; font-size: 14px; margin: 0 0 10px 0;"><strong>Need immediate assistance?</strong></p>
                            <p style="color: #16a34a; font-size: 18px; font-weight: bold; margin: 0;">📞 (626) 343-6028</p>
                            <p style="color: #6b7280; font-size: 14px; margin: 5px 0 0 0;">Mon-Sat: 8:00 AM - 6:00 PM</p>
                        </div>
                    </div>
                    
                    <div style="background: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
                        <p style="color: #6b7280; font-size: 12px; margin: 0;">
                            Outright Landscape Construction | CSLB #1073845<br/>
                            Licensed & Insured | Serving San Gabriel Valley
                        </p>
                    </div>
                </div>
            `,
            from_name: "Outright Landscape"
        });

        // 3. Send Admin Notification Email
        await base44.integrations.Core.SendEmail({
            to: "outrightlandscape@yahoo.com, deltablockv@gmail.com", 
            subject: `🎯 New Lead: ${name} from ${city}`,
            body: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <div style="background: #1f2937; padding: 30px 20px; text-align: center;">
                        <h1 style="color: white; margin: 0; font-size: 24px;">🎯 New Website Lead</h1>
                    </div>
                    
                    <div style="background: white; padding: 30px;">
                        <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin-bottom: 20px;">
                            <p style="margin: 0; color: #92400e; font-weight: bold;">⚡ Action Required: Follow up within 24 hours</p>
                        </div>
                        
                        <h2 style="color: #16a34a; margin: 0 0 20px 0;">Contact Information</h2>
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr>
                                <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;"><strong>Name:</strong></td>
                                <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">${name}</td>
                            </tr>
                            <tr>
                                <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;"><strong>Phone:</strong></td>
                                <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;"><a href="tel:${phone}" style="color: #16a34a; text-decoration: none;">${phone}</a></td>
                            </tr>
                            <tr>
                                <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;"><strong>Email:</strong></td>
                                <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;"><a href="mailto:${email}" style="color: #16a34a; text-decoration: none;">${email}</a></td>
                            </tr>
                            <tr>
                                <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;"><strong>Location:</strong></td>
                                <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">${city}</td>
                            </tr>
                            <tr>
                                <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;"><strong>Service:</strong></td>
                                <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">${service_type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</td>
                            </tr>
                        </table>
                        
                        <div style="margin-top: 30px;">
                            <h3 style="color: #374151; margin: 0 0 10px 0;">Project Details:</h3>
                            <div style="background: #f9fafb; padding: 15px; border-radius: 8px; border: 1px solid #e5e7eb;">
                                <p style="margin: 0; color: #4b5563; white-space: pre-wrap;">${message}</p>
                            </div>
                        </div>
                        
                        <div style="margin-top: 30px; padding: 20px; background: #ecfdf5; border-radius: 8px;">
                            <p style="margin: 0; color: #065f46; font-size: 14px;">
                                📊 <strong>Lead saved to database</strong> - View in Admin Dashboard → Leads
                            </p>
                        </div>
                    </div>
                    
                    <div style="background: #f9fafb; padding: 15px; text-align: center;">
                        <p style="color: #6b7280; font-size: 12px; margin: 0;">
                            Lead submitted: ${new Date().toLocaleString()}
                        </p>
                    </div>
                </div>
            `,
            from_name: "Outright Landscape Website"
        });

        return Response.json({ success: true, inquiry });

    } catch (error) {
        console.error('Lead submission error:', error);
        return Response.json({ error: error.message }, { status: 500 });
    }
});