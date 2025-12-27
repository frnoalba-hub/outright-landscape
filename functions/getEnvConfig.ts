Deno.serve(async (req) => {
    // Return safe public configuration
    return Response.json({
        // The user named the secret "GA" which likely contains the Measurement ID (G-XXXXX)
        gaMeasurementId: Deno.env.get("GA") || "" 
    });
});