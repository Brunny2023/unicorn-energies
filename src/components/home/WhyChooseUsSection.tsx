
import { Shield, TrendingUp, Clock, Zap, UserPlus, HeadphonesIcon } from 'lucide-react';

const featuresData = [
  {
    icon: Shield,
    title: "Legal Compliance",
    description: "Our operations are fully compliant with international financial regulations, giving you peace of mind for your investments."
  },
  {
    icon: TrendingUp,
    title: "Reliable Returns",
    description: "Consistent performance with predictable returns, backed by strategic investments in the oil and gas market."
  },
  {
    icon: UserPlus,
    title: "Referral Program",
    description: "Earn additional income by referring others to our platform with our generous multi-level referral system."
  },
  {
    icon: Clock,
    title: "Quick Withdrawals",
    description: "Access your funds quickly with our streamlined withdrawal process, typically completed within 24 hours."
  },
  {
    icon: Zap,
    title: "Cryptocurrency Support",
    description: "Invest and withdraw using major cryptocurrencies, ensuring privacy and reducing transaction costs."
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Support",
    description: "Our dedicated support team is available around the clock to assist with any questions or concerns."
  }
];

const WhyChooseUsSection = () => {
  return (
    <section className="section-padding hero-gradient text-white relative">
      {/* Replaced the grid-pattern.svg reference with a gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-unicorn-darkPurple/20 to-unicorn-purple/10 opacity-10"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="heading-lg mb-4">Why Choose UnicornEnergies</h2>
          <p className="text-gray-200">
            We combine industry expertise, cutting-edge technology, and exceptional customer service to provide a superior investment experience.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresData.map((feature, index) => (
            <div 
              key={index} 
              className="bg-investment-lightNavy bg-opacity-50 backdrop-blur-sm rounded-lg p-6 border border-white border-opacity-10 hover:transform hover:scale-105 transition-transform"
            >
              <div className="bg-investment-gold rounded-full p-3 inline-block mb-4">
                <feature.icon className="h-6 w-6 text-investment-navy" />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
