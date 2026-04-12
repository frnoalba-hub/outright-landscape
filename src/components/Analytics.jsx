import { useEffect } from 'react';

const GTM_ID = 'GTM-P6G5DP8K';
const GOOGLE_ADS_ID = 'AW-10836591498';

function ensureGtagStub() {
    if (window.__outrightAnalyticsStubDone) return;
    window.__outrightAnalyticsStubDone = true;

    window.dataLayer = window.dataLayer || [];
    window.gtag =
        window.gtag ||
        function gtag() {
            window.dataLayer.push(arguments);
        };
    window.gtag('js', new Date());
    window.gtag('config', GOOGLE_ADS_ID);
}

export default function Analytics() {
    useEffect(() => {
        if (typeof window === 'undefined') return;
        if (document.getElementById('gtm-script')) return;

        ensureGtagStub();

        const init = () => {
            if (document.getElementById('gtm-script')) return;

            if (window.performance?.mark) {
                window.performance.mark('analytics-init-start');
            }

            const gtagScript = document.createElement('script');
            gtagScript.async = true;
            gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`;
            document.head.appendChild(gtagScript);

            const gtmBootstrap = document.createElement('script');
            gtmBootstrap.id = 'gtm-script';
            gtmBootstrap.textContent = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`;
            document.head.appendChild(gtmBootstrap);

            if (!document.getElementById('gtm-noscript')) {
                const noscript = document.createElement('noscript');
                noscript.id = 'gtm-noscript';
                noscript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}"
height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
                document.body.insertBefore(noscript, document.body.firstChild);
            }

            if (window.performance?.mark) {
                window.performance.mark('analytics-init-end');
                window.performance.measure('analytics-init', 'analytics-init-start', 'analytics-init-end');
            }
        };

        const useIdle = 'requestIdleCallback' in window;
        const idleHandle = useIdle
            ? window.requestIdleCallback(init, { timeout: 3000 })
            : window.setTimeout(init, 1000);

        return () => {
            if (useIdle) {
                window.cancelIdleCallback(idleHandle);
            } else {
                window.clearTimeout(idleHandle);
            }
        };
    }, []);

    return null;
}
