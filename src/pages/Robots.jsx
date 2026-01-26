import { useEffect } from 'react';

export default function Robots() {
  useEffect(() => {
    const robotsTxt = `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /private/

Sitemap: https://outrightlandscape.com/api/sitemapxml`;

    document.open();
    document.write(robotsTxt);
    document.close();
    document.contentType = 'text/plain';
  }, []);

  return null;
}