Deno.serve((req) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    return new Response('Method Not Allowed', {
      status: 405,
      headers: { Allow: 'GET, HEAD' },
    });
  }

  const today = new Date().toISOString().split('T')[0];
  
  const cities = [
    'arcadia', 'azusa', 'baldwin-park', 'charter-oak', 'claremont', 'covina',
    'diamond-bar', 'duarte', 'el-monte', 'glendora', 'la-verne', 'monrovia',
    'pasadena', 'pomona', 'rowland-heights', 'san-dimas', 'san-gabriel',
    'temple-city', 'walnut', 'west-covina'
  ];
  
  let urls = `  <url>
    <loc>https://outrightlandscape.com/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://outrightlandscape.com/about</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>https://outrightlandscape.com/contact</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://outrightlandscape.com/irrigation</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://outrightlandscape.com/hardscape</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://outrightlandscape.com/blog</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://outrightlandscape.com/privacy-policy</loc>
    <lastmod>${today}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>\n`;
  
  cities.forEach(city => {
    urls += `  <url>
    <loc>https://outrightlandscape.com/${city}-landscaping</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://outrightlandscape.com/${city}-hardscape</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://outrightlandscape.com/${city}-sprinkler-repair-installation</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>\n`;
  });

  // Service hubs that do not duplicate the primary hardscape or irrigation pages.
  const serviceHubs = ['landscaping', 'outdoor-living'];
  serviceHubs.forEach(slug => {
    urls += `  <url>
    <loc>https://outrightlandscape.com/s/${slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>\n`;
  });

  // Buyer guides
  const buyerGuides = [
    'pavers-vs-stamped-concrete',
    'best-sod-san-gabriel-valley',
    'sprinkler-repair-vs-replacement',
    'landscaping-cost-san-gabriel-valley',
    'hiring-licensed-landscape-contractor',
  ];
  buyerGuides.forEach(slug => {
    urls += `  <url>
    <loc>https://outrightlandscape.com/guides/${slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>\n`;
  });

  // Blog posts (static + add more slugs as needed)
  const blogSlugs = ['complete-guide-residential-commercial-irrigation-san-gabriel-valley'];
  blogSlugs.forEach(slug => {
    urls += `  <url>
    <loc>https://outrightlandscape.com/blog/${slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>\n`;
  });
  
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}</urlset>`;

  return new Response(req.method === 'HEAD' ? null : xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
      'X-Content-Type-Options': 'nosniff'
    }
  });
});
