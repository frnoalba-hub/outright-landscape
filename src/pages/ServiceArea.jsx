import React from 'react';
import LocationPage from '@/components/locations/LocationPage';

export default function ServiceArea() {
    const params = new URLSearchParams(window.location.search);
    const city = params.get('city');
    
    // If no city specified, we could redirect or show a "select a city" message
    if (!city) {
        return <div className="p-20 text-center">Please select a service area from the menu.</div>;
    }

    return <LocationPage cityKey={city} />;
}