import React from 'react';
import IrrigationServicePage from '../components/irrigation/IrrigationServicePage';
import { getPageData } from '../components/irrigation/pageData';
import SEO from '../components/SEO';

export default function SanDimasDripIrrigation() {
    const data = getPageData('San Dimas', 'drip-irrigation');
    
    return (
        <>
            <SEO 
                title="Drip Irrigation Repair & Installation in San Dimas | Outright Landscape"
                description="Professional drip irrigation repair in San Dimas, CA. Fix clogs, leaks, pressure issues. Water-efficient drip systems. Call (626) 343-6028 for expert service."
                canonical="https://outrightlandscape.com/san-dimas/drip-irrigation"
                keywords="drip irrigation repair, drip irrigation installation, irrigation repair san dimas"
            />
            <IrrigationServicePage city="San Dimas" service="drip-irrigation" data={data} />
        </>
    );
}