
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Shield, Award, TrendingUp, Users, BarChart, Briefcase } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const About = () => {
  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="hero-gradient text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-xl mb-6">About WealthHarbor</h1>
            <p className="text-xl text-gray-200">
              Your trusted partner in oil and gas market investments, providing reliable high-income sources while minimizing risks.
            </p>
          </div>
        </div>
      </section>
      
      {/* Company Background */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="heading-lg text-investment-navy mb-6">
                Our Background and Experience
              </h2>
              <p className="text-gray-700 mb-4">
                Founded in 2017, WealthHarbor was established with a clear vision: to make profitable oil and gas investments accessible to individual investors while maintaining the highest standards of security and transparency.
              </p>
              <p className="text-gray-700 mb-4">
                Our founding team brings together over 50 years of combined experience in the energy sector, financial markets, and investment management. This deep industry knowledge allows us to identify opportunities that others might miss and to navigate market volatility with confidence.
              </p>
              <p className="text-gray-700">
                Today, we manage over $250 million in assets for more than 15,000 investors worldwide, delivering consistent returns regardless of broader market conditions.
              </p>
            </div>
            
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" 
                alt="Modern office building" 
                className="rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-lg shadow-lg border-t-4 border-investment-gold">
                <div className="text-investment-navy font-bold text-2xl">6+ Years</div>
                <div className="text-gray-600">Industry Leadership</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Mission & Values */}
      <section className="py-16 bg-investment-gray">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-6 rounded-lg shadow text-center card-hover">
                  <Shield className="h-10 w-10 text-investment-gold mx-auto mb-3" />
                  <h3 className="font-bold text-investment-navy">Security</h3>
                </div>
                <div className="bg-white p-6 rounded-lg shadow text-center card-hover">
                  <TrendingUp className="h-10 w-10 text-investment-gold mx-auto mb-3" />
                  <h3 className="font-bold text-investment-navy">Growth</h3>
                </div>
                <div className="bg-white p-6 rounded-lg shadow text-center card-hover">
                  <Award className="h-10 w-10 text-investment-gold mx-auto mb-3" />
                  <h3 className="font-bold text-investment-navy">Excellence</h3>
                </div>
                <div className="bg-white p-6 rounded-lg shadow text-center card-hover">
                  <Users className="h-10 w-10 text-investment-gold mx-auto mb-3" />
                  <h3 className="font-bold text-investment-navy">Community</h3>
                </div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <h2 className="heading-lg text-investment-navy mb-6">
                Our Mission & Values
              </h2>
              <p className="text-gray-700 mb-4">
                Our mission is to democratize access to the profitable oil and gas sector, allowing individual investors to benefit from opportunities traditionally reserved for institutional players.
              </p>
              <p className="text-gray-700 mb-4">
                We believe that financial success should be built on a foundation of strong values. Every decision we make is guided by our commitment to:
              </p>
              <ul className="space-y-2 text-gray-700 mb-6">
                <li className="flex items-center">
                  <div className="bg-investment-gold rounded-full p-1 mr-2">
                    <Shield className="h-4 w-4 text-investment-navy" />
                  </div>
                  <span><strong>Security:</strong> Protecting our investors' capital is our highest priority.</span>
                </li>
                <li className="flex items-center">
                  <div className="bg-investment-gold rounded-full p-1 mr-2">
                    <TrendingUp className="h-4 w-4 text-investment-navy" />
                  </div>
                  <span><strong>Growth:</strong> We relentlessly pursue sustainable growth opportunities.</span>
                </li>
                <li className="flex items-center">
                  <div className="bg-investment-gold rounded-full p-1 mr-2">
                    <Award className="h-4 w-4 text-investment-navy" />
                  </div>
                  <span><strong>Excellence:</strong> We maintain the highest standards in all aspects of our operations.</span>
                </li>
                <li className="flex items-center">
                  <div className="bg-investment-gold rounded-full p-1 mr-2">
                    <Users className="h-4 w-4 text-investment-navy" />
                  </div>
                  <span><strong>Community:</strong> We believe in creating value for all stakeholders.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Expertise */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="heading-lg text-investment-navy mb-4">
              Our Industry Expertise
            </h2>
            <p className="text-gray-600">
              WealthHarbor specializes in the energy sector, with a particular focus on oil and gas investments. Our team's deep industry knowledge and market insights give us a competitive edge.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-investment-gray p-8 rounded-lg card-hover">
              <BarChart className="h-12 w-12 text-investment-gold mb-4" />
              <h3 className="text-xl font-bold text-investment-navy mb-3">Market Analysis</h3>
              <p className="text-gray-600">
                Our team of analysts continuously monitors global energy markets, geopolitical developments, and industry trends to identify the most promising investment opportunities.
              </p>
            </div>
            
            <div className="bg-investment-gray p-8 rounded-lg card-hover">
              <Briefcase className="h-12 w-12 text-investment-gold mb-4" />
              <h3 className="text-xl font-bold text-investment-navy mb-3">Portfolio Management</h3>
              <p className="text-gray-600">
                We diversify investments across various energy assets to optimize returns while managing risk. Our portfolio includes exploration, production, midstream, and service companies.
              </p>
            </div>
            
            <div className="bg-investment-gray p-8 rounded-lg card-hover">
              <Shield className="h-12 w-12 text-investment-gold mb-4" />
              <h3 className="text-xl font-bold text-investment-navy mb-3">Risk Management</h3>
              <p className="text-gray-600">
                We employ sophisticated risk assessment models and hedging strategies to protect investor capital against market volatility and unforeseen industry challenges.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Team Section Placeholder */}
      <section className="py-16 bg-investment-gray">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="heading-lg text-investment-navy mb-4">
              Our Leadership Team
            </h2>
            <p className="text-gray-600">
              Meet the experienced professionals who guide our investment strategy and operations. Our leadership team brings decades of combined experience in energy markets, finance, and technology.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md card-hover">
                <div className="h-48 bg-investment-navy"></div>
                <div className="p-5">
                  <h3 className="font-bold text-lg text-investment-navy">Team Member {index}</h3>
                  <p className="text-investment-gold font-medium">Position</p>
                  <p className="text-gray-600 mt-2">Brief description of the team member's background and expertise.</p>
                </div>
              </div>
            ))}
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
              Join thousands of investors who trust WealthHarbor with their financial future. Our investment plans offer reliable returns with minimal risk.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/investment-plans">
                <Button className="bg-investment-gold hover:bg-investment-lightGold text-investment-navy font-bold">
                  View Investment Plans
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

export default About;
