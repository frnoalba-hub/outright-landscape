import { createClientFromRequest } from 'npm:@base44/sdk@0.8.4';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        
        // Get the Google API key from environment variables
        const apiKey = Deno.env.get("GOOGLE_API_KEY");
        
        if (!apiKey) {
            return Response.json({ error: 'Google API key not configured' }, { status: 500 });
        }

        // Parse request body to get account and location IDs
        const body = await req.json();
        const { accountId, locationId } = body;

        if (!accountId || !locationId) {
            return Response.json({ 
                error: 'Missing required parameters: accountId and locationId' 
            }, { status: 400 });
        }

        // Fetch reviews from Google My Business API
        const reviewsUrl = `https://mybusiness.googleapis.com/v4/accounts/${accountId}/locations/${locationId}/reviews?key=${apiKey}`;
        
        const response = await fetch(reviewsUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const errorData = await response.text();
            return Response.json({ 
                error: 'Failed to fetch reviews from Google',
                details: errorData
            }, { status: response.status });
        }

        const reviewsData = await response.json();

        return Response.json({
            success: true,
            reviews: reviewsData.reviews || [],
            totalReviewCount: reviewsData.totalReviewCount || 0,
            averageRating: reviewsData.averageRating || 0
        });

    } catch (error) {
        return Response.json({ 
            error: error.message,
            stack: error.stack 
        }, { status: 500 });
    }
});