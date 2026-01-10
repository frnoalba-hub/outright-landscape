import React from 'react';
import IrrigationServicePage from '../components/irrigation/IrrigationServicePage';
import { getPageData } from '../components/irrigation/pageData';
import SEO from '../components/SEO';

export default function LaVerneDripIrrigation() {
    const data = getPageData('La Verne', 'drip-irrigation');
    
    return (
        <>
            <SEO 
                title="Drip Irrigation Repair & Installation in La Verne | Outright Landscape"
                description="Professional drip irrigation repair in La Verne, CA. Fix clogs, leaks, pressure issues. Water-efficient drip systems. Call (626) 343-6028 for expert service."
                canonical="https://outrightlandscape.com/la-verne/drip-irrigation"
                keywords="drip irrigation repair, drip irrigation installation, irrigation repair la verne"
            />
            <IrrigationServicePage city="La Verne" service="drip-irrigation" data={data} />
        </>
    );
}