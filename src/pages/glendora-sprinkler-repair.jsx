import React from 'react';
import IrrigationServicePage from '../components/irrigation/IrrigationServicePage';
import { getPageData } from '../components/irrigation/pageData';
import SEO from '../components/SEO';

export default function GlendoraSprinklerRepairClean() {
    const data = getPageData('Glendora', 'sprinkler-repair');
    
    return (
        <>
            <SEO 
                title="Glendora Sprinkler Repair | Fast Sprinkler System Repair CA"
                description="Expert sprinkler repair in Glendora, CA. Fix leaks, broken heads, valves & controllers. Same-day service available. Licensed C-27 contractor. Call (626) 343-6028."
                canonicalUrl="https://outrightlandscape.com/glendora-sprinkler-repair"
                keywords="sprinkler repair glendora, sprinkler system repair glendora, sprinkler valve repair, sprinkler leak repair glendora, irrigation repair"
                ogImage="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/01c14d800_unnamed2-Copy.jpg"
            />
            <IrrigationServicePage city="Glendora" service="sprinkler-repair" data={data} />
        </>
    );
}