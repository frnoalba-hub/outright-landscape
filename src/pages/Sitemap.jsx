import { useEffect } from 'react';
import { base44 } from '@/api/base44Client';

export default function Sitemap() {
  useEffect(() => {
    const generateSitemap = async () => {
      const locations = await base44.entities.Location.list(null, 100);
      
      const pages = [
        { url: '', priority: '1.0', changefreq: 'weekly' },
        { url: 'Irrigation', priority: '0.9', changefreq: 'weekly' },
        ...locations.map(city => ({
          url: city.slug,
          priority: city.slug === 'covina-landscaping' || city.slug === 'san-gabriel-landscaping' ? '0.9' : '0.8',
          changefreq: 'weekly'
        })),
        // Alternate Covina URL for Google Ads
        { url: 'covina-landscape', priority: '0.9', changefreq: 'weekly' },
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
    };

    generateSitemap();
  }, []);

  return null;
}