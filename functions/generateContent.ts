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
            systemPrompt = `You are an expert local SEO content writer specializing in landscaping services. Create highly localized, engaging content optimized for local search queries that includes location-specific details, local keywords, and answers common questions residents of the area would have.
            Tone: ${tone}.`;

            userPrompt = `Create SEO-optimized local content for our landscaping service area page in ${topic}, California. 

Business: Outright Landscape Construction (CSLB #1073845)
Services: Pavers, Turf Installation, Irrigation, Hardscaping, Landscape Design
Service Area: ${topic} and San Gabriel Valley
Target Keywords: ${keywords || `${topic} landscaping, ${topic} hardscaping, ${topic} pavers, ${topic} turf installation, ${topic} irrigation systems, landscape contractor ${topic}`}

Local SEO Requirements:
- Write an engaging intro (200-250 words) with natural keyword integration
- Include location modifiers (e.g., "in ${topic}", "near ${topic}", "${topic} homeowners")
- Reference local climate considerations (Southern California, drought-tolerant, water-wise)
- Mention specific neighborhoods or areas within ${topic} if you know them
- Address local challenges (water restrictions, soil types, climate)
- Create 6-8 highly specific FAQs using question phrases people search for
- Use conversational language that locals would use
- Build trust and highlight local expertise

FAQ Guidelines:
- Start questions with: "How much does...", "What is the best...", "Do I need...", "Can you..."
- Reference ${topic} specifically in questions
- Address pricing, permits, climate, timing, and local regulations
- Keep answers helpful, specific, and actionable (100-150 words each)`;

            jsonSchema = {
                type: "object",
                properties: {
                    intro: { type: "string", description: "SEO-optimized intro paragraph with local keywords and details about services in this specific city" },
                    faqs: {
                        type: "array",
                        items: {
                            type: "object",
                            properties: {
                                q: { type: "string", description: "Location-specific FAQ question using natural search phrases" },
                                a: { type: "string", description: "Detailed, helpful answer addressing local considerations" }
                            },
                            required: ["q", "a"]
                        },
                        description: "6-8 location-specific FAQs optimized for local search queries"
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