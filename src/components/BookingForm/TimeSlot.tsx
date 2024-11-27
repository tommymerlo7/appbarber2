import React from 'react';
import { Clock } from 'lucide-react';

interface TimeSlotProps {
  value: string;
  onChange: (value: string) => void;
  availableTimes: string[];
  selectedTime: string;
  disabled: boolean;
}

export default function TimeSlot({ value, onChange, availableTimes, selectedTime, disabled }: TimeSlotProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          Time
        </div>
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled || availableTimes.length === 0}
        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent disabled:bg-gray-100"
      >
        <option value="">Select a time</option>
        {availableTimes.map(time => (
          <option key={time} value={time}>
            {time.split(':')[0] > '12' 
              ? `${parseInt(time.split(':')[0]) - 12}:00 PM`
              : `${time} AM`}
          </option>
        ))}
      </select>
    </div>
  );
}