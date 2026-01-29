import { useEffect } from 'react';

export default function ScrollDepthTracker() {
    useEffect(() => {
        const trackedDepths = new Set();
        const depths = [25, 50, 75, 90, 100];

        const handleScroll = () => {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const scrollPercentage = Math.round((scrollTop / (documentHeight - windowHeight)) * 100);

            depths.forEach(depth => {
                if (scrollPercentage >= depth && !trackedDepths.has(depth)) {
                    trackedDepths.add(depth);
                    
                    if (window.dataLayer) {
                        window.dataLayer.push({
                            event: 'scroll_depth',
                            event_category: 'engagement',
                            event_label: `${depth}%`,
                            scroll_depth: depth,
                            page_location: window.location.pathname
                        });
                    }
                    
                    if (window.gtag) {
                        window.gtag('event', 'scroll', {
                            event_category: 'engagement',
                            event_label: `${depth}%`,
                            value: depth
                        });
                    }
                }
            });
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return null;
}