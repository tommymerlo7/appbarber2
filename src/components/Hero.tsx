import React from 'react';
import { Scissors } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative h-[600px] flex items-center">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80"
          alt="Barbershop"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>
      
      <div className="container mx-auto px-4 relative text-white">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-4">
            <Scissors className="h-8 w-8" />
            <span className="text-2xl font-bold">BarberStyle</span>
          </div>
          <h1 className="text-5xl font-bold mb-6">Premium Grooming Experience</h1>
          <p className="text-xl text-zinc-300 mb-8">
            Experience the art of traditional barbering with modern style. 
            Book your appointment today for a premium grooming experience.
          </p>
          <a
            href="#booking"
            className="inline-block bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-zinc-100 transition-colors"
          >
            Book Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;