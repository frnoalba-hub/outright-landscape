import React from 'react';
import IrrigationServicePage from '../components/irrigation/IrrigationServicePage';
import { getPageData } from '../components/irrigation/pageData';
import SEO from '../components/SEO';

export default function GlendoraDripIrrigationClean() {
    const data = getPageData('Glendora', 'drip-irrigation');
    
    return (
        <>
            <SEO 
                title="Drip Irrigation Repair & Installation in Glendora | Outright Landscape"
                description="Professional drip irrigation repair in Glendora, CA. Fix clogs, leaks, pressure issues. Water-efficient drip systems. Call (626) 343-6028 for expert service."
                canonical="https://outrightlandscape.com/glendora-drip-irrigation"
                keywords="drip irrigation repair, drip irrigation installation, irrigation repair glendora"
            />
            <IrrigationServicePage city="Glendora" service="drip-irrigation" data={data} />
        </>
    );
}