import { useWallet } from '@solana/wallet-adapter-react';
import { Navigation } from '@/components/Navigation';
import { LandingPage } from '@/components/LandingPage';
import { WalletInfo } from '@/components/WalletInfo';
import { SendToken } from '@/components/SendToken';
import { MockFiatOperations } from '@/components/MockFiatOperations';
import { TransactionHistory } from '@/components/TransactionHistory';
import { LifetimeStats } from '@/components/LifetimeStats';

const Index = () => {
  const { connected } = useWallet();

  // Show landing page if wallet not connected
  if (!connected) {
    return <LandingPage />;
  }

  // Show dashboard if wallet connected
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Dashboard</h1>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Column - Main Actions */}
            <div className="lg:col-span-2 space-y-6">
              <WalletInfo />
              
              <div className="grid sm:grid-cols-2 gap-4">
                <MockFiatOperations />
              </div>

              <SendToken />
              <TransactionHistory />
            </div>

            {/* Right Column - Stats */}
            <div className="space-y-6">
              <LifetimeStats />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
