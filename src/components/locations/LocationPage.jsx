
import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import JsonLd from '@/components/JsonLd';

const locationsData = {
    covina: { name: "Covina", faqs: [] },
    'west-covina': { name: "West Covina", faqs: [] },
    glendora: { name: "Glendora", faqs: [] },
    azusa: { name: "Azusa", faqs: [] },
    pasadena: { name: "Pasadena", faqs: [] },
    'diamond-bar': { name: "Diamond Bar", faqs: [] },
    'charter-oak': { name: "Charter Oak", faqs: [] },
    'san-dimas': { name: "San Dimas", faqs: [] },
    'la-verne': { name: "La Verne", faqs: [] },
    walnut: { name: "Walnut", faqs: [] },
    'baldwin-park': { name: "Baldwin Park", faqs: [] },
    'el-monte': { name: "El Monte", faqs: [] },
    monrovia: { name: "Monrovia", faqs: [] },
    arcadia: { name: "Arcadia", faqs: [] },
    'temple-city': { name: "Temple City", faqs: [] },
    'rowland-heights': { name: "Rowland Heights", faqs: [] },
    pomona: { name: "Pomona", faqs: [] },
    claremont: { name: "Claremont", faqs: [] },
};

export default function LocationPage({ cityKey }) {
    const cityData = locationsData[cityKey];
    if (!cityData) {
        return <div>City not found</div>;
    }

    const { name } = cityData;
    const slug = name.toLowerCase().replace(/ /g, '-');

    const pageTitle = `${name} Landscaping & Hardscaping | Outright Landscape`;
    const metaDescription = `Licensed C-27 in ${name}. Pavers, turf, irrigation, design & installs. Free estimate: (626) 343-6028. CSLB #1073845.`;
    const canonicalUrl = `https://outrightlandscape.com/${slug}-landscaping`;

    return (
        <>
            <Head>
                <title>{pageTitle}</title>
                <meta name="description" content={metaDescription} />
                <link rel="canonical" href={canonicalUrl} />
                <meta property="og:title" content={pageTitle} />
                <meta property="og:description" content={metaDescription} />
                <meta property="og:url" content={canonicalUrl} />
                <meta property="og:image" content="https://outrightlandscape.com/og-image.jpg" /> {/* Replace with actual OG image */}
                <JsonLd city={name} />
            </Head>
            <div className="container mx-auto px-4 py-12">
                <header className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">Landscaping in {name}, CA</h1>
                    <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                        Your local, licensed C-27 landscape contractor (CSLB #1073845) specializing in pavers, turf, irrigation, and complete design/build services for beautiful, lasting outdoor spaces in {name}.
                    </p>
                    <a href="tel:626-343-6028">
                        <Button size="lg" className="mt-6 bg-green-600 hover:bg-green-700 text-white font-bold text-xl px-12 py-8 rounded-full shadow-2xl">
                           Free Estimate: (626) 343-6028
                        </Button>
                    </a>
                </header>

                <section id="services" className="mb-16">
                    <h2 className="text-3xl font-bold text-center mb-8">Our Core Services in {name}</h2>
                    <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                        <li className="bg-gray-50 p-6 rounded-lg shadow">Pavers & Hardscaping</li>
                        <li className="bg-gray-50 p-6 rounded-lg shadow">Turf & Sod Installation</li>
                        <li className="bg-gray-50 p-6 rounded-lg shadow">Irrigation & Sprinkler Systems</li>
                        <li className="bg-gray-50 p-6 rounded-lg shadow">Landscape Design & Build</li>
                        <li className="bg-gray-50 p-6 rounded-lg shadow">Yard Cleanup & Demolition</li>
                        <li className="bg-gray-50 p-6 rounded-lg shadow">Free Estimates</li>
                    </ul>
                </section>

                <section id="gallery" className="mb-16">
                     <h2 className="text-3xl font-bold text-center mb-8">Project Gallery in {name}</h2>
                     <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {/* Placeholder for images using next/image */}
                        <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center"><span className="text-gray-400">Project Image 1</span></div>
                        <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center"><span className="text-gray-400">Project Image 2</span></div>
                        <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center"><span className="text-gray-400">Project Image 3</span></div>
                     </div>
                </section>

                <section id="contact-info" className="grid md:grid-cols-2 gap-8 bg-gray-100 p-8 rounded-lg">
                    <div>
                        <h2 className="text-3xl font-bold mb-4">Contact Your {name} Experts</h2>
                        <div className="space-y-3">
                            <p><strong>Name:</strong> Outright Landscape</p>
                            <p><strong>Phone:</strong> <a href="tel:626-343-6028" className="text-green-600 hover:underline">(626) 343-6028</a></p>
                            <p><strong>Email:</strong> <a href="mailto:outrightlandscape@yahoo.com" className="text-green-600 hover:underline">outrightlandscape@yahoo.com</a></p>
                            <p><strong>Hours:</strong> Mon – Sat, 8:00 AM – 6:00 PM</p>
                            <p><strong>License:</strong> CSLB #1073845</p>
                        </div>
                    </div>
                    <div>
                        <div className="bg-gray-300 w-full h-80 rounded-lg flex items-center justify-center">
                            <p className="text-gray-500">Service Area Map for {name}</p>
                        </div>
                    </div>
                </section>
                
                 <section id="faq" className="mt-16">
                    <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
                    <div className="max-w-3xl mx-auto">
                        <p className="text-center text-gray-500">(FAQ content to be added here)</p>
                    </div>
                </section>
            </div>
        </>
    );
}
