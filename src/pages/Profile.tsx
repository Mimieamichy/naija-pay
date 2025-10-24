import { Navigation } from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

 import { Upload, Camera, Pencil, ShieldAlert } from "lucide-react";
 import { useWallet } from "@solana/wallet-adapter-react";
 import { toast } from "sonner";
 import { useMemo, useRef, useState } from "react";
 import { cn } from "@/lib/utils";

function truncateAddress(addr?: string | null) {
  if (!addr) return "—";
  const a = String(addr);
  return `${a.slice(0, 4)}...${a.slice(-4)}`;
}

export default function Profile() {
  const { disconnect, publicKey } = useWallet();
  const walletStr = useMemo(() => truncateAddress(publicKey?.toBase58?.()), [publicKey]);

  // Contact info state
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john.doe@example.com");
  const [phone, setPhone] = useState("+234 801 234 5678");
  const [country, setCountry] = useState("Nigeria");

  // KYC form state
  const [idDocType, setIdDocType] = useState("Passport");
  const [addrDocType, setAddrDocType] = useState("bank");
  const [idFile, setIdFile] = useState<File | null>(null);
  const [addrFile, setAddrFile] = useState<File | null>(null);
  const idInputRef = useRef<HTMLInputElement | null>(null);
  const addrInputRef = useRef<HTMLInputElement | null>(null);

  const onSave = () => {
    toast.success("Profile saved", { description: "Your contact information has been updated." });
  };

  const onLogout = () => disconnect();

  const onSubmitKyc = () => {
    toast.message("KYC submitted", { description: "We will review your documents shortly." });
  };

  return (
    <div className="min-h-screen">
      <Navigation />

      <div className="container mx-auto px-6 py-10">
        <div className="mb-2">
          <h1 className="text-3xl md:text-4xl font-bold">Profile & KYC</h1>
          <p className="text-sm text-muted-foreground mt-2">Manage your profile and complete KYC verification.</p>
        </div>

        {/* Responsive two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* Left column: spans 2 */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile card */}
            <Card className="bg-[hsl(var(--card))] border-border">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src="/placeholder.svg" alt="Profile" />
                        <AvatarFallback className="bg-secondary" />
                      </Avatar>
                      <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-primary flex items-center justify-center border-2 border-background">
                        <Pencil className="w-3.5 h-3.5 text-white" />
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">John Doe</h3>
                      <p className="text-sm text-muted-foreground">{walletStr}</p>
                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        <Badge className="bg-[hsl(36,92%,52%/0.2)] text-[hsl(36,92%,70%)] border-transparent flex items-center gap-1">
                          <ShieldAlert className="w-3.5 h-3.5" />
                          Status: KYC
                        </Badge>
                        <Badge className="bg-[hsl(280,60%,50%/0.2)] text-[hsl(280,60%,70%)] border-transparent">Pending</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
                    <Button variant="gradient" size="sm" className="rounded-full w-full sm:w-auto">Save Profile</Button>
                    <Button variant="ghost" size="sm" onClick={onLogout} className="rounded-full w-full sm:w-auto">Log Out</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="bg-[hsl(var(--card))] border-border">
              <CardContent className="p-6 space-y-4">
                <h3 className="font-semibold">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Country</Label>
                    <Select value={country} onValueChange={setCountry}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Nigeria">Nigeria</SelectItem>
                        <SelectItem value="Ghana">Ghana</SelectItem>
                        <SelectItem value="Kenya">Kenya</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="pt-2">
                  <Button variant="gradient" className="rounded-full" onClick={onSave}>Save Profile</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right column: KYC Panel */}
          <div className="space-y-6">
            <Card className="bg-[hsl(var(--card))] border-border">
              <CardContent className="p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold">Identity Verification (KYC)</h3>
                </div>

                {/* Proof of Identity */}
                <div className="space-y-3">
                  <h4 className="font-semibold">Proof of Identity</h4>
                  <p className="text-sm text-muted-foreground">Select document type and upload the file.</p>

                  <Label className="text-xs">Document Type</Label>
                  <Select value={idDocType} onValueChange={setIdDocType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Passport">Passport</SelectItem>
                      <SelectItem value="National ID">National ID</SelectItem>
                      <SelectItem value="Driver's License">Driver's License</SelectItem>
                    </SelectContent>
                  </Select>

                  <div
                    className="mt-3 rounded-lg border border-dashed border-border/60 bg-background/30 p-4 h-24 flex items-center justify-center text-sm cursor-pointer"
                    onClick={() => idInputRef.current?.click()}
                  >
                    <Upload className="w-4 h-4 mr-2 opacity-70" />
                    {idFile ? <span>{idFile.name}</span> : <span>Click to upload document</span>}
                  </div>
                  <input ref={idInputRef} type="file" className="hidden" onChange={(e) => setIdFile(e.target.files?.[0] ?? null)} />
                </div>

                {/* Proof of Address */}
                <div className="space-y-3">
                  <h4 className="font-semibold">Proof of Address</h4>
                  <p className="text-sm text-muted-foreground">Select document type and upload the file.</p>

                  <div className="flex items-center gap-3">
                    <button
                      className={cn("px-4 py-3 rounded-lg border", addrDocType === "bank" ? "border-primary bg-primary/10" : "border-border bg-background/20")}
                      onClick={() => setAddrDocType("bank")}
                    >
                      <span className="text-sm">Bank Statement</span>
                    </button>
                    <button
                      className={cn("px-4 py-3 rounded-lg border", addrDocType === "utility" ? "border-primary bg-primary/10" : "border-border bg-background/20")}
                      onClick={() => setAddrDocType("utility")}
                    >
                      <span className="text-sm">Recent Utility Bill</span>
                    </button>
                  </div>

                  <div
                    className="mt-3 rounded-lg border border-dashed border-border/60 bg-background/30 p-4 h-24 flex items-center justify-center text-sm cursor-pointer"
                    onClick={() => addrInputRef.current?.click()}
                  >
                    <Upload className="w-4 h-4 mr-2 opacity-70" />
                    {addrFile ? <span>{addrFile.name}</span> : <span>Click to upload document</span>}
                  </div>
                  <input ref={addrInputRef} type="file" className="hidden" onChange={(e) => setAddrFile(e.target.files?.[0] ?? null)} />
                </div>

                {/* Face Scan */}
                <div className="space-y-3">
                  <h4 className="font-semibold">Face Scan</h4>
                  <p className="text-sm text-muted-foreground">Complete a quick face scan for enhanced verification.</p>
                  <Button variant="gradient" className="w-full h-16 text-sm rounded-lg">
                    <Camera className="w-4 h-4 mr-2" />
                    Start Face Scan
                  </Button>
                </div>

                <div className="pt-2">
                  <Button variant="gradient" className="w-full h-12 rounded-full" onClick={onSubmitKyc}>
                    Submit for Verification
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}