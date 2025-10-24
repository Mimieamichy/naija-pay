import { useWallet } from '@solana/wallet-adapter-react';
import { Card } from '@/components/ui/card';
import { QRCodeSVG } from 'qrcode.react';
import { QrCode, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { toast } from 'sonner';

export const ReceiveQR = () => {
  const { publicKey, connected } = useWallet();
  const [copied, setCopied] = useState(false);

  const copyAddress = async () => {
    if (!publicKey) return;
    try {
      await navigator.clipboard.writeText(publicKey.toBase58());
      setCopied(true);
      toast.success('Address copied to clipboard');
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      toast.error('Failed to copy address');
    }
  };

  if (!connected || !publicKey) {
    return (
      <Card className="p-6 bg-gradient-to-br from-card to-secondary border-primary/20 text-center">
        <QrCode className="w-12 h-12 mx-auto mb-2 text-muted-foreground" />
        <p className="text-muted-foreground">Connect wallet to generate QR code</p>
      </Card>
    );
  }

  const solanaPayUrl = `solana:${publicKey.toBase58()}`;

  return (
    <Card className="p-6 bg-gradient-to-br from-card to-secondary border-primary/20">
      <div className="flex items-center gap-2 mb-4">
        <QrCode className="w-5 h-5 text-primary" />
        <h2 className="text-xl font-bold">Receive</h2>
      </div>

      <div className="bg-white p-4 rounded-lg mb-4">
        <QRCodeSVG
          value={solanaPayUrl}
          size={200}
          className="mx-auto"
          level="H"
          includeMargin
        />
      </div>

      <div className="text-center">
        <p className="text-sm text-muted-foreground mb-1">Your Wallet Address</p>
        <p className="text-xs font-mono break-all bg-secondary p-2 rounded">
          {publicKey.toBase58()}
        </p>
        <div className="mt-3">
          <Button onClick={copyAddress} variant="outline" size="sm" className="rounded-full">
            {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
            {copied ? 'Copied' : 'Copy Address'}
          </Button>
        </div>
      </div>
    </Card>
  );
};
