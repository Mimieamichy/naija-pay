import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useMemo, useState } from "react";
import { ArrowDownLeft, Plus } from "lucide-react";
import { useSearchParams } from "react-router-dom";

const EXCHANGE_RATE = 1450; // 1 USDC = 1450 ₦ (visual fidelity)

export default function FiatPage() {
  const [params] = useSearchParams();
  const defaultTab = params.get("tab") === "withdraw" ? "withdraw" : "deposit";

  const [nairaAmount, setNairaAmount] = useState<string>("100,000");

  const cleanNaira = useMemo(() => Number(String(nairaAmount).replace(/[^0-9.]/g, "")) || 0, [nairaAmount]);
  const usdcReceive = useMemo(() => cleanNaira / EXCHANGE_RATE, [cleanNaira]);

  return (
    <div className="min-h-screen">
      <Navigation />

      <div className="container mx-auto px-6 py-10">
        <div className="mb-2">
          <h1 className="text-3xl md:text-4xl font-bold">Deposit or Withdraw Funds</h1>
        </div>

        <Tabs defaultValue={defaultTab} className="mt-6">
          <TabsList className="w-fit">
            <TabsTrigger value="deposit">Deposit ₦</TabsTrigger>
            <TabsTrigger value="withdraw">Withdraw ₦</TabsTrigger>
          </TabsList>

          {/* Deposit */}
          <TabsContent value="deposit" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2 bg-[hsl(var(--card))] border-border p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Plus className="w-5 h-5 text-primary" />
                    <h2 className="text-lg font-semibold">Deposit ₦</h2>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Enter the amount you wish to deposit in Naira. The equivalent amount in USDC will be calculated based on the current exchange rate.
                  </p>
                  <p className="text-xs text-muted-foreground">Exchange Rate: 1 USDC = 1,450 ₦</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div className="space-y-2">
                      <Label>Amount to Deposit (₦)</Label>
                      <Input
                        value={nairaAmount}
                        onChange={(e) => setNairaAmount(e.target.value)}
                        placeholder="100,000"
                        className="h-12 rounded-full bg-background/60"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>You will receive (USDC):</Label>
                      <div className="h-12 rounded-full bg-background/40 border border-dashed border-border/60 flex items-center px-4 text-sm">
                        ≈ ${usdcReceive.toFixed(2)}
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <Button variant="accent" size="lg" className="rounded-full">
                      Simulate Deposit
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Status */}
              <Card className="bg-[hsl(var(--card))] border-border p-6">
                <h3 className="text-lg font-semibold mb-4">Transaction Status</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-yellow-400/15 text-yellow-400">⏳</span>
                    <div>
                      <p className="text-sm font-medium">Pending</p>
                      <p className="text-xs text-muted-foreground">Waiting for confirmation</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[hsl(var(--accent))/0.15] text-[hsl(var(--accent))]">✔</span>
                    <div>
                      <p className="text-sm font-medium">Processed</p>
                      <p className="text-xs text-muted-foreground">Transaction successful</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Withdraw */}
          <TabsContent value="withdraw" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2 bg-[hsl(var(--card))] border-border p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <ArrowDownLeft className="w-5 h-5 text-primary" />
                    <h2 className="text-lg font-semibold">Withdraw ₦</h2>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Enter the amount of USDC you wish to convert to Naira. The amount in ₦ will be computed using the exchange rate.
                  </p>
                  <p className="text-xs text-muted-foreground">Exchange Rate: 1 USDC = 1,450 ₦</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div className="space-y-2">
                      <Label>Amount to Convert (USDC)</Label>
                      <Input placeholder="68.97" className="h-12 rounded-full bg-background/60" />
                    </div>

                    <div className="space-y-2">
                      <Label>You will receive (₦):</Label>
                      <div className="h-12 rounded-full bg-background/40 border border-dashed border-border/60 flex items-center px-4 text-sm">
                        ≈ 100,000 ₦
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <Button variant="accent" size="lg" className="rounded-full">
                      Simulate Withdraw
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Status */}
              <Card className="bg-[hsl(var(--card))] border-border p-6">
                <h3 className="text-lg font-semibold mb-4">Transaction Status</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-yellow-400/15 text-yellow-400">⏳</span>
                    <div>
                      <p className="text-sm font-medium">Pending</p>
                      <p className="text-xs text-muted-foreground">Waiting for confirmation</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[hsl(var(--accent))/0.15] text-[hsl(var(--accent))]">✔</span>
                    <div>
                      <p className="text-sm font-medium">Processed</p>
                      <p className="text-xs text-muted-foreground">Transaction successful</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}