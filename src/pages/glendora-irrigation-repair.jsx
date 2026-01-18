import React from 'react';
import IrrigationServicePage from '../components/irrigation/IrrigationServicePage';
import { getPageData } from '../components/irrigation/pageData';
import SEO from '../components/SEO';

export default function GlendoraIrrigationRepairClean() {
    const data = getPageData('Glendora', 'irrigation-repair');
    
    return (
        <>
            <SEO 
                title="Glendora Irrigation Repair | Valve & System Repair CA"
                description="Professional irrigation repair in Glendora, CA. Valve replacement, leak detection, drip system service. Licensed C-27 contractor. Fast response. Call (626) 343-6028."
                canonicalUrl="https://outrightlandscape.com/glendora-irrigation-repair"
                keywords="irrigation repair glendora, irrigation valve repair glendora, drip irrigation repair, irrigation system repair glendora"
                ogImage="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/c734704d4_IMG_4815-Copy.jpg"
            />
            <IrrigationServicePage city="Glendora" service="irrigation-repair" data={data} />
        </>
    );
}