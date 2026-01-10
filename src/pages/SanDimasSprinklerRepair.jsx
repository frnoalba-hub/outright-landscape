import React from 'react';
import IrrigationServicePage from '../components/irrigation/IrrigationServicePage';
import { getPageData } from '../components/irrigation/pageData';
import SEO from '../components/SEO';

export default function SanDimasSprinklerRepair() {
    const data = getPageData('San Dimas', 'sprinkler-repair');
    
    return (
        <>
            <SEO 
                title="Sprinkler Repair in San Dimas, CA | Fast Service | Outright Landscape"
                description="Expert sprinkler repair in San Dimas, CA. Fix leaks, valves, controllers & broken heads. Same-day service available. Call (626) 343-6028 for professional sprinkler system repair."
                canonical="https://outrightlandscape.com/san-dimas/sprinkler-repair"
                keywords="sprinkler repair san dimas, irrigation repair san dimas, sprinkler system repair, sprinkler valve repair, sprinkler leak repair"
            />
            <IrrigationServicePage city="San Dimas" service="sprinkler-repair" data={data} />
        </>
    );
}