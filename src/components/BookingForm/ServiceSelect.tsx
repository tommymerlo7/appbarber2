import React from 'react';
import { Scissors } from 'lucide-react';
import { services } from '../../data/services';

interface ServiceSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export default function ServiceSelect({ value, onChange }: ServiceSelectProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        <div className="flex items-center gap-2">
          <Scissors className="h-4 w-4" />
          Service
        </div>
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent"
      >
        <option value="">Select a service</option>
        {services.map(service => (
          <option key={service.name} value={service.name.toLowerCase()}>
            {service.name} - {service.price}
          </option>
        ))}
      </select>
    </div>
  );
}