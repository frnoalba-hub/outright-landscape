import React, { useEffect } from 'react';

export default function Analytics() {
    const GTM_ID = 'GTM-P6G5DP8K';
    const GOOGLE_ADS_ID = 'AW-10836591498';

    useEffect(() => {
        // Prevent duplicate injection
        if (document.getElementById('gtm-script')) return;

        // 1. Inject Google Ads Global Site Tag
        const gtagScript = document.createElement('script');
        gtagScript.async = true;
        gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`;
        document.head.appendChild(gtagScript);

        const gtagConfig = document.createElement('script');
        gtagConfig.innerHTML = `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GOOGLE_ADS_ID}');
        `;
        document.head.appendChild(gtagConfig);

        // 2. Inject GTM script into the <head>
        const script = document.createElement('script');
        script.id = 'gtm-script';
        script.innerHTML = `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
        `;
        document.head.appendChild(script);

        // 3. Inject GTM noscript (iframe) into the <body> for fallback
        const noscript = document.createElement('noscript');
        noscript.innerHTML = `
            <iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}"
            height="0" width="0" style="display:none;visibility:hidden"></iframe>
        `;
        document.body.insertBefore(noscript, document.body.firstChild);
    }, []);

    return null;
}