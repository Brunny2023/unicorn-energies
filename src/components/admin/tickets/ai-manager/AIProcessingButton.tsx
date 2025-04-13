
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';

interface AIProcessingButtonProps {
  processing: boolean;
  onProcess: () => Promise<void>;
}

const AIProcessingButton = ({ processing, onProcess }: AIProcessingButtonProps) => {
  return (
    <Button
      onClick={onProcess}
      disabled={processing}
      className="bg-unicorn-gold text-unicorn-darkPurple hover:bg-unicorn-gold/80 w-full"
    >
      {processing ? (
        <span className="h-5 w-5 border-t-2 border-unicorn-darkPurple border-solid rounded-full animate-spin mr-2"></span>
      ) : (
        <Play className="h-4 w-4 mr-2" />
      )}
      Process Open Tickets
    </Button>
  );
};

export default AIProcessingButton;
