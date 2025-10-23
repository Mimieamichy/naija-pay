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
      <header className="border-b border-accent/20 bg-card/80 backdrop-blur-sm sticky top-0 z-10 shadow-[0_0_30px_hsl(var(--accent)/0.1)]">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3 animate-slide-up">
            <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center animate-glow">
              <Zap className="w-6 h-6 text-background" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-accent">SolPay</h1>
              <p className="text-xs text-muted-foreground">Solana Devnet</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Wallet Connection Section */}
          <div className="animate-slide-up">
            <WalletInfo />
          </div>

          {/* Two Column Layout */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <SendToken />
              <MockFiatOperations />
            </div>
            <div className="space-y-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <ReceiveQR />
              <TransactionHistory />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-accent/20 mt-12 py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>SolPay MVP - Solana Devnet Demo</p>
          <p className="text-xs mt-1">For development and testing purposes only</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
