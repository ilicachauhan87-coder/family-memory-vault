import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Bell, User } from 'lucide-react';

interface FloatingHeaderProps {
  onProfile: () => void;
  onNotifications: () => void;
  notificationCount?: number;
  showNotifications?: boolean;
  showProfile?: boolean;
}

export function FloatingHeader({ 
  onProfile, 
  onNotifications, 
  notificationCount = 0, 
  showNotifications = true,
  showProfile = true 
}: FloatingHeaderProps) {
  if (!showNotifications && !showProfile) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-40 flex items-center space-x-2">
      {/* Notification Button */}
      {showNotifications && (
        <Button
          onClick={onNotifications}
          variant="outline"
          size="sm"
          className="relative w-10 h-10 p-0 rounded-full bg-white/90 backdrop-blur-sm border-primary/20 text-primary hover:bg-primary hover:text-white shadow-lg transition-all duration-300"
        >
          <Bell className="w-4 h-4" />
          {notificationCount > 0 && (
            <Badge 
              className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-coral text-white border-2 border-white notification-badge"
              style={{ fontSize: '10px', fontWeight: '700' }}
            >
              {notificationCount > 9 ? '9+' : notificationCount}
            </Badge>
          )}
        </Button>
      )}
      
      {/* Profile Button */}
      {showProfile && (
        <Button
          onClick={onProfile}
          variant="outline"
          size="sm"
          className="w-10 h-10 p-0 rounded-full bg-white/90 backdrop-blur-sm border-primary/20 text-primary hover:bg-primary hover:text-white shadow-lg transition-all duration-300"
        >
          <User className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
}