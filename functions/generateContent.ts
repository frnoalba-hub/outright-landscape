import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        const user = await base44.auth.me();

        if (!user || user.role !== 'admin') {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { type, topic, keywords, tone = "Professional yet friendly" } = await req.json();

        if (!topic) {
            return Response.json({ error: "Topic/City is required" }, { status: 400 });
        }

        let systemPrompt = "";
        let userPrompt = "";
        let jsonSchema = null;

        if (type === 'blog') {
            systemPrompt = `You are an expert SEO content writer for a Landscaping company. 
            You write engaging, high-quality blog posts that rank well.
            Tone: ${tone}.`;
            
            userPrompt = `Write a blog post about: "${topic}".
            Keywords to include: ${keywords || 'landscaping, garden design'}.
            
            Return a JSON object with:
            - title: Catchy, SEO-friendly title
            - slug: URL-friendly slug
            - excerpt: 2-3 sentence summary
            - content: Full article in Markdown format (headers, bolding, lists). NO H1 in content (title is H1).`;

            jsonSchema = {
                type: "object",
                properties: {
                    title: { type: "string" },
                    slug: { type: "string" },
                    excerpt: { type: "string" },
                    content: { type: "string" }
                },
                required: ["title", "slug", "excerpt", "content"]
            };

        } else if (type === 'service_area') {
            systemPrompt = `You are a Local SEO specialist for "Outright Landscape". 
            You write localized service page content that connects with residents of specific cities.
            Tone: ${tone}.`;

            userPrompt = `Write content for a service area page for the city: "${topic}".
            Keywords to include: ${keywords || 'landscaping services, hardscaping, pavers'}.
            
            Return a JSON object with:
            - intro: A compelling 2-3 paragraph introduction for the page. Mention local landmarks or vibes if possible.
            - faqs: A list of 3 FAQs specific to landscaping in this area (e.g. weather, regulations).
            `;

            jsonSchema = {
                type: "object",
                properties: {
                    intro: { type: "string" },
                    faqs: { 
                        type: "array", 
                        items: { 
                            type: "object", 
                            properties: {
                                q: { type: "string" },
                                a: { type: "string" }
                            } 
                        } 
                    }
                },
                required: ["intro", "faqs"]
            };
        } else {
            return Response.json({ error: "Invalid type" }, { status: 400 });
        }

        const response = await base44.integrations.Core.InvokeLLM({
            prompt: `${systemPrompt}\n\n${userPrompt}`,
            add_context_from_internet: true, // Helpful for local facts or latest trends
            response_json_schema: jsonSchema
        });

        return Response.json(response);

    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
});