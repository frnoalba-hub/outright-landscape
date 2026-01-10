import React from 'react';
import IrrigationServicePage from '../components/irrigation/IrrigationServicePage';
import { getPageData } from '../components/irrigation/pageData';
import SEO from '../components/SEO';

export default function LaVerneSprinklerValvesClean() {
    const data = getPageData('La Verne', 'sprinkler-valves');
    
    return (
        <>
            <SEO 
                title="Sprinkler Valve Replacement & Repair in La Verne | Outright Landscape"
                description="Expert sprinkler valve replacement and irrigation valve repair in La Verne, CA. Fix stuck valves, leaks, solenoids. Call (626) 343-6028 for professional valve service."
                canonical="https://outrightlandscape.com/la-verne-sprinkler-valves"
                keywords="sprinkler valve replacement, sprinkler valve repair, irrigation valve repair"
            />
            <IrrigationServicePage city="La Verne" service="sprinkler-valves" data={data} />
        </>
    );
}