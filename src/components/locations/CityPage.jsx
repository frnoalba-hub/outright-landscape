import LocationPage from './LocationPage';

// This is a wrapper component that uses the updated LocationPage
// It takes city-specific data as a prop.

export default function CityPage({ cityData }) {
    const { name } = cityData;
    const cityKey = name.toLowerCase().replace(/ /g, '-');
    
    return <LocationPage cityKey={cityKey} />;
}