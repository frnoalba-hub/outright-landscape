import { useEffect } from 'react';

export default function Robots() {
  useEffect(() => {
    const robotsTxt = `User-agent: *
Allow: /
Sitemap: https://outrightlandscape.com/sitemap

# Crawl-delay
Crawl-delay: 1

# Disallow admin paths (if any)
Disallow: /admin/
Disallow: /dashboard/

# Allow all other pages
Allow: /covina-landscaping
Allow: /west-covina-landscaping
Allow: /glendora-landscaping
Allow: /san-dimas-landscaping
Allow: /pasadena-landscaping
Allow: /azusa-landscaping
Allow: /diamond-bar-landscaping
Allow: /la-verne-landscaping
Allow: /walnut-landscaping
Allow: /san-gabriel-valley-landscaping`;

    document.open();
    document.write(robotsTxt);
    document.close();
    document.contentType = 'text/plain';
  }, []);

  return null;
}