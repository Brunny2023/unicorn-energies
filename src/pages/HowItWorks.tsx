
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  ArrowRight, 
  UserPlus, 
  MousePointer, 
  TrendingUp, 
  CircleDollarSign, 
  Lock, 
  Wallet,
  Clock,
  BarChart
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const HowItWorks = () => {
  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="hero-gradient text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-xl mb-6">How It Works</h1>
            <p className="text-xl text-gray-200">
              Understanding the investment process at WealthHarbor is simple. Follow our straightforward steps to begin your journey toward financial prosperity.
            </p>
          </div>
        </div>
      </section>
      
      {/* Main Steps Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 gap-20">
              {/* Step 1 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="order-2 md:order-1">
                  <div className="inline-flex items-center mb-4">
                    <div className="bg-investment-gold text-investment-navy h-10 w-10 rounded-full flex items-center justify-center font-bold text-lg mr-3">
                      1
                    </div>
                    <h2 className="text-3xl font-bold text-investment-navy">Create an Account</h2>
                  </div>
                  
                  <p className="text-gray-600 mb-6">
                    Getting started with WealthHarbor is quick and easy. Our streamlined registration process takes less than 2 minutes to complete and requires only your basic information.
                  </p>
                  
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <div className="bg-investment-navy p-1 rounded-full mr-3 mt-1">
                        <div className="h-3 w-3 bg-investment-gold rounded-full"></div>
                      </div>
                      <span className="text-gray-600">Fill in the registration form with your name and email address.</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-investment-navy p-1 rounded-full mr-3 mt-1">
                        <div className="h-3 w-3 bg-investment-gold rounded-full"></div>
                      </div>
                      <span className="text-gray-600">Create a secure password to protect your account.</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-investment-navy p-1 rounded-full mr-3 mt-1">
                        <div className="h-3 w-3 bg-investment-gold rounded-full"></div>
                      </div>
                      <span className="text-gray-600">Verify your email to activate your account and gain full access to the platform.</span>
                    </li>
                  </ul>
                  
                  <Link to="/register">
                    <Button className="bg-investment-navy hover:bg-investment-lightNavy text-white">
                      Create Your Account <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
                
                <div className="order-1 md:order-2 bg-investment-gray p-8 rounded-lg shadow-md relative">
                  <div className="absolute top-0 right-0 bg-investment-navy text-white p-3 rounded-bl-lg">
                    <UserPlus className="h-6 w-6" />
                  </div>
                  
                  <div className="border border-gray-300 rounded-lg bg-white p-6 shadow-sm">
                    <h3 className="text-xl font-bold text-investment-navy mb-4">Registration Form</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-gray-600 mb-1">Full Name</label>
                        <div className="border border-gray-300 rounded p-3 bg-gray-50">
                          John Doe
                        </div>
                      </div>
                      <div>
                        <label className="block text-gray-600 mb-1">Email Address</label>
                        <div className="border border-gray-300 rounded p-3 bg-gray-50">
                          john.doe@example.com
                        </div>
                      </div>
                      <div>
                        <label className="block text-gray-600 mb-1">Password</label>
                        <div className="border border-gray-300 rounded p-3 bg-gray-50">
                          ••••••••••••
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 p-3 bg-investment-gold text-investment-navy text-center font-bold rounded">
                      Create Account
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Step 2 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="bg-investment-gray p-8 rounded-lg shadow-md relative">
                  <div className="absolute top-0 right-0 bg-investment-navy text-white p-3 rounded-bl-lg">
                    <MousePointer className="h-6 w-6" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {["Goldfish", "Dolphin", "Shark", "Whales"].map((plan, index) => (
                      <div 
                        key={index} 
                        className={`border rounded-lg overflow-hidden shadow-sm ${
                          index === 1 ? "border-investment-gold" : "border-gray-200"
                        }`}
                      >
                        <div className={`p-4 ${
                          index === 1 
                            ? "bg-investment-gold text-investment-navy" 
                            : "bg-investment-navy text-white"
                        }`}>
                          <h4 className="font-bold">{plan}</h4>
                          <div className="text-sm">{1.2 + index * 0.3}% Daily</div>
                        </div>
                        
                        <div className="p-4 bg-white">
                          <div className="text-center mb-2">
                            <div className="font-bold text-investment-navy">
                              ${(index === 0 ? 100 : index === 1 ? 1000 : index === 2 ? 5000 : 15000).toLocaleString()}
                            </div>
                            <div className="text-xs text-gray-500">Min. Investment</div>
                          </div>
                          
                          <div className={`text-center p-1 text-xs rounded ${
                            index === 1 
                              ? "bg-investment-gold text-investment-navy" 
                              : "bg-gray-100 text-gray-600"
                          }`}>
                            {index === 1 ? "Selected" : "Select Plan"}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 border border-gray-300 rounded-lg bg-white p-4 shadow-sm">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-gray-600">Selected Plan:</span>
                      <span className="font-bold text-investment-navy">Dolphin</span>
                    </div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-gray-600">Investment Amount:</span>
                      <span className="font-bold text-investment-navy">$2,500</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Payment Method:</span>
                      <span className="font-bold text-investment-navy">Bitcoin</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="inline-flex items-center mb-4">
                    <div className="bg-investment-gold text-investment-navy h-10 w-10 rounded-full flex items-center justify-center font-bold text-lg mr-3">
                      2
                    </div>
                    <h2 className="text-3xl font-bold text-investment-navy">Choose Your Investment Plan</h2>
                  </div>
                  
                  <p className="text-gray-600 mb-6">
                    Browse our range of investment plans designed to match your financial goals and risk tolerance. From entry-level to premium options, we have something for every investor.
                  </p>
                  
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <div className="bg-investment-navy p-1 rounded-full mr-3 mt-1">
                        <div className="h-3 w-3 bg-investment-gold rounded-full"></div>
                      </div>
                      <span className="text-gray-600">Compare our different plans based on investment range, daily returns, and duration.</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-investment-navy p-1 rounded-full mr-3 mt-1">
                        <div className="h-3 w-3 bg-investment-gold rounded-full"></div>
                      </div>
                      <span className="text-gray-600">Select your preferred plan and specify your investment amount.</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-investment-navy p-1 rounded-full mr-3 mt-1">
                        <div className="h-3 w-3 bg-investment-gold rounded-full"></div>
                      </div>
                      <span className="text-gray-600">Choose your preferred payment method (cryptocurrency, bank transfer, or e-payment) and complete your deposit.</span>
                    </li>
                  </ul>
                  
                  <Link to="/investment-plans">
                    <Button className="bg-investment-navy hover:bg-investment-lightNavy text-white">
                      View Investment Plans <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </div>
              
              {/* Step 3 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="order-2 md:order-1">
                  <div className="inline-flex items-center mb-4">
                    <div className="bg-investment-gold text-investment-navy h-10 w-10 rounded-full flex items-center justify-center font-bold text-lg mr-3">
                      3
                    </div>
                    <h2 className="text-3xl font-bold text-investment-navy">Earn Daily Returns</h2>
                  </div>
                  
                  <p className="text-gray-600 mb-6">
                    Once your investment is activated, you'll start earning returns immediately. Track your earnings in real-time and withdraw your profits at your convenience.
                  </p>
                  
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <div className="bg-investment-navy p-1 rounded-full mr-3 mt-1">
                        <div className="h-3 w-3 bg-investment-gold rounded-full"></div>
                      </div>
                      <span className="text-gray-600">Daily returns are automatically credited to your account balance.</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-investment-navy p-1 rounded-full mr-3 mt-1">
                        <div className="h-3 w-3 bg-investment-gold rounded-full"></div>
                      </div>
                      <span className="text-gray-600">Monitor your investment performance through your personalized dashboard.</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-investment-navy p-1 rounded-full mr-3 mt-1">
                        <div className="h-3 w-3 bg-investment-gold rounded-full"></div>
                      </div>
                      <span className="text-gray-600">Request withdrawals at any time, with processing typically completed within 24 hours.</span>
                    </li>
                  </ul>
                  
                  <Link to="/register">
                    <Button className="bg-investment-navy hover:bg-investment-lightNavy text-white">
                      Start Earning Now <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
                
                <div className="order-1 md:order-2 bg-investment-gray p-8 rounded-lg shadow-md relative">
                  <div className="absolute top-0 right-0 bg-investment-navy text-white p-3 rounded-bl-lg">
                    <TrendingUp className="h-6 w-6" />
                  </div>
                  
                  <div className="border border-gray-300 rounded-lg bg-white p-6 shadow-sm">
                    <h3 className="text-xl font-bold text-investment-navy mb-4">Investment Dashboard</h3>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-investment-navy text-white p-4 rounded-lg">
                        <div className="flex justify-between items-center mb-1">
                          <CircleDollarSign className="h-5 w-5 text-investment-gold" />
                          <span className="text-xs text-gray-300">Balance</span>
                        </div>
                        <div className="text-xl font-bold">$2,750.00</div>
                      </div>
                      
                      <div className="bg-investment-lightNavy text-white p-4 rounded-lg">
                        <div className="flex justify-between items-center mb-1">
                          <TrendingUp className="h-5 w-5 text-investment-gold" />
                          <span className="text-xs text-gray-300">Daily Profit</span>
                        </div>
                        <div className="text-xl font-bold">$37.50</div>
                      </div>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg p-4 mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-investment-navy">Active Investment</span>
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Active</span>
                      </div>
                      
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Plan:</span>
                        <span className="font-medium">Dolphin</span>
                      </div>
                      
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Amount:</span>
                        <span className="font-medium">$2,500.00</span>
                      </div>
                      
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Daily:</span>
                        <span className="font-medium text-investment-gold">$37.50 (1.5%)</span>
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Remaining:</span>
                        <span className="font-medium">15 days</span>
                      </div>
                    </div>
                    
                    <button className="w-full bg-investment-gold text-investment-navy font-bold p-3 rounded">
                      Withdraw Funds
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Process Visualization */}
      <section className="py-16 bg-investment-gray">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="heading-lg text-investment-navy mb-4">
              Your Investment Journey
            </h2>
            <p className="text-gray-600">
              From registration to profit withdrawal, our streamlined process ensures a smooth investment experience at every step.
            </p>
          </div>
          
          <div className="relative max-w-5xl mx-auto">
            {/* Progress Line */}
            <div className="hidden md:block absolute top-16 left-0 right-0 h-1 bg-investment-navy"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Step 1 */}
              <div className="relative">
                <div className="hidden md:flex justify-center">
                  <div className="bg-investment-navy rounded-full p-3 mb-4 z-10">
                    <UserPlus className="h-6 w-6 text-investment-gold" />
                  </div>
                </div>
                
                <div className="md:text-center">
                  <div className="flex items-center md:justify-center mb-2">
                    <div className="bg-investment-navy rounded-full p-3 mr-3 md:hidden">
                      <UserPlus className="h-6 w-6 text-investment-gold" />
                    </div>
                    <h3 className="text-xl font-bold text-investment-navy">Register</h3>
                  </div>
                  <p className="text-gray-600">
                    Create your account in less than 2 minutes
                  </p>
                </div>
              </div>
              
              {/* Step 2 */}
              <div className="relative">
                <div className="hidden md:flex justify-center">
                  <div className="bg-investment-navy rounded-full p-3 mb-4 z-10">
                    <Wallet className="h-6 w-6 text-investment-gold" />
                  </div>
                </div>
                
                <div className="md:text-center">
                  <div className="flex items-center md:justify-center mb-2">
                    <div className="bg-investment-navy rounded-full p-3 mr-3 md:hidden">
                      <Wallet className="h-6 w-6 text-investment-gold" />
                    </div>
                    <h3 className="text-xl font-bold text-investment-navy">Invest</h3>
                  </div>
                  <p className="text-gray-600">
                    Choose a plan and make your deposit
                  </p>
                </div>
              </div>
              
              {/* Step 3 */}
              <div className="relative">
                <div className="hidden md:flex justify-center">
                  <div className="bg-investment-navy rounded-full p-3 mb-4 z-10">
                    <Clock className="h-6 w-6 text-investment-gold" />
                  </div>
                </div>
                
                <div className="md:text-center">
                  <div className="flex items-center md:justify-center mb-2">
                    <div className="bg-investment-navy rounded-full p-3 mr-3 md:hidden">
                      <Clock className="h-6 w-6 text-investment-gold" />
                    </div>
                    <h3 className="text-xl font-bold text-investment-navy">Earn</h3>
                  </div>
                  <p className="text-gray-600">
                    Receive daily profits automatically
                  </p>
                </div>
              </div>
              
              {/* Step 4 */}
              <div className="relative">
                <div className="hidden md:flex justify-center">
                  <div className="bg-investment-navy rounded-full p-3 mb-4 z-10">
                    <BarChart className="h-6 w-6 text-investment-gold" />
                  </div>
                </div>
                
                <div className="md:text-center">
                  <div className="flex items-center md:justify-center mb-2">
                    <div className="bg-investment-navy rounded-full p-3 mr-3 md:hidden">
                      <BarChart className="h-6 w-6 text-investment-gold" />
                    </div>
                    <h3 className="text-xl font-bold text-investment-navy">Withdraw</h3>
                  </div>
                  <p className="text-gray-600">
                    Access your funds whenever you want
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="heading-lg text-investment-navy mb-8 text-center">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-6">
              <div className="bg-investment-gray p-6 rounded-lg">
                <h3 className="text-xl font-bold text-investment-navy mb-3">
                  How quickly can I start earning returns?
                </h3>
                <p className="text-gray-600">
                  Once your deposit is confirmed, your investment will be activated immediately, and you'll start earning daily returns from the very next day. All profits are automatically credited to your account balance.
                </p>
              </div>
              
              <div className="bg-investment-gray p-6 rounded-lg">
                <h3 className="text-xl font-bold text-investment-navy mb-3">
                  Is there a minimum withdrawal amount?
                </h3>
                <p className="text-gray-600">
                  There is no minimum withdrawal amount for profits. You can withdraw any amount of your earned profits at any time. For principal withdrawals, terms may vary depending on your selected investment plan.
                </p>
              </div>
              
              <div className="bg-investment-gray p-6 rounded-lg">
                <h3 className="text-xl font-bold text-investment-navy mb-3">
                  How secure are my investments?
                </h3>
                <p className="text-gray-600">
                  Security is our top priority. All investments are backed by real assets in the oil and gas sector, and we employ industry-leading security protocols to protect your funds and personal information. Our platform is protected by SSL encryption, DDoS protection, and dedicated secure servers.
                </p>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <Link to="/faq">
                <Button className="bg-investment-navy hover:bg-investment-lightNavy text-white">
                  View All FAQs <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-investment-navy text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="heading-md mb-6">
              Ready to Start Your Investment Journey?
            </h2>
            <p className="text-gray-300 mb-8">
              Join thousands of satisfied investors who are already benefiting from our reliable and profitable investment plans.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/register">
                <Button className="bg-investment-gold hover:bg-investment-lightGold text-investment-navy font-bold">
                  Create Your Account <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" className="border-white text-white hover:bg-white/10">
                  Contact Our Team
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </>
  );
};

export default HowItWorks;
