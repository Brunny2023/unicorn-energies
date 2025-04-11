
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Download, 
  RefreshCw, 
  AlertTriangle, 
  Printer, 
  Share2, 
  BarChart4, 
  CalendarClock,
  Clock
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface InvestmentDetailActionsProps {
  isActive?: boolean;
}

const InvestmentDetailActions: React.FC<InvestmentDetailActionsProps> = ({ isActive = true }) => {
  const { toast } = useToast();
  const [isReinvesting, setIsReinvesting] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [reinvestAmount, setReinvestAmount] = useState("0");
  const [reinvestDuration, setReinvestDuration] = useState("15");

  const handleReinvest = () => {
    setIsReinvesting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsReinvesting(false);
      setIsDialogOpen(false);
      toast({
        title: "Reinvestment Scheduled",
        description: `Your reinvestment of $${parseFloat(reinvestAmount).toLocaleString()} for ${reinvestDuration} days has been scheduled successfully.`,
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
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button 
                    className="bg-unicorn-gold hover:bg-unicorn-darkGold text-unicorn-black flex items-center justify-center"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Reinvest Profits
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-unicorn-darkPurple border border-unicorn-gold/30 text-white">
                  <DialogHeader>
                    <DialogTitle className="text-unicorn-gold">Schedule Reinvestment</DialogTitle>
                    <DialogDescription className="text-gray-400">
                      Set up a reinvestment from your current profits.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="amount" className="text-right">
                        Amount
                      </Label>
                      <Input
                        id="amount"
                        type="number"
                        value={reinvestAmount}
                        onChange={(e) => setReinvestAmount(e.target.value)}
                        className="col-span-3 bg-unicorn-darkPurple/50 border-unicorn-gold/20 text-white"
                        placeholder="Enter amount"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="duration" className="text-right">
                        Duration
                      </Label>
                      <Select 
                        value={reinvestDuration} 
                        onValueChange={setReinvestDuration}
                      >
                        <SelectTrigger className="col-span-3 bg-unicorn-darkPurple/50 border-unicorn-gold/20 text-white">
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent className="bg-unicorn-darkPurple border-unicorn-gold/20">
                          <SelectItem value="15">15 days</SelectItem>
                          <SelectItem value="30">30 days</SelectItem>
                          <SelectItem value="45">45 days</SelectItem>
                          <SelectItem value="60">60 days</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center gap-2">
                      <CalendarClock className="h-4 w-4 text-unicorn-gold" />
                      <span className="text-sm text-unicorn-gold">
                        Estimated completion date: {
                          new Date(Date.now() + parseInt(reinvestDuration) * 24 * 60 * 60 * 1000).toLocaleDateString()
                        }
                      </span>
                    </div>
                  </div>
                  
                  <DialogFooter>
                    <Button 
                      onClick={handleReinvest}
                      disabled={isReinvesting}
                      className="bg-unicorn-gold hover:bg-unicorn-darkGold text-unicorn-black"
                    >
                      {isReinvesting ? (
                        <span className="h-4 w-4 border-t-2 border-unicorn-black border-solid rounded-full animate-spin mr-2"></span>
                      ) : (
                        <RefreshCw className="h-4 w-4 mr-2" />
                      )}
                      Confirm Reinvestment
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              
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
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="h-9 w-9 border border-unicorn-gold/30 text-unicorn-gold hover:bg-unicorn-gold/10 flex-1"
                    >
                      <Clock className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Investment History</p>
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
