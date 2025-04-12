
import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CheckCircle } from "lucide-react";

interface AlertContainerProps {
  saveStatus: {
    status: 'idle' | 'saving' | 'success' | 'error';
    message?: string;
  };
}

export const AlertContainer: React.FC<AlertContainerProps> = ({ saveStatus }) => {
  if (saveStatus.status === 'idle') return null;
  
  if (saveStatus.status === 'success') {
    return (
      <Alert className="bg-green-500/20 border-green-500 text-white">
        <CheckCircle className="h-4 w-4 text-green-500" />
        <AlertTitle>Success</AlertTitle>
        <AlertDescription>{saveStatus.message}</AlertDescription>
      </Alert>
    );
  }
  
  if (saveStatus.status === 'error') {
    return (
      <Alert className="bg-red-500/20 border-red-500 text-white">
        <AlertCircle className="h-4 w-4 text-red-500" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{saveStatus.message}</AlertDescription>
      </Alert>
    );
  }
  
  return null;
};
