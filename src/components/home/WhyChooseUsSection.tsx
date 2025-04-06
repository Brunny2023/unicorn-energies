
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
    <section className="section-padding bg-gradient-to-br from-[#1A2930] via-[#2A3C44] to-[#1E272C] text-white relative">
      {/* Oil-themed subtle background effect */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-[#D4AD3A]/20 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-full h-20 bg-gradient-to-t from-[#D4AD3A]/20 to-transparent"></div>
      </div>
      
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
              className="bg-[#212F36]/80 backdrop-blur-sm rounded-lg p-6 border border-[#D4AD3A]/30 hover:transform hover:scale-105 transition-transform shadow-lg"
            >
              <div className="bg-[#D4AD3A] rounded-full p-3 inline-block mb-4">
                <feature.icon className="h-6 w-6 text-[#1A2930]" />
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
