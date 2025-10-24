import { Button } from '@/components/ui/button';
import { Plus, ArrowDownLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const MockFiatOperations = () => {
  const navigate = useNavigate();

  const handleDeposit = () => {
    navigate('/fiat?tab=deposit');
  };

  const handleReceive = () => {
    navigate('/fiat?tab=withdraw');
  };

  return (
    <>
      <Button 
        onClick={handleDeposit}
        variant="gradient"
        className="w-full h-16"
        size="lg"
        aria-label="Deposit Naira"
      >
        <Plus className="w-5 h-5 mr-2" />
        Deposit ₦
      </Button>

      <Button 
        onClick={handleReceive}
        variant="gradient"
        className="w-full h-16"
        size="lg"
        aria-label="Receive Naira"
      >
        <ArrowDownLeft className="w-5 h-5 mr-2" />
        Receive Naira
      </Button>
    </>
  );
};
