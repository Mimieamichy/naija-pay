import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';

export const WalletInfo = () => {
  const { publicKey, connected } = useWallet();
  const { connection } = useConnection();
  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    if (publicKey && connected) {
      connection.getBalance(publicKey).then((lamports) => {
        setBalance(lamports / 1e9);
      });
    }
  }, [publicKey, connected, connection]);

  const usdcBalance = 1234.56;

  return (
    <Card className="p-8 bg-gradient-to-br from-card to-secondary border-border">
      <div className="space-y-2">
        <p className="text-muted-foreground">USDC Balance</p>
        <p className="text-5xl font-bold">${usdcBalance.toFixed(2)}</p>
      </div>
    </Card>
  );
};
