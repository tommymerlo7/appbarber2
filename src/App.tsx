import React, { useState } from 'react';
import { Check } from 'lucide-react';
import BookingForm from './components/BookingForm';
import Services from './components/Services';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import ContactInfo from './components/ContactInfo';

export default function App() {
  const [isBookingSuccess, setIsBookingSuccess] = useState(false);

  const handleBookingSuccess = () => {
    setIsBookingSuccess(true);
    setTimeout(() => setIsBookingSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-zinc-50">
      <Navbar />
      <Hero />
      <Services />

      <section id="booking" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Book Your Appointment</h2>
          <div className="max-w-2xl mx-auto">
            <BookingForm onSuccess={handleBookingSuccess} />
          </div>
        </div>
      </section>

      <ContactInfo />

      {isBookingSuccess && (
        <div className="fixed bottom-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2">
          <Check className="h-5 w-5" />
          Booking confirmed successfully!
        </div>
      )}
    </div>
  );
}