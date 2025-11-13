import { useEffect } from 'react';

export default function Sitemap() {
  useEffect(() => {
    const pages = [
      { url: '', priority: '1.0', changefreq: 'weekly' },
      { url: 'covina-landscaping', priority: '0.9', changefreq: 'weekly' },
      { url: 'west-covina-landscaping', priority: '0.9', changefreq: 'weekly' },
      { url: 'glendora-landscaping', priority: '0.9', changefreq: 'weekly' },
      { url: 'san-dimas-landscaping', priority: '0.9', changefreq: 'weekly' },
      { url: 'pasadena-landscaping', priority: '0.9', changefreq: 'weekly' },
      { url: 'azusa-landscaping', priority: '0.9', changefreq: 'weekly' },
      { url: 'diamond-bar-landscaping', priority: '0.9', changefreq: 'weekly' },
      { url: 'la-verne-landscaping', priority: '0.9', changefreq: 'weekly' },
      { url: 'walnut-landscaping', priority: '0.9', changefreq: 'weekly' },
      { url: 'charter-oak-landscaping', priority: '0.8', changefreq: 'weekly' },
      { url: 'baldwin-park-landscaping', priority: '0.8', changefreq: 'weekly' },
      { url: 'monrovia-landscaping', priority: '0.8', changefreq: 'weekly' },
      { url: 'arcadia-landscaping', priority: '0.8', changefreq: 'weekly' },
      { url: 'temple-city-landscaping', priority: '0.8', changefreq: 'weekly' },
      { url: 'rowland-heights-landscaping', priority: '0.8', changefreq: 'weekly' },
      { url: 'pomona-landscaping', priority: '0.8', changefreq: 'weekly' },
      { url: 'san-gabriel-valley-landscaping', priority: '0.9', changefreq: 'weekly' },
      { url: 'duarte-landscaping', priority: '0.8', changefreq: 'weekly' },
      { url: 'claremont-landscaping', priority: '0.8', changefreq: 'weekly' },
      { url: 'el-monte-landscaping', priority: '0.8', changefreq: 'weekly' },
    ];

    const baseUrl = 'https://outrightlandscape.com';
    const today = new Date().toISOString().split('T')[0];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url>
    <loc>${baseUrl}/${page.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

    // Set content type and output XML
    document.open();
    document.write(xml);
    document.close();
    document.contentType = 'application/xml';
  }, []);

  return null;
}