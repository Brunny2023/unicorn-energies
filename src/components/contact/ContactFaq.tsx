
const ContactFaq = () => {
  return (
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
  );
};

export default ContactFaq;
