import { WalletInfo } from '@/components/WalletInfo';
import { SendToken } from '@/components/SendToken';
import { MockFiatOperations } from '@/components/MockFiatOperations';
import { ReceiveQR } from '@/components/ReceiveQR';
import { TransactionHistory } from '@/components/TransactionHistory';
import { Zap } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">SolPay</h1>
              <p className="text-xs text-muted-foreground">Solana Devnet</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Wallet Connection Section */}
          <WalletInfo />

          {/* Two Column Layout */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <SendToken />
              <MockFiatOperations />
            </div>
            <div className="space-y-6">
              <ReceiveQR />
              <TransactionHistory />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-12 py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>SolPay MVP - Solana Devnet Demo</p>
          <p className="text-xs mt-1">For development and testing purposes only</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
