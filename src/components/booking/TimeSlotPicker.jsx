import React from 'react';
import { Clock } from 'lucide-react';

const ALL_TIME_SLOTS = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM',
];

// Convert time string like "9:00 AM" to minutes since midnight
function toMinutes(timeStr) {
    const [time, period] = timeStr.split(' ');
    let [hours, mins] = time.split(':').map(Number);
    if (period === 'PM' && hours !== 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;
    return hours * 60 + mins;
}

// A slot is unavailable if it's booked OR within 2 hours of any booked slot
function isUnavailable(slot, bookedSlots) {
    const slotMins = toMinutes(slot);
    return bookedSlots.some(booked => {
        const bookedMins = toMinutes(booked);
        return Math.abs(slotMins - bookedMins) < 120;
    });
}

export default function TimeSlotPicker({ selectedSlot, onSelectSlot, bookedSlots = [] }) {
    return (
        <div className="timeSlotPicker">
            <div className="timeSlotLabel flex items-center gap-1.5 mb-2.5">
                <Clock className="w-3.5 h-3.5 text-[#b8945a]" />
                <span className="text-xs font-semibold text-[#8a8478] uppercase tracking-wide">Select Time</span>
            </div>
            <div className="timeSlotGrid grid grid-cols-2 gap-2">
                {ALL_TIME_SLOTS.map((slot) => {
                    const unavailable = isUnavailable(slot, bookedSlots);
                    const selected = selectedSlot === slot;
                    return (
                        <button
                            key={slot}
                            type="button"
                            disabled={unavailable}
                            onClick={() => !unavailable && onSelectSlot(slot)}
                            className={`timeSlotBtn py-2.5 px-3 rounded-lg text-xs font-semibold transition-all duration-200 border
                                ${unavailable
                                    ? 'bg-[#1a1a1a] text-[#444] border-[#2a2a2a] cursor-not-allowed line-through'
                                    : selected
                                        ? 'bg-[#c45d2c] text-white border-[#c45d2c] shadow-md shadow-[#c45d2c]/20 scale-[1.02]'
                                        : 'bg-[#242424] text-[#a09a90] border-[#333] hover:border-[#c45d2c]/50 hover:text-white'
                                }
                            `}
                        >
                            {slot}{unavailable ? ' — Taken' : ''}
                        </button>
                    );
                })}
            </div>
            {bookedSlots.length > 0 && (
                <p className="text-[#6b6560] text-xs mt-2">Crossed-out slots are unavailable for this date.</p>
            )}
        </div>
    );
}