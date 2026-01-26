import React from 'react';
import { useLocation } from 'react-router-dom';
import IrrigationServicePage from '@/components/irrigation/IrrigationServicePage';
import { getPageData } from '@/components/irrigation/pageData';

export default function IrrigationService() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    
    // Extract city and service from URL params
    // Example: ?city=arcadia&service=drip-irrigation
    const citySlug = searchParams.get('city');
    const service = searchParams.get('service');

    if (!citySlug || !service) {
        return (
            <div className="min-h-screen bg-gray-50 pt-24 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Service Not Found</h1>
                    <p className="text-gray-600 mb-8">
                        Please specify a city and service type.
                    </p>
                    <a 
                        href="/irrigation" 
                        className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg"
                    >
                        View All Irrigation Services
                    </a>
                </div>
            </div>
        );
    }

    const data = getPageData(citySlug, service);

    if (!data) {
        return (
            <div className="min-h-screen bg-gray-50 pt-24 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Service Not Found</h1>
                    <p className="text-gray-600 mb-8">
                        The requested service is not available.
                    </p>
                    <a 
                        href="/irrigation" 
                        className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg"
                    >
                        View All Irrigation Services
                    </a>
                </div>
            </div>
        );
    }

    return <IrrigationServicePage city={citySlug} service={service} data={data} />;
}