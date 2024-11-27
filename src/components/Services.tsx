import React from 'react';
import ServiceCard from './ServiceCard';
import { services } from '../data/services';

const Services = () => {
  return (
    <section id="services" className="py-16 bg-zinc-900 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {services.map((service) => (
            <ServiceCard key={service.name} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;