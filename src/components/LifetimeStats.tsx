import { Card } from '@/components/ui/card';

export const LifetimeStats = () => {
  return (
    <Card className="p-6 bg-gradient-to-br from-card to-secondary border-border">
      <h2 className="text-xl font-bold mb-6">Lifetime Stats</h2>
      
      <div className="space-y-6">
        <div>
          <p className="text-sm text-muted-foreground mb-1">Total Sent</p>
          <p className="text-2xl font-bold">$5,432.10</p>
        </div>
        
        <div>
          <p className="text-sm text-muted-foreground mb-1">Total Received</p>
          <p className="text-2xl font-bold">$8,765.43</p>
        </div>

        {/* Gradient Chart Visualization */}
        <div className="relative h-32 bg-gradient-to-br from-purple-900/30 to-cyan-900/30 rounded-lg overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 300 100" preserveAspectRatio="none">
            <defs>
              <linearGradient id="chartGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(263 70% 64%)" />
                <stop offset="100%" stopColor="hsl(180 85% 60%)" />
              </linearGradient>
            </defs>
            <path
              d="M 0 60 Q 75 30, 150 50 T 300 40"
              stroke="url(#chartGradient)"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    </Card>
  );
};
