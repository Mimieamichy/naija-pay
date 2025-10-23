import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { History, ExternalLink } from 'lucide-react';

interface Transaction {
  id: string;
  type: 'send' | 'receive' | 'deposit' | 'withdraw';
  amount: string;
  status: 'confirmed' | 'pending' | 'failed';
  signature?: string;
  timestamp: Date;
}

// Mock transaction data
const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'deposit',
    amount: '₦50,000',
    status: 'confirmed',
    timestamp: new Date(Date.now() - 3600000),
  },
  {
    id: '2',
    type: 'send',
    amount: '0.5 SOL',
    status: 'confirmed',
    signature: '5a8b9c...',
    timestamp: new Date(Date.now() - 7200000),
  },
];

export const TransactionHistory = () => {
  const getTypeColor = (type: Transaction['type']) => {
    switch (type) {
      case 'send': return 'destructive';
      case 'receive': return 'default';
      case 'deposit': return 'secondary';
      case 'withdraw': return 'outline';
    }
  };

  const getStatusColor = (status: Transaction['status']) => {
    switch (status) {
      case 'confirmed': return 'bg-accent/20 text-accent';
      case 'pending': return 'bg-yellow-500/20 text-yellow-500';
      case 'failed': return 'bg-destructive/20 text-destructive';
    }
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-card to-secondary border-primary/20">
      <div className="flex items-center gap-2 mb-4">
        <History className="w-5 h-5 text-primary" />
        <h2 className="text-xl font-bold">Transaction History</h2>
      </div>

      <div className="space-y-3">
        {mockTransactions.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            No transactions yet
          </p>
        ) : (
          mockTransactions.map((tx) => (
            <div
              key={tx.id}
              className="flex items-center justify-between p-3 bg-background/50 rounded-lg border border-border"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant={getTypeColor(tx.type)} className="capitalize">
                    {tx.type}
                  </Badge>
                  <span className={`text-xs px-2 py-0.5 rounded ${getStatusColor(tx.status)}`}>
                    {tx.status}
                  </span>
                </div>
                <p className="font-semibold">{tx.amount}</p>
                <p className="text-xs text-muted-foreground">
                  {tx.timestamp.toLocaleString()}
                </p>
              </div>
              {tx.signature && (
                <a
                  href={`https://explorer.solana.com/tx/${tx.signature}?cluster=devnet`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          ))
        )}
      </div>
    </Card>
  );
};
