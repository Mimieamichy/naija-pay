import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { QrCode, Clipboard, ArrowUpRight, ArrowDownLeft, CircleDot } from "lucide-react";
import { useState } from "react";
import { ReceiveQR } from "@/components/ReceiveQR";

export default function SendUSDCPage() {
  const [tab, setTab] = useState<"send" | "receive">("send");
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const usdcBalance = 1234.56;

  return (
    <div className="min-h-screen">
      <Navigation />

      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold">Send & Receive USDC</h1>
          <p className="text-sm text-muted-foreground mt-2">Easily send and receive USDC with any Solana wallet address.</p>
        </div>

        {/* Segmented control */}
        <div className="flex gap-2 mb-6">
          <Button
            onClick={() => setTab("send")}
            variant={tab === "send" ? "accent" : "ghost"}
            className="rounded-full px-6 h-12"
          >
            <ArrowUpRight className="w-4 h-4 mr-2" />
            Send USDC
          </Button>
          <Button
            onClick={() => setTab("receive")}
            variant={tab === "receive" ? "accent" : "ghost"}
            className="rounded-full px-6 h-12"
          >
            <ArrowDownLeft className="w-4 h-4 mr-2" />
            Receive USDC
          </Button>
        </div>

        {/* Main card */}
        <Card className="p-6 bg-gradient-to-br from-card to-secondary border-border rounded-2xl">
          {tab === "send" ? (
            <div className="space-y-6">
              {/* Title + balance */}
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Send USDC</h2>
                <p className="text-sm text-muted-foreground">
                  Your USDC Balance: <span className="font-semibold">{usdcBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </p>
              </div>

              {/* Recipient address */}
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground">Recipient wallet address</p>
                <div className="relative">
                  <Input
                    placeholder="Enter wallet address"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    className="bg-background/60 border-border pr-16 h-12"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-3 text-muted-foreground">
                    <QrCode className="w-4 h-4" />
                    <Clipboard className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Amount */}
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground">Amount (USDC)</p>
                <div className="relative">
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="bg-background/60 border-border pr-12 h-12"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    <CircleDot className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Estimate */}
              <p className="text-center text-xs text-muted-foreground">Estimated transaction fee: ~0.000005 SOL</p>

              {/* CTA */}
              <Button variant="accent" className="w-24 h-10 rounded-full">Send Now</Button>
            </div>
          ) : (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Receive USDC</h2>
              <div className="bg-background/40 rounded-xl p-4">
                <ReceiveQR />
              </div>
            </div>
          )}
        </Card>

       
        
      </div>
    </div>
  );
}