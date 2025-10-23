import { useState } from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Send } from 'lucide-react';
import { toast } from 'sonner';

export const SendToken = () => {
  const { publicKey, sendTransaction, connected } = useWallet();
  const { connection } = useConnection();
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!connected || !publicKey) {
      toast.error('Wallet not connected');
      return;
    }

    if (!recipient || !amount) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      const recipientPubkey = new PublicKey(recipient);
      const lamports = parseFloat(amount) * LAMPORTS_PER_SOL;

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: recipientPubkey,
          lamports,
        })
      );

      const signature = await sendTransaction(transaction, connection);
      
      toast.success('Transaction sent!', {
        description: `Signature: ${signature.slice(0, 8)}...`,
      });

      setRecipient('');
      setAmount('');
    } catch (error) {
      console.error('Transaction failed:', error);
      toast.error('Transaction failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-card to-secondary border-border">
      <div className="space-y-4">
        <Input
          placeholder="Recipient address"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          className="bg-background border-border"
        />

        <Input
          type="number"
          placeholder="Amount (USDC)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="bg-background border-border"
        />

        <Button 
          onClick={handleSend} 
          disabled={loading}
          variant="accent"
          className="w-full h-14"
          size="lg"
        >
          <Send className="w-5 h-5 mr-2" />
          {loading ? 'Sending...' : 'Send USDC'}
        </Button>
      </div>
    </Card>
  );
};
