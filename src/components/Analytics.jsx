import React, { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';

export default function Analytics() {
    // We'll use the ID directly from your screenshot to guarantee it works
    const GA_ID = 'G-4EK42ELB3T';

    useEffect(() => {
        // Prevent duplicate injection
        if (document.getElementById('ga-script')) return;

        console.log("Initializing Analytics with ID:", GA_ID);

        // Inject Google Analytics 4 Script
        const script1 = document.createElement('script');
        script1.id = 'ga-script';
        script1.async = true;
        script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
        document.head.appendChild(script1);

        // Initialize Data Layer
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
    }, []);

    return null;
}