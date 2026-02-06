import React from 'react';
import { Clock } from 'lucide-react';

const TIME_SLOTS = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM',
];

export default function TimeSlotPicker({ selectedSlot, onSelectSlot }) {
    return (
        <div className="timeSlotPicker">
            <div className="timeSlotLabel flex items-center gap-1.5 mb-2.5">
                <Clock className="w-3.5 h-3.5 text-[#b8945a]" />
                <span className="text-xs font-semibold text-[#8a8478] uppercase tracking-wide">Select Time</span>
            </div>
            <div className="timeSlotGrid grid grid-cols-2 gap-2">
                {TIME_SLOTS.map((slot) => (
                    <button
                        key={slot}
                        type="button"
                        onClick={() => onSelectSlot(slot)}
                        className={`timeSlotBtn py-2.5 px-3 rounded-lg text-xs font-semibold transition-all duration-200 border
                            ${selectedSlot === slot
                                ? 'bg-[#c45d2c] text-white border-[#c45d2c] shadow-md shadow-[#c45d2c]/20 scale-[1.02]'
                                : 'bg-[#242424] text-[#a09a90] border-[#333] hover:border-[#c45d2c]/50 hover:text-white'
                            }
                        `}
                    >
                        {slot}
                    </button>
                ))}
            </div>
        </div>
    );
}