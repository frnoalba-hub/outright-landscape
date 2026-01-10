import React from 'react';
import IrrigationServicePage from '../components/irrigation/IrrigationServicePage';
import { getPageData } from '../components/irrigation/pageData';
import SEO from '../components/SEO';

export default function LaVerneSprinklerRepairClean() {
    const data = getPageData('La Verne', 'sprinkler-repair');
    
    return (
        <>
            <SEO 
                title="Sprinkler Repair in La Verne, CA | Fast Service | Outright Landscape"
                description="Expert sprinkler repair in La Verne, CA. Fix leaks, valves, controllers & broken heads. Same-day service available. Call (626) 343-6028 for professional sprinkler system repair."
                canonical="https://outrightlandscape.com/la-verne-sprinkler-repair"
                keywords="sprinkler repair la verne, irrigation repair la verne, sprinkler system repair, sprinkler valve repair, sprinkler leak repair"
            />
            <IrrigationServicePage city="La Verne" service="sprinkler-repair" data={data} />
        </>
    );
}