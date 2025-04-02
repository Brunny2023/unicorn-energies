
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, HelpCircle, Search } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

// Define FAQ question type
type FaqQuestion = {
  id: string;
  question: string;
  answer: string;
  category: string;
};

// FAQ data
const faqData: FaqQuestion[] = [
  {
    id: "account-1",
    question: "How do I create an account?",
    answer: "Creating an account is simple. Click on the 'Register' button on the top-right corner of the page, fill in your email address, create a password, and submit the form. You'll receive a verification email to activate your account.",
    category: "Account"
  },
  {
    id: "account-2",
    question: "How can I reset my password if I forget it?",
    answer: "Click on the 'Login' button, then select 'Forgot Password'. Enter the email address associated with your account, and we'll send you instructions to reset your password.",
    category: "Account"
  },
  {
    id: "account-3",
    question: "Is my personal information secure?",
    answer: "Yes, we take data security very seriously. All personal information is encrypted and stored securely. We never share your data with third parties without your explicit consent, and we comply with all relevant data protection regulations.",
    category: "Account"
  },
  {
    id: "investments-1",
    question: "What is the minimum investment amount?",
    answer: "Our minimum investment amount starts at $100 with our Goldfish plan. Each investment plan has its own minimum requirement, ranging from $100 to $50,000+ for our premium plans.",
    category: "Investments"
  },
  {
    id: "investments-2",
    question: "How are investment returns calculated?",
    answer: "Returns are calculated based on your selected investment plan. Each plan has a specific daily return percentage that accrues to your account every 24 hours. For example, if you invest $1,000 in a plan with a 1.5% daily return, you'll earn $15 per day.",
    category: "Investments"
  },
  {
    id: "investments-3",
    question: "Are my investments guaranteed?",
    answer: "While we take extensive measures to secure investments and manage risk, all investments carry some level of risk. Our investment strategies are designed to minimize risk while maximizing returns, backed by tangible assets in the oil and gas sector.",
    category: "Investments"
  },
  {
    id: "investments-4",
    question: "Can I have multiple active investments?",
    answer: "Yes, you can have multiple active investments across different plans simultaneously. This allows you to diversify your investment portfolio within our platform.",
    category: "Investments"
  },
  {
    id: "payments-1",
    question: "What payment methods do you accept?",
    answer: "We accept a variety of payment methods including cryptocurrencies (Bitcoin, Ethereum, Litecoin, etc.), bank transfers, and select e-payment systems. Cryptocurrency payments typically offer faster processing times and enhanced privacy.",
    category: "Payments & Withdrawals"
  },
  {
    id: "payments-2",
    question: "How long does it take to process deposits?",
    answer: "Cryptocurrency deposits are typically confirmed within 1-3 blockchain confirmations. Bank transfers and other payment methods may take 1-3 business days depending on your bank and location.",
    category: "Payments & Withdrawals"
  },
  {
    id: "payments-3",
    question: "What is the withdrawal process?",
    answer: "To withdraw funds, log into your account, navigate to the 'Withdraw' section, select the amount you wish to withdraw, choose your withdrawal method, and submit the request. Withdrawals are typically processed within 24 hours.",
    category: "Payments & Withdrawals"
  },
  {
    id: "payments-4",
    question: "Is there a minimum withdrawal amount?",
    answer: "There is no minimum withdrawal amount for profits. You can withdraw any amount of your earned profits at any time. For principal withdrawals, terms may vary depending on your selected investment plan.",
    category: "Payments & Withdrawals"
  },
  {
    id: "referral-1",
    question: "How does the referral program work?",
    answer: "Our multi-level referral program allows you to earn commissions when you refer others to our platform. You'll earn a percentage of the investments made by your referrals, creating a passive income stream alongside your investments.",
    category: "Referral Program"
  },
  {
    id: "referral-2",
    question: "What are the referral commission rates?",
    answer: "Our referral commission structure includes multiple levels: 5% for direct referrals (level 1), 2% for level 2 referrals, and 1% for level 3 referrals. Commissions are calculated based on the investment amount and credited to your account immediately when your referral makes a deposit.",
    category: "Referral Program"
  },
  {
    id: "security-1",
    question: "How secure is your platform?",
    answer: "We employ multiple layers of security including SSL encryption, DDoS protection, and dedicated secure servers. All user accounts are protected with 2FA (two-factor authentication) options, and we conduct regular security audits to maintain the highest standards.",
    category: "Security"
  },
  {
    id: "security-2",
    question: "Do you offer two-factor authentication (2FA)?",
    answer: "Yes, we strongly recommend enabling two-factor authentication for your account. You can set up 2FA using authenticator apps like Google Authenticator or Authy through your account security settings.",
    category: "Security"
  }
];

const Faq = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  
  const categories = ["All", "Account", "Investments", "Payments & Withdrawals", "Referral Program", "Security"];
  
  // Filter questions based on search term and active category
  const filteredQuestions = faqData.filter((question) => {
    const matchesSearch = question.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         question.answer.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = activeCategory === "All" || question.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="hero-gradient text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-xl mb-6">Frequently Asked Questions</h1>
            <p className="text-xl text-gray-200">
              Find answers to the most common questions about our investment platform, processes, and services.
            </p>
          </div>
        </div>
      </section>
      
      {/* Search & Categories */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="relative mb-8">
              <input
                type="text"
                placeholder="Search for answers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full py-3 px-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-investment-navy"
              />
              <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
            </div>
            
            <div className="flex flex-wrap items-center gap-3 mb-8">
              <span className="text-gray-600 font-medium">Filter by:</span>
              {categories.map((category) => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    activeCategory === category
                      ? "bg-investment-navy text-white"
                      : "bg-investment-gray text-investment-navy hover:bg-gray-300"
                  }`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Accordion */}
      <section className="py-8 pb-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {filteredQuestions.length === 0 ? (
              <div className="text-center py-12">
                <HelpCircle className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-2xl font-bold text-investment-navy mb-2">No results found</h3>
                <p className="text-gray-600">
                  We couldn't find any questions matching your search. Please try different keywords or browse by category.
                </p>
              </div>
            ) : (
              <Accordion type="single" collapsible className="w-full">
                {filteredQuestions.map((faq) => (
                  <AccordionItem key={faq.id} value={faq.id} className="border-b border-gray-200">
                    <AccordionTrigger className="text-left text-lg font-medium text-investment-navy py-4 hover:text-investment-gold transition-colors">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 pb-4">
                      <p>{faq.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
            
            <div className="mt-12 bg-investment-gray p-8 rounded-lg">
              <h3 className="text-xl font-bold text-investment-navy mb-4">
                Still have questions?
              </h3>
              <p className="text-gray-600 mb-6">
                Our team is here to assist you with any additional questions or concerns you may have about our investment platform or services.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact">
                  <Button className="bg-investment-navy hover:bg-investment-lightNavy text-white">
                    Contact Support
                  </Button>
                </Link>
                <Link to="/how-it-works">
                  <Button variant="outline" className="border-investment-navy text-investment-navy hover:bg-investment-navy hover:text-white">
                    Learn How It Works
                  </Button>
                </Link>
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
              Join thousands of satisfied investors who are already benefiting from our reliable and profitable investment plans.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/register">
                <Button className="bg-investment-gold hover:bg-investment-lightGold text-investment-navy font-bold">
                  Create Your Account <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/calculator">
                <Button variant="outline" className="border-white text-white hover:bg-white/10">
                  Try Our Profit Calculator
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

export default Faq;
