
import { ArrowRight, Lock, UserPlus, CreditCard, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const HowItWorksSection = () => {
  const currentYear = new Date().getFullYear();
  const yearsInBusiness = currentYear - 1976;
  
  return (
    <section className="py-20 bg-gradient-to-b from-unicorn-black to-unicorn-darkPurple relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-unicorn-black to-transparent"></div>
      <div className="absolute right-0 top-1/4 w-32 h-32 bg-unicorn-gold/10 rounded-full blur-3xl"></div>
      <div className="absolute left-0 top-2/3 w-40 h-40 bg-unicorn-purple/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            How It <span className="text-unicorn-gold">Works</span>
          </h2>
          <p className="text-gray-300 max-w-3xl mx-auto">
            Benefit from our {yearsInBusiness} years of experience with a simple and transparent investment process designed to help you build wealth through energy market opportunities.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Step 1 */}
          <div className="bg-unicorn-deepPurple/40 backdrop-blur-sm p-8 rounded-xl border border-unicorn-gold/20 hover:border-unicorn-gold/40 transition-all duration-300 relative">
            <div className="absolute -top-4 -left-4 w-10 h-10 bg-unicorn-gold text-unicorn-black rounded-full flex items-center justify-center font-bold text-xl">
              1
            </div>
            <div className="mb-6">
              <UserPlus className="h-12 w-12 text-unicorn-gold" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Create an Account</h3>
            <p className="text-gray-300 mb-6">
              Join the community of global investors who have trusted us since 2001. Sign up in minutes with our secure, streamlined registration process.
            </p>
            <Link to="/register" className="text-unicorn-gold font-semibold hover:text-unicorn-lightGold transition-colors inline-flex items-center">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          
          {/* Step 2 */}
          <div className="bg-unicorn-deepPurple/40 backdrop-blur-sm p-8 rounded-xl border border-unicorn-gold/20 hover:border-unicorn-gold/40 transition-all duration-300 relative">
            <div className="absolute -top-4 -left-4 w-10 h-10 bg-unicorn-gold text-unicorn-black rounded-full flex items-center justify-center font-bold text-xl">
              2
            </div>
            <div className="mb-6">
              <CreditCard className="h-12 w-12 text-unicorn-gold" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Choose Your Plan & Invest</h3>
            <p className="text-gray-300 mb-6">
              Select from our range of investment plans backed by {yearsInBusiness} years of energy market experience. Make a secure deposit using your preferred payment method.
            </p>
            <Link to="/investment-plans" className="text-unicorn-gold font-semibold hover:text-unicorn-lightGold transition-colors inline-flex items-center">
              View Plans <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          
          {/* Step 3 */}
          <div className="bg-unicorn-deepPurple/40 backdrop-blur-sm p-8 rounded-xl border border-unicorn-gold/20 hover:border-unicorn-gold/40 transition-all duration-300 relative">
            <div className="absolute -top-4 -left-4 w-10 h-10 bg-unicorn-gold text-unicorn-black rounded-full flex items-center justify-center font-bold text-xl">
              3
            </div>
            <div className="mb-6">
              <TrendingUp className="h-12 w-12 text-unicorn-gold" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Grow Your Wealth</h3>
            <p className="text-gray-300 mb-6">
              Watch your investments grow with our proven strategies refined over decades. Track your earnings in real-time and withdraw profits easily.
            </p>
            <Link to="/calculator" className="text-unicorn-gold font-semibold hover:text-unicorn-lightGold transition-colors inline-flex items-center">
              Calculate Profits <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
        
        {/* Feature Highlight */}
        <div className="bg-unicorn-deepPurple/40 backdrop-blur-sm p-8 md:p-12 rounded-xl border border-unicorn-gold/20 flex flex-col md:flex-row items-center">
          <div className="md:w-2/3 mb-8 md:mb-0 md:pr-12">
            <h3 className="text-3xl font-bold text-white mb-4">
              Trusted for <span className="text-unicorn-gold">{yearsInBusiness} Years</span>
            </h3>
            <p className="text-gray-300 mb-6">
              Since 1976, UnicornEnergies has been pioneering investment opportunities in the energy market. In 2001, we opened these opportunities to global investors, creating a worldwide community of successful investors who benefit from our decades of expertise.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="bg-unicorn-black/50 px-4 py-2 rounded-lg">
                <div className="text-unicorn-gold font-bold text-xl">$850M+</div>
                <div className="text-gray-400 text-sm">Assets Under Management</div>
              </div>
              
              <div className="bg-unicorn-black/50 px-4 py-2 rounded-lg">
                <div className="text-unicorn-gold font-bold text-xl">35,000+</div>
                <div className="text-gray-400 text-sm">Global Investors</div>
              </div>
              
              <div className="bg-unicorn-black/50 px-4 py-2 rounded-lg">
                <div className="text-unicorn-gold font-bold text-xl">22 Years</div>
                <div className="text-gray-400 text-sm">Global Reach</div>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/3 flex justify-center">
            <div className="p-1 bg-gradient-to-br from-unicorn-gold via-unicorn-purple to-unicorn-darkPurple rounded-2xl">
              <div className="bg-unicorn-black p-4 rounded-xl flex items-center justify-center">
                <Lock className="h-20 w-20 text-unicorn-gold" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-16">
          <Link to="/how-it-works">
            <Button className="bg-unicorn-gold hover:bg-unicorn-darkGold text-unicorn-black font-bold group text-lg px-8 py-6">
              Learn More <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
