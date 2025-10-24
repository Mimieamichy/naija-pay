import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, MoreHorizontal, ArrowUpRight, ArrowDownLeft, Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useMemo } from "react";

// Types
type Currency = "USDC" | "NGN";
type TxStatus = "confirmed" | "pending";

type Tx = {
  date: string; // ISO date string for display
  type: "Send" | "Receive" | "Deposit" | "Withdraw";
  amount: number;
  currency: Currency;
  status: TxStatus;
  signature: string; // truncated display value
};

const initialRows: Tx[] = [
  { date: "2023-10-26", type: "Send", amount: 50.0, currency: "USDC", status: "confirmed", signature: "4Eq...aK9" },
  { date: "2023-10-25", type: "Receive", amount: 10000, currency: "NGN", status: "confirmed", signature: "3vT...pL2" },
  { date: "2023-10-24", type: "Deposit", amount: 100.0, currency: "USDC", status: "pending", signature: "5hW...sQ7" },
  { date: "2023-10-23", type: "Withdraw", amount: 5000, currency: "NGN", status: "confirmed", signature: "2rY...zM4" },
  { date: "2023-10-22", type: "Send", amount: 25.5, currency: "USDC", status: "confirmed", signature: "1kG...tN6" },
];

// Helper UI bits
function TypeIcon({ type }: { type: Tx["type"] }) {
  const common = "w-4 h-4";
  switch (type) {
    case "Send":
      return <ArrowUpRight className={cn(common, "text-[hsl(var(--destructive))]")} />;
    case "Receive":
      return <ArrowDownLeft className={cn(common, "text-[hsl(var(--accent))]")} />;
    case "Deposit":
      return <Plus className={cn(common, "text-[hsl(var(--primary))]")} />;
    case "Withdraw":
      return <Minus className={cn(common, "text-muted-foreground")} />;
  }
}

function StatusBadge({ status }: { status: TxStatus }) {
  if (status === "confirmed") {
    return (
      <Badge className="border-transparent bg-[hsl(var(--accent)/0.18)] text-[hsl(var(--accent))] px-3 py-1 rounded-full flex items-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-[hsl(var(--accent))]" />
        Confirmed
      </Badge>
    );
  }
  return (
    <Badge className="border-transparent bg-[hsl(32,90%,50%/0.22)] text-[hsl(32,90%,60%)] px-3 py-1 rounded-full flex items-center gap-2">
      <span className="inline-block w-2 h-2 rounded-full bg-[hsl(32,90%,60%)]" />
      Pending
    </Badge>
  );
}

function formatAmount(amount: number, currency: Currency) {
  if (currency === "NGN") {
    return new Intl.NumberFormat(undefined, { maximumFractionDigits: 0 }).format(amount) + " ₦";
  }
  return amount.toFixed(2) + " USDC";
}

export default function Transactions() {
  const [filter, setFilter] = useState<"all" | "usdc" | "naira" | "pending">("all");
  const [page, setPage] = useState(1);
  const pageCount = 10; // visual fidelity to design
  const pageSize = 5; // rows per page

  const filtered = useMemo(() => {
    let rows = initialRows;
    if (filter === "usdc") rows = rows.filter((r) => r.currency === "USDC");
    if (filter === "naira") rows = rows.filter((r) => r.currency === "NGN");
    if (filter === "pending") rows = rows.filter((r) => r.status === "pending");
    return rows;
  }, [filter]);

  const visibleRows = filtered.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);

  return (
    <div className="min-h-screen">
      <Navigation />

      <div className="container mx-auto px-6 py-10">
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold">Transactions</h1>
          <p className="text-sm text-muted-foreground mt-2">View your payment history</p>
        </div>

        {/* Filter chips */}
        <div className="flex items-center gap-3 mb-6">
          <button
            className={cn(
              buttonVariants({ variant: "accent", size: "sm" }),
              filter === "all" ? "" : "bg-secondary text-muted-foreground hover:bg-secondary/80",
            )}
            onClick={() => setFilter("all")}
          >
            All
          </button>

          <button
            className={cn(
              buttonVariants({ variant: filter === "usdc" ? "accent" : "ghost", size: "sm" }),
              "rounded-full",
            )}
            onClick={() => setFilter("usdc")}
          >
            USDC
          </button>

          <button
            className={cn(
              buttonVariants({ variant: filter === "naira" ? "accent" : "ghost", size: "sm" }),
              "rounded-full",
            )}
            onClick={() => setFilter("naira")}
          >
            Naira
          </button>

          <button
            className={cn(
              buttonVariants({ variant: filter === "pending" ? "accent" : "ghost", size: "sm" }),
              "rounded-full",
            )}
            onClick={() => setFilter("pending")}
          >
            Pending
          </button>
        </div>

        {/* Table card */}
        <Card className="bg-[hsl(var(--card))] border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-background/30">
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Tx Signature</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {visibleRows.map((tx) => (
                <TableRow key={`${tx.signature}-${tx.date}`} className="hover:bg-background/60">
                  <TableCell>
                    <span className="text-sm">{tx.date}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-secondary/60">
                        <TypeIcon type={tx.type} />
                      </span>
                      <span className="text-sm">{tx.type}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{formatAmount(tx.amount, tx.currency)}</span>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={tx.status} />
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-muted-foreground">{tx.signature}</span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

        {/* Pagination */}
        <nav className="mt-6 flex items-center justify-center gap-3">
          {/* Prev */}
          <button
            className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "rounded-full")}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            aria-label="Previous page"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* 1 */}
          <a
            className={cn(buttonVariants({ variant: page === 1 ? "accent" : "ghost", size: "icon" }), "rounded-full")}
            aria-current={page === 1 ? "page" : undefined}
            onClick={() => setPage(1)}
          >
            1
          </a>
          {/* 2, 3 */}
          <a
            className={cn(buttonVariants({ variant: page === 2 ? "accent" : "ghost", size: "icon" }), "rounded-full")}
            onClick={() => setPage(2)}
          >
            2
          </a>
          <a
            className={cn(buttonVariants({ variant: page === 3 ? "accent" : "ghost", size: "icon" }), "rounded-full")}
            onClick={() => setPage(3)}
          >
            3
          </a>

          {/* ellipsis */}
          <span className="inline-flex h-10 w-10 items-center justify-center text-muted-foreground">
            <MoreHorizontal className="w-4 h-4" />
          </span>

          {/* 10 */}
          <a
            className={cn(buttonVariants({ variant: page === 10 ? "accent" : "ghost", size: "icon" }), "rounded-full")}
            onClick={() => setPage(10)}
          >
            10
          </a>

          {/* Next */}
          <button
            className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "rounded-full")}
            onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
            aria-label="Next page"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </nav>
      </div>
    </div>
  );
}