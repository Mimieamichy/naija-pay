import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import {
  Bell,
  CheckCircle2,
  Megaphone,
  ShieldCheck,
  ShieldAlert,
  ArrowDownLeft,
  ArrowUpRight,
} from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

// Types
type Category = "all" | "transactions" | "kyc" | "announcements";

interface NotificationItem {
  id: string;
  title: string;
  description: string;
  timeAgo: string;
  category: Category;
  read: boolean;
  icon: JSX.Element;
}

const initialNotifications: NotificationItem[] = [
  {
    id: "n1",
    title: "Payment Received",
    description: "You have received ₦50,000 from John Doe.",
    timeAgo: "2 hours ago",
    category: "transactions",
    read: false,
    icon: <ArrowDownLeft className="w-5 h-5" />,
  },
  {
    id: "n2",
    title: "KYC Verification Successful",
    description: "Your KYC documents have been successfully verified.",
    timeAgo: "1 day ago",
    category: "kyc",
    read: false,
    icon: <ShieldCheck className="w-5 h-5" />,
  },
  {
    id: "n3",
    title: "New Feature: USDC Transfers",
    description: "You can now send and receive USDC with zero fees!",
    timeAgo: "3 days ago",
    category: "announcements",
    read: false,
    icon: <Megaphone className="w-5 h-5" />,
  },
  {
    id: "n4",
    title: "Payment Sent",
    description: "You sent ₦15,000 to Jane Smith.",
    timeAgo: "5 days ago",
    category: "transactions",
    read: true,
    icon: <ArrowUpRight className="w-5 h-5" />,
  },
  {
    id: "n5",
    title: "KYC Action Required",
    description: "Please upload a valid ID to continue using our services.",
    timeAgo: "1 week ago",
    category: "kyc",
    read: true,
    icon: <ShieldAlert className="w-5 h-5" />,
  },
];

export default function NotificationsPage() {
  const [active, setActive] = useState<Category>("all");
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);

  const visible = useMemo(() => {
    if (active === "all") return notifications;
    return notifications.filter((n) => n.category === active);
  }, [active, notifications]);

  const markRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
    const item = notifications.find((n) => n.id === id);
    if (item) toast.success(`Marked as read: ${item.title}`);
  };

  const clearAll = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    toast.info("All notifications marked as read");
  };

  return (
    <div className="min-h-screen">
      <Navigation />

      <div className="container mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl md:text-4xl font-bold">Notifications</h1>
          <Button variant="outline" className="rounded-full" onClick={clearAll}>
            Read All
          </Button>
        </div>

        {/* Filters */}
        <Tabs value={active} onValueChange={(v) => setActive(v as Category)}>
          <TabsList className="w-full sm:w-fit gap-2">
            <TabsTrigger value="all" className="rounded-full px-3 py-2 flex items-center gap-2">
              <Bell className="w-4 h-4" /> All
            </TabsTrigger>
            <TabsTrigger value="transactions" className="rounded-full px-3 py-2 flex items-center gap-2">
              <ArrowDownLeft className="w-4 h-4" /> Transactions
            </TabsTrigger>
            <TabsTrigger value="kyc" className="rounded-full px-3 py-2 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" /> KYC Updates
            </TabsTrigger>
            <TabsTrigger value="announcements" className="rounded-full px-3 py-2 flex items-center gap-2">
              <Megaphone className="w-4 h-4" /> Announcements
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* List */}
        <div className="mt-6 space-y-4">
          {visible.map((n) => (
            <Card
              key={n.id}
              className={cn(
                "bg-[hsl(var(--card))] border-border",
                "p-4 sm:p-5 flex items-start gap-4 justify-between",
              )}
            >
              <div className="flex items-start gap-4">
                <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-background/60 text-foreground border border-border">
                  {n.icon}
                </span>
                <div>
                  <p className="text-sm sm:text-base font-medium">{n.title}</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">{n.description}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-xs text-muted-foreground whitespace-nowrap">{n.timeAgo}</span>
                {n.read ? (
                  <span className="text-xs sm:text-sm text-muted-foreground">Read</span>
                ) : (
                  <button
                    className="text-xs sm:text-sm text-[hsl(var(--accent))] hover:opacity-90"
                    onClick={() => markRead(n.id)}
                  >
                    Mark as read
                  </button>
                )}
              </div>
            </Card>
          ))}

          {visible.length === 0 && (
            <Card className="bg-[hsl(var(--card))] border-border p-6">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">You're all caught up. No notifications here.</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}