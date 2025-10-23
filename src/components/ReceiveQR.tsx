import { useWallet } from '@solana/wallet-adapter-react';
import { Card } from '@/components/ui/card';
import { QRCodeSVG } from 'qrcode.react';
import { QrCode } from 'lucide-react';

export const ReceiveQR = () => {
  const { publicKey, connected } = useWallet();

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
      </div>
    </Card>
  );
};
