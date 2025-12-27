import React, { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';

export default function Analytics() {
    const [gaId, setGaId] = useState(null);

    useEffect(() => {
        const initGA = async () => {
            try {
                // Fetch the Measurement ID from the "GA" secret
                const res = await base44.functions.invoke('getEnvConfig');
                const fetchedId = res.data?.gaMeasurementId;

                if (fetchedId && fetchedId.startsWith('G-')) {
                    setGaId(fetchedId);
                    
                    // Prevent duplicate injection
                    if (document.getElementById('ga-script')) return;

                    // Inject Google Analytics 4
                    const script1 = document.createElement('script');
                    script1.id = 'ga-script';
                    script1.async = true;
                    script1.src = `https://www.googletagmanager.com/gtag/js?id=${fetchedId}`;
                    document.head.appendChild(script1);

                    const script2 = document.createElement('script');
                    script2.innerHTML = `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', '${fetchedId}', {
                            page_path: window.location.pathname,
                            send_page_view: true
                        });
                    `;
                    document.head.appendChild(script2);
                    console.log("Analytics initialized with:", fetchedId);
                }
            } catch (error) {
                console.error("Failed to initialize analytics:", error);
            }
        };

        initGA();
    }, []);

    return null;
}