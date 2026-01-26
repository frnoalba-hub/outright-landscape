Deno.serve(async (req) => {
  try {
    const pages = [
      { url: '', priority: '1.0', changefreq: 'weekly' },
      { url: 'Irrigation', priority: '0.9', changefreq: 'weekly' },
      // City landing pages
      { url: 'covina-landscaping', priority: '0.9', changefreq: 'weekly' },
      { url: 'covina-landscape', priority: '0.9', changefreq: 'weekly' },
      { url: 'san-gabriel-landscaping', priority: '0.9', changefreq: 'weekly' },
      { url: 'glendora-landscaping', priority: '0.8', changefreq: 'weekly' },
      { url: 'san-dimas-landscaping', priority: '0.8', changefreq: 'weekly' },
      { url: 'azusa-landscaping', priority: '0.8', changefreq: 'weekly' },
      { url: 'baldwin-park-landscaping', priority: '0.8', changefreq: 'weekly' },
      { url: 'charter-oak-landscaping', priority: '0.8', changefreq: 'weekly' },
      { url: 'claremont-landscaping', priority: '0.8', changefreq: 'weekly' },
      { url: 'diamond-bar-landscaping', priority: '0.8', changefreq: 'weekly' },
      { url: 'duarte-landscaping', priority: '0.8', changefreq: 'weekly' },
      { url: 'el-monte-landscaping', priority: '0.8', changefreq: 'weekly' },
      { url: 'la-verne-landscaping', priority: '0.8', changefreq: 'weekly' },
      { url: 'monrovia-landscaping', priority: '0.8', changefreq: 'weekly' },
      { url: 'pasadena-landscaping', priority: '0.8', changefreq: 'weekly' },
      { url: 'pomona-landscaping', priority: '0.8', changefreq: 'weekly' },
      { url: 'rowland-heights-landscaping', priority: '0.8', changefreq: 'weekly' },
      { url: 'temple-city-landscaping', priority: '0.8', changefreq: 'weekly' },
      { url: 'walnut-landscaping', priority: '0.8', changefreq: 'weekly' },
      { url: 'west-covina-landscaping', priority: '0.8', changefreq: 'weekly' },
      // Irrigation service pages
      { url: 'glendora-sprinkler-repair', priority: '0.8', changefreq: 'weekly' },
      { url: 'glendora-irrigation-repair', priority: '0.8', changefreq: 'weekly' },
      { url: 'glendora-sprinkler-valves', priority: '0.8', changefreq: 'weekly' },
      { url: 'glendora-drip-irrigation', priority: '0.8', changefreq: 'weekly' },
      { url: 'la-verne-sprinkler-repair', priority: '0.8', changefreq: 'weekly' },
      { url: 'la-verne-irrigation-repair', priority: '0.8', changefreq: 'weekly' },
      { url: 'la-verne-sprinkler-valves', priority: '0.8', changefreq: 'weekly' },
      { url: 'la-verne-drip-irrigation', priority: '0.8', changefreq: 'weekly' },
      { url: 'san-dimas-sprinkler-repair', priority: '0.8', changefreq: 'weekly' },
      { url: 'san-dimas-irrigation-repair', priority: '0.8', changefreq: 'weekly' },
      { url: 'san-dimas-sprinkler-valves', priority: '0.8', changefreq: 'weekly' },
      { url: 'san-dimas-drip-irrigation', priority: '0.8', changefreq: 'weekly' }
    ];

    const { origin } = new URL(req.url);
    const today = new Date().toISOString().split('T')[0];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n` +
      `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
      pages.map(p => [
        '  <url>',
        `    <loc>${origin}/${p.url}</loc>`,
        `    <lastmod>${today}</lastmod>`,
        `    <changefreq>${p.changefreq}</changefreq>`,
        `    <priority>${p.priority}</priority>`,
        '  </url>'
      ].join('\n')).join('\n') +
      `\n</urlset>`;

    return new Response(xml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600'
      }
    });
  } catch (err) {
    return Response.json({ error: err?.message || 'sitemap generation failed' }, { status: 500 });
  }
});