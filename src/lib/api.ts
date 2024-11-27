import { supabase } from './supabase';
import type { Appointment } from '../types/appointment';

export async function createAppointment(appointment: Omit<Appointment, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('appointments')
    .insert([{
      name: appointment.name,
      email: appointment.email,
      phone: appointment.phone,
      appointment_date: appointment.appointment_date,
      appointment_time: appointment.appointment_time,
      service: appointment.service
    }])
    .select();

  if (error) throw error;
  return data[0];
}

export async function getAvailableTimeSlots(date: string) {
  const { data: bookedSlots, error } = await supabase
    .from('appointments')
    .select('appointment_time')
    .eq('appointment_date', date);

  if (error) throw error;

  const bookedTimeSlots = new Set(bookedSlots.map(slot => slot.appointment_time));
  const allTimeSlots = [
    '09:00', '10:00', '11:00', '12:00', '13:00',
    '14:00', '15:00', '16:00', '17:00'
  ];
  
  return allTimeSlots.filter(time => !bookedTimeSlots.has(time));
}