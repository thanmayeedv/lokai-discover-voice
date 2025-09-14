import { Search, Globe, User, LogOut, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import Logo from './Logo';

const Navbar = () => {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Signed out successfully",
        description: "You have been signed out of your account.",
      });
      navigate('/auth');
    }
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'admin': return 'destructive';
      case 'vendor': return 'default';
      case 'buyer': return 'secondary';
      default: return 'outline';
    }
  };
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo - Left Side */}
          <Logo />

          {/* Center Search Box */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="text"
                placeholder="Search for services in your area..."
                className="pl-10 pr-4 py-2 w-full rounded-xl border-2 focus:border-accent transition-colors"
              />
            </div>
          </div>

          {/* Right Navigation */}
          <div className="flex items-center gap-4">
            {/* Language Toggle */}
            <Button variant="ghost" size="sm" className="hidden sm:flex items-center gap-2">
              <Globe className="w-4 h-4" />
              <span>हिं</span>
            </Button>

            {/* Navigation Links */}
            <div className="hidden lg:flex items-center gap-6">
              <a href="/" className="text-foreground hover:text-accent transition-colors font-medium">
                Home
              </a>
              <a href="/services" className="text-foreground hover:text-accent transition-colors font-medium">
                Services
              </a>
            </div>

            {/* Auth Section */}
            <div className="flex items-center gap-2">
              {user && profile ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span className="hidden sm:inline">{profile.full_name || user.email}</span>
                      <Badge variant={getRoleBadgeVariant(profile.role)} className="text-xs">
                        {profile.role}
                      </Badge>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <div className="flex flex-col">
                        <span className="font-medium">{profile.full_name || 'User'}</span>
                        <span className="text-xs text-muted-foreground">{user.email}</span>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="flex items-center gap-2">
                      <Settings className="w-4 h-4" />
                      Profile Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      className="flex items-center gap-2 text-destructive"
                      onClick={handleSignOut}
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button 
                  onClick={() => navigate('/auth')}
                  className="bg-gradient-hero text-white hover:opacity-90"
                >
                  Sign In
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden mt-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="text"
              placeholder="Search services..."
              className="pl-10 pr-4 py-2 w-full rounded-xl border-2 focus:border-accent"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;