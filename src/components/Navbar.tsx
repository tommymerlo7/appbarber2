import React from 'react';
import { Scissors } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-black text-white py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Scissors className="h-6 w-6" />
          <span className="text-xl font-bold">BarberStyle</span>
        </div>
        <div className="flex gap-6">
          <a href="#services" className="hover:text-zinc-300">Services</a>
          <a href="#booking" className="hover:text-zinc-300">Book Now</a>
          <a href="#contact" className="hover:text-zinc-300">Contact</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;