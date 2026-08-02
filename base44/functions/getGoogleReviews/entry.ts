import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    createClientFromRequest(req);

    // Short excerpts from public profiles. Keep the source URL with every item.
    const reviews = [
      {
        starRating: 'FIVE',
        comment: 'Very organized and very helpful.',
        reviewer: { displayName: 'Nancy V.' },
        source: 'angi',
        sourceUrl: 'https://www.angi.com/companylist/us/ca/covina/outright-landscape-reviews-1.htm',
      },
      {
        starRating: 'FIVE',
        comment: 'Amazing job well done. Had my front yard redone to a low maintenance modern look I always wanted.',
        reviewer: { displayName: 'Randy L.' },
        source: 'angi',
        sourceUrl: 'https://www.angi.com/companylist/us/ca/covina/outright-landscape-reviews-1.htm',
      },
      {
        starRating: 'FIVE',
        comment: 'Very satisfied with the work from Outright Landscape.',
        reviewer: { displayName: 'Mr. Long' },
        source: 'houzz',
        sourceUrl: 'https://www.houzz.com/professionals/landscape-contractors/outright-landscape-pfvwus-pf~851831346',
      },
    ];

    return Response.json({
      success: true,
      reviews,
      totalReviewCount: reviews.length,
      averageRating: 5,
    });
  } catch (error) {
    console.error('getGoogleReviews error:', error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
});
