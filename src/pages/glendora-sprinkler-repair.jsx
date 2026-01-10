import React from 'react';
import IrrigationServicePage from '../components/irrigation/IrrigationServicePage';
import { getPageData } from '../components/irrigation/pageData';
import SEO from '../components/SEO';

export default function GlendoraSprinklerRepairClean() {
    const data = getPageData('Glendora', 'sprinkler-repair');
    
    return (
        <>
            <SEO 
                title="Sprinkler Repair in Glendora, CA | Fast Service | Outright Landscape"
                description="Expert sprinkler repair in Glendora, CA. We fix leaks, valves, controllers & broken heads. Same-day service. Call (626) 343-6028 for professional sprinkler system repair."
                canonical="https://outrightlandscape.com/glendora-sprinkler-repair"
                keywords="sprinkler repair glendora, irrigation repair glendora, sprinkler system repair, sprinkler valve repair, sprinkler leak repair"
            />
            <IrrigationServicePage city="Glendora" service="sprinkler-repair" data={data} />
        </>
    );
}