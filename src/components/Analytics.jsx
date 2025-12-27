import React, { useEffect } from 'react';

// TODO: Replace these with your actual IDs
const GTM_ID = 'GTM-XXXXXXX'; 
const GA_ID = 'G-XXXXXXXXXX';

export default function Analytics() {
    useEffect(() => {
        // Google Tag Manager
        if (GTM_ID && GTM_ID !== 'GTM-XXXXXXX') {
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer',GTM_ID);
        }

        // Google Analytics 4
        if (GA_ID && GA_ID !== 'G-XXXXXXXXXX') {
            const script1 = document.createElement('script');
            script1.async = true;
            script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
            document.head.appendChild(script1);

            const script2 = document.createElement('script');
            script2.innerHTML = `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', {
                    page_path: window.location.pathname,
                    send_page_view: true
                });
            `;
            document.head.appendChild(script2);
        }
    }, []);

    return (
        <>
            {/* GTM NoScript */}
            {GTM_ID && GTM_ID !== 'GTM-XXXXXXX' && (
                <noscript>
                    <iframe 
                        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
                        height="0" 
                        width="0" 
                        style={{display: 'none', visibility: 'hidden'}}
                    />
                </noscript>
            )}
        </>
    );
}