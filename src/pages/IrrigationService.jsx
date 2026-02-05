import React from 'react';
import { useLocation } from 'react-router-dom';
import IrrigationServicePage from '@/components/irrigation/IrrigationServicePage';
import { getPageData } from '@/components/irrigation/pageData';
import { ArrowRight } from 'lucide-react';

export default function IrrigationService() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const citySlug = searchParams.get('city');
    const service = searchParams.get('service');

    if (!citySlug || !service) {
        return (
            <div className="irrigationServiceNotFound min-h-screen bg-[#1a1a1a] pt-32 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-3xl font-bold text-white mb-4">Service Not Found</h1>
                    <p className="text-[#8a8478] mb-8">Please specify a city and service type.</p>
                    <a href="/irrigation" className="irrigationServiceNotFoundBtn inline-flex items-center gap-2 bg-[#c45d2c] hover:bg-[#a94e25] text-white font-semibold px-6 py-3 rounded-xl transition-all">
                        View All Irrigation Services <ArrowRight className="w-4 h-4" />
                    </a>
                </div>
            </div>
        );
    }

    const data = getPageData(citySlug, service);

    if (!data) {
        return (
            <div className="irrigationServiceNotAvailable min-h-screen bg-[#1a1a1a] pt-32 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-3xl font-bold text-white mb-4">Service Not Found</h1>
                    <p className="text-[#8a8478] mb-8">The requested service is not available.</p>
                    <a href="/irrigation" className="irrigationServiceNotAvailableBtn inline-flex items-center gap-2 bg-[#c45d2c] hover:bg-[#a94e25] text-white font-semibold px-6 py-3 rounded-xl transition-all">
                        View All Irrigation Services <ArrowRight className="w-4 h-4" />
                    </a>
                </div>
            </div>
        );
    }

    return <IrrigationServicePage city={citySlug} service={service} data={data} />;
}