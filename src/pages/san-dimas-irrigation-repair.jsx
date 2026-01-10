import React from 'react';
import IrrigationServicePage from '../components/irrigation/IrrigationServicePage';
import { getPageData } from '../components/irrigation/pageData';
import SEO from '../components/SEO';

export default function SanDimasIrrigationRepairClean() {
    const data = getPageData('San Dimas', 'irrigation-repair');
    
    return (
        <>
            <SEO 
                title="Irrigation Repair in San Dimas, CA | Licensed C-27 | Outright Landscape"
                description="Professional irrigation repair in San Dimas, CA. Valve repair, leak detection, controller service. Fast response. Call (626) 343-6028 for expert irrigation system repair."
                canonical="https://outrightlandscape.com/san-dimas-irrigation-repair"
                keywords="irrigation repair san dimas, irrigation valve repair, drip irrigation repair, sprinkler system repair"
            />
            <IrrigationServicePage city="San Dimas" service="irrigation-repair" data={data} />
        </>
    );
}