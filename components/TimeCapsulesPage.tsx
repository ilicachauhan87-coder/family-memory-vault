import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { ScrollArea } from './ui/scroll-area';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { 
  Clock, 
  Plus, 
  ArrowLeft, 
  Calendar as CalendarIcon, 
  Timer, 
  Lock, 
  Unlock, 
  Heart, 
  Star, 
  Gift,
  CheckCircle,
  AlertCircle,
  Clock4,
  Archive,
  Users,
  Eye,
  MessageSquare,
  Camera
} from 'lucide-react';
import { format } from 'date-fns';

interface TimeCapsule {
  id: string;
  title: string;
  message: string;
  createdDate: Date;
  openDate: Date;
  status: 'sealed' | 'opened' | 'upcoming';
  recipients: string[];
  attachments: {
    photos: string[];
    voices: string[];
    videos: string[];
  };
  isLocked: boolean;
  category: 'personal' | 'family' | 'milestone' | 'future-self';
}

interface TimeCapsulesPageProps {
  onBack: () => void;
}

export function TimeCapsulesPage({ onBack }: TimeCapsulesPageProps) {
  const [currentView, setCurrentView] = useState<'list' | 'create' | 'view'>('list');
  const [selectedCapsule, setSelectedCapsule] = useState<TimeCapsule | null>(null);
  const [newCapsule, setNewCapsule] = useState({
    title: '',
    message: '',
    openDate: undefined as Date | undefined,
    recipients: [] as string[],
    category: 'personal' as 'personal' | 'family' | 'milestone' | 'future-self'
  });

  // Mock time capsules data
  const timeCapsules: TimeCapsule[] = [
    {
      id: '1',
      title: 'Miraya\'s First Birthday Wishes',
      message: 'Dear future Miraya, today you turned 1! You said "mama" for the first time and took your first steps. We are so proud of you...',
      createdDate: new Date('2024-09-06'),
      openDate: new Date('2033-09-06'), // When she turns 10
      status: 'sealed',
      recipients: ['miraya-chauhan-sinha'],
      attachments: {
        photos: ['first-steps.jpg', 'birthday-cake.jpg'],
        voices: ['mama-first-word.m4a'],
        videos: ['first-steps-video.mp4']
      },
      isLocked: true,
      category: 'milestone'
    },
    {
      id: '2',
      title: 'COVID-19 Time Capsule - 2024',
      message: 'A collection of memories, hopes, and reflections from our family during these unprecedented times...',
      createdDate: new Date('2024-03-15'),
      openDate: new Date('2029-03-15'), // 5 years later
      status: 'sealed',
      recipients: ['family'],
      attachments: {
        photos: ['family-masks.jpg', 'home-schooling.jpg'],
        voices: ['family-hopes.m4a'],
        videos: ['virtual-celebration.mp4']
      },
      isLocked: true,
      category: 'family'
    },
    {
      id: '3',
      title: 'To My Future Self - 30th Birthday',
      message: 'Dear 30-year-old me, I wonder what you\'ve accomplished by now. Are you happy? Did you travel to Japan like you planned?...',
      createdDate: new Date('2024-01-01'),
      openDate: new Date('2025-03-31'), // My 30th birthday
      status: 'upcoming',
      recipients: ['self'],
      attachments: {
        photos: ['current-life.jpg', 'dreams-board.jpg'],
        voices: ['goals-recording.m4a'],
        videos: []
      },
      isLocked: true,
      category: 'future-self'
    },
    {
      id: '4',
      title: 'Grandparents\' Love Letters',
      message: 'Messages from Dadi and Dada to their great-grandchildren, filled with wisdom and love from their generation...',
      createdDate: new Date('2023-12-25'),
      openDate: new Date('2024-12-25'),
      status: 'opened',
      recipients: ['family'],
      attachments: {
        photos: ['grandparents-young.jpg', 'family-traditions.jpg'],
        voices: ['dadi-stories.m4a', 'dada-advice.m4a'],
        videos: ['family-recipes.mp4']
      },
      isLocked: false,
      category: 'family'
    }
  ];

  const familyMembers = [
    { id: 'self', name: 'You', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=100&h=100&fit=crop&crop=face' },
    { id: 'miraya-chauhan-sinha', name: 'Miraya', avatar: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=100&h=100&fit=crop&crop=face' },
    { id: 'priyam-alok', name: 'Priyam', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face' },
    { id: 'family', name: 'Entire Family', avatar: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=100&h=100&fit=crop&crop=face' }
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'personal': return <Star className="w-4 h-4" />;
      case 'family': return <Users className="w-4 h-4" />;
      case 'milestone': return <Gift className="w-4 h-4" />;
      case 'future-self': return <Clock4 className="w-4 h-4" />;
      default: return <Archive className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'personal': return 'bg-violet/10 text-violet border-violet';
      case 'family': return 'bg-aqua/10 text-aqua border-aqua';
      case 'milestone': return 'bg-coral/10 text-coral border-coral';
      case 'future-self': return 'bg-primary/10 text-primary border-primary';
      default: return 'bg-muted text-muted-foreground border-muted';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sealed': return <Lock className="w-4 h-4 text-primary" />;
      case 'opened': return <Unlock className="w-4 h-4 text-aqua" />;
      case 'upcoming': return <Timer className="w-4 h-4 text-coral" />;
      default: return <Archive className="w-4 h-4" />;
    }
  };

  const getTimeUntilOpen = (openDate: Date) => {
    const now = new Date();
    const diffTime = openDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 0) return 'Ready to open!';
    if (diffDays === 1) return '1 day left';
    if (diffDays < 30) return `${diffDays} days left`;
    if (diffDays < 365) return `${Math.ceil(diffDays / 30)} months left`;
    return `${Math.ceil(diffDays / 365)} years left`;
  };

  const handleCreateCapsule = () => {
    if (!newCapsule.title || !newCapsule.message || !newCapsule.openDate) return;
    
    // Mock creation logic
    alert(`Time Capsule "${newCapsule.title}" created successfully! It will open on ${format(newCapsule.openDate, 'MMMM d, yyyy')}.`);
    setCurrentView('list');
    setNewCapsule({
      title: '',
      message: '',
      openDate: undefined,
      recipients: [],
      category: 'personal'
    });
  };

  const handleOpenCapsule = (capsule: TimeCapsule) => {
    if (capsule.status === 'sealed' && capsule.openDate > new Date()) {
      alert('This time capsule is still sealed and cannot be opened yet!');
      return;
    }
    setSelectedCapsule(capsule);
    setCurrentView('view');
  };

  if (currentView === 'create') {
    return (
      <div className="min-h-screen bg-background vibrant-texture">
        <div className="px-4 py-6 space-y-6">
          {/* Header */}
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentView('list')}
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Capsules
            </Button>
            <div>
              <h1 className="text-3xl text-primary">Create Time Capsule</h1>
              <p className="text-lg text-muted-foreground">
                Preserve this moment for the future
              </p>
            </div>
          </div>

          {/* Create Form */}
          <Card className="memory-card max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Plus className="w-6 h-6 text-primary" />
                <span>New Time Capsule</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Capsule Title</Label>
                <Input
                  id="title"
                  value={newCapsule.title}
                  onChange={(e) => setNewCapsule({ ...newCapsule, title: e.target.value })}
                  placeholder="Give your time capsule a meaningful title"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={newCapsule.category} onValueChange={(value: any) => setNewCapsule({ ...newCapsule, category: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="personal">
                      <div className="flex items-center space-x-2">
                        <Star className="w-4 h-4" />
                        <span>Personal Reflection</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="family">
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4" />
                        <span>Family Memory</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="milestone">
                      <div className="flex items-center space-x-2">
                        <Gift className="w-4 h-4" />
                        <span>Milestone Celebration</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="future-self">
                      <div className="flex items-center space-x-2">
                        <Clock4 className="w-4 h-4" />
                        <span>Future Self</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message for the Future</Label>
                <Textarea
                  id="message"
                  value={newCapsule.message}
                  onChange={(e) => setNewCapsule({ ...newCapsule, message: e.target.value })}
                  placeholder="Write your message, thoughts, hopes, or memories to be opened in the future..."
                  className="min-h-32"
                />
              </div>

              <div className="space-y-2">
                <Label>Open Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {newCapsule.openDate ? format(newCapsule.openDate, 'PPP') : 'Select when to open this capsule'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={newCapsule.openDate}
                      onSelect={(date) => setNewCapsule({ ...newCapsule, openDate: date })}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>Recipients</Label>
                <div className="grid grid-cols-2 gap-2">
                  {familyMembers.map((member) => (
                    <div
                      key={member.id}
                      className={`p-3 rounded-lg border cursor-pointer transition-all ${
                        newCapsule.recipients.includes(member.id)
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-muted hover:border-primary/50'
                      }`}
                      onClick={() => {
                        const recipients = newCapsule.recipients.includes(member.id)
                          ? newCapsule.recipients.filter(r => r !== member.id)
                          : [...newCapsule.recipients, member.id];
                        setNewCapsule({ ...newCapsule, recipients });
                      }}
                    >
                      <div className="flex items-center space-x-2">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{member.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Card className="bg-gradient-to-r from-primary/5 to-coral/5 border-primary/20">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <Camera className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <h4 className="text-primary mb-2">Add Attachments</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Enhance your time capsule with photos, voice recordings, or videos
                      </p>
                      <div className="grid grid-cols-3 gap-2">
                        <Button size="sm" variant="outline" className="border-primary/50 text-primary">
                          📸 Photos
                        </Button>
                        <Button size="sm" variant="outline" className="border-primary/50 text-primary">
                          🎤 Voice
                        </Button>
                        <Button size="sm" variant="outline" className="border-primary/50 text-primary">
                          🎥 Video
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex space-x-3 pt-4">
                <Button
                  onClick={handleCreateCapsule}
                  className="flex-1 vibrant-button text-primary-foreground"
                  disabled={!newCapsule.title || !newCapsule.message || !newCapsule.openDate}
                >
                  <Lock className="w-4 h-4 mr-2" />
                  Seal Time Capsule
                </Button>
                <Button
                  onClick={() => setCurrentView('list')}
                  variant="outline"
                  className="border-muted-foreground text-muted-foreground hover:bg-muted"
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (currentView === 'view' && selectedCapsule) {
    return (
      <div className="min-h-screen bg-background vibrant-texture">
        <div className="px-4 py-6 space-y-6">
          {/* Header */}
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentView('list')}
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Capsules
            </Button>
            <div>
              <h1 className="text-3xl text-primary">{selectedCapsule.title}</h1>
              <p className="text-lg text-muted-foreground">
                {selectedCapsule.status === 'opened' ? 'Opened' : 'Sealed'} Time Capsule
              </p>
            </div>
          </div>

          {/* Capsule Content */}
          <Card className="memory-card max-w-4xl mx-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(selectedCapsule.status)}
                  <div>
                    <CardTitle>{selectedCapsule.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Created on {format(selectedCapsule.createdDate, 'MMMM d, yyyy')}
                    </p>
                  </div>
                </div>
                <Badge variant="outline" className={getCategoryColor(selectedCapsule.category)}>
                  {getCategoryIcon(selectedCapsule.category)}
                  <span className="ml-1 capitalize">{selectedCapsule.category.replace('-', ' ')}</span>
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {selectedCapsule.status === 'sealed' && selectedCapsule.openDate > new Date() ? (
                <Card className="bg-gradient-to-r from-primary/10 to-coral/10 border-primary/20">
                  <CardContent className="p-6 text-center">
                    <Lock className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="text-xl text-primary mb-2">This Time Capsule is Sealed</h3>
                    <p className="text-muted-foreground mb-4">
                      It will automatically unlock on {format(selectedCapsule.openDate, 'MMMM d, yyyy')}
                    </p>
                    <Badge variant="outline" className="bg-coral/10 text-coral border-coral">
                      <Timer className="w-4 h-4 mr-1" />
                      {getTimeUntilOpen(selectedCapsule.openDate)}
                    </Badge>
                  </CardContent>
                </Card>
              ) : (
                <>
                  <div className="bg-gradient-to-br from-cream/50 to-white p-6 rounded-lg border border-primary/10">
                    <h4 className="text-lg text-primary mb-3 flex items-center">
                      <MessageSquare className="w-5 h-5 mr-2" />
                      Message from the Past
                    </h4>
                    <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                      {selectedCapsule.message}
                    </p>
                  </div>

                  {(selectedCapsule.attachments.photos.length > 0 || 
                    selectedCapsule.attachments.voices.length > 0 || 
                    selectedCapsule.attachments.videos.length > 0) && (
                    <div className="space-y-4">
                      <h4 className="text-lg text-primary flex items-center">
                        <Camera className="w-5 h-5 mr-2" />
                        Attachments
                      </h4>
                      
                      {selectedCapsule.attachments.photos.length > 0 && (
                        <div>
                          <h5 className="text-sm text-muted-foreground mb-2">Photos ({selectedCapsule.attachments.photos.length})</h5>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {selectedCapsule.attachments.photos.map((photo, index) => (
                              <div key={index} className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                                <Camera className="w-8 h-8 text-muted-foreground" />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {selectedCapsule.attachments.voices.length > 0 && (
                        <div>
                          <h5 className="text-sm text-muted-foreground mb-2">Voice Recordings ({selectedCapsule.attachments.voices.length})</h5>
                          <div className="space-y-2">
                            {selectedCapsule.attachments.voices.map((voice, index) => (
                              <Card key={index} className="p-3">
                                <div className="flex items-center space-x-3">
                                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                                    <MessageSquare className="w-5 h-5 text-primary" />
                                  </div>
                                  <div className="flex-1">
                                    <p className="text-sm font-medium">{voice}</p>
                                    <p className="text-xs text-muted-foreground">Voice recording</p>
                                  </div>
                                  <Button size="sm" variant="outline">
                                    <Eye className="w-4 h-4 mr-1" />
                                    Play
                                  </Button>
                                </div>
                              </Card>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-primary/10">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <CalendarIcon className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          Opened on {format(selectedCapsule.openDate, 'MMMM d, yyyy')}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {selectedCapsule.recipients.length} recipient{selectedCapsule.recipients.length !== 1 ? 's' : ''}
                        </span>
                      </div>
                    </div>
                    <Button className="aqua-button text-primary-foreground">
                      <Heart className="w-4 h-4 mr-2" />
                      Save to Memories
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Main list view
  return (
    <div className="min-h-screen bg-background vibrant-texture">
      <div className="px-4 py-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <div className="p-3 bg-primary/20 rounded-full">
              <Clock className="w-8 h-8 text-primary" />
            </div>
          </div>
          <div>
            <h1 className="text-3xl text-primary">Time Capsules</h1>
            <p className="text-lg text-muted-foreground">
              Messages and memories preserved for the future
            </p>
          </div>
          <Button
            onClick={() => setCurrentView('create')}
            className="vibrant-button text-primary-foreground"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create Time Capsule
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          <Card className="memory-card text-center">
            <CardContent className="p-4">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Lock className="w-5 h-5 text-primary" />
                <span className="text-2xl font-medium text-primary">
                  {timeCapsules.filter(c => c.status === 'sealed').length}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">Sealed Capsules</p>
            </CardContent>
          </Card>
          
          <Card className="memory-card text-center">
            <CardContent className="p-4">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Timer className="w-5 h-5 text-coral" />
                <span className="text-2xl font-medium text-coral">
                  {timeCapsules.filter(c => c.status === 'upcoming').length}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">Opening Soon</p>
            </CardContent>
          </Card>
          
          <Card className="memory-card text-center">
            <CardContent className="p-4">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Unlock className="w-5 h-5 text-aqua" />
                <span className="text-2xl font-medium text-aqua">
                  {timeCapsules.filter(c => c.status === 'opened').length}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">Opened</p>
            </CardContent>
          </Card>
        </div>

        {/* Time Capsules List */}
        <div className="max-w-4xl mx-auto space-y-4">
          {timeCapsules.map((capsule) => (
            <Card
              key={capsule.id}
              className="memory-card cursor-pointer transition-all hover:shadow-lg"
              onClick={() => handleOpenCapsule(capsule)}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(capsule.status)}
                      <h3 className="text-xl text-primary">{capsule.title}</h3>
                      <Badge variant="outline" className={getCategoryColor(capsule.category)}>
                        {getCategoryIcon(capsule.category)}
                        <span className="ml-1 capitalize">{capsule.category.replace('-', ' ')}</span>
                      </Badge>
                    </div>
                    
                    <p className="text-muted-foreground line-clamp-2">
                      {capsule.message}
                    </p>
                    
                    <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <CalendarIcon className="w-4 h-4" />
                        <span>Created {format(capsule.createdDate, 'MMM d, yyyy')}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Timer className="w-4 h-4" />
                        <span>Opens {format(capsule.openDate, 'MMM d, yyyy')}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{capsule.recipients.length} recipient{capsule.recipients.length !== 1 ? 's' : ''}</span>
                      </div>
                    </div>

                    {capsule.status === 'sealed' && (
                      <Badge variant="outline" className="bg-coral/10 text-coral border-coral">
                        <Timer className="w-3 h-3 mr-1" />
                        {getTimeUntilOpen(capsule.openDate)}
                      </Badge>
                    )}

                    {capsule.status === 'upcoming' && (
                      <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-300">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        Opening soon!
                      </Badge>
                    )}

                    {capsule.status === 'opened' && (
                      <Badge variant="outline" className="bg-aqua/10 text-aqua border-aqua">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Opened
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {(capsule.attachments.photos.length > 0 || 
                      capsule.attachments.voices.length > 0 || 
                      capsule.attachments.videos.length > 0) && (
                      <Badge variant="outline" className="bg-secondary/10 text-secondary border-secondary">
                        <Camera className="w-3 h-3 mr-1" />
                        {capsule.attachments.photos.length + capsule.attachments.voices.length + capsule.attachments.videos.length}
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {timeCapsules.length === 0 && (
          <Card className="memory-card max-w-md mx-auto">
            <CardContent className="p-8 text-center">
              <Clock className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg text-primary mb-2">No Time Capsules Yet</h3>
              <p className="text-muted-foreground mb-4">
                Create your first time capsule to preserve memories for the future
              </p>
              <Button
                onClick={() => setCurrentView('create')}
                className="vibrant-button text-primary-foreground"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create First Capsule
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}