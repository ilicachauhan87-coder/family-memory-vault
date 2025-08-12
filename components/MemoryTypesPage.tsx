import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { 
  Heart, 
  Camera, 
  Video, 
  Mic, 
  FileText, 
  Calendar,
  Sparkles,
  Gift,
  MessageSquare,
  BookOpen,
  Trophy,
  Users,
  ArrowRight,
  ChevronRight,
  Star,
  Crown,
  Coffee
} from 'lucide-react';

interface MemoryCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  bgColor: string;
  examples: string[];
  count: number;
}

interface FormatOption {
  type: 'photo' | 'video' | 'text' | 'voice';
  icon: React.ComponentType<any>;
  label: string;
  color: string;
}

interface MemoryTypesPageProps {
  onBack: () => void;
  onNavigate: (page: string) => void;
}

export function MemoryTypesPage({ onBack, onNavigate }: MemoryTypesPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<string | null>(null);

  const memoryCategories: MemoryCategory[] = [
    {
      id: 'moments-memories',
      title: 'Moments & Memories',
      description: 'Capture everyday life, special occasions, and precious family moments',
      icon: Heart,
      color: 'text-coral',
      bgColor: 'bg-coral/10',
      examples: ['Family gatherings', 'Birthdays', 'Vacations', 'Daily life', 'Achievements'],
      count: 89
    },
    {
      id: 'rituals-traditions',
      title: 'Rituals & Traditions',
      description: 'Preserve cultural practices, festivals, and family customs',
      icon: Star,
      color: 'text-violet',
      bgColor: 'bg-violet/10',
      examples: ['Diwali celebrations', 'Wedding ceremonies', 'Religious practices', 'Annual traditions'],
      count: 23
    },
    {
      id: 'blessings-messages',
      title: 'Blessings & Messages',
      description: 'Heartfelt wishes, prayers, and words of love from family',
      icon: MessageSquare,
      color: 'text-aqua',
      bgColor: 'bg-aqua/10',
      examples: ['Birthday wishes', 'Prayers', 'Advice', 'Love letters', 'Congratulations'],
      count: 45
    },
    {
      id: 'recipes-wisdom',
      title: 'Recipes & Wisdom',
      description: 'Family recipes, cooking secrets, and life wisdom passed down',
      icon: Coffee,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      examples: ['Traditional recipes', 'Cooking tips', 'Life advice', 'Health remedies'],
      count: 31
    },
    {
      id: 'stories',
      title: 'Stories',
      description: 'Family history, tales from the past, and shared narratives',
      icon: BookOpen,
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
      examples: ['Childhood stories', 'How we met', 'Family history', 'Adventures', 'Legends'],
      count: 67
    },
    {
      id: 'milestones',
      title: 'Milestones',
      description: 'Important life events, achievements, and significant moments',
      icon: Trophy,
      color: 'text-amber-600',
      bgColor: 'bg-amber-100',
      examples: ['First steps', 'Graduations', 'Promotions', 'Anniversaries', 'New jobs'],
      count: 42
    }
  ];

  const formatOptions: FormatOption[] = [
    {
      type: 'photo',
      icon: Camera,
      label: 'Photo',
      color: 'text-primary bg-primary/10'
    },
    {
      type: 'video',
      icon: Video,
      label: 'Video',
      color: 'text-coral bg-coral/10'
    },
    {
      type: 'text',
      icon: FileText,
      label: 'Text',
      color: 'text-violet bg-violet/10'
    },
    {
      type: 'voice',
      icon: Mic,
      label: 'Voice',
      color: 'text-aqua bg-aqua/10'
    }
  ];

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSelectedFormat(null);
  };

  const handleFormatSelect = (format: string) => {
    setSelectedFormat(format);
  };

  const handleCreateMemory = () => {
    if (selectedCategory && selectedFormat) {
      // Navigate to upload page with category and format pre-selected
      onNavigate('upload-memory');
    }
  };

  const selectedCategoryData = memoryCategories.find(cat => cat.id === selectedCategory);

  return (
    <div className="min-h-screen bg-background vibrant-texture">
      <div className="px-4 py-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <div className="p-3 bg-primary/20 rounded-full">
              <Sparkles className="w-8 h-8 text-primary" />
            </div>
          </div>
          <div>
            <h1 className="text-3xl text-primary">Choose Memory Type</h1>
            <p className="text-lg text-muted-foreground">
              What kind of precious moment would you like to preserve?
            </p>
          </div>
        </div>

        {!selectedCategory ? (
          /* Memory Categories Grid */
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl text-primary mb-2">Memory Categories</h2>
              <p className="text-muted-foreground">Select the type of memory you want to create</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {memoryCategories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <Card 
                    key={category.id}
                    className="memory-card cursor-pointer hover:scale-105 transition-all duration-200"
                    onClick={() => handleCategorySelect(category.id)}
                  >
                    <CardContent className="p-6 text-center space-y-4">
                      <div className={`w-16 h-16 rounded-full ${category.bgColor} flex items-center justify-center mx-auto`}>
                        <IconComponent className={`w-8 h-8 ${category.color}`} />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-center space-x-2">
                          <h3 className="text-xl font-medium text-primary">{category.title}</h3>
                          <Badge variant="secondary" className="text-xs">
                            {category.count}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {category.description}
                        </p>
                      </div>

                      {/* Examples */}
                      <div className="space-y-2">
                        <p className="text-xs font-medium text-muted-foreground">Examples:</p>
                        <div className="flex flex-wrap gap-1 justify-center">
                          {category.examples.slice(0, 3).map((example, index) => (
                            <Badge key={index} variant="outline" className="text-xs px-2 py-1">
                              {example}
                            </Badge>
                          ))}
                          {category.examples.length > 3 && (
                            <Badge variant="outline" className="text-xs px-2 py-1">
                              +{category.examples.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-center space-x-1 text-primary">
                        <span className="text-sm">Select</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Quick Stats */}
            <Card className="memory-card">
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <h3 className="text-xl font-medium text-primary">Your Memory Vault</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-semibold text-coral">297</p>
                      <p className="text-sm text-muted-foreground">Total Memories</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-semibold text-aqua">6</p>
                      <p className="text-sm text-muted-foreground">Categories</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-semibold text-violet">12</p>
                      <p className="text-sm text-muted-foreground">This Week</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-semibold text-primary">4</p>
                      <p className="text-sm text-muted-foreground">Formats</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          /* Format Selection */
          <div className="space-y-6">
            {/* Selected Category Header */}
            <Card className="memory-card">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setSelectedCategory(null)}
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    ← Back
                  </Button>
                  <div className="flex-1">
                    {selectedCategoryData && (
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 rounded-full ${selectedCategoryData.bgColor} flex items-center justify-center`}>
                          <selectedCategoryData.icon className={`w-6 h-6 ${selectedCategoryData.color}`} />
                        </div>
                        <div>
                          <h2 className="text-2xl font-medium text-primary">{selectedCategoryData.title}</h2>
                          <p className="text-muted-foreground">{selectedCategoryData.description}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Format Options */}
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="text-xl text-primary mb-2">Choose Format</h3>
                <p className="text-muted-foreground">How would you like to capture this memory?</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {formatOptions.map((format) => {
                  const IconComponent = format.icon;
                  const isSelected = selectedFormat === format.type;
                  return (
                    <Card 
                      key={format.type}
                      className={`memory-card cursor-pointer hover:scale-105 transition-all duration-200 ${
                        isSelected ? 'ring-2 ring-primary ring-opacity-50 bg-primary/5' : ''
                      }`}
                      onClick={() => handleFormatSelect(format.type)}
                    >
                      <CardContent className="p-6 text-center space-y-4">
                        <div className={`w-16 h-16 rounded-full ${format.color} flex items-center justify-center mx-auto ${
                          isSelected ? 'scale-110' : ''
                        } transition-transform duration-200`}>
                          <IconComponent className="w-8 h-8" />
                        </div>
                        
                        <div className="space-y-2">
                          <h4 className="text-lg font-medium text-primary">{format.label}</h4>
                          <div className="flex items-center justify-center space-x-1">
                            {isSelected ? (
                              <Badge className="bg-primary text-primary-foreground">
                                Selected
                              </Badge>
                            ) : (
                              <span className="text-sm text-muted-foreground">Tap to select</span>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Format Descriptions */}
            <Card className="memory-card">
              <CardContent className="p-6">
                <h4 className="text-lg font-medium text-primary mb-4">Format Guide</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Camera className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium text-primary">Photo</p>
                        <p className="text-sm text-muted-foreground">Capture visual moments, documents, or scenes</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Video className="w-5 h-5 text-coral" />
                      <div>
                        <p className="font-medium text-coral">Video</p>
                        <p className="text-sm text-muted-foreground">Record moving moments, demonstrations, or messages</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-5 h-5 text-violet" />
                      <div>
                        <p className="font-medium text-violet">Text</p>
                        <p className="text-sm text-muted-foreground">Write stories, recipes, or detailed descriptions</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mic className="w-5 h-5 text-aqua" />
                      <div>
                        <p className="font-medium text-aqua">Voice</p>
                        <p className="text-sm text-muted-foreground">Record conversations, songs, or audio messages</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Examples for Selected Category */}
            {selectedCategoryData && (
              <Card className="memory-card">
                <CardContent className="p-6">
                  <h4 className="text-lg font-medium text-primary mb-4">
                    {selectedCategoryData.title} Examples
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {selectedCategoryData.examples.map((example, index) => (
                      <Badge key={index} variant="outline" className="text-sm px-3 py-2 justify-center">
                        {example}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Action Button */}
            <div className="flex justify-center pt-4">
              <Button 
                className={`vibrant-button text-primary-foreground px-8 py-3 text-lg ${
                  selectedFormat ? '' : 'opacity-50 cursor-not-allowed'
                }`}
                onClick={handleCreateMemory}
                disabled={!selectedFormat}
              >
                {selectedFormat ? (
                  <>
                    Create {formatOptions.find(f => f.type === selectedFormat)?.label} Memory
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </>
                ) : (
                  'Select a format to continue'
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}