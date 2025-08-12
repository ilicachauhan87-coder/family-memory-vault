import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { ScrollArea } from './ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Separator } from './ui/separator';
import { ArrowLeft, Heart, Calendar, Camera, Mic, Video, FileText, Share2, Download, MapPin, Users, Clock, Edit, Save, X, Star, Phone, Mail, Book, Plus } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Memory {
  id: string;
  type: 'photo' | 'video' | 'voice' | 'story';
  title: string;
  description?: string;
  date: string;
  location?: string;
  tags: string[];
  thumbnail?: string;
  duration?: string;
  sharedWith: string[];
}

interface FamilyMemberBio {
  bio?: string;
  occupation?: string;
  location?: string;
  phone?: string;
  email?: string;
  hobbies?: string[];
  personalNotes?: string;
  birthDate?: string;
  deathDate?: string;
  relationship?: string;
}

interface PersonMemoriesPageProps {
  personId: string;
  personName: string;
  onBack: () => void;
  onNavigate?: (page: string) => void;
}

export function PersonMemoriesPage({ personId, personName, onBack, onNavigate }: PersonMemoriesPageProps) {
  const [activeTab, setActiveTab] = useState('all');
  const [showBioDialog, setShowBioDialog] = useState(false);
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [bioData, setBioData] = useState<FamilyMemberBio>({});

  // Mock biographical data - in real app, this would be fetched based on personId
  const mockBioData: Record<string, FamilyMemberBio> = {
    'ilica-chauhan': {
      bio: 'A passionate family memory keeper and loving mother. I believe in preserving our family\'s beautiful traditions and stories for future generations. Creating this digital family vault is my way of ensuring our memories live forever.',
      occupation: 'Family Memory Keeper & Software Developer',
      location: 'Delhi, India',
      phone: '+91 98765 43214',
      email: 'ilica.chauhan@email.com',
      hobbies: ['Photography', 'Digital storytelling', 'Cooking traditional recipes', 'Family history research'],
      personalNotes: 'Currently creating a comprehensive digital archive of our family history',
      birthDate: '31 Mar 1987',
      relationship: 'Self (User)'
    },
    'rajeev-chauhan': {
      bio: 'A loving father and dedicated government employee who always put family first. Known for his patience, wisdom, and ability to solve any problem with a smile. He loves photography and has documented most of our family celebrations over the years.',
      occupation: 'Senior Government Officer (Retired)',
      location: 'Delhi, India',
      phone: '+91 98765 43210',
      email: 'rajeev.chauhan@email.com',
      hobbies: ['Photography', 'Gardening', 'Cricket', 'Family documentaries'],
      personalNotes: 'Has the best collection of family photos spanning 40+ years',
      birthDate: '25 Oct 1960',
      relationship: 'Father'
    },
    'ajai-singh': {
      bio: 'A respected patriarch who laid the foundation of our family values. Known for his wisdom, kindness, and dedication to family traditions. He was a teacher who educated many children in the village and always emphasized the importance of knowledge and moral values.',
      occupation: 'Village School Teacher',
      location: 'Mathura, Uttar Pradesh',
      hobbies: ['Teaching', 'Reading', 'Storytelling'],
      personalNotes: 'Always said "Vidya hi param dhan hai" - Knowledge is the ultimate wealth',
      deathDate: '12 Jan 2010',
      relationship: 'Paternal Great Grandfather'
    },
    'urmila-devi': {
      bio: 'The heart of our family, known for her incredible cooking and nurturing nature. She could make anyone feel at home with her warm smile and delicious food. Her recipes are still treasured and passed down through generations.',
      occupation: 'Homemaker & Community Helper',
      location: 'Mathura, Uttar Pradesh',
      hobbies: ['Cooking', 'Gardening', 'Bhajan singing'],
      personalNotes: 'Her kada prasad recipe is legendary in our family',
      deathDate: '8 Mar 2012',
      relationship: 'Paternal Great Grandmother'
    }
  };

  // Initialize bio data
  const currentBio = mockBioData[personId] || {};
  
  const handleBioSave = () => {
    // In real app, save to database
    console.log('Saving biography for', personId, bioData);
    setIsEditingBio(false);
  };

  const handleAddMemory = () => {
    // Navigate to memory upload page with person preselected
    if (onNavigate) {
      // Store the selected person for the upload page
      sessionStorage.setItem('selectedPersonId', personId);
      sessionStorage.setItem('selectedPersonName', personName);
      onNavigate('upload-memory');
    } else {
      alert('Navigation not available. Please add memory from main upload page.');
    }
  };

  // Mock memory data - in real app, this would be fetched based on personId
  const mockMemories: Memory[] = [
    {
      id: 'mem-1',
      type: 'photo',
      title: 'Family Wedding Celebration',
      description: 'Beautiful moments from our traditional wedding ceremony',
      date: '21 Jan 2020',
      location: 'Bangalore, Karnataka',
      tags: ['wedding', 'celebration', 'family'],
      thumbnail: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=300&h=200&fit=crop',
      sharedWith: ['Priyam Alok', 'Priti Chauhan', 'Rajeev Kumar Chauhan']
    },
    {
      id: 'mem-2',
      type: 'voice',
      title: 'Childhood Stories',
      description: 'Sharing memories from my school days and childhood adventures',
      date: '15 Mar 2024',
      duration: '4:32',
      tags: ['childhood', 'stories', 'memories'],
      sharedWith: ['Miraya Chauhan Sinha', 'Ishan Chauhan']
    },
    {
      id: 'mem-3',
      type: 'video',
      title: 'Miraya\'s First Steps',
      description: 'Our little angel taking her very first steps!',
      date: '12 Aug 2024',
      location: 'Home, Bangalore',
      duration: '2:15',
      tags: ['baby', 'milestone', 'first steps'],
      thumbnail: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=300&h=200&fit=crop',
      sharedWith: ['Priyam Alok', 'Veena Sinha', 'Alok Ranjan Sinha']
    },
    {
      id: 'mem-4',
      type: 'story',
      title: 'Grandmother\'s Recipe Collection',
      description: 'Traditional family recipes passed down through generations with detailed instructions and stories',
      date: '5 Feb 2024',
      tags: ['recipes', 'tradition', 'cooking'],
      sharedWith: ['Priti Chauhan', 'Veena Sinha', 'Miraya Chauhan Sinha']
    },
    {
      id: 'mem-5',
      type: 'photo',
      title: 'Diwali Celebration 2023',
      description: 'Festival of lights celebrated with the entire family',
      date: '12 Nov 2023',
      location: 'Family Home',
      tags: ['festival', 'diwali', 'family gathering'],
      thumbnail: 'https://images.unsplash.com/photo-1478145787956-f6f12c59091d?w=300&h=200&fit=crop',
      sharedWith: ['All Family Members']
    },
    {
      id: 'mem-6',
      type: 'voice',
      title: 'Lullaby for Miraya',
      description: 'A traditional lullaby I sing to put Miraya to sleep',
      date: '30 Jan 2024',
      duration: '3:18',
      tags: ['lullaby', 'baby', 'tradition'],
      sharedWith: ['Priyam Alok', 'Miraya Chauhan Sinha']
    }
  ];

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

  const filteredMemories = activeTab === 'all' 
    ? mockMemories 
    : mockMemories.filter(memory => memory.type === activeTab);

  const memoryStats = {
    total: mockMemories.length,
    photos: mockMemories.filter(m => m.type === 'photo').length,
    videos: mockMemories.filter(m => m.type === 'video').length,
    voices: mockMemories.filter(m => m.type === 'voice').length,
    stories: mockMemories.filter(m => m.type === 'story').length
  };

  return (
    <div className="min-h-screen bg-background vibrant-texture">
      <div className="px-4 py-6 space-y-6">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={onBack}
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Tree
            </Button>
          </div>

          <div className="flex items-center justify-center space-x-4">
            <Avatar className="w-20 h-20 border-4 border-primary/20">
              <AvatarImage src="https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=150&h=150&fit=crop&crop=face" />
              <AvatarFallback className="text-xl">
                {personName.split(' ').map(n => n.charAt(0)).join('').slice(0, 2)}
              </AvatarFallback>
            </Avatar>
          </div>
          
          <div className="text-center space-y-3">
            <h1 className="text-3xl text-primary">{personName}</h1>
            
            {/* Bio Button - Prominently placed below name */}
            <div className="flex justify-center">
              <Button
                variant="outline"
                onClick={() => setShowBioDialog(true)}
                className="border-aqua text-aqua hover:bg-aqua hover:text-aqua-foreground h-auto py-3 px-6 rounded-lg shadow-sm"
              >
                <Book className="w-4 h-4 mr-2" />
                <div className="text-left">
                  <div className="font-medium">View Biography</div>
                  <div className="text-xs opacity-80">
                    {currentBio.bio ? 'Biography available' : 'Add biography'}
                  </div>
                </div>
              </Button>
            </div>
            
            <p className="text-lg text-muted-foreground">
              {memoryStats.total} precious memories preserved
            </p>
            
            {/* Quick Bio Preview - Mobile friendly */}
            {currentBio.bio && (
              <Card className="memory-card max-w-2xl mx-auto">
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground italic line-clamp-2">
                    "{currentBio.bio}"
                  </p>
                  {currentBio.occupation && (
                    <div className="flex items-center justify-center space-x-2 mt-2">
                      <Star className="w-3 h-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{currentBio.occupation}</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Memory Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Card className="memory-card text-center p-4">
            <div className="space-y-2">
              <Heart className="w-6 h-6 mx-auto text-primary" />
              <p className="text-2xl font-semibold text-primary">{memoryStats.total}</p>
              <p className="text-sm text-muted-foreground">Total</p>
            </div>
          </Card>
          <Card className="memory-card text-center p-4">
            <div className="space-y-2">
              <Camera className="w-6 h-6 mx-auto text-primary" />
              <p className="text-2xl font-semibold text-primary">{memoryStats.photos}</p>
              <p className="text-sm text-muted-foreground">Photos</p>
            </div>
          </Card>
          <Card className="memory-card text-center p-4">
            <div className="space-y-2">
              <Video className="w-6 h-6 mx-auto text-coral" />
              <p className="text-2xl font-semibold text-coral">{memoryStats.videos}</p>
              <p className="text-sm text-muted-foreground">Videos</p>
            </div>
          </Card>
          <Card className="memory-card text-center p-4">
            <div className="space-y-2">
              <Mic className="w-6 h-6 mx-auto text-aqua" />
              <p className="text-2xl font-semibold text-aqua">{memoryStats.voices}</p>
              <p className="text-sm text-muted-foreground">Voice</p>
            </div>
          </Card>
          <Card className="memory-card text-center p-4">
            <div className="space-y-2">
              <FileText className="w-6 h-6 mx-auto text-violet" />
              <p className="text-2xl font-semibold text-violet">{memoryStats.stories}</p>
              <p className="text-sm text-muted-foreground">Stories</p>
            </div>
          </Card>
        </div>

        {/* Memory Filters */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-muted/30">
            <TabsTrigger value="all" className="text-sm">All</TabsTrigger>
            <TabsTrigger value="photo" className="text-sm">Photos</TabsTrigger>
            <TabsTrigger value="video" className="text-sm">Videos</TabsTrigger>
            <TabsTrigger value="voice" className="text-sm">Voice</TabsTrigger>
            <TabsTrigger value="story" className="text-sm">Stories</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            <ScrollArea className="h-[calc(100vh-450px)]">
              <div className="space-y-4 pb-4">
                {filteredMemories.length === 0 ? (
                  <Card className="memory-card">
                    <CardContent className="p-8 text-center">
                      <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-xl text-primary mb-2">No memories found</h3>
                      <p className="text-muted-foreground">
                        {activeTab === 'all' 
                          ? 'No memories have been added for this person yet.' 
                          : `No ${activeTab} memories found for this person.`
                        }
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  filteredMemories.map((memory) => {
                    const MemoryIcon = getMemoryIcon(memory.type);
                    return (
                      <Card key={memory.id} className="memory-card hover:shadow-lg transition-all duration-200">
                        <CardContent className="p-4">
                          <div className="flex space-x-4">
                            {/* Memory Thumbnail/Icon */}
                            <div className="flex-shrink-0">
                              {memory.thumbnail ? (
                                <div className="relative w-20 h-20 rounded-lg overflow-hidden">
                                  <ImageWithFallback
                                    src={memory.thumbnail}
                                    alt={memory.title}
                                    className="w-full h-full object-cover"
                                  />
                                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                    <MemoryIcon className="w-6 h-6 text-white" />
                                  </div>
                                </div>
                              ) : (
                                <div className={`w-20 h-20 rounded-lg flex items-center justify-center ${getMemoryColor(memory.type)}`}>
                                  <MemoryIcon className="w-8 h-8" />
                                </div>
                              )}
                            </div>

                            {/* Memory Details */}
                            <div className="flex-1 space-y-2">
                              <div className="flex items-start justify-between">
                                <h3 className="text-lg font-medium text-primary line-clamp-1">
                                  {memory.title}
                                </h3>
                                <Badge variant="outline" className="ml-2 flex-shrink-0">
                                  {memory.type}
                                </Badge>
                              </div>
                              
                              {memory.description && (
                                <p className="text-muted-foreground text-sm line-clamp-2">
                                  {memory.description}
                                </p>
                              )}

                              <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                                <div className="flex items-center space-x-1">
                                  <Calendar className="w-3 h-3" />
                                  <span>{memory.date}</span>
                                </div>
                                
                                {memory.location && (
                                  <div className="flex items-center space-x-1">
                                    <MapPin className="w-3 h-3" />
                                    <span>{memory.location}</span>
                                  </div>
                                )}
                                
                                {memory.duration && (
                                  <div className="flex items-center space-x-1">
                                    <Clock className="w-3 h-3" />
                                    <span>{memory.duration}</span>
                                  </div>
                                )}
                              </div>

                              {/* Tags */}
                              <div className="flex flex-wrap gap-1">
                                {memory.tags.map((tag, index) => (
                                  <Badge key={index} variant="secondary" className="text-xs px-2 py-1">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>

                              {/* Shared With */}
                              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                                <Users className="w-3 h-3" />
                                <span>Shared with: {memory.sharedWith.join(', ')}</span>
                              </div>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col space-y-2">
                              <Button size="sm" variant="outline" className="p-2">
                                <Share2 className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="outline" className="p-2">
                                <Download className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })
                )}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <div className="flex justify-center space-x-4">
          <Button 
            className="vibrant-button text-primary-foreground"
            onClick={handleAddMemory}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Memory for {personName}
          </Button>
          <Button 
            variant="outline" 
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            onClick={() => alert('Share All feature coming soon!')}
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share All
          </Button>
        </div>

        {/* Biography Dialog - Mobile Optimized */}
        <Dialog open={showBioDialog} onOpenChange={setShowBioDialog}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto mx-4">
            <DialogHeader>
              <div className="flex items-start space-x-4">
                <Avatar className="w-16 h-16 border-4 border-primary/20 flex-shrink-0">
                  <AvatarImage src="https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=150&h=150&fit=crop&crop=face" />
                  <AvatarFallback>
                    {personName.split(' ').map(n => n.charAt(0)).join('').slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <DialogTitle className="text-xl font-bold text-primary">
                    {personName}
                  </DialogTitle>
                  <DialogDescription className="text-sm text-muted-foreground">
                    {currentBio.relationship || 'Family Member'}
                  </DialogDescription>
                  {currentBio.birthDate && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Born: {currentBio.birthDate}
                    </p>
                  )}
                  {currentBio.deathDate && (
                    <p className="text-xs text-muted-foreground">
                      Passed away: {currentBio.deathDate}
                    </p>
                  )}
                </div>
              </div>
            </DialogHeader>

            <div className="space-y-6">
              {/* Biography Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-bold text-primary flex items-center space-x-2">
                    <Book className="w-5 h-5" />
                    <span>Biography</span>
                  </h4>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditingBio(!isEditingBio)}
                    className="text-xs"
                  >
                    {isEditingBio ? (
                      <>
                        <X className="w-3 h-3 mr-1" />
                        Cancel
                      </>
                    ) : (
                      <>
                        <Edit className="w-3 h-3 mr-1" />
                        Edit Bio
                      </>
                    )}
                  </Button>
                </div>

                {isEditingBio ? (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="bio" className="text-sm font-medium">
                        Biography
                      </Label>
                      <Textarea
                        id="bio"
                        value={bioData.bio || currentBio.bio || ''}
                        onChange={(e) => setBioData({ ...bioData, bio: e.target.value })}
                        placeholder="Share this person's story, achievements, and memories..."
                        className="min-h-[100px] text-sm"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="occupation" className="text-sm font-medium">
                          Occupation
                        </Label>
                        <Input
                          id="occupation"
                          value={bioData.occupation || currentBio.occupation || ''}
                          onChange={(e) => setBioData({ ...bioData, occupation: e.target.value })}
                          placeholder="What do/did they do?"
                          className="text-sm"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="location" className="text-sm font-medium">
                          Location
                        </Label>
                        <Input
                          id="location"
                          value={bioData.location || currentBio.location || ''}
                          onChange={(e) => setBioData({ ...bioData, location: e.target.value })}
                          placeholder="Where do/did they live?"
                          className="text-sm"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-sm font-medium">
                          Phone
                        </Label>
                        <Input
                          id="phone"
                          value={bioData.phone || currentBio.phone || ''}
                          onChange={(e) => setBioData({ ...bioData, phone: e.target.value })}
                          placeholder="Contact number"
                          className="text-sm"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium">
                          Email
                        </Label>
                        <Input
                          id="email"
                          value={bioData.email || currentBio.email || ''}
                          onChange={(e) => setBioData({ ...bioData, email: e.target.value })}
                          placeholder="Email address"
                          className="text-sm"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="personalNotes" className="text-sm font-medium">
                        Personal Notes
                      </Label>
                      <Textarea
                        id="personalNotes"
                        value={bioData.personalNotes || currentBio.personalNotes || ''}
                        onChange={(e) => setBioData({ ...bioData, personalNotes: e.target.value })}
                        placeholder="Special memories, favorite sayings, or personality traits..."
                        className="min-h-[80px] text-sm"
                      />
                    </div>

                    <div className="flex space-x-2">
                      <Button
                        onClick={handleBioSave}
                        className="vibrant-button text-primary-foreground"
                      >
                        <Save className="w-3 h-3 mr-1" />
                        Save Biography
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {currentBio.bio ? (
                      <p className="text-sm leading-relaxed p-4 bg-muted/30 rounded-lg">
                        {currentBio.bio}
                      </p>
                    ) : (
                      <div className="text-center py-8">
                        <Book className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                        <p className="text-muted-foreground">No biography added yet</p>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setIsEditingBio(true)}
                          className="mt-3"
                        >
                          <Plus className="w-3 h-3 mr-1" />
                          Add Biography
                        </Button>
                      </div>
                    )}

                    {/* Contact and Details Grid */}
                    {(currentBio.occupation || currentBio.location || currentBio.phone || currentBio.email) && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                        {currentBio.occupation && (
                          <div className="space-y-1">
                            <p className="text-xs font-medium text-muted-foreground">Occupation</p>
                            <p className="text-sm">{currentBio.occupation}</p>
                          </div>
                        )}

                        {currentBio.location && (
                          <div className="space-y-1">
                            <p className="text-xs font-medium text-muted-foreground">Location</p>
                            <p className="text-sm flex items-center space-x-1">
                              <MapPin className="w-3 h-3" />
                              <span>{currentBio.location}</span>
                            </p>
                          </div>
                        )}

                        {currentBio.phone && (
                          <div className="space-y-1">
                            <p className="text-xs font-medium text-muted-foreground">Phone</p>
                            <p className="text-sm flex items-center space-x-1">
                              <Phone className="w-3 h-3" />
                              <span>{currentBio.phone}</span>
                            </p>
                          </div>
                        )}

                        {currentBio.email && (
                          <div className="space-y-1">
                            <p className="text-xs font-medium text-muted-foreground">Email</p>
                            <p className="text-sm flex items-center space-x-1">
                              <Mail className="w-3 h-3" />
                              <span>{currentBio.email}</span>
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    {currentBio.personalNotes && (
                      <div className="space-y-2 pt-4 border-t">
                        <p className="text-xs font-medium text-muted-foreground">Personal Notes</p>
                        <p className="text-sm leading-relaxed p-3 bg-muted/30 rounded-lg italic">
                          {currentBio.personalNotes}
                        </p>
                      </div>
                    )}

                    {currentBio.hobbies && currentBio.hobbies.length > 0 && (
                      <div className="space-y-2 pt-4 border-t">
                        <p className="text-xs font-medium text-muted-foreground">Hobbies & Interests</p>
                        <div className="flex flex-wrap gap-1">
                          {currentBio.hobbies.map((hobby, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {hobby}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}