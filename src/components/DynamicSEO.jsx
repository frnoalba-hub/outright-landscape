import { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import SEO from './SEO';

export default function DynamicSEO({ pagePath, fallbackTitle, fallbackDescription, fallbackKeywords, canonicalUrl, ogImage }) {
    const [seoData, setSeoData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadSEO() {
            try {
                const results = await base44.entities.PageSEO.filter({ page_path: pagePath });
                if (results.length > 0) {
                    setSeoData(results[0]);
                }
            } catch (error) {
                console.error('Failed to load SEO data:', error);
            } finally {
                setLoading(false);
            }
        }
        
        if (pagePath) {
            loadSEO();
        } else {
            setLoading(false);
        }
    }, [pagePath]);

    if (loading) {
        return null;
    }

    return (
        <SEO
            title={seoData?.meta_title || fallbackTitle}
            description={seoData?.meta_description || fallbackDescription}
            keywords={seoData?.keywords?.join(', ') || fallbackKeywords}
            canonicalUrl={canonicalUrl}
            ogImage={ogImage}
        />
    );
}