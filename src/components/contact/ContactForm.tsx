
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import Captcha from '@/components/ui/Captcha';
import useCaptcha from '@/hooks/useCaptcha';

interface ContactFormProps {
  onSubmit: (formData: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }) => Promise<void>;
}

const ContactForm = ({ onSubmit }: ContactFormProps) => {
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
      await onSubmit(formData);
      
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
    </>
  );
};

export default ContactForm;
