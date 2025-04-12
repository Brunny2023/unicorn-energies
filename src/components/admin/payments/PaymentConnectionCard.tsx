
import React, { ReactNode } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface PaymentConnectionCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  children: ReactNode;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  buttonText: string;
  fullWidth?: boolean;
}

const PaymentConnectionCard: React.FC<PaymentConnectionCardProps> = ({
  title,
  description,
  icon,
  children,
  onSubmit,
  isLoading,
  buttonText,
  fullWidth = false
}) => {
  return (
    <Card className={`bg-unicorn-darkPurple/60 border-unicorn-gold/30 ${fullWidth ? 'md:col-span-2' : ''}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {icon}
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit}>
          <div className="grid gap-4">
            {children}
            <div className="flex justify-end">
              <Button 
                type="submit" 
                className="bg-unicorn-gold hover:bg-unicorn-darkGold text-unicorn-black"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>Saving...</>
                ) : (
                  <>{buttonText}</>
                )}
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default PaymentConnectionCard;
