Deno.serve(() => {
  const today = new Date().toISOString().split('T')[0];
  
  const cities = [
    'arcadia', 'azusa', 'baldwin-park', 'charter-oak', 'claremont', 'covina',
    'diamond-bar', 'duarte', 'el-monte', 'glendora', 'la-verne', 'monrovia',
    'pasadena', 'pomona', 'rowland-heights', 'san-dimas', 'san-gabriel',
    'temple-city', 'walnut', 'west-covina'
  ];
  
  const services = ['drip-irrigation', 'irrigation-repair', 'sprinkler-repair', 'sprinkler-valves'];
  
  let urls = `  <url>
    <loc>https://outrightlandscape.com/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://outrightlandscape.com/irrigation</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>\n`;
  
  cities.forEach(city => {
    urls += `  <url>
    <loc>https://outrightlandscape.com/${city}-landscaping</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>\n`;
    
    services.forEach(service => {
      urls += `  <url>
    <loc>https://outrightlandscape.com/${city}-${service}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>\n`;
    });
  });
  
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}</urlset>`, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600'
    }
  });
});