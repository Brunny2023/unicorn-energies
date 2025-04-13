
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin, MessageCircle, CheckCircle } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Captcha from '@/components/ui/Captcha';
import useCaptcha from '@/hooks/useCaptcha';

const Contact = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { siteKey, verified, handleVerify, resetCaptcha } = useCaptcha();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!verified) {
      alert('Please complete the CAPTCHA verification.');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real application, this would send the data to a server
      // Here we're simulating the email submission to support@unicorn-energies.com
      console.log('Form submitted to support@unicorn-energies.com:', formData);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setFormSubmitted(true);
      setIsSubmitting(false);
      
      // Reset form after submission
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      // Reset captcha
      resetCaptcha();
      
      // Reset the submission status after 5 seconds
      setTimeout(() => {
        setFormSubmitted(false);
      }, 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setIsSubmitting(false);
      alert('There was an error submitting your message. Please try again.');
    }
  };

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="hero-gradient text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-xl mb-6">Contact Us</h1>
            <p className="text-xl text-gray-200">
              Have questions or need assistance? Our team is here to help you with any inquiries about our investment platform.
            </p>
          </div>
        </div>
      </section>
      
      {/* Contact Form & Info Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <h2 className="text-3xl font-bold text-investment-navy mb-6">Get In Touch</h2>
                
                {formSubmitted ? (
                  <div className="bg-green-50 border border-green-200 text-green-700 p-6 rounded-lg flex items-start">
                    <CheckCircle className="h-6 w-6 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-lg mb-1">Message Sent Successfully!</h3>
                      <p>Thank you for contacting us. Our team will respond to your inquiry as soon as possible, typically within 24 hours.</p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Your Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-investment-navy"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-investment-navy"
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">Subject</label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-investment-navy"
                        required
                      >
                        <option value="" disabled>Select a subject</option>
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Investment Question">Investment Question</option>
                        <option value="Account Support">Account Support</option>
                        <option value="Technical Issue">Technical Issue</option>
                        <option value="Partnership Opportunity">Partnership Opportunity</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Your Message</label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-investment-navy"
                        placeholder="Please describe how we can help you..."
                        required
                      ></textarea>
                    </div>
                    
                    {/* CAPTCHA Verification */}
                    <div className="w-full">
                      <label className="block text-gray-700 font-medium mb-2">Verification</label>
                      <Captcha siteKey={siteKey} onVerify={handleVerify} />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-investment-navy hover:bg-investment-lightNavy text-white"
                      disabled={isSubmitting || !verified}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                    
                    <p className="text-xs text-gray-500 text-center">
                      By submitting this form, you agree to our Privacy Policy. Your message will be sent to support@unicorn-energies.com.
                    </p>
                  </form>
                )}
              </div>
              
              {/* Contact Info */}
              <div>
                <h2 className="text-3xl font-bold text-investment-navy mb-6">Contact Information</h2>
                
                <div className="bg-investment-gray p-8 rounded-lg mb-8">
                  <div className="space-y-6">
                    <div className="flex">
                      <div className="bg-investment-gold rounded-full p-3 mr-4 flex-shrink-0">
                        <Mail className="h-6 w-6 text-investment-navy" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-investment-navy">Email Us</h3>
                        <p className="text-gray-600 mb-1">For general inquiries:</p>
                        <a href="mailto:info@unicorn-energies.com" className="text-investment-lightNavy hover:underline">info@unicorn-energies.com</a>
                        <p className="text-gray-600 mt-2 mb-1">For support:</p>
                        <a href="mailto:support@unicorn-energies.com" className="text-investment-lightNavy hover:underline">support@unicorn-energies.com</a>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="bg-investment-gold rounded-full p-3 mr-4 flex-shrink-0">
                        <Phone className="h-6 w-6 text-investment-navy" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-investment-navy">Call Us</h3>
                        <p className="text-gray-600 mb-1">Main Office:</p>
                        <a href="tel:+12125559876" className="text-investment-lightNavy hover:underline">+1 (212) 555-9876</a>
                        <p className="text-gray-600 mt-2 mb-1">Support Hotline:</p>
                        <a href="tel:+18448889123" className="text-investment-lightNavy hover:underline">+1 (844) 888-9123</a>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="bg-investment-gold rounded-full p-3 mr-4 flex-shrink-0">
                        <MapPin className="h-6 w-6 text-investment-navy" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-investment-navy">Visit Us</h3>
                        <p className="text-gray-600">
                          123 Investment Street<br />
                          Financial District<br />
                          New York, NY 10004<br />
                          United States
                        </p>
                        <p className="text-gray-600 mt-3">
                          <strong>Texas Branch:</strong><br />
                          Unicorn Energies Allied Resources<br />
                          Unicorn Energy Inc<br />
                          RR5 Box 181-N<br />
                          Elgin, TX 78621
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-investment-navy text-white p-8 rounded-lg">
                  <div className="flex items-start">
                    <div className="bg-investment-gold rounded-full p-3 mr-4 flex-shrink-0">
                      <MessageCircle className="h-6 w-6 text-investment-navy" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl mb-3">Live Support</h3>
                      <p className="text-gray-300 mb-4">
                        Our customer support team is available 24/7 to assist you. Get instant help through our live chat service.
                      </p>
                      <Button className="bg-investment-gold hover:bg-investment-lightGold text-investment-navy">
                        Start Live Chat
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Map Section (Placeholder) */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="aspect-w-16 aspect-h-9 h-96 bg-gray-300 rounded-lg overflow-hidden">
              {/* In a real application, this would be a map iframe */}
              <div className="w-full h-full flex items-center justify-center bg-investment-gray">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-investment-gold mx-auto mb-3" />
                  <p className="text-investment-navy text-lg font-medium">Map Placeholder</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Highlight Section */}
      <section className="py-16 bg-investment-gray">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="heading-lg text-investment-navy mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600">
              Find quick answers to common questions before reaching out to our team.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-investment-navy mb-3">
                How do I start investing?
              </h3>
              <p className="text-gray-600">
                To start investing, create an account, select your preferred investment plan, make a deposit, and your investment will be activated immediately after confirmation.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-investment-navy mb-3">
                What payment methods are accepted?
              </h3>
              <p className="text-gray-600">
                We accept cryptocurrencies (Bitcoin, Ethereum, etc.), bank transfers, and select e-payment systems. Cryptocurrency payments offer faster processing times.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-investment-navy mb-3">
                How secure are my investments?
              </h3>
              <p className="text-gray-600">
                Your investments are secured through tangible asset backing, legal protections, and comprehensive risk management strategies, with SSL encryption for data protection.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-investment-navy mb-3">
                When can I withdraw my profits?
              </h3>
              <p className="text-gray-600">
                You can withdraw your profits at any time through your account dashboard. Withdrawal requests are typically processed within 24 hours.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <a href="/faq" className="text-investment-navy font-medium hover:text-investment-gold transition-colors">
              View All FAQs →
            </a>
          </div>
        </div>
      </section>
      
      <Footer />
    </>
  );
};

export default Contact;
