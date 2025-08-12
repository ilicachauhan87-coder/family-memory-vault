import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';
import { 
  Heart, 
  Camera, 
  Video, 
  Mic, 
  FileText, 
  Calendar, 
  Users, 
  TrendingUp, 
  Star,
  Clock,
  MapPin,
  Sparkles,
  Gift,
  TreePine,
  Upload,
  MessageCircle,
  Eye,
  PlayCircle,
  ChevronRight,
  Flame,
  Crown,
  Zap,
  MoreHorizontal,
  Share2,
  UserPlus
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Memory {
  id: string;
  type: 'photo' | 'video' | 'voice' | 'story';
  title: string;
  description: string;
  author: string;
  authorAvatar: string;
  date: string;
  thumbnail?: string;
  duration?: string;
  tags: string[];
  reactions: number;
  isNew?: boolean;
  relationship: string;
}

interface ReturningUserHomePageProps {
  onNavigate: (page: string) => void;
}

export function ReturningUserHomePage({ onNavigate }: ReturningUserHomePageProps) {
  const [timeOfDay, setTimeOfDay] = useState('');
  const [streakDays, setStreakDays] = useState(7);

  // Dynamic greeting based on time
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setTimeOfDay('Good morning');
    else if (hour < 17) setTimeOfDay('Good afternoon');
    else setTimeOfDay('Good evening');
  }, []);

  // Mock data for dynamic content
  const featuredMemories: Memory[] = [
    {
      id: '1',
      type: 'photo',
      title: 'Miraya\'s First Birthday Prep',
      description: 'Getting ready for our little princess\'s big day! Look how excited she is about the decorations.',
      author: 'Priyam Alok',
      authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      date: '2 hours ago',
      thumbnail: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=300&fit=crop',
      tags: ['birthday', 'celebration', 'family'],
      reactions: 12,
      isNew: true,
      relationship: 'Husband'
    },
    {
      id: '2',
      type: 'video',
      title: 'Gattu Learning New Words',
      description: 'Our feathered family member is getting so smart! He just learned to say "I love family"',
      author: 'Ishan Chauhan',
      authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      date: 'Yesterday',
      thumbnail: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=400&h=300&fit=crop',
      duration: '1:23',
      tags: ['gattu', 'pets', 'funny'],
      reactions: 8,
      relationship: 'Brother'
    },
    {
      id: '3',
      type: 'story',
      title: 'Mom\'s Childhood Tales',
      description: 'Priti shared the most beautiful story about how she met dad at a family wedding. Their eyes met across...',
      author: 'Priti Chauhan',
      authorAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=100&h=100&fit=crop&crop=face',
      date: '3 days ago',
      tags: ['love story', 'parents', 'wedding'],
      reactions: 15,
      relationship: 'Mother'
    },
    {
      id: '4',
      type: 'photo',
      title: 'Family Cooking Session',
      description: 'Teaching Miraya how to make her great-grandmother\'s special recipe. She\'s such a good helper!',
      author: 'You',
      authorAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=100&h=100&fit=crop&crop=face',
      date: '5 days ago',
      thumbnail: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
      tags: ['cooking', 'tradition', 'miraya'],
      reactions: 18,
      relationship: 'You'
    },
    {
      id: '5',
      type: 'voice',
      title: 'Grandpa\'s Birthday Song',
      description: 'Dad singing Miraya her favorite lullaby during bedtime. Such a sweet moment.',
      author: 'Rajeev Kumar Chauhan',
      authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      date: '1 week ago',
      duration: '2:45',
      tags: ['song', 'grandpa', 'bedtime'],
      reactions: 11,
      relationship: 'Father'
    },
    {
      id: '6',
      type: 'photo',
      title: 'Diwali Preparations',
      description: 'The whole family came together to decorate the house. Even Gattu helped with the rangoli!',
      author: 'Ishan Chauhan',
      authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      date: '1 week ago',
      thumbnail: 'https://images.unsplash.com/photo-1478145787956-f6f12c59091d?w=400&h=300&fit=crop',
      tags: ['diwali', 'festival', 'decoration'],
      reactions: 22,
      relationship: 'Brother'
    }
  ];

  const todayMemories: Memory[] = [
    {
      id: '7',
      type: 'photo',
      title: 'This Day Last Year',
      description: 'Miraya\'s first time seeing snow! Look at that expression of pure wonder.',
      author: 'You',
      authorAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=100&h=100&fit=crop&crop=face',
      date: 'January 24, 2024',
      thumbnail: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=300&h=200&fit=crop',
      tags: ['miraya', 'first time', 'winter'],
      reactions: 20,
      relationship: 'You'
    },
    {
      id: '8',
      type: 'voice',
      title: 'Grandpa\'s Birthday Wishes',
      description: 'A heartfelt message from grandpa on this day 3 years ago.',
      author: 'Rajeev Kumar Chauhan',
      authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      date: 'January 24, 2022',
      duration: '2:14',
      tags: ['birthday', 'grandpa', 'blessing'],  
      reactions: 18,
      relationship: 'Father'
    }
  ];

  const recentActivity = [
    { person: 'Priyam Alok', action: 'added 3 photos', time: '2h ago', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face' },
    { person: 'Priti Chauhan', action: 'shared a story', time: '5h ago', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=50&h=50&fit=crop&crop=face' },
    { person: 'Ishan Chauhan', action: 'uploaded video', time: '1d ago', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face' },
    { person: 'Miraya', action: 'mentioned in 2 memories', time: '2d ago', avatar: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=50&h=50&fit=crop&crop=face' }
  ];

  const familyInsights = {
    totalMemories: 234,
    thisWeek: 12,
    mostActive: 'Priyam Alok',
    favoriteType: 'Photos',
    connectionStrength: 85
  };

  const getMemoryIcon = (type: string) => {
    switch (type) {
      case 'photo': return Camera;
      case 'video': return Video;
      case 'voice': return Mic;
      case 'story': return FileText;
      default: return Heart;
    }
  };

  const getMemoryColor = (type: string) => {
    switch (type) {
      case 'photo': return 'text-primary bg-primary/10';
      case 'video': return 'text-coral bg-coral/10';
      case 'voice': return 'text-aqua bg-aqua/10';
      case 'story': return 'text-violet bg-violet/10';
      default: return 'text-muted-foreground bg-muted/10';
    }
  };

  return (
    <div className="min-h-screen bg-background vibrant-texture">
      <div className="px-3 lg:px-4 py-4 lg:py-6 space-y-4 lg:space-y-6">
        {/* Personalized Welcome Header */}
        <div className="text-center space-y-3 lg:space-y-4 fade-in-section">
          <div className="flex items-center justify-center space-x-2">
            <Sparkles className="w-5 h-5 lg:w-6 lg:h-6 text-primary animate-pulse" />
            <h1 className="text-2xl lg:text-3xl text-primary">{timeOfDay}, Ilica!</h1>
            <Sparkles className="w-5 h-5 lg:w-6 lg:h-6 text-primary animate-pulse" />
          </div>
          <div className="flex items-center justify-center space-x-3 lg:space-x-4 flex-wrap gap-y-2">
            <Badge className="bg-coral text-white flex items-center space-x-1 streak-flame text-xs lg:text-sm">
              <Flame className="w-3 h-3" />
              <span>{streakDays} day streak</span>
            </Badge>
            <Badge variant="outline" className="border-primary text-primary notification-badge text-xs lg:text-sm">
              <Eye className="w-3 h-3 mr-1" />
              <span className="hidden sm:inline">3 new memories</span>
              <span className="sm:hidden">3 new</span>
            </Badge>
          </div>
        </div>

        {/* Featured Memory Collage - Mobile-First Design */}
        <Card className="memory-card overflow-hidden">
          <CardHeader className="pb-3 px-4 lg:pb-4 lg:px-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Heart className="w-5 h-5 text-coral" />
                <CardTitle className="text-xl lg:text-2xl">Latest Family Moments</CardTitle>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground text-xs lg:text-sm"
                onClick={() => onNavigate('memories')}
              >
                <span className="hidden sm:inline">View All</span>
                <span className="sm:hidden">All</span>
                <ChevronRight className="w-3 h-3 lg:w-4 lg:h-4 ml-1" />
              </Button>
            </div>
            <CardDescription className="text-sm lg:text-base">
              Beautiful moments shared by your closest family members
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 lg:p-6">
            {/* Mobile: Simple Cards Layout */}
            <div className="block lg:hidden space-y-3">
              {/* Featured Memory - Mobile Card */}
              <div 
                className="relative rounded-xl overflow-hidden cursor-pointer group memory-card-hover h-48"
                onClick={() => onNavigate('memories')}
              >
                <ImageWithFallback
                  src={featuredMemories[0].thumbnail!}
                  alt={featuredMemories[0].title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute top-3 left-3">
                  {featuredMemories[0].isNew && (
                    <Badge className="bg-coral text-white text-xs">
                      <Zap className="w-3 h-3 mr-1" />
                      New
                    </Badge>
                  )}
                </div>
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <div className="flex items-center space-x-2 mb-1">
                    <Avatar className="w-5 h-5 border border-white/20">
                      <AvatarImage src={featuredMemories[0].authorAvatar} />
                      <AvatarFallback className="text-xs">{featuredMemories[0].author.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm opacity-90">{featuredMemories[0].author}</span>
                    <span className="text-xs opacity-70">• {featuredMemories[0].date}</span>
                  </div>
                  <h3 className="font-medium mb-1 text-sm line-clamp-1">{featuredMemories[0].title}</h3>
                  <p className="text-xs opacity-90 line-clamp-1">{featuredMemories[0].description}</p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center space-x-1">
                      <Heart className="w-3 h-3 text-coral" />
                      <span className="text-xs">{featuredMemories[0].reactions}</span>
                    </div>
                    <Share2 className="w-3 h-3 opacity-70" />
                  </div>
                </div>
              </div>

              {/* Additional Memories - Horizontal Scroll */}
              <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
                {featuredMemories.slice(1, 4).map((memory, index) => (
                  <div 
                    key={memory.id}
                    className="flex-shrink-0 w-40 h-32 relative rounded-lg overflow-hidden cursor-pointer group memory-card-hover"
                    onClick={() => onNavigate('memories')}
                  >
                    {memory.thumbnail ? (
                      <ImageWithFallback
                        src={memory.thumbnail}
                        alt={memory.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-violet/20 to-primary/20 flex items-center justify-center">
                        <div className="text-center">
                          <FileText className="w-6 h-6 text-violet mx-auto mb-1" />
                          <p className="text-xs text-primary font-medium line-clamp-1">{memory.title}</p>
                        </div>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-2 left-2 right-2 text-white">
                      <h4 className="text-xs font-medium line-clamp-1">{memory.title}</h4>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs opacity-70 truncate">{memory.author}</span>
                        <div className="flex items-center space-x-1">
                          <Heart className="w-2 h-2 text-coral" />
                          <span className="text-xs">{memory.reactions}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop: Complex Grid Layout */}
            <div className="hidden lg:grid grid-cols-12 grid-rows-8 gap-3 h-96">
              {/* Large featured memory - spans 6 columns, 5 rows */}
              <div 
                className="col-span-6 row-span-5 relative rounded-xl overflow-hidden cursor-pointer group memory-card-hover"
                onClick={() => onNavigate('memories')}
              >
                <ImageWithFallback
                  src={featuredMemories[0].thumbnail!}
                  alt={featuredMemories[0].title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute top-3 left-3">
                  {featuredMemories[0].isNew && (
                    <Badge className="bg-coral text-white">
                      <Zap className="w-3 h-3 mr-1" />
                      New
                    </Badge>
                  )}
                </div>
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <div className="flex items-center space-x-2 mb-2">
                    <Avatar className="w-6 h-6 border border-white/20">
                      <AvatarImage src={featuredMemories[0].authorAvatar} />
                      <AvatarFallback className="text-xs">{featuredMemories[0].author.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm opacity-90">{featuredMemories[0].author}</span>
                    <span className="text-xs opacity-70">• {featuredMemories[0].date}</span>
                  </div>
                  <h3 className="font-medium mb-1 line-clamp-1">{featuredMemories[0].title}</h3>
                  <p className="text-sm opacity-90 line-clamp-2">{featuredMemories[0].description}</p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center space-x-1">
                      <Heart className="w-3 h-3 text-coral" />
                      <span className="text-xs">{featuredMemories[0].reactions}</span>
                    </div>
                    <Share2 className="w-3 h-3 opacity-70" />
                  </div>
                </div>
              </div>

              {/* Medium memory - spans 3 columns, 3 rows */}
              <div 
                className="col-span-3 row-span-3 relative rounded-lg overflow-hidden cursor-pointer group memory-card-hover"
                onClick={() => onNavigate('memories')}
              >
                <ImageWithFallback
                  src={featuredMemories[1].thumbnail!}
                  alt={featuredMemories[1].title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-2 left-2">
                  <div className={`p-1 rounded-full ${getMemoryColor(featuredMemories[1].type)}`}>
                    <Video className="w-3 h-3" />
                  </div>
                </div>
                <div className="absolute bottom-2 left-2 right-2 text-white">
                  <h4 className="text-sm font-medium line-clamp-1">{featuredMemories[1].title}</h4>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs opacity-70">{featuredMemories[1].author}</span>
                    <div className="flex items-center space-x-1">
                      <PlayCircle className="w-3 h-3" />
                      <span className="text-xs">{featuredMemories[1].duration}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Small memory - spans 3 columns, 2 rows */}
              <div 
                className="col-span-3 row-span-2 relative rounded-lg overflow-hidden cursor-pointer group memory-card-hover"
                onClick={() => onNavigate('memories')}
              >
                <div className="w-full h-full bg-gradient-to-br from-violet/20 to-primary/20 flex items-center justify-center">
                  <div className="text-center">
                    <FileText className="w-8 h-8 text-violet mx-auto mb-2" />
                    <h4 className="text-sm font-medium text-primary line-clamp-1">{featuredMemories[2].title}</h4>
                    <p className="text-xs text-muted-foreground">{featuredMemories[2].author}</p>
                  </div>
                </div>
                <div className="absolute top-2 right-2">
                  <div className="flex items-center space-x-1 text-coral">
                    <Heart className="w-3 h-3" />
                    <span className="text-xs">{featuredMemories[2].reactions}</span>
                  </div>
                </div>
              </div>

              {/* Second row - medium memory */}
              <div 
                className="col-span-4 row-span-3 relative rounded-lg overflow-hidden cursor-pointer group memory-card-hover"
                onClick={() => onNavigate('memories')}
              >
                <ImageWithFallback
                  src={featuredMemories[3].thumbnail!}
                  alt={featuredMemories[3].title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-2 left-2 right-2 text-white">
                  <h4 className="text-sm font-medium line-clamp-1">{featuredMemories[3].title}</h4>
                  <p className="text-xs opacity-70 line-clamp-1">{featuredMemories[3].description}</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs opacity-70">{featuredMemories[3].author}</span>
                    <div className="flex items-center space-x-1">
                      <Heart className="w-3 h-3 text-coral" />
                      <span className="text-xs">{featuredMemories[3].reactions}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Voice memory - spans 2 columns, 2 rows */}
              <div 
                className="col-span-2 row-span-2 relative rounded-lg overflow-hidden cursor-pointer group memory-card-hover"
                onClick={() => onNavigate('memories')}
              >
                <div className="w-full h-full bg-gradient-to-br from-aqua/20 to-aqua/40 flex items-center justify-center">
                  <div className="text-center">
                    <Mic className="w-6 h-6 text-aqua mx-auto mb-1" />
                    <p className="text-xs text-primary font-medium">{featuredMemories[4].duration}</p>
                    <p className="text-xs text-muted-foreground line-clamp-1">{featuredMemories[4].author}</p>
                  </div>
                </div>
              </div>

              {/* Last photo memory */}
              <div 
                className="col-span-6 row-span-3 relative rounded-lg overflow-hidden cursor-pointer group memory-card-hover"
                onClick={() => onNavigate('memories')}
              >
                <ImageWithFallback
                  src={featuredMemories[5].thumbnail!}
                  alt={featuredMemories[5].title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-2 left-2 right-2 text-white">
                  <h4 className="text-sm font-medium line-clamp-1">{featuredMemories[5].title}</h4>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs opacity-70">{featuredMemories[5].author}</span>
                    <div className="flex items-center space-x-1">
                      <Heart className="w-3 h-3 text-coral" />
                      <span className="text-xs">{featuredMemories[5].reactions}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>



        {/* Today in Family History */}
        <Card className="memory-card stagger-1">
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-primary" />
              <CardTitle className="text-xl">Today in Family History</CardTitle>
              <Badge variant="outline" className="ml-auto">
                January 24
              </Badge>
            </div>
            <CardDescription>
              Beautiful moments that happened on this day in previous years
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {todayMemories.map((memory) => {
              const MemoryIcon = getMemoryIcon(memory.type);
              return (
                <div
                  key={memory.id}
                  className="flex items-center space-x-4 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 cursor-pointer transition-colors memory-card-hover"
                  onClick={() => onNavigate('memories')}
                >
                  <div className={`p-2 rounded-full ${getMemoryColor(memory.type)}`}>
                    <MemoryIcon className="w-4 h-4" />
                  </div>
                  {memory.thumbnail && (
                    <ImageWithFallback
                      src={memory.thumbnail}
                      alt={memory.title}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                  )}
                  <div className="flex-1">
                    <h4 className="font-medium text-primary">{memory.title}</h4>
                    <p className="text-sm text-muted-foreground line-clamp-1">{memory.description}</p>
                    <p className="text-xs text-muted-foreground">{memory.date}</p>
                  </div>
                  <div className="flex items-center space-x-1 text-coral">
                    <Heart className="w-3 h-3" />
                    <span className="text-sm">{memory.reactions}</span>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Family Connection Insights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="memory-card stagger-2">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-aqua" />
                <CardTitle>Family Vault Growth</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Memories</span>
                  <span className="font-medium text-primary">{familyInsights.totalMemories}</span>
                </div>
                <Progress value={75} className="h-2 progress-enhanced" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">This Week</span>
                  <span className="font-medium text-aqua">+{familyInsights.thisWeek}</span>
                </div>
                <Progress value={60} className="h-2 progress-enhanced" />
              </div>

              <div className="pt-2 border-t border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Most Active</p>
                    <p className="font-medium text-primary">{familyInsights.mostActive}</p>
                  </div>
                  <Crown className="w-5 h-5 text-coral icon-sparkle" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="memory-card stagger-3">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-coral" />
                <CardTitle>Recent Activity</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-3 activity-item" style={{'--index': index} as React.CSSProperties}>
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={activity.avatar} />
                      <AvatarFallback>{activity.person.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm">
                        <button 
                          className="font-medium text-primary hover:text-coral transition-colors cursor-pointer underline decoration-dotted hover:decoration-solid"
                          onClick={(e) => {
                            e.stopPropagation();
                            onNavigate('person-memories');
                          }}
                        >
                          {activity.person}
                        </button>{' '}
                        <span className="text-muted-foreground">{activity.action}</span>
                      </p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions - Mobile-Friendly 2x3 Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4 stagger-4">
          <Card 
            className="memory-card cursor-pointer hover:scale-105 transition-transform memory-card-hover"
            onClick={() => onNavigate('upload-memory')}
          >
            <CardContent className="p-3 lg:p-4 text-center space-y-2">
              <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Upload className="w-5 h-5 lg:w-6 lg:h-6 text-primary" />
              </div>
              <h3 className="font-medium text-primary text-sm lg:text-base">Add Memory</h3>
              <p className="text-xs text-muted-foreground">Share a moment</p>
            </CardContent>
          </Card>

          <Card 
            className="memory-card cursor-pointer hover:scale-105 transition-transform memory-card-hover"
            onClick={() => onNavigate('family-tree')}
          >
            <CardContent className="p-3 lg:p-4 text-center space-y-2">
              <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-aqua/10 flex items-center justify-center mx-auto">
                <TreePine className="w-5 h-5 lg:w-6 lg:h-6 text-aqua" />
              </div>
              <h3 className="font-medium text-aqua text-sm lg:text-base">Family Tree</h3>
              <p className="text-xs text-muted-foreground">See connections</p>
            </CardContent>
          </Card>

          <Card 
            className="memory-card cursor-pointer hover:scale-105 transition-transform memory-card-hover"
            onClick={() => onNavigate('invite-family')}
          >
            <CardContent className="p-3 lg:p-4 text-center space-y-2">
              <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-aqua/10 flex items-center justify-center mx-auto">
                <UserPlus className="w-5 h-5 lg:w-6 lg:h-6 text-aqua" />
              </div>
              <h3 className="font-medium text-aqua text-sm lg:text-base">Invite Family</h3>
              <p className="text-xs text-muted-foreground">Send invitations</p>
            </CardContent>
          </Card>

          <Card 
            className="memory-card cursor-pointer hover:scale-105 transition-transform memory-card-hover"
            onClick={() => onNavigate('festival-reminders')}
          >
            <CardContent className="p-3 lg:p-4 text-center space-y-2">
              <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-cyan-500/10 flex items-center justify-center mx-auto">
                <Gift className="w-5 h-5 lg:w-6 lg:h-6 text-cyan-600" />
              </div>
              <h3 className="font-medium text-cyan-600 text-sm lg:text-base">Festival Reminders</h3>
              <p className="text-xs text-muted-foreground">Never miss moments</p>
            </CardContent>
          </Card>

          <Card 
            className="memory-card cursor-pointer hover:scale-105 transition-transform memory-card-hover"
            onClick={() => onNavigate('time-capsules')}
          >
            <CardContent className="p-3 lg:p-4 text-center space-y-2">
              <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-purple-500/10 flex items-center justify-center mx-auto">
                <Clock className="w-5 h-5 lg:w-6 lg:h-6 text-purple-600" />
              </div>
              <h3 className="font-medium text-purple-600 text-sm lg:text-base">Time Capsule</h3>
              <p className="text-xs text-muted-foreground">Future surprises</p>
            </CardContent>
          </Card>

          <Card 
            className="memory-card cursor-pointer hover:scale-105 transition-transform memory-card-hover"
            onClick={() => onNavigate('memories')}
          >
            <CardContent className="p-3 lg:p-4 text-center space-y-2">
              <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-rose-500/10 flex items-center justify-center mx-auto">
                <MapPin className="w-5 h-5 lg:w-6 lg:h-6 text-rose-600" />
              </div>
              <h3 className="font-medium text-rose-600 text-sm lg:text-base">Memory Journeys</h3>
              <p className="text-xs text-muted-foreground">Story timelines</p>
            </CardContent>
          </Card>
        </div>

        {/* Invite Family Call-to-Action */}
        <Card className="memory-card border-violet/20 bg-gradient-to-r from-violet/5 to-primary/5 stagger-5">
          <CardContent className="p-4 lg:p-6 text-center">
            <Users className="w-10 h-10 lg:w-12 lg:h-12 text-violet mx-auto mb-3 lg:mb-4 icon-sparkle" />
            <h3 className="text-lg lg:text-xl font-medium text-violet mb-2">
              Invite Your Family Members! 👨‍👩‍👧‍👦
            </h3>
            <p className="text-sm lg:text-base text-muted-foreground mb-4">
              Your vault is ready to welcome more family members. Invite them to share memories, stories, and stay connected across generations.
            </p>
            <Button 
              onClick={() => onNavigate('invite-family')}
              className="vibrant-button text-primary-foreground mb-4 text-sm lg:text-base"
            >
              <UserPlus className="w-4 h-4 lg:w-5 lg:h-5 mr-2" />
              Invite Family Members
            </Button>
            <div className="flex items-center justify-center space-x-4 lg:space-x-6 text-xs lg:text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <MessageCircle className="w-3 h-3 lg:w-4 lg:h-4 text-violet" />
                <span>WhatsApp & SMS</span>
              </div>
              <div className="flex items-center space-x-2">
                <Share2 className="w-3 h-3 lg:w-4 lg:h-4 text-aqua" />
                <span>Easy sharing</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Memory Motivation */}
        <Card className="memory-card border-primary/20 bg-gradient-to-r from-primary/5 to-coral/5 stagger-5">
          <CardContent className="p-4 lg:p-6 text-center">
            <Heart className="w-10 h-10 lg:w-12 lg:h-12 text-primary mx-auto mb-3 lg:mb-4 icon-sparkle" />
            <h3 className="text-lg lg:text-xl font-medium text-primary mb-2">
              Your family vault is growing beautifully! 🌱
            </h3>
            <p className="text-sm lg:text-base text-muted-foreground mb-4">
              You've preserved {familyInsights.totalMemories} precious moments. Every memory you add strengthens your family bond and creates a legacy for future generations.
            </p>
            <div className="flex items-center justify-center space-x-3 lg:space-x-4">
              <div className="text-center">
                <p className="text-xl lg:text-2xl font-semibold text-coral">{streakDays}</p>
                <p className="text-xs text-muted-foreground">Day Streak</p>
              </div>
              <Separator orientation="vertical" className="h-6 lg:h-8" />
              <div className="text-center">
                <p className="text-xl lg:text-2xl font-semibold text-aqua">{familyInsights.connectionStrength}%</p>
                <p className="text-xs text-muted-foreground">Family Bond</p>
              </div>
              <Separator orientation="vertical" className="h-6 lg:h-8" />
              <div className="text-center">
                <p className="text-xl lg:text-2xl font-semibold text-primary">{familyInsights.thisWeek}</p>
                <p className="text-xs text-muted-foreground">This Week</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}