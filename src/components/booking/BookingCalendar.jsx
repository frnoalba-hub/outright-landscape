import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay, isBefore, startOfDay } from 'date-fns';

export default function BookingCalendar({ selectedDate, onSelectDate }) {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const today = startOfDay(new Date());

    const days = useMemo(() => {
        const monthStart = startOfMonth(currentMonth);
        const monthEnd = endOfMonth(monthStart);
        const calStart = startOfWeek(monthStart);
        const calEnd = endOfWeek(monthEnd);
        const daysList = [];
        let day = calStart;
        while (day <= calEnd) {
            daysList.push(day);
            day = addDays(day, 1);
        }
        return daysList;
    }, [currentMonth]);

    const isDisabled = (day) => {
        const dayOfWeek = day.getDay();
        return isBefore(day, today) || dayOfWeek === 0; // Disable past dates & Sundays
    };

    return (
        <div className="bookingCalendar">
            {/* Month navigation */}
            <div className="bookingCalendarNav flex items-center justify-between mb-3">
                <Button variant="ghost" size="icon" onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                    className="calNavPrev h-8 w-8 text-[#a09a90] hover:text-white hover:bg-[#333]">
                    <ChevronLeft className="w-4 h-4" />
                </Button>
                <span className="calMonthLabel text-sm font-semibold text-white">
                    {format(currentMonth, 'MMMM yyyy')}
                </span>
                <Button variant="ghost" size="icon" onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                    className="calNavNext h-8 w-8 text-[#a09a90] hover:text-white hover:bg-[#333]">
                    <ChevronRight className="w-4 h-4" />
                </Button>
            </div>

            {/* Weekday headers */}
            <div className="calWeekdays grid grid-cols-7 gap-1 mb-1">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => (
                    <div key={d} className="calWeekdayLabel text-center text-[10px] font-semibold text-[#6b6560] uppercase py-1">{d}</div>
                ))}
            </div>

            {/* Day grid */}
            <div className="calDayGrid grid grid-cols-7 gap-1">
                {days.map((day, idx) => {
                    const disabled = isDisabled(day);
                    const isSelected = selectedDate && isSameDay(day, selectedDate);
                    const isCurrentMonth = isSameMonth(day, currentMonth);
                    const isToday = isSameDay(day, today);

                    return (
                        <button
                            key={idx}
                            type="button"
                            disabled={disabled || !isCurrentMonth}
                            onClick={() => onSelectDate(day)}
                            className={`calDayBtn relative h-9 w-full rounded-lg text-xs font-medium transition-all duration-200
                                ${!isCurrentMonth ? 'text-[#333] cursor-default' : ''}
                                ${disabled && isCurrentMonth ? 'text-[#444] cursor-not-allowed' : ''}
                                ${!disabled && isCurrentMonth && !isSelected ? 'text-[#a09a90] hover:bg-[#333] hover:text-white cursor-pointer' : ''}
                                ${isSelected ? 'bg-[#c45d2c] text-white shadow-md shadow-[#c45d2c]/30 scale-105' : ''}
                                ${isToday && !isSelected ? 'ring-1 ring-[#b8945a]/50 text-[#b8945a]' : ''}
                            `}
                        >
                            {format(day, 'd')}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}