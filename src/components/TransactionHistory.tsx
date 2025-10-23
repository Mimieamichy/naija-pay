import { Card } from '@/components/ui/card';
import { ArrowUpRight, ArrowDownLeft } from 'lucide-react';

const mockTransactions = [
  {
    id: 1,
    type: 'sent',
    address: '0x...cDEf',
    amount: 50,
    status: 'completed',
    date: 'Oct 26, 2023',
  },
  {
    id: 2,
    type: 'received',
    address: '0x...gHlj',
    amount: 200,
    status: 'completed',
    date: 'Oct 25, 2023',
  },
  {
    id: 3,
    type: 'sent',
    address: '0x...kLMn',
    amount: 15.75,
    status: 'pending',
    date: 'Oct 24, 2023',
  },
];

export const TransactionHistory = () => {
  return (
    <Card className="p-6 bg-gradient-to-br from-card to-secondary border-border">
      <h2 className="text-xl font-bold mb-6">Recent Activity</h2>
      
      <div className="space-y-4">
        {mockTransactions.map((tx) => (
          <div
            key={tx.id}
            className="flex items-center justify-between p-4 bg-background/50 rounded-lg hover:bg-background/70 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                tx.type === 'sent' 
                  ? 'bg-red-500/20' 
                  : 'bg-accent/20'
              }`}>
                {tx.type === 'sent' ? (
                  <ArrowUpRight className="w-5 h-5 text-red-400" />
                ) : (
                  <ArrowDownLeft className="w-5 h-5 text-accent" />
                )}
              </div>
              
              <div>
                <p className="font-medium">
                  {tx.type === 'sent' ? 'Sent to' : 'Received from'} {tx.address}
                </p>
                <p className="text-sm text-muted-foreground">{tx.date}</p>
              </div>
            </div>

            <div className="text-right">
              <p className="font-bold text-lg">
                {tx.type === 'sent' ? '-' : '+'} ${tx.amount.toFixed(2)} USDC
              </p>
              <p className={`text-sm ${
                tx.status === 'pending' ? 'text-yellow-400' : 'text-accent'
              }`}>
                {tx.status === 'pending' ? 'Pending' : 'Completed'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
