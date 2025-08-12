import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { ArrowLeft, Home, Search, Plus, Menu, Bell, Settings, Heart, User } from 'lucide-react';

interface TopNavigationProps {
  currentPage: string;
  title?: string;
  subtitle?: string;
  showBack?: boolean;
  showProfile?: boolean;
  showSearch?: boolean;
  showAdd?: boolean;
  showNotifications?: boolean;
  onBack?: () => void;
  onProfile?: () => void;
  onHome?: () => void;
  onSearch?: () => void;
  onAdd?: () => void;
  onNotifications?: () => void;
  notificationCount?: number;
  isSignedIn?: boolean;
}

export function TopNavigation({
  currentPage,
  title,
  subtitle,
  showBack = false,
  showProfile = true,
  showSearch = false,
  showAdd = false,
  showNotifications = false,
  onBack,
  onProfile,
  onHome,
  onSearch,
  onAdd,
  onNotifications,
  notificationCount = 0,
  isSignedIn = false
}: TopNavigationProps) {
  
  const getPageTitle = () => {
    if (title) return title;
    
    switch (currentPage) {
      case 'home': return 'Family Memory Vault';
      case 'upload-memory': return 'Add New Memory';
      case 'memories': return 'Browse Memories';
      case 'family-tree': return 'Family Tree';
      case 'profile': return 'Profile';
      case 'help': return 'Help & Support';
      case 'whatsapp-integration': return 'WhatsApp Integration';
      default: return 'Memory Vault';
    }
  };

  const getPageSubtitle = () => {
    if (subtitle) return subtitle;
    
    switch (currentPage) {
      case 'home': return 'Your sacred digital space';
      case 'upload-memory': return 'Preserve a precious moment';
      case 'memories': return 'Explore your family treasure';
      case 'family-tree': return 'Your family connections';
      case 'profile': return 'Manage your account';
      case 'help': return 'We\'re here to help';
      case 'whatsapp-integration': return 'Share memories instantly';
      default: return '';
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 top-nav-backdrop top-nav-safe">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center space-x-3">
            {showBack ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="p-2 hover:bg-primary/10 text-primary"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={onHome}
                className="p-2 hover:bg-primary/10"
              >
                <div className="p-1 bg-primary/10 rounded-full">
                  <Heart className="w-4 h-4 text-primary" />
                </div>
              </Button>
            )}
            
            <div className="flex-1">
              <h1 className="text-xl font-semibold text-primary leading-tight">
                {getPageTitle()}
              </h1>
              {getPageSubtitle() && (
                <p className="text-sm text-muted-foreground leading-tight">
                  {getPageSubtitle()}
                </p>
              )}
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-2">
            {showSearch && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onSearch}
                className="p-2 hover:bg-accent/10 text-accent"
              >
                <Search className="w-5 h-5" />
              </Button>
            )}
            
            {showAdd && (
              <Button
                size="sm"
                onClick={onAdd}
                className="p-2 vibrant-button text-primary-foreground"
              >
                <Plus className="w-5 h-5" />
              </Button>
            )}
            
            {showNotifications && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onNotifications}
                className="p-2 hover:bg-secondary/10 text-secondary relative"
              >
                <Bell className="w-5 h-5" />
                {notificationCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-secondary text-secondary-foreground text-xs notification-badge">
                    {notificationCount > 9 ? '9+' : notificationCount}
                  </Badge>
                )}
              </Button>
            )}
            
            {showProfile && isSignedIn && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onProfile}
                className="p-1 hover:bg-primary/10 rounded-full"
              >
                <Avatar className="w-8 h-8 border-2 border-primary/20">
                  <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" />
                  <AvatarFallback className="text-xs bg-primary/10 text-primary">
                    AC
                  </AvatarFallback>
                </Avatar>
              </Button>
            )}
            
            {!isSignedIn && (
              <Button
                variant="outline"
                size="sm"
                onClick={onProfile}
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                <User className="w-4 h-4 mr-1" />
                Sign In
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}