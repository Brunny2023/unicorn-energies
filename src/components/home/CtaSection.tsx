
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const CtaSection = () => {
  return (
    <section className="py-16 md:py-20 bg-investment-navy text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="heading-md mb-6">
            Ready to Secure Your Financial Future with Stable Returns?
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied investors who have discovered the benefits of strategic oil and gas investments with WealthHarbor. Start your journey toward financial freedom today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/register">
              <Button size="lg" className="bg-investment-gold hover:bg-investment-lightGold text-investment-navy font-bold px-8 py-6 text-lg">
                Create Your Account <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 font-bold px-8 py-6 text-lg">
                Contact Our Team
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
