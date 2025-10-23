import { Link, useLocation } from 'react-router-dom';
import { Bell, Power, User } from 'lucide-react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export const Navigation = () => {
  const location = useLocation();
  const { disconnect, connected } = useWallet();

  const navItems = [
    { name: 'Dashboard', path: '/' },
    { name: 'Transactions', path: '/transactions' },
    { name: 'Profile', path: '/profile' },
  ];

  return (
    <nav className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <span className="text-white font-bold text-xl">N</span>
            </div>
            <span className="text-xl font-bold">NaijaPay</span>
          </Link>

          {/* Nav Links */}
          {connected && (
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    location.pathname === item.path
                      ? 'text-foreground'
                      : 'text-muted-foreground'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          )}

          {/* Right Actions */}
          {connected && (
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Bell className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                onClick={() => disconnect()}
              >
                <Power className="w-5 h-5" />
              </Button>
              <Avatar>
                <AvatarFallback className="bg-gradient-to-br from-primary to-accent">
                  <User className="w-5 h-5 text-white" />
                </AvatarFallback>
              </Avatar>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
