
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, RefreshCw, AlertTriangle, Printer, Share2, BarChart4 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface InvestmentDetailActionsProps {
  isActive?: boolean;
}

const InvestmentDetailActions: React.FC<InvestmentDetailActionsProps> = ({ isActive = true }) => {
  const { toast } = useToast();
  const [isReinvesting, setIsReinvesting] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);

  const handleReinvest = () => {
    setIsReinvesting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsReinvesting(false);
      toast({
        title: "Reinvestment Scheduled",
        description: "Your reinvestment has been scheduled successfully.",
      });
    }, 1500);
  };

  const handleDownloadStatement = () => {
    setIsDownloading(true);
    
    // Simulate download
    setTimeout(() => {
      setIsDownloading(false);
      toast({
        title: "Statement Downloaded",
        description: "Your investment statement has been downloaded.",
      });
    }, 1000);
  };

  const handlePrintStatement = () => {
    setIsPrinting(true);
    
    // Simulate print operation
    setTimeout(() => {
      setIsPrinting(false);
      toast({
        title: "Print Requested",
        description: "Your investment statement is being prepared for printing.",
      });
    }, 800);
  };

  const handleShareInvestment = () => {
    toast({
      title: "Share Link Generated",
      description: "Investment details link has been copied to clipboard.",
    });
  };
  
  const handleViewReports = () => {
    toast({
      title: "Reports Loading",
      description: "Detailed performance reports are being generated.",
    });
  };

  return (
    <div className="pt-4">
      <h3 className="text-lg font-medium text-unicorn-gold mb-4">Investment Actions</h3>
      <div className="flex flex-col space-y-2">
        {isActive ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <Button 
                className="bg-unicorn-gold hover:bg-unicorn-darkGold text-unicorn-black flex items-center justify-center"
                onClick={handleReinvest}
                disabled={isReinvesting}
              >
                {isReinvesting ? (
                  <span className="h-4 w-4 border-t-2 border-unicorn-black border-solid rounded-full animate-spin mr-2"></span>
                ) : (
                  <RefreshCw className="h-4 w-4 mr-2" />
                )}
                Reinvest Profits
              </Button>
              
              <Button 
                variant="outline" 
                className="border-unicorn-gold/50 text-unicorn-gold hover:bg-unicorn-gold/10 flex items-center justify-center"
                onClick={handleDownloadStatement}
                disabled={isDownloading}
              >
                {isDownloading ? (
                  <span className="h-4 w-4 border-t-2 border-unicorn-gold border-solid rounded-full animate-spin mr-2"></span>
                ) : (
                  <Download className="h-4 w-4 mr-2" />
                )}
                Download Statement
              </Button>
            </div>
            
            <div className="flex justify-between mt-2 gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="h-9 w-9 border border-unicorn-gold/30 text-unicorn-gold hover:bg-unicorn-gold/10 flex-1"
                      onClick={handlePrintStatement}
                      disabled={isPrinting}
                    >
                      {isPrinting ? (
                        <span className="h-4 w-4 border-t-2 border-unicorn-gold border-solid rounded-full animate-spin"></span>
                      ) : (
                        <Printer className="h-4 w-4" />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Print Statement</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="h-9 w-9 border border-unicorn-gold/30 text-unicorn-gold hover:bg-unicorn-gold/10 flex-1"
                      onClick={handleShareInvestment}
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Share Investment</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="h-9 w-9 border border-unicorn-gold/30 text-unicorn-gold hover:bg-unicorn-gold/10 flex-1"
                      onClick={handleViewReports}
                    >
                      <BarChart4 className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Performance Reports</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </>
        ) : (
          <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-lg flex items-start">
            <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-white">This investment is not active.</p>
              <p className="text-xs text-gray-400 mt-1">Actions are limited for inactive investments.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InvestmentDetailActions;
