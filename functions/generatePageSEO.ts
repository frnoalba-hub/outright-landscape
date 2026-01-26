import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        const user = await base44.auth.me();

        if (!user || user.role !== 'admin') {
            return Response.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
        }

        const { page_path, page_content, city_name, service_type } = await req.json();

        if (!page_path) {
            return Response.json({ error: 'page_path is required' }, { status: 400 });
        }

        // Build context for AI
        let context = `Generate SEO metadata for this landscaping website page:\n\nPage URL: ${page_path}\n`;
        
        if (city_name) {
            context += `City: ${city_name}\n`;
        }
        if (service_type) {
            context += `Service Type: ${service_type}\n`;
        }
        if (page_content) {
            context += `\nPage Content Summary:\n${page_content.substring(0, 1000)}\n`;
        }

        // Call AI to generate SEO data
        const seoData = await base44.integrations.Core.InvokeLLM({
            prompt: `${context}

Generate SEO metadata for this page. The business is "Outright Landscape Construction", a licensed C-27 landscape contractor (CSLB #1073845) serving the San Gabriel Valley in California.

Requirements:
1. Meta Title: 50-60 characters, include primary keyword and location
2. Meta Description: 150-160 characters, compelling call-to-action, include phone number (626) 343-6028
3. Keywords: 8-12 relevant keywords focusing on local SEO, services, and location

Format your response as JSON with these exact fields:
- meta_title (string)
- meta_description (string)
- keywords (array of strings)`,
            response_json_schema: {
                type: "object",
                properties: {
                    meta_title: { type: "string" },
                    meta_description: { type: "string" },
                    keywords: {
                        type: "array",
                        items: { type: "string" }
                    }
                },
                required: ["meta_title", "meta_description", "keywords"]
            }
        });

        // Save to database
        const existingSEO = await base44.asServiceRole.entities.PageSEO.filter({ page_path });
        
        let savedSEO;
        if (existingSEO.length > 0) {
            savedSEO = await base44.asServiceRole.entities.PageSEO.update(existingSEO[0].id, {
                ...seoData,
                page_path,
                ai_generated: true,
                last_generated: new Date().toISOString()
            });
        } else {
            savedSEO = await base44.asServiceRole.entities.PageSEO.create({
                ...seoData,
                page_path,
                ai_generated: true,
                last_generated: new Date().toISOString()
            });
        }

        return Response.json({
            success: true,
            seo: savedSEO
        });

    } catch (error) {
        console.error('SEO generation error:', error);
        return Response.json({ 
            error: error.message || 'Failed to generate SEO data' 
        }, { status: 500 });
    }
});