import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { ScrollArea } from './ui/scroll-area';
import { Input } from './ui/input';
import { 
  Search,
  Filter,
  Heart,
  Calendar,
  Baby,
  MapPin,
  Camera,
  Video,
  Mic,
  Clock,
  Users,
  Star,
  Gift,
  Cake,
  Footprints,
  GraduationCap,
  Home as HomeIcon,
  Plane,
  PartyPopper,
  ArrowRight,
  Plus,
  BookOpen,
  Smile
} from 'lucide-react';

interface VaultPageProps {
  onNavigate: (page: string) => void;
}

interface Journey {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate?: string;
  memoryCount: number;
  coverImage: string;
  type: 'vacation' | 'milestone' | 'family' | 'tradition';
  participants: string[];
}

interface BabyMilestone {
  id: string;
  title: string;
  description: string;
  date: string;
  babyName: string;
  ageAtMilestone: string;
  photos: number;
  videos: number;
  type: 'first' | 'development' | 'celebration' | 'achievement';
  coverImage: string;
}

export function VaultPage({ onNavigate }: VaultPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'journeys' | 'milestones'>('all');

  // Mock journeys data
  const journeys: Journey[] = [
    {
      id: '1',
      title: 'Shimla Family Vacation 2024',
      description: 'Our magical winter getaway to the mountains with three generations',
      startDate: '2024-01-15',
      endDate: '2024-01-22',
      memoryCount: 47,
      coverImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop',
      type: 'vacation',
      participants: ['Ilica', 'Priyam', 'Miraya', 'Papa', 'Mama']
    },
    {
      id: '2',
      title: 'Miraya\'s First Year Journey',
      description: 'Documenting every precious moment of our little one\'s first year',
      startDate: '2023-09-06',
      endDate: '2024-09-06',
      memoryCount: 234,
      coverImage: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=300&h=200&fit=crop',
      type: 'milestone',
      participants: ['Miraya', 'Ilica', 'Priyam']
    },
    {
      id: '3',
      title: 'Wedding Anniversary Traditions',
      description: 'Celebrating love through the years with our annual traditions',
      startDate: '2020-02-14',
      memoryCount: 28,
      coverImage: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=300&h=200&fit=crop',
      type: 'tradition',
      participants: ['Ilica', 'Priyam']
    },
    {
      id: '4',
      title: 'Diwali Celebrations 2024',
      description: 'Festival of lights bringing the whole family together',
      startDate: '2024-10-20',
      endDate: '2024-10-25',
      memoryCount: 52,
      coverImage: 'https://images.unsplash.com/photo-1605112294851-7295ad65ec39?w=300&h=200&fit=crop',
      type: 'family',
      participants: ['Entire Family']
    }
  ];

  // Mock baby milestones data
  const babyMilestones: BabyMilestone[] = [
    {
      id: '1',
      title: 'First Smile',
      description: 'Miraya\'s first genuine smile that melted our hearts',
      date: '2023-10-15',
      babyName: 'Miraya',
      ageAtMilestone: '1 month 9 days',
      photos: 12,
      videos: 3,
      type: 'first',
      coverImage: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=300&h=200&fit=crop'
    },
    {
      id: '2',
      title: 'First Steps',
      description: 'The magical moment when Miraya took her first independent steps',
      date: '2024-06-20',
      babyName: 'Miraya',
      ageAtMilestone: '9 months 14 days',
      photos: 18,
      videos: 8,
      type: 'development',
      coverImage: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=300&h=200&fit=crop'
    },
    {
      id: '3',
      title: 'First Birthday Celebration',
      description: 'Miraya\'s first birthday party with the entire family',
      date: '2024-09-06',
      babyName: 'Miraya',
      ageAtMilestone: '1 year',
      photos: 85,
      videos: 15,
      type: 'celebration',
      coverImage: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=300&h=200&fit=crop'
    },
    {
      id: '4',
      title: 'First Word - "Mama"',
      description: 'The sweet sound of Miraya saying her first word',
      date: '2024-04-12',
      babyName: 'Miraya',
      ageAtMilestone: '7 months 6 days',
      photos: 6,
      videos: 4,
      type: 'achievement',
      coverImage: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=300&h=200&fit=crop'
    }
  ];

  const getJourneyIcon = (type: string) => {
    switch (type) {
      case 'vacation': return <Plane className="w-5 h-5" />;
      case 'milestone': return <Star className="w-5 h-5" />;
      case 'family': return <Users className="w-5 h-5" />;
      case 'tradition': return <Gift className="w-5 h-5" />;
      default: return <BookOpen className="w-5 h-5" />;
    }
  };

  const getMilestoneIcon = (type: string) => {
    switch (type) {
      case 'first': return <Star className="w-5 h-5" />;
      case 'development': return <Footprints className="w-5 h-5" />;
      case 'celebration': return <PartyPopper className="w-5 h-5" />;
      case 'achievement': return <GraduationCap className="w-5 h-5" />;
      default: return <Baby className="w-5 h-5" />;
    }
  };

  const getJourneyColor = (type: string) => {
    switch (type) {
      case 'vacation': return 'bg-blue-50 border-blue-200 text-blue-700';
      case 'milestone': return 'bg-purple-50 border-purple-200 text-purple-700';
      case 'family': return 'bg-emerald-50 border-emerald-200 text-emerald-700';
      case 'tradition': return 'bg-amber-50 border-amber-200 text-amber-700';
      default: return 'bg-gray-50 border-gray-200 text-gray-700';
    }
  };

  const getMilestoneColor = (type: string) => {
    switch (type) {
      case 'first': return 'bg-pink-50 border-pink-200 text-pink-700';
      case 'development': return 'bg-indigo-50 border-indigo-200 text-indigo-700';
      case 'celebration': return 'bg-orange-50 border-orange-200 text-orange-700';
      case 'achievement': return 'bg-green-50 border-green-200 text-green-700';
      default: return 'bg-gray-50 border-gray-200 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-background vibrant-texture">
      <div className="px-4 py-6 space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-4 stagger-1">
          <div className="flex items-center justify-center space-x-3">
            <div className="p-3 bg-gradient-to-br from-violet to-purple-600 rounded-2xl shadow-lg">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
          </div>
          <div>
            <h1 className="text-3xl text-primary">Family Memory Vault</h1>
            <p className="text-lg text-muted-foreground">
              Your complete collection of precious family moments
            </p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="space-y-4 stagger-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search memories, journeys, milestones..."
              className="pl-10 h-12 text-lg bg-white border-primary/20 focus:border-primary"
            />
          </div>
          
          <div className="flex space-x-2">
            <Button
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('all')}
              className={`rounded-full ${selectedCategory === 'all' ? 'vibrant-button text-primary-foreground' : 'border-primary/30 text-primary'}`}
            >
              All Memories
            </Button>
            <Button
              variant={selectedCategory === 'journeys' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('journeys')}
              className={`rounded-full ${selectedCategory === 'journeys' ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' : 'border-primary/30 text-primary'}`}
            >
              Journeys
            </Button>
            <Button
              variant={selectedCategory === 'milestones' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('milestones')}
              className={`rounded-full ${selectedCategory === 'milestones' ? 'bg-gradient-to-r from-pink-500 to-orange-500 text-white' : 'border-primary/30 text-primary'}`}
            >
              Baby Milestones
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 stagger-3">
          <Card className="memory-card text-center">
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="w-12 h-12 mx-auto bg-gradient-to-br from-coral to-secondary rounded-full flex items-center justify-center">
                  <Camera className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-semibold text-primary">847</p>
                  <p className="text-sm text-muted-foreground">Photos</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="memory-card text-center">
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="w-12 h-12 mx-auto bg-gradient-to-br from-aqua to-teal-600 rounded-full flex items-center justify-center">
                  <Video className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-semibold text-aqua">156</p>
                  <p className="text-sm text-muted-foreground">Videos</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="memory-card text-center">
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="w-12 h-12 mx-auto bg-gradient-to-br from-violet to-purple-600 rounded-full flex items-center justify-center">
                  <Mic className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-semibold text-violet">43</p>
                  <p className="text-sm text-muted-foreground">Voice Notes</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="memory-card text-center">
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="w-12 h-12 mx-auto bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-semibold text-amber-600">12</p>
                  <p className="text-sm text-muted-foreground">Time Capsules</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Journeys Section */}
        {(selectedCategory === 'all' || selectedCategory === 'journeys') && (
          <div className="space-y-4 stagger-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl text-primary">Family Journeys</h2>
                  <p className="text-sm text-muted-foreground">Adventures and special occasions</p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onNavigate('upload-memory')}
                className="border-primary/30 text-primary hover:bg-primary hover:text-white"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Journey
              </Button>
            </div>

            <ScrollArea className="w-full">
              <div className="flex space-x-4 pb-4">
                {journeys.map((journey) => (
                  <Card
                    key={journey.id}
                    className="memory-card cursor-pointer transition-all duration-300 hover:scale-105 min-w-[280px] feature-card-enhanced"
                  >
                    <CardContent className="p-0">
                      <div className="relative">
                        <img
                          src={journey.coverImage}
                          alt={journey.title}
                          className="w-full h-32 object-cover rounded-t-lg"
                        />
                        <Badge className={`absolute top-2 right-2 ${getJourneyColor(journey.type)}`}>
                          {getJourneyIcon(journey.type)}
                          <span className="ml-1 capitalize">{journey.type}</span>
                        </Badge>
                      </div>
                      
                      <div className="p-4 space-y-3">
                        <div>
                          <h3 className="font-semibold text-primary line-clamp-1">{journey.title}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">{journey.description}</p>
                        </div>
                        
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-3 h-3" />
                            <span>{new Date(journey.startDate).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Camera className="w-3 h-3" />
                            <span>{journey.memoryCount} memories</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex -space-x-1">
                            {journey.participants.slice(0, 3).map((participant, index) => (
                              <div
                                key={index}
                                className="w-6 h-6 bg-gradient-to-br from-primary to-secondary rounded-full border-2 border-white flex items-center justify-center"
                              >
                                <span className="text-xs text-white font-medium">
                                  {participant.charAt(0)}
                                </span>
                              </div>
                            ))}
                            {journey.participants.length > 3 && (
                              <div className="w-6 h-6 bg-muted rounded-full border-2 border-white flex items-center justify-center">
                                <span className="text-xs text-muted-foreground">+{journey.participants.length - 3}</span>
                              </div>
                            )}
                          </div>
                          <Button size="sm" variant="ghost" className="text-primary hover:bg-primary/10">
                            <ArrowRight className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </div>
        )}

        {/* Baby Milestones Section */}
        {(selectedCategory === 'all' || selectedCategory === 'milestones') && (
          <div className="space-y-4 stagger-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-br from-pink-500 to-orange-500 rounded-xl">
                  <Baby className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl text-primary">Baby Milestones</h2>
                  <p className="text-sm text-muted-foreground">Precious first moments and achievements</p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onNavigate('upload-memory')}
                className="border-primary/30 text-primary hover:bg-primary hover:text-white"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Milestone
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {babyMilestones.map((milestone) => (
                <Card
                  key={milestone.id}
                  className="memory-card cursor-pointer transition-all duration-300 hover:scale-105 feature-card-enhanced"
                >
                  <CardContent className="p-0">
                    <div className="flex">
                      <div className="relative flex-shrink-0">
                        <img
                          src={milestone.coverImage}
                          alt={milestone.title}
                          className="w-24 h-24 object-cover rounded-l-lg"
                        />
                        <Badge className={`absolute -top-1 -right-1 ${getMilestoneColor(milestone.type)}`}>
                          {getMilestoneIcon(milestone.type)}
                        </Badge>
                      </div>
                      
                      <div className="flex-1 p-4 space-y-2">
                        <div>
                          <h3 className="font-semibold text-primary line-clamp-1">{milestone.title}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">{milestone.description}</p>
                        </div>
                        
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                            <Baby className="w-3 h-3" />
                            <span>{milestone.babyName} • {milestone.ageAtMilestone}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                            <Calendar className="w-3 h-3" />
                            <span>{new Date(milestone.date).toLocaleDateString()}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <Camera className="w-3 h-3" />
                              <span>{milestone.photos}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Video className="w-3 h-3" />
                              <span>{milestone.videos}</span>
                            </div>
                          </div>
                          <Button size="sm" variant="ghost" className="text-primary hover:bg-primary/10">
                            <Smile className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="space-y-4 stagger-6">
          <h3 className="text-lg text-primary">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <Button
              onClick={() => onNavigate('upload-memory')}
              className="h-16 flex-col space-y-2 vibrant-button text-primary-foreground"
            >
              <Plus className="w-6 h-6" />
              <span>Add Memory</span>
            </Button>
            <Button
              onClick={() => onNavigate('time-capsules')}
              variant="outline"
              className="h-16 flex-col space-y-2 border-violet text-violet hover:bg-violet hover:text-white"
            >
              <Clock className="w-6 h-6" />
              <span>Time Capsule</span>
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
}