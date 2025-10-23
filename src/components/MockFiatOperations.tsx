import { Button } from '@/components/ui/button';
import { Plus, Minus } from 'lucide-react';
import { toast } from 'sonner';

export const MockFiatOperations = () => {
  const handleDeposit = () => {
    toast.success('Deposit initiated', {
      description: 'Mock naira deposit processing...',
    });
  };

  const handleWithdraw = () => {
    toast.success('Withdrawal initiated', {
      description: 'Mock naira withdrawal processing...',
    });
  };

  return (
    <>
      <Button 
        onClick={handleDeposit}
        variant="gradient"
        className="w-full h-16"
        size="lg"
      >
        <Plus className="w-5 h-5 mr-2" />
        Deposit ₦ (mock)
      </Button>

      <Button 
        onClick={handleWithdraw}
        variant="gradient"
        className="w-full h-16"
        size="lg"
      >
        <Minus className="w-5 h-5 mr-2" />
        Withdraw ₦ (mock)
      </Button>
    </>
  );
};
