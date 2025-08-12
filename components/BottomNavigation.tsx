import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Home, FolderOpen, Plus, TreePine, User } from 'lucide-react';

interface BottomNavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  unreadCount?: number;
}

export function BottomNavigation({ currentPage, onNavigate, unreadCount = 0 }: BottomNavigationProps) {
  const navItems = [
    {
      id: 'home',
      label: 'Home',
      emoji: '🏠',
      icon: Home,
      hasNotification: false,
      color: 'text-primary',
      activeGradient: 'from-primary to-violet',
      description: 'Recent memories and highlights'
    },
    {
      id: 'vault',
      label: 'Vault',
      emoji: '📂',
      icon: FolderOpen,
      hasNotification: unreadCount > 0,
      color: 'text-violet',
      activeGradient: 'from-violet to-purple-600',
      description: 'Main memory library'
    },
    {
      id: 'upload-memory',
      label: 'Add',
      emoji: '➕',
      icon: Plus,
      hasNotification: false,
      color: 'text-coral',
      activeGradient: 'from-coral to-secondary',
      description: 'Quick upload shortcut',
      isAction: true
    },
    {
      id: 'family-tree',
      label: 'Tree',
      emoji: '🌳',
      icon: TreePine,
      hasNotification: false,
      color: 'text-aqua',
      activeGradient: 'from-aqua to-teal-600',
      description: 'Interactive tree view'
    },
    {
      id: 'profile',
      label: 'Profile',
      emoji: '👤',
      icon: User,
      hasNotification: false,
      color: 'text-secondary',
      activeGradient: 'from-secondary to-coral',
      description: 'Settings, invites, permissions'
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bottom-nav-backdrop bottom-nav-safe">
      <div className="px-2 py-2">
        <Card className="memory-card mx-auto shadow-2xl border-primary/10 max-w-sm">
          <CardContent className="p-1">
            <div className="flex items-center justify-around">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = currentPage === item.id;
                
                return (
                  <Button
                    key={item.id}
                    variant="ghost"
                    onClick={() => onNavigate(item.id)}
                    className={`
                      flex flex-col items-center justify-center space-y-0.5 p-2 relative
                      min-w-[56px] min-h-[56px] max-w-[64px] rounded-xl transition-all duration-300
                      ${isActive 
                        ? `bg-gradient-to-br ${item.activeGradient} text-white shadow-md scale-105 transform` 
                        : 'text-muted-foreground hover:bg-primary/5 hover:text-primary hover:scale-105'
                      }
                      ${item.isAction ? 'hover:shadow-lg' : ''}
                    `}
                  >
                    <div className="relative flex items-center justify-center">
                      {/* Icon with optimized size */}
                      <div className={`
                        relative z-10 transition-all duration-300 flex items-center justify-center
                        ${isActive 
                          ? 'drop-shadow-sm' 
                          : ''
                        }
                      `}>
                        <IconComponent 
                          className={`
                            w-5 h-5 transition-all duration-300
                            ${isActive 
                              ? 'text-white' 
                              : item.color
                            }
                            ${item.isAction ? 'stroke-2' : 'stroke-1.5'}
                          `} 
                        />
                      </div>
                      
                      {/* Notification badge */}
                      {item.hasNotification && (
                        <Badge 
                          className="absolute -top-1 -right-1 w-4 h-4 p-0 flex items-center justify-center bg-coral text-white border-2 border-white notification-badge"
                          style={{ fontSize: '10px', fontWeight: '700' }}
                        >
                          {unreadCount > 9 ? '9+' : unreadCount}
                        </Badge>
                      )}
                      
                      {/* Special action indicator for Add Memory */}
                      {item.isAction && !isActive && (
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-coral/20 to-secondary/20 rounded-lg animate-pulse -z-10"></div>
                      )}
                    </div>
                    
                    {/* Label with mobile-optimized typography */}
                    <span 
                      className={`
                        transition-all duration-300 text-center leading-none select-none
                        ${isActive 
                          ? 'text-white drop-shadow-sm font-semibold' 
                          : `${item.color} font-medium`
                        }
                      `}
                      style={{
                        fontSize: '11px',
                        fontWeight: isActive ? '600' : '500',
                        letterSpacing: '0.25px',
                        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
                      }}
                    >
                      {item.label}
                    </span>
                    
                    {/* Active indicator dot */}
                    {isActive && (
                      <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full shadow-sm"></div>
                    )}
                    
                    {/* Soft glow effect for active state */}
                    {isActive && (
                      <div className={`
                        absolute inset-0 rounded-xl bg-gradient-to-br ${item.activeGradient} opacity-10 blur-sm -z-10
                      `}></div>
                    )}
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>
        
        {/* Subtle shadow under the navigation bar */}
        <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-black/3 to-transparent -z-10 rounded-t-2xl"></div>
      </div>
    </div>
  );
}