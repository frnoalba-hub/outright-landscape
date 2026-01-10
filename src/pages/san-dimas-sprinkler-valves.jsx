import React from 'react';
import IrrigationServicePage from '../components/irrigation/IrrigationServicePage';
import { getPageData } from '../components/irrigation/pageData';
import SEO from '../components/SEO';

export default function SanDimasSprinklerValvesClean() {
    const data = getPageData('San Dimas', 'sprinkler-valves');
    
    return (
        <>
            <SEO 
                title="Sprinkler Valve Replacement & Repair in San Dimas | Outright Landscape"
                description="Expert sprinkler valve replacement and irrigation valve repair in San Dimas, CA. Fix stuck valves, leaks, solenoids. Call (626) 343-6028 for professional valve service."
                canonical="https://outrightlandscape.com/san-dimas-sprinkler-valves"
                keywords="sprinkler valve replacement, sprinkler valve repair, irrigation valve repair"
            />
            <IrrigationServicePage city="San Dimas" service="sprinkler-valves" data={data} />
        </>
    );
}