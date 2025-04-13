
import { Shield, TrendingUp, Clock, Award, Globe, History } from 'lucide-react';

const WhyChooseUsSection = () => {
  const currentYear = new Date().getFullYear();
  const yearsInBusiness = currentYear - 1976;
  const yearsGlobalInvestors = 22;
  
  return (
    <section className="py-20 bg-unicorn-deepBlack relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[url('/lovable-uploads/dd9f21c4-5efd-4b78-afb7-e40eed48b069.png')] bg-cover bg-center opacity-10"></div>
      <div className="absolute top-0 right-0 w-1/3 h-full bg-unicorn-gold/10 blur-[100px]"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-unicorn-purple/10 blur-[100px]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Why <span className="text-unicorn-gold">Choose</span> Us
          </h2>
          <p className="text-gray-300 max-w-3xl mx-auto">
            With {yearsInBusiness} years of experience in the energy markets and {yearsGlobalInvestors} years of global investment expertise, we offer a unique combination of industry knowledge, financial security, and technological innovation.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Experience */}
          <div className="bg-unicorn-deepPurple/40 backdrop-blur-sm p-8 rounded-xl border border-unicorn-gold/20 hover:border-unicorn-gold/40 transition-all duration-300 shadow-xl">
            <div className="bg-unicorn-gold/20 p-4 inline-block rounded-lg mb-6">
              <History className="h-10 w-10 text-unicorn-gold" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Established Since 1976</h3>
            <p className="text-gray-300">
              With nearly five decades of operational experience, we've weathered numerous economic cycles and consistently delivered value to our stakeholders throughout changing market conditions.
            </p>
          </div>
          
          {/* Global Reach */}
          <div className="bg-unicorn-deepPurple/40 backdrop-blur-sm p-8 rounded-xl border border-unicorn-gold/20 hover:border-unicorn-gold/40 transition-all duration-300 shadow-xl">
            <div className="bg-unicorn-gold/20 p-4 inline-block rounded-lg mb-6">
              <Globe className="h-10 w-10 text-unicorn-gold" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Global Investor Access</h3>
            <p className="text-gray-300">
              Since 2001, we've been welcoming investors from around the world, creating a diverse and resilient community that spans across continents and cultures.
            </p>
          </div>
          
          {/* Security */}
          <div className="bg-unicorn-deepPurple/40 backdrop-blur-sm p-8 rounded-xl border border-unicorn-gold/20 hover:border-unicorn-gold/40 transition-all duration-300 shadow-xl">
            <div className="bg-unicorn-gold/20 p-4 inline-block rounded-lg mb-6">
              <Shield className="h-10 w-10 text-unicorn-gold" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Industry-Leading Security</h3>
            <p className="text-gray-300">
              Your investments are protected by advanced security protocols, comprehensive insurance coverage, and strategic risk management approaches refined over decades.
            </p>
          </div>
          
          {/* Consistent Returns */}
          <div className="bg-unicorn-deepPurple/40 backdrop-blur-sm p-8 rounded-xl border border-unicorn-gold/20 hover:border-unicorn-gold/40 transition-all duration-300 shadow-xl">
            <div className="bg-unicorn-gold/20 p-4 inline-block rounded-lg mb-6">
              <TrendingUp className="h-10 w-10 text-unicorn-gold" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Consistent Performance</h3>
            <p className="text-gray-300">
              Our investment strategies have delivered reliable returns to investors through market ups and downs, geopolitical events, and economic changes for over four decades.
            </p>
          </div>
          
          {/* Transparency */}
          <div className="bg-unicorn-deepPurple/40 backdrop-blur-sm p-8 rounded-xl border border-unicorn-gold/20 hover:border-unicorn-gold/40 transition-all duration-300 shadow-xl">
            <div className="bg-unicorn-gold/20 p-4 inline-block rounded-lg mb-6">
              <Clock className="h-10 w-10 text-unicorn-gold" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Complete Transparency</h3>
            <p className="text-gray-300">
              Track your investments in real-time with our cutting-edge dashboard, receive regular performance updates, and access detailed investment reports whenever you need them.
            </p>
          </div>
          
          {/* Expertise */}
          <div className="bg-unicorn-deepPurple/40 backdrop-blur-sm p-8 rounded-xl border border-unicorn-gold/20 hover:border-unicorn-gold/40 transition-all duration-300 shadow-xl">
            <div className="bg-unicorn-gold/20 p-4 inline-block rounded-lg mb-6">
              <Award className="h-10 w-10 text-unicorn-gold" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Industry Expertise</h3>
            <p className="text-gray-300">
              Our team includes veterans of the energy industry with specialized knowledge acquired over decades, giving us unique insights into market opportunities others might miss.
            </p>
          </div>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
          <div className="text-center">
            <div className="text-4xl font-bold text-unicorn-gold mb-2">{yearsInBusiness}+</div>
            <div className="text-gray-300">Years of Experience</div>
          </div>
          
          <div className="text-center">
            <div className="text-4xl font-bold text-unicorn-gold mb-2">35,000+</div>
            <div className="text-gray-300">Active Investors</div>
          </div>
          
          <div className="text-center">
            <div className="text-4xl font-bold text-unicorn-gold mb-2">98%</div>
            <div className="text-gray-300">Client Retention</div>
          </div>
          
          <div className="text-center">
            <div className="text-4xl font-bold text-unicorn-gold mb-2">156</div>
            <div className="text-gray-300">Countries Served</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
