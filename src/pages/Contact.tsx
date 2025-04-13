
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ContactHero from '@/components/contact/ContactHero';
import ContactFormSection from '@/components/contact/ContactFormSection';
import ContactMap from '@/components/contact/ContactMap';
import ContactFaq from '@/components/contact/ContactFaq';

const Contact = () => {
  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <ContactHero />
      
      {/* Contact Form & Info Section */}
      <ContactFormSection />
      
      {/* Map Section */}
      <ContactMap />
      
      {/* FAQ Highlight Section */}
      <ContactFaq />
      
      <Footer />
    </>
  );
};

export default Contact;
