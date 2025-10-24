import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const SendToken = () => {
  const navigate = useNavigate();
  const pageUrl = '/send-usdc';

  return (
    <Card className="p-6 bg-gradient-to-br from-card to-secondary border-border">
      <div className="space-y-2 text-center">
        <h2 className="text-xl font-bold">Send & Receive USDC</h2>
        <p className="text-sm text-muted-foreground">Easily send and receive USDC with any Solana wallet address.</p>
        <Button 
          onClick={() => navigate(pageUrl)}
          variant="accent"
          className="w-full h-14 mt-4"
          size="lg"
        >
          <Send className="w-5 h-5 mr-2" />
          Send/Receive USDC
        </Button>
      </div>
    </Card>
  );
};
