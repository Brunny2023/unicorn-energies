
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, Share2, Check } from "lucide-react";
import GenerateReferralLinkButton from "./GenerateReferralLinkButton";
import { useAuth } from "@/contexts/AuthContext";

interface ReferralLinkProps {
  referralCode: string | null;
  loading: boolean;
  onCodeGenerated?: (code: string) => void;
}

const ReferralLink = ({ referralCode, loading, onCodeGenerated }: ReferralLinkProps) => {
  const [copied, setCopied] = useState(false);
  const { user } = useAuth();
  
  const referralLink = referralCode
    ? `${window.location.origin}/register?ref=${referralCode}`
    : '';
    
  const handleCopyLink = () => {
    if (referralLink) {
      navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };
  
  const handleShare = async () => {
    if (referralLink && navigator.share) {
      try {
        await navigator.share({
          title: 'Join UnicornEnergies',
          text: 'Check out this investment opportunity with UnicornEnergies!',
          url: referralLink,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      handleCopyLink();
    }
  };

  const handleCodeGenerated = (newCode: string) => {
    if (onCodeGenerated) {
      onCodeGenerated(newCode);
    }
  };

  return (
    <Card className="bg-unicorn-darkPurple/80 border-unicorn-gold/30">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-semibold text-white">Your Referral Link</CardTitle>
        {!loading && user && (
          <GenerateReferralLinkButton 
            userId={user.id} 
            onGenerated={handleCodeGenerated}
          />
        )}
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-4">
            <Skeleton className="h-10 w-full bg-gray-700" />
            <div className="flex justify-end space-x-2">
              <Skeleton className="h-10 w-24 bg-gray-700" />
              <Skeleton className="h-10 w-24 bg-gray-700" />
            </div>
          </div>
        ) : referralCode ? (
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-unicorn-black/30 border border-unicorn-gold/30 p-3 rounded-md text-white font-mono flex-1 overflow-x-auto whitespace-nowrap">
                {referralLink}
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                className="border-unicorn-gold/30 text-unicorn-gold hover:bg-unicorn-gold/10"
                onClick={handleCopyLink}
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Link
                  </>
                )}
              </Button>
              <Button
                className="bg-unicorn-gold hover:bg-unicorn-darkGold text-unicorn-black font-bold"
                onClick={handleShare}
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center py-4">
            <p className="text-gray-400 mb-4">You don't have a referral link yet.</p>
            {user && (
              <GenerateReferralLinkButton 
                userId={user.id} 
                onGenerated={handleCodeGenerated}
              />
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ReferralLink;
