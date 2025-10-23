import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="container mx-auto px-6 py-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <span className="text-white font-bold text-xl">N</span>
          </div>
          <span className="text-xl font-bold">NaijaPay</span>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center space-y-8 px-6">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Seamless<br />
            payments for<br />
            Nigeria.
          </h1>
          
          <p className="text-xl text-muted-foreground">
            Connect your wallet to get started.
          </p>

          <div className="flex justify-center">
            <WalletMultiButton 
              className="!bg-gradient-to-r !from-primary !to-accent !text-white !h-14 !px-8 !rounded-lg !text-base !font-medium hover:!opacity-90 !transition-all hover:!scale-105 active:!scale-95 !shadow-lg"
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-8 text-center">
        <div className="flex items-center justify-center gap-2 text-muted-foreground">
          <span>Powered by Solana</span>
          <div className="w-5 h-5 bg-gradient-to-br from-purple-400 to-cyan-400 rounded"></div>
        </div>
      </footer>
    </div>
  );
};
