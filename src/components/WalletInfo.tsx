import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Wallet, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export const WalletInfo = () => {
  const { connection } = useConnection();
  const { publicKey, connected } = useWallet();
  const [balance, setBalance] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!publicKey || !connection) {
      setBalance(null);
      return;
    }

    const fetchBalance = async () => {
      try {
        const lamports = await connection.getBalance(publicKey);
        setBalance(lamports / LAMPORTS_PER_SOL);
      } catch (error) {
        console.error('Error fetching balance:', error);
        toast.error('Failed to fetch balance');
      }
    };

    fetchBalance();
    const interval = setInterval(fetchBalance, 10000);
    return () => clearInterval(interval);
  }, [publicKey, connection]);

  const handleCopyAddress = () => {
    if (publicKey) {
      navigator.clipboard.writeText(publicKey.toBase58());
      setCopied(true);
      toast.success('Address copied to clipboard');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!connected) {
    return (
      <Card className="p-8 text-center bg-gradient-to-br from-card to-secondary border-primary/20">
        <Wallet className="w-16 h-16 mx-auto mb-4 text-primary" />
        <h2 className="text-2xl font-bold mb-2">Connect Your Wallet</h2>
        <p className="text-muted-foreground mb-6">
          Connect your Solana wallet to start using the app
        </p>
        <WalletMultiButton className="!bg-primary hover:!bg-primary/90" />
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-gradient-to-br from-card to-secondary border-primary/20">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-sm text-muted-foreground mb-1">Connected Wallet</h3>
          <div className="flex items-center gap-2">
            <p className="text-lg font-mono">
              {publicKey?.toBase58().slice(0, 4)}...{publicKey?.toBase58().slice(-4)}
            </p>
            <Button
              size="icon"
              variant="ghost"
              onClick={handleCopyAddress}
              className="h-8 w-8"
            >
              {copied ? (
                <Check className="h-4 w-4 text-accent" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
        <WalletMultiButton className="!bg-secondary hover:!bg-secondary/80 !text-xs" />
      </div>
      
      <div className="pt-4 border-t border-border">
        <p className="text-sm text-muted-foreground mb-1">SOL Balance</p>
        <p className="text-3xl font-bold text-primary">
          {balance !== null ? balance.toFixed(4) : '...'} SOL
        </p>
        <p className="text-xs text-muted-foreground mt-1">Solana Devnet</p>
      </div>
    </Card>
  );
};
