import React from 'react';
import IrrigationServicePage from '../components/irrigation/IrrigationServicePage';
import { getPageData } from '../components/irrigation/pageData';
import SEO from '../components/SEO';

export default function GlendoraIrrigationRepair() {
    const data = getPageData('Glendora', 'irrigation-repair');
    
    return (
        <>
            <SEO 
                title="Irrigation Repair in Glendora, CA | Licensed C-27 | Outright Landscape"
                description="Professional irrigation repair in Glendora, CA. Valve repair, leak detection, controller service. Fast response. Call (626) 343-6028 for expert irrigation system repair."
                canonical="https://outrightlandscape.com/glendora/irrigation-repair"
                keywords="irrigation repair glendora, irrigation valve repair, drip irrigation repair, sprinkler system repair"
            />
            <IrrigationServicePage city="Glendora" service="irrigation-repair" data={data} />
        </>
    );
}