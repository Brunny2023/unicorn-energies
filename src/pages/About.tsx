
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
            <h1 className="heading-xl mb-6">About UnicornEnergies</h1>
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
                We are an international Oil and Gas Investment Company financial company in activities which are related 
                to trading in the oil and gas markets globally, and performed by qualified professionals.
              </p>
              <p className="text-gray-700 mb-4">
                Our goal is to provide our investors with a reliable source of high income, while minimizing any possible risks 
                and offering high-quality services, allowing us to automate and simplify the relations between the investors and 
                the trustees. We work towards increasing your profit margin by profitable investments. We look forward to you 
                being part of our satisfied community.
              </p>
              <p className="text-gray-700">
                Today, we manage over $250 million in assets for more than 15,000 investors worldwide, delivering consistent returns regardless of broader market conditions.
              </p>
            </div>
            
            <div className="relative">
              <img 
                src="/lovable-uploads/f4f91622-13bf-4354-8acc-5ff04e87d83a.png" 
                alt="Modern office building" 
                className="rounded-lg shadow-xl w-full max-w-lg mx-auto"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-lg shadow-lg border-t-4 border-investment-gold">
                <div className="text-investment-navy font-bold text-2xl">20+ Years</div>
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
              UnicornEnergies specializes in the energy sector, with a particular focus on oil and gas investments. Our team's deep industry knowledge and market insights give us a competitive edge.
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
      
      {/* Team Section with Updated Images and Info */}
      <section className="py-16 bg-investment-gray">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="heading-lg text-investment-navy font-bold mb-4 bg-white/50 py-2 px-4 rounded-md inline-block shadow-sm">
              Our Leadership Team
            </h2>
            <p className="text-gray-600">
              Meet the experienced professionals who guide our investment strategy and operations. Our leadership team brings decades of combined experience in energy markets, finance, and technology.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg overflow-hidden shadow-md card-hover">
              <div className="h-48 bg-investment-navy overflow-hidden">
                <img src="/lovable-uploads/cfe4dab9-39dc-47d2-93a8-cae4a0722be8.png" alt="Colette Mccarty" className="w-full h-full object-cover" />
              </div>
              <div className="p-5">
                <h3 className="font-bold text-lg text-investment-navy">Colette Mccarty</h3>
                <p className="text-investment-gold font-medium">UX Expert</p>
                <p className="text-gray-600 mt-2">Leading our digital experience initiatives with over 12 years in designing intuitive financial platforms for global clients.</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg overflow-hidden shadow-md card-hover">
              <div className="h-48 bg-investment-navy overflow-hidden">
                <img src="/lovable-uploads/904676b3-ac90-4739-8e50-d7490eea25ae.png" alt="Alden Odom" className="w-full h-full object-cover" />
              </div>
              <div className="p-5">
                <h3 className="font-bold text-lg text-investment-navy">Alden Odom</h3>
                <p className="text-investment-gold font-medium">SEO Expert</p>
                <p className="text-gray-600 mt-2">Driving our digital visibility with 15+ years of experience optimizing financial services platforms in competitive markets.</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg overflow-hidden shadow-md card-hover">
              <div className="h-48 bg-investment-navy overflow-hidden">
                <img src="/lovable-uploads/b42296e6-5ed6-4a14-9d5e-74118ab4558b.png" alt="Sage Bray" className="w-full h-full object-cover" />
              </div>
              <div className="p-5">
                <h3 className="font-bold text-lg text-investment-navy">Sage Bray</h3>
                <p className="text-investment-gold font-medium">Marketing Head</p>
                <p className="text-gray-600 mt-2">With 20+ years in energy sector marketing, Sage has successfully positioned multiple energy investment firms as market leaders.</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg overflow-hidden shadow-md card-hover">
              <div className="h-48 bg-investment-navy overflow-hidden">
                <img src="/lovable-uploads/6ed26c8b-953b-4c36-8b65-b9a2483ebbd4.png" alt="Cyrus Briggs" className="w-full h-full object-cover" />
              </div>
              <div className="p-5">
                <h3 className="font-bold text-lg text-investment-navy">Cyrus Briggs</h3>
                <p className="text-investment-gold font-medium">Developer</p>
                <p className="text-gray-600 mt-2">Leading our tech initiatives with innovative blockchain solutions for secure and transparent investment tracking and transactions.</p>
              </div>
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
              Join thousands of investors who trust UnicornEnergies with their financial future. Our investment plans offer reliable returns with minimal risk.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/investment-plans">
                <Button className="bg-unicorn-gold hover:bg-unicorn-darkGold text-investment-navy font-bold text-lg px-8 py-6">
                  View Investment Plans
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8 py-6">
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
