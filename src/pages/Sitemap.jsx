import { useEffect } from 'react';
import { locations } from '@/components/locations/data';

export default function Sitemap() {
  useEffect(() => {
    const pages = [
      { url: '', priority: '1.0', changefreq: 'weekly' },
      ...locations.map(city => ({
        url: `${city.slug}-landscaping`,
        priority: city.slug === 'covina' || city.slug === 'san-gabriel-valley' ? '0.9' : '0.8',
        changefreq: 'weekly'
      }))
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