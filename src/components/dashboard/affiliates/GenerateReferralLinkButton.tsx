
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { RefreshCw } from 'lucide-react';

interface GenerateReferralLinkButtonProps {
  userId: string;
  onGenerated: (code: string) => void;
}

const GenerateReferralLinkButton = ({ userId, onGenerated }: GenerateReferralLinkButtonProps) => {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  
  const generateCode = (): string => {
    // Generate a random referral code with letters and numbers
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 8; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };
  
  const handleGenerateReferralCode = async () => {
    setIsGenerating(true);
    try {
      const newCode = generateCode();
      
      // Update the user's profile with the new referral code
      const { error } = await supabase
        .from('profiles')
        .update({ referral_code: newCode })
        .eq('id', userId);
        
      if (error) throw error;
      
      toast({
        title: "Success!",
        description: "Your referral code has been generated.",
      });
      
      onGenerated(newCode);
      setShowConfirmDialog(false);
    } catch (error) {
      console.error('Error generating referral code:', error);
      toast({
        title: "Error",
        description: "Failed to generate referral code. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };
  
  return (
    <>
      <Button
        variant="outline"
        className="border-unicorn-gold/30 text-unicorn-gold hover:bg-unicorn-gold/10"
        onClick={() => setShowConfirmDialog(true)}
      >
        <RefreshCw className="h-4 w-4 mr-2" />
        Generate New Referral Link
      </Button>
      
      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent className="bg-unicorn-darkPurple border-unicorn-gold/30">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Generate New Referral Link?</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              This will replace your existing referral link. Your old link will no longer work.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-unicorn-gold/30 text-white hover:bg-unicorn-black/30">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleGenerateReferralCode}
              disabled={isGenerating}
              className="bg-unicorn-gold hover:bg-unicorn-darkGold text-unicorn-black font-bold"
            >
              {isGenerating ? 'Generating...' : 'Generate New Link'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default GenerateReferralLinkButton;
