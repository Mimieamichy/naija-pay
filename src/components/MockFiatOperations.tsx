import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowDownToLine, ArrowUpFromLine, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export const MockFiatOperations = () => {
  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [loading, setLoading] = useState<'deposit' | 'withdraw' | null>(null);

  const handleDeposit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!depositAmount) {
      toast.error('Please enter an amount');
      return;
    }

    setLoading('deposit');
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast.success('Deposit initiated!', {
      description: `₦${depositAmount} will be credited to your wallet`,
    });
    
    setDepositAmount('');
    setLoading(null);
  };

  const handleWithdraw = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!withdrawAmount) {
      toast.error('Please enter an amount');
      return;
    }

    setLoading('withdraw');
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast.success('Withdrawal initiated!', {
      description: `₦${withdrawAmount} will be sent to your bank account`,
    });
    
    setWithdrawAmount('');
    setLoading(null);
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-card to-secondary border-accent/20">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <span className="text-2xl">₦</span> Naira Operations (Mock)
      </h2>

      <Tabs defaultValue="deposit" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="deposit">Deposit</TabsTrigger>
          <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
        </TabsList>

        <TabsContent value="deposit">
          <form onSubmit={handleDeposit} className="space-y-4 pt-4">
            <div>
              <Label htmlFor="deposit-amount">Amount (₦)</Label>
              <Input
                id="deposit-amount"
                type="number"
                placeholder="10000"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                className="mt-1"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Simulates receiving USDC from fiat deposit
              </p>
            </div>

            <Button
              type="submit"
              disabled={loading === 'deposit'}
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              {loading === 'deposit' ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <ArrowDownToLine className="w-4 h-4 mr-2" />
                  Deposit Naira
                </>
              )}
            </Button>
          </form>
        </TabsContent>

        <TabsContent value="withdraw">
          <form onSubmit={handleWithdraw} className="space-y-4 pt-4">
            <div>
              <Label htmlFor="withdraw-amount">Amount (₦)</Label>
              <Input
                id="withdraw-amount"
                type="number"
                placeholder="10000"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                className="mt-1"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Simulates converting USDC to fiat withdrawal
              </p>
            </div>

            <Button
              type="submit"
              disabled={loading === 'withdraw'}
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              {loading === 'withdraw' ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <ArrowUpFromLine className="w-4 h-4 mr-2" />
                  Withdraw Naira
                </>
              )}
            </Button>
          </form>
        </TabsContent>
      </Tabs>
    </Card>
  );
};
