import React from 'react';
import IrrigationServicePage from '../components/irrigation/IrrigationServicePage';
import { getPageData } from '../components/irrigation/pageData';
import SEO from '../components/SEO';

export default function LaVerneSprinklerRepairClean() {
    const data = getPageData('La Verne', 'sprinkler-repair');
    
    return (
        <>
            <SEO 
                title="La Verne Sprinkler Repair | Fast Sprinkler System Repair CA"
                description="Expert sprinkler repair in La Verne, CA. Fix leaks, broken heads, valves & controllers. Same-day service available. Licensed C-27 contractor. Call (626) 343-6028."
                canonicalUrl="https://outrightlandscape.com/la-verne-sprinkler-repair"
                keywords="sprinkler repair la verne, sprinkler system repair la verne, sprinkler valve repair, sprinkler leak repair la verne, irrigation repair"
                ogImage="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/688d77e918e168a3b8c3aaa2/01c14d800_unnamed2-Copy.jpg"
            />
            <IrrigationServicePage city="La Verne" service="sprinkler-repair" data={data} />
        </>
    );
}