Deno.serve(async (req) => {
    return Response.json({ message: "pong" });
});