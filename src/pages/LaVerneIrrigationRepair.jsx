import React from 'react';
import IrrigationServicePage from '../components/irrigation/IrrigationServicePage';
import { getPageData } from '../components/irrigation/pageData';
import SEO from '../components/SEO';

export default function LaVerneIrrigationRepair() {
    const data = getPageData('La Verne', 'irrigation-repair');
    
    return (
        <>
            <SEO 
                title="Irrigation Repair in La Verne, CA | Licensed C-27 | Outright Landscape"
                description="Professional irrigation repair in La Verne, CA. Valve repair, leak detection, controller service. Fast response. Call (626) 343-6028 for expert irrigation system repair."
                canonical="https://outrightlandscape.com/la-verne/irrigation-repair"
                keywords="irrigation repair la verne, irrigation valve repair, drip irrigation repair, sprinkler system repair"
            />
            <IrrigationServicePage city="La Verne" service="irrigation-repair" data={data} />
        </>
    );
}