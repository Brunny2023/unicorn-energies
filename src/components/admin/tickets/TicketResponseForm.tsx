
import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface TicketResponseFormProps {
  response: string;
  handleResponseChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmitResponse: (e: React.FormEvent) => void;
  isSubmitting: boolean;
}

const TicketResponseForm = ({
  response,
  handleResponseChange,
  handleSubmitResponse,
  isSubmitting,
}: TicketResponseFormProps) => {
  return (
    <div className="mt-6">
      <form onSubmit={handleSubmitResponse}>
        <Textarea
          placeholder="Respond to this ticket..."
          value={response}
          onChange={handleResponseChange}
          className="min-h-[100px] bg-unicorn-darkPurple/60 border-unicorn-gold/30 text-white mb-3"
        />
        <div className="flex justify-end">
          <Button
            type="submit"
            className="bg-unicorn-gold hover:bg-unicorn-darkGold text-unicorn-black"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send Response"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TicketResponseForm;
