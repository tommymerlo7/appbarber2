import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  icon: LucideIcon;
  name: string;
  price: string;
  description: string;
  duration: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  icon: Icon,
  name,
  price,
  description,
  duration
}) => {
  return (
    <div className="bg-zinc-800 rounded-lg p-6 hover:bg-zinc-700 transition-colors">
      <Icon 
        className={`h-8 w-8 mb-4 text-zinc-400 ${
          name === 'Beard Trim' ? 'rotate-45' : ''
        }`}
      />
      <h3 className="text-xl font-semibold mb-2">{name}</h3>
      <p className="text-zinc-400 mb-4">{description}</p>
      <div className="flex justify-between items-center text-sm">
        <span className="text-zinc-300">{duration}</span>
        <span className="text-xl font-bold">{price}</span>
      </div>
    </div>
  );
};

export default ServiceCard;