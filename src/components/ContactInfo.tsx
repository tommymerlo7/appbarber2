import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';

interface ContactItemProps {
  icon: React.ReactNode;
  title: string;
  value: string;
}

const ContactItem: React.FC<ContactItemProps> = ({ icon, title, value }) => (
  <div className="flex items-center gap-3">
    {icon}
    <div>
      <h3 className="font-semibold">{title}</h3>
      <p className="text-zinc-400">{value}</p>
    </div>
  </div>
);

const ContactInfo = () => {
  return (
    <section id="contact" className="py-16 bg-zinc-900 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Contact Us</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <ContactItem
            icon={<MapPin className="h-6 w-6 text-zinc-400" />}
            title="Location"
            value="123 Barber Street, City"
          />
          <ContactItem
            icon={<Phone className="h-6 w-6 text-zinc-400" />}
            title="Phone"
            value="+1 234 567 890"
          />
          <ContactItem
            icon={<Mail className="h-6 w-6 text-zinc-400" />}
            title="Email"
            value="info@barberstyle.com"
          />
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;