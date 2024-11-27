import React, { useState, useEffect } from 'react';
import { User } from 'lucide-react';
import { getAvailableTimeSlots, createAppointment } from '../../lib/api';
import TimeSlot from './TimeSlot';
import ServiceSelect from './ServiceSelect';

interface BookingFormProps {
  onSuccess: () => void;
}

export default function BookingForm({ onSuccess }: BookingFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    appointment_date: '',
    appointment_time: '',
    service: ''
  });
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (formData.appointment_date) {
      fetchAvailableTimes(formData.appointment_date);
    }
  }, [formData.appointment_date]);

  const fetchAvailableTimes = async (date: string) => {
    try {
      const times = await getAvailableTimeSlots(date);
      setAvailableTimes(times);
    } catch (error) {
      console.error('Error fetching available times:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createAppointment(formData);
      onSuccess();
      setFormData({
        name: '',
        email: '',
        phone: '',
        appointment_date: '',
        appointment_time: '',
        service: ''
      });
    } catch (error) {
      console.error('Error booking appointment:', error);
      alert('Failed to book appointment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Full Name
            </div>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent"
          />
        </div>

        <ServiceSelect
          value={formData.service}
          onChange={(value) => handleChange({ target: { name: 'service', value } } as any)}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
          <input
            type="date"
            name="appointment_date"
            value={formData.appointment_date}
            onChange={handleChange}
            min={today}
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent"
          />
        </div>

        <TimeSlot
          value={formData.appointment_time}
          onChange={(value) => handleChange({ target: { name: 'appointment_time', value } } as any)}
          availableTimes={availableTimes}
          selectedTime={formData.appointment_time}
          disabled={!formData.appointment_date}
        />
      </div>
      
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-zinc-800 transition-colors disabled:bg-zinc-400"
      >
        {loading ? 'Booking...' : 'Book Appointment'}
      </button>
    </form>
  );
}