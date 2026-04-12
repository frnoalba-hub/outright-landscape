import { Wrench, Sprout, Droplets, Palette, Hammer, Leaf, HelpCircle } from 'lucide-react';

const SERVICE_OPTIONS = [
    { value: 'sprinkler_repair', label: 'Sprinkler Repair', icon: Wrench },
    { value: 'sprinkler_installation', label: 'Sprinkler Install', icon: Sprout },
    { value: 'drip_irrigation', label: 'Drip Irrigation', icon: Droplets },
    { value: 'landscape_design', label: 'Landscape Design', icon: Palette },
    { value: 'hardscaping', label: 'Hardscaping', icon: Hammer },
    { value: 'turf_installation', label: 'Turf / Sod', icon: Leaf },
    { value: 'general_consultation', label: 'General', icon: HelpCircle },
];

export default function ServiceTypeSelect({ selectedService, onSelectService }) {
    return (
        <div className="serviceTypeSelect">
            <span className="serviceTypeLabel text-xs font-semibold text-[#8a8478] uppercase tracking-wide mb-2.5 block">Service Type</span>
            <div className="serviceTypeGrid grid grid-cols-2 gap-2">
                {SERVICE_OPTIONS.map((svc) => {
                    const Icon = svc.icon;
                    const isSelected = selectedService === svc.value;
                    return (
                        <button
                            key={svc.value}
                            type="button"
                            onClick={() => onSelectService(svc.value)}
                            className={`serviceTypeBtn flex items-center gap-2 py-2.5 px-3 rounded-lg text-xs font-semibold transition-all duration-200 border text-left
                                ${isSelected
                                    ? 'bg-[#c45d2c] text-white border-[#c45d2c] shadow-md shadow-[#c45d2c]/20'
                                    : 'bg-[#242424] text-[#a09a90] border-[#333] hover:border-[#c45d2c]/50 hover:text-white'
                                }
                            `}
                        >
                            <Icon className={`w-3.5 h-3.5 flex-shrink-0 ${isSelected ? 'text-white' : 'text-[#6b6560]'}`} />
                            {svc.label}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}