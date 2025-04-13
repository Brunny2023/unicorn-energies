
import { CheckCircle, Users } from "lucide-react";

const AffiliateHeader = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-white mb-2 flex items-center">
        <Users className="mr-2 h-6 w-6 text-unicorn-gold" />
        Affiliate Program
      </h1>
      
      <div className="bg-unicorn-darkPurple/60 rounded-lg p-4 border border-unicorn-gold/30">
        <h2 className="text-lg font-semibold text-unicorn-gold mb-3">How It Works</h2>
        <ul className="space-y-2">
          <li className="flex items-start">
            <CheckCircle className="h-5 w-5 text-unicorn-gold mr-2 mt-0.5 flex-shrink-0" />
            <span className="text-gray-300">Share your unique referral link with friends and colleagues</span>
          </li>
          <li className="flex items-start">
            <CheckCircle className="h-5 w-5 text-unicorn-gold mr-2 mt-0.5 flex-shrink-0" />
            <span className="text-gray-300">When they invest, you earn 5% of their investment amount</span>
          </li>
          <li className="flex items-start">
            <CheckCircle className="h-5 w-5 text-unicorn-gold mr-2 mt-0.5 flex-shrink-0" />
            <span className="text-gray-300">Earn 2% from your referral's referrals (level 2)</span>
          </li>
          <li className="flex items-start">
            <CheckCircle className="h-5 w-5 text-unicorn-gold mr-2 mt-0.5 flex-shrink-0" />
            <span className="text-gray-300">Earn 1% from your level 2's referrals (level 3)</span>
          </li>
          <li className="flex items-start">
            <CheckCircle className="h-5 w-5 text-unicorn-gold mr-2 mt-0.5 flex-shrink-0" />
            <span className="text-gray-300">All rewards are added to your account balance automatically</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AffiliateHeader;
