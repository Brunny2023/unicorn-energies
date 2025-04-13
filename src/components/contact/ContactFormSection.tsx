
import { useState } from 'react';
import ContactForm from '@/components/contact/ContactForm';
import ContactInfo from '@/components/contact/ContactInfo';

const ContactFormSection = () => {
  const handleFormSubmit = async (formData: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }) => {
    // In a real application, this would send the data to a server
    // Here we're simulating the email submission to support@unicorn-energies.com
    console.log('Form submitted to support@unicorn-energies.com:', formData);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-investment-navy mb-6">Get In Touch</h2>
              <ContactForm onSubmit={handleFormSubmit} />
            </div>
            
            {/* Contact Info */}
            <ContactInfo />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactFormSection;
