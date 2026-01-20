import React, { useEffect } from 'react';

export default function Analytics() {
    const AW_ID = 'AW-10836591498';

    useEffect(() => {
        // Prevent duplicate injection
        if (document.getElementById('gtag-script')) return;

        // Inject Google tag (gtag.js)
        const script1 = document.createElement('script');
        script1.id = 'gtag-script';
        script1.async = true;
        script1.src = `https://www.googletagmanager.com/gtag/js?id=${AW_ID}`;
        document.head.appendChild(script1);

        // Initialize Data Layer and config
        const script2 = document.createElement('script');
        script2.innerHTML = `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${AW_ID}');
        `;
        document.head.appendChild(script2);
    }, []);

    return null;
}