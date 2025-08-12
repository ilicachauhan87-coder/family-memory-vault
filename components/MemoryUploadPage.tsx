import { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { Checkbox } from './ui/checkbox';
import { 
  Heart, 
  Camera, 
  Video, 
  Mic, 
  FileText, 
  Upload,
  X,
  Star,
  MessageSquare,
  BookOpen,
  Trophy,
  Coffee,
  Plus,
  Users,
  MapPin,
  Calendar,
  Tag,
  Sparkles,
  Save,
  Eye,
  EyeOff,
  Clock,
  FileAudio,
  Play,
  Square,
  UserPlus,
  Smile,
  Laugh,
  Zap,
  ThumbsUp,
  Crown,
  Gift,
  Baby,
  PartyPopper,
  Frown,
  CheckCircle2,
  Circle,
  Image,
  Wand2,
  Flame,
  Mic2,
  Volume2,
  Globe,
  Lock,
  UserCheck,
  Search
} from 'lucide-react';

interface MemoryCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  bgColor: string;
  gradient: string;
}

interface FormatOption {
  type: 'photo' | 'video' | 'text' | 'voice';
  icon: React.ComponentType<any>;
  label: string;
  color: string;
  gradient: string;
}

interface MemoryUploadPageProps {
  onBack: () => void;
}

export function MemoryUploadPage({ onBack }: MemoryUploadPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('moments-memories');
  const [selectedFormat, setSelectedFormat] = useState<string>('photo');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [generalTags, setGeneralTags] = useState<string[]>([]);
  const [newGeneralTag, setNewGeneralTag] = useState('');
  const [peopleInMemory, setPeopleInMemory] = useState<string[]>([]);
  const [emotionTags, setEmotionTags] = useState<string[]>([]);
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [sharedWith, setSharedWith] = useState<string[]>(['Family']);
  const [isPrivate, setIsPrivate] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [voiceOption, setVoiceOption] = useState<'record' | 'upload'>('record');
  const [uploadedAudioFiles, setUploadedAudioFiles] = useState<File[]>([]);
  const [peopleSearchTerm, setPeopleSearchTerm] = useState('');
  const [completionProgress, setCompletionProgress] = useState(0);
  const [sharingSearchTerm, setSharingSearchTerm] = useState('');
  const [showSharingOptions, setShowSharingOptions] = useState(false);

  // Check if this memory is being added for a specific person
  useEffect(() => {
    const selectedPersonId = sessionStorage.getItem('selectedPersonId');
    const selectedPersonName = sessionStorage.getItem('selectedPersonName');
    
    if (selectedPersonId && selectedPersonName) {
      // Pre-select the person in the memory
      setPeopleInMemory([selectedPersonName]);
      setTitle(`Memory with ${selectedPersonName}`);
      
      // Clear the session storage so it doesn't affect future uploads
      sessionStorage.removeItem('selectedPersonId');
      sessionStorage.removeItem('selectedPersonName');
    }
  }, []);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const audioInputRef = useRef<HTMLInputElement>(null);

  const memoryCategories: MemoryCategory[] = [
    {
      id: 'moments-memories',
      title: 'Moments & Memories',
      description: 'Everyday life, special occasions, and precious family moments',
      icon: Heart,
      color: 'text-pink-600',
      bgColor: 'bg-pink-50',
      gradient: 'from-pink-400 to-rose-500'
    },
    {
      id: 'rituals-traditions',
      title: 'Rituals & Traditions',
      description: 'Cultural practices, festivals, and family customs',
      icon: Star,
      color: 'text-violet-600',
      bgColor: 'bg-violet-50',
      gradient: 'from-violet-500 to-purple-600'
    },
    {
      id: 'blessings-messages',
      title: 'Blessings & Messages',
      description: 'Heartfelt wishes, prayers, and words of love',
      icon: MessageSquare,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'recipes-wisdom',
      title: 'Recipes & Wisdom',
      description: 'Family recipes, cooking secrets, and life wisdom',
      icon: Coffee,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      gradient: 'from-amber-500 to-orange-500'
    },
    {
      id: 'stories',
      title: 'Stories',
      description: 'Family history, tales from the past, and shared narratives',
      icon: BookOpen,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      gradient: 'from-emerald-500 to-teal-500'
    },
    {
      id: 'milestones',
      title: 'Milestones',
      description: 'Important life events, achievements, and significant moments',
      icon: Trophy,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      gradient: 'from-yellow-500 to-amber-500'
    },
    {
      id: 'time-capsule',
      title: 'Time Capsule',
      description: 'Future messages & memories to unlock on special dates',
      icon: Clock,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      gradient: 'from-purple-500 to-indigo-600'
    }
  ];

  const formatOptions: FormatOption[] = [
    {
      type: 'photo',
      icon: Camera,
      label: 'Photo',
      color: 'text-indigo-600',
      gradient: 'from-indigo-500 to-purple-500'
    },
    {
      type: 'video',
      icon: Video,
      label: 'Video',
      color: 'text-red-600',
      gradient: 'from-red-500 to-pink-500'
    },
    {
      type: 'text',
      icon: FileText,
      label: 'Text',
      color: 'text-slate-600',
      gradient: 'from-slate-500 to-gray-600'
    },
    {
      type: 'voice',
      icon: Mic,
      label: 'Voice',
      color: 'text-green-600',
      gradient: 'from-green-500 to-emerald-500'
    }
  ];

  const familyMembers = [
    'Priyam Alok', 'Miraya Chauhan Sinha', 'Rajeev Kumar Chauhan', 
    'Priti Chauhan', 'Ishan Chauhan', 'Gattu Chauhan (Parrot)',
    'Shri Ajai Singh', 'Shrimati Urmila Devi', 'Shri Yeshpal Singh',
    'Shrimati Rohitash Devi', 'Sanjeev Kumar', 'Sudha Chauhan',
    'Shrimati Usha Verma', 'Dr Jitendra Verma', 'Pradeep Kumar',
    'Ajay Kumar', 'Sanjay Kumar', 'Seema Chaudhary', 'Somya Chauhan',
    'Shivam Verma', 'Shivani Bobo', 'Praneet Asthana', 'Viraj Chaudhary',
    'Aastha Chaudhary', 'Samaira Singh', 'Kushagra Zulmi Jat', 'Hari'
  ];

  const predefinedEmotions = [
    { name: 'Happy', icon: Smile, color: 'from-yellow-400 to-orange-400', textColor: 'text-yellow-700', bgColor: 'bg-yellow-100' },
    { name: 'Joyful', icon: Laugh, color: 'from-orange-400 to-red-400', textColor: 'text-orange-700', bgColor: 'bg-orange-100' },
    { name: 'Excited', icon: Zap, color: 'from-purple-400 to-pink-400', textColor: 'text-purple-700', bgColor: 'bg-purple-100' },
    { name: 'Proud', icon: ThumbsUp, color: 'from-blue-400 to-indigo-400', textColor: 'text-blue-700', bgColor: 'bg-blue-100' },
    { name: 'Blessed', icon: Crown, color: 'from-amber-400 to-yellow-400', textColor: 'text-amber-700', bgColor: 'bg-amber-100' },
    { name: 'Grateful', icon: Heart, color: 'from-pink-400 to-rose-400', textColor: 'text-pink-700', bgColor: 'bg-pink-100' },
    { name: 'Surprised', icon: Gift, color: 'from-green-400 to-emerald-400', textColor: 'text-green-700', bgColor: 'bg-green-100' },
    { name: 'Playful', icon: Baby, color: 'from-cyan-400 to-blue-400', textColor: 'text-cyan-700', bgColor: 'bg-cyan-100' },
    { name: 'Celebratory', icon: PartyPopper, color: 'from-violet-400 to-purple-400', textColor: 'text-violet-700', bgColor: 'bg-violet-100' },
    { name: 'Nostalgic', icon: Star, color: 'from-indigo-400 to-blue-400', textColor: 'text-indigo-700', bgColor: 'bg-indigo-100' },
    { name: 'Peaceful', icon: MessageSquare, color: 'from-teal-400 to-cyan-400', textColor: 'text-teal-700', bgColor: 'bg-teal-100' },
    { name: 'Emotional', icon: Frown, color: 'from-gray-400 to-slate-400', textColor: 'text-gray-700', bgColor: 'bg-gray-100' }
  ];

  const selectedCategoryData = memoryCategories.find(cat => cat.id === selectedCategory);
  const selectedFormatData = formatOptions.find(format => format.type === selectedFormat);

  const filteredFamilyMembers = familyMembers.filter(member =>
    member.toLowerCase().includes(peopleSearchTerm.toLowerCase())
  );

  const filteredSharingMembers = familyMembers.filter(member =>
    member.toLowerCase().includes(sharingSearchTerm.toLowerCase())
  );

  // Calculate completion progress
  useEffect(() => {
    let progress = 0;
    if (selectedCategory) progress += 15;
    if (selectedFormat) progress += 15;
    if (title.trim()) progress += 20;
    if (description.trim() || uploadedFiles.length > 0 || uploadedAudioFiles.length > 0) progress += 20;
    if (peopleInMemory.length > 0) progress += 10;
    if (emotionTags.length > 0) progress += 10;
    if (date || location) progress += 5;
    if (generalTags.length > 0) progress += 5;
    
    setCompletionProgress(progress);
  }, [selectedCategory, selectedFormat, title, description, uploadedFiles, uploadedAudioFiles, peopleInMemory, emotionTags, date, location, generalTags]);

  const handleAddGeneralTag = () => {
    if (newGeneralTag.trim() && !generalTags.includes(newGeneralTag.trim())) {
      setGeneralTags([...generalTags, newGeneralTag.trim()]);
      setNewGeneralTag('');
    }
  };

  const handleRemoveGeneralTag = (tagToRemove: string) => {
    setGeneralTags(generalTags.filter(tag => tag !== tagToRemove));
  };

  const handleTogglePerson = (person: string) => {
    if (peopleInMemory.includes(person)) {
      setPeopleInMemory(peopleInMemory.filter(p => p !== person));
    } else {
      setPeopleInMemory([...peopleInMemory, person]);
    }
  };

  const handleToggleEmotion = (emotion: string) => {
    if (emotionTags.includes(emotion)) {
      setEmotionTags(emotionTags.filter(e => e !== emotion));
    } else {
      setEmotionTags([...emotionTags, emotion]);
    }
  };

  const handleToggleSharing = (person: string) => {
    if (person === 'Family') {
      // If selecting "Family", clear individual selections
      if (sharedWith.includes('Family')) {
        setSharedWith([]);
      } else {
        setSharedWith(['Family']);
      }
    } else {
      // If selecting individual person, remove "Family" and toggle person
      const withoutFamily = sharedWith.filter(p => p !== 'Family');
      if (withoutFamily.includes(person)) {
        setSharedWith(withoutFamily.filter(p => p !== person));
      } else {
        setSharedWith([...withoutFamily, person]);
      }
    }
  };

  const handleSelectAllFamily = () => {
    if (sharedWith.length === familyMembers.length) {
      setSharedWith([]);
    } else {
      setSharedWith([...familyMembers]);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setUploadedFiles([...uploadedFiles, ...Array.from(files)]);
    }
  };

  const handleAudioUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setUploadedAudioFiles([...uploadedAudioFiles, ...Array.from(files)]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
  };

  const handleRemoveAudioFile = (index: number) => {
    setUploadedAudioFiles(uploadedAudioFiles.filter((_, i) => i !== index));
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      const interval = setInterval(() => {
        setRecordingDuration(prev => prev + 1);
      }, 1000);
      setTimeout(() => {
        setIsRecording(false);
        clearInterval(interval);
      }, 5000);
    } else {
      setRecordingDuration(0);
    }
  };

  const handleSubmit = () => {
    alert(`Memory created!\nCategory: ${selectedCategoryData?.title}\nFormat: ${selectedFormatData?.label}\nTitle: ${title}\nPeople: ${peopleInMemory.join(', ')}\nEmotions: ${emotionTags.join(', ')}\nShared with: ${sharedWith.join(', ')}`);
    onBack();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-pink-50 to-orange-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-cyan-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-amber-400/10 to-orange-600/10 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="relative z-10 p-6 max-w-4xl mx-auto">
        {/* Header with progress */}
        <div className="text-center mb-8 fade-in-section">
          <div className="inline-flex items-center space-x-3 mb-4">
            <div className="p-4 bg-gradient-to-br from-violet-500 to-pink-500 rounded-2xl shadow-lg rotating-gradient">
              <Wand2 className="w-8 h-8 text-white icon-sparkle" />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Create Memory
          </h1>
          <p className="text-lg text-slate-600 mb-6">
            Preserve your precious moment forever
          </p>
          
          {/* Progress bar */}
          <div className="bg-white/70 backdrop-blur-sm rounded-full p-2 shadow-lg max-w-md mx-auto">
            <div className="flex items-center space-x-3">
              <span className="text-sm font-medium text-slate-600">Progress</span>
              <div className="flex-1">
                <Progress 
                  value={completionProgress} 
                  className="h-2 bg-slate-200"
                />
              </div>
              <span className="text-sm font-bold text-violet-600">{completionProgress}%</span>
            </div>
          </div>
        </div>

        {/* Main form in single container */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/50 stagger-1">
          <div className="space-y-8">
            {/* Category and Format Selection */}
            <div className="space-y-6">
              <div className="flex items-center space-x-2 mb-4">
                <Sparkles className="w-5 h-5 text-violet-500 icon-sparkle" />
                <h3 className="text-xl font-semibold text-slate-800">What kind of memory is this?</h3>
              </div>
              
              {/* Category grid */}
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {memoryCategories.map((category) => {
                  const IconComponent = category.icon;
                  const isSelected = selectedCategory === category.id;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`p-4 rounded-2xl border-2 transition-all duration-300 memory-card-hover ${
                        isSelected 
                          ? `bg-gradient-to-br ${category.gradient} text-white border-transparent shadow-lg` 
                          : `bg-white/70 ${category.color} border-slate-200 hover:border-slate-300 hover:shadow-md`
                      }`}
                    >
                      <IconComponent className="w-8 h-8 mx-auto mb-2" />
                      <h4 className="font-medium text-sm">{category.title}</h4>
                    </button>
                  );
                })}
              </div>

              {/* Format selection */}
              <div className="space-y-3">
                <h4 className="font-medium text-slate-700">How do you want to capture it?</h4>
                <div className="grid grid-cols-4 gap-3">
                  {formatOptions.map((format) => {
                    const IconComponent = format.icon;
                    const isSelected = selectedFormat === format.type;
                    return (
                      <button
                        key={format.type}
                        onClick={() => setSelectedFormat(format.type)}
                        className={`p-3 rounded-xl border-2 transition-all duration-300 memory-card-hover ${
                          isSelected 
                            ? `bg-gradient-to-br ${format.gradient} text-white border-transparent shadow-lg` 
                            : `bg-white/70 ${format.color} border-slate-200 hover:border-slate-300`
                        }`}
                      >
                        <IconComponent className="w-6 h-6 mx-auto mb-1" />
                        <span className="text-xs font-medium">{format.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>

            {/* Title and Content */}
            <div className="space-y-6">
              <div className="flex items-center space-x-2 mb-4">
                {selectedFormatData && <selectedFormatData.icon className="w-5 h-5 text-violet-500" />}
                <h3 className="text-xl font-semibold text-slate-800">Tell us about your memory</h3>
              </div>

              {/* Title input */}
              <div className="space-y-2">
                <Label className="text-slate-700 font-medium">Give it a beautiful title *</Label>
                <Input
                  placeholder="What should we call this precious moment?"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="text-lg border-2 border-slate-200 focus:border-violet-400 rounded-xl bg-white/70 backdrop-blur-sm p-4"
                />
              </div>

              {/* Format-specific content */}
              <div className="space-y-4">
                {selectedFormat === 'photo' && (
                  <div className="space-y-4">
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-violet-300 rounded-2xl p-8 text-center bg-gradient-to-br from-violet-50 to-pink-50 hover:from-violet-100 hover:to-pink-100 transition-all duration-300 cursor-pointer group"
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <div className="hero-float">
                        <Camera className="w-16 h-16 text-violet-400 mx-auto mb-4 group-hover:text-violet-500 transition-colors" />
                      </div>
                      <h4 className="text-lg font-semibold text-violet-600 mb-2">Drop your photos here</h4>
                      <p className="text-slate-500">or click to browse (JPG, PNG up to 10MB each)</p>
                    </div>
                    {uploadedFiles.length > 0 && (
                      <div className="grid grid-cols-3 gap-3">
                        {uploadedFiles.map((file, index) => (
                          <div
                            key={index}
                            className="relative bg-white rounded-xl p-3 shadow-md stagger-2"
                          >
                            <div className="aspect-square bg-slate-100 rounded-lg flex items-center justify-center mb-2">
                              <Image className="w-8 h-8 text-slate-400" />
                            </div>
                            <p className="text-xs text-slate-600 truncate">{file.name}</p>
                            <button
                              onClick={() => handleRemoveFile(index)}
                              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {selectedFormat === 'video' && (
                  <div className="space-y-4">
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-red-300 rounded-2xl p-8 text-center bg-gradient-to-br from-red-50 to-pink-50 hover:from-red-100 hover:to-pink-100 transition-all duration-300 cursor-pointer group"
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="video/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <div className="hero-float">
                        <Video className="w-16 h-16 text-red-400 mx-auto mb-4 group-hover:text-red-500 transition-colors" />
                      </div>
                      <h4 className="text-lg font-semibold text-red-600 mb-2">Upload your video</h4>
                      <p className="text-slate-500">MP4, MOV up to 100MB</p>
                    </div>
                  </div>
                )}

                {selectedFormat === 'voice' && (
                  <div className="space-y-4">
                    <Tabs value={voiceOption} onValueChange={(value) => setVoiceOption(value as 'record' | 'upload')}>
                      <TabsList className="grid w-full grid-cols-2 bg-green-50 border border-green-200">
                        <TabsTrigger value="record" className="flex items-center space-x-2 data-[state=active]:bg-green-500 data-[state=active]:text-white">
                          <Mic2 className="w-4 h-4" />
                          <span>Record Now</span>
                        </TabsTrigger>
                        <TabsTrigger value="upload" className="flex items-center space-x-2 data-[state=active]:bg-green-500 data-[state=active]:text-white">
                          <FileAudio className="w-4 h-4" />
                          <span>Upload File</span>
                        </TabsTrigger>
                      </TabsList>

                      <TabsContent value="record">
                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 text-center border border-green-200">
                          <div className={isRecording ? "hero-float" : ""}>
                            <Mic className={`w-20 h-20 mx-auto mb-4 ${isRecording ? 'text-red-500' : 'text-green-500'}`} />
                          </div>
                          <Button
                            onClick={toggleRecording}
                            className={`text-white font-medium px-8 py-3 rounded-xl ${
                              isRecording 
                                ? 'bg-red-500 hover:bg-red-600' 
                                : 'bg-green-500 hover:bg-green-600'
                            }`}
                          >
                            {isRecording ? (
                              <>
                                <Square className="w-4 h-4 mr-2" />
                                Stop Recording
                              </>
                            ) : (
                              <>
                                <Play className="w-4 h-4 mr-2" />
                                Start Recording
                              </>
                            )}
                          </Button>
                          {isRecording && (
                            <div className="flex items-center justify-center space-x-2 mt-4 fade-in-section">
                              <Volume2 className="w-5 h-5 text-red-500" />
                              <span className="text-lg font-mono text-red-600">
                                {Math.floor(recordingDuration / 60)}:{(recordingDuration % 60).toString().padStart(2, '0')}
                              </span>
                            </div>
                          )}
                        </div>
                      </TabsContent>

                      <TabsContent value="upload">
                        <div 
                          onClick={() => audioInputRef.current?.click()}
                          className="border-2 border-dashed border-green-300 rounded-2xl p-8 text-center bg-gradient-to-br from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 transition-all duration-300 cursor-pointer"
                        >
                          <input
                            ref={audioInputRef}
                            type="file"
                            accept="audio/*"
                            multiple
                            onChange={handleAudioUpload}
                            className="hidden"
                          />
                          <FileAudio className="w-16 h-16 text-green-400 mx-auto mb-4" />
                          <h4 className="text-lg font-semibold text-green-600 mb-2">Upload audio files</h4>
                          <p className="text-slate-500">MP3, WAV, M4A up to 25MB each</p>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                )}

                {selectedFormat === 'text' && (
                  <div className="space-y-4">
                    <div className="relative">
                      <Textarea
                        placeholder="Share your story, recipe, wisdom, or any thoughts about this memory..."
                        className="min-h-40 text-lg border-2 border-slate-200 focus:border-slate-400 rounded-xl bg-white/70 backdrop-blur-sm p-4 resize-none"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                      <div className="absolute bottom-3 right-3 text-xs text-slate-500 bg-white/80 px-2 py-1 rounded">
                        {description.length} characters
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Description for non-text formats */}
              {selectedFormat !== 'text' && (
                <div className="space-y-2">
                  <Label className="text-slate-700 font-medium">Add some context</Label>
                  <Textarea
                    placeholder="Tell us more about this memory..."
                    className="border-2 border-slate-200 focus:border-slate-400 rounded-xl bg-white/70 backdrop-blur-sm p-4 resize-none"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              )}
            </div>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>

            {/* People Tagging */}
            <div className="space-y-6">
              <div className="flex items-center space-x-2 mb-4">
                <Users className="w-5 h-5 text-blue-500" />
                <h3 className="text-xl font-semibold text-slate-800">Who's in this memory?</h3>
              </div>

              {/* People search */}
              <div className="relative">
                <Input
                  placeholder="Search family members..."
                  value={peopleSearchTerm}
                  onChange={(e) => setPeopleSearchTerm(e.target.value)}
                  className="border-2 border-slate-200 focus:border-blue-400 rounded-xl bg-white/70 backdrop-blur-sm p-3"
                />
                <UserPlus className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              </div>

              {/* People grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 max-h-64 overflow-y-auto">
                {filteredFamilyMembers.map((person) => {
                  const isSelected = peopleInMemory.includes(person);
                  return (
                    <button
                      key={person}
                      onClick={() => handleTogglePerson(person)}
                      className={`p-3 rounded-xl border-2 text-left transition-all duration-300 memory-card-hover ${
                        isSelected 
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white border-transparent shadow-lg' 
                          : 'bg-white/70 text-slate-700 border-slate-200 hover:border-blue-300 hover:shadow-md'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        {isSelected ? (
                          <CheckCircle2 className="w-4 h-4 text-white" />
                        ) : (
                          <Circle className="w-4 h-4 text-slate-400" />
                        )}
                        <span className="text-sm font-medium truncate">{person}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Selected people display */}
              {peopleInMemory.length > 0 && (
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-200 fade-in-section">
                  <p className="text-sm font-medium text-blue-700 mb-2">Selected people ({peopleInMemory.length}):</p>
                  <div className="flex flex-wrap gap-2">
                    {peopleInMemory.map((person, index) => (
                      <Badge key={index} className="bg-blue-500 text-white hover:bg-blue-600">
                        {person}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>

            {/* Emotion Tagging */}
            <div className="space-y-6">
              <div className="flex items-center space-x-2 mb-4">
                <Heart className="w-5 h-5 text-pink-500" />
                <h3 className="text-xl font-semibold text-slate-800">How did this make you feel?</h3>
              </div>

              {/* Emotions grid */}
              <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
                {predefinedEmotions.map((emotion) => {
                  const IconComponent = emotion.icon;
                  const isSelected = emotionTags.includes(emotion.name);
                  return (
                    <button
                      key={emotion.name}
                      onClick={() => handleToggleEmotion(emotion.name)}
                      className={`p-3 rounded-xl border-2 transition-all duration-300 memory-card-hover ${
                        isSelected 
                          ? `bg-gradient-to-br ${emotion.color} text-white border-transparent shadow-lg` 
                          : `bg-white/70 ${emotion.textColor} border-slate-200 hover:border-slate-300 hover:shadow-md`
                      }`}
                    >
                      <IconComponent className="w-6 h-6 mx-auto mb-1" />
                      <span className="text-xs font-medium">{emotion.name}</span>
                    </button>
                  );
                })}
              </div>

              {/* Selected emotions display */}
              {emotionTags.length > 0 && (
                <div className="bg-pink-50 rounded-xl p-4 border border-pink-200 fade-in-section">
                  <p className="text-sm font-medium text-pink-700 mb-2">Emotions captured ({emotionTags.length}):</p>
                  <div className="flex flex-wrap gap-2">
                    {emotionTags.map((emotion, index) => (
                      <Badge key={index} className="bg-pink-500 text-white hover:bg-pink-600">
                        {emotion}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>

            {/* Additional Details */}
            <div className="space-y-6">
              <div className="flex items-center space-x-2 mb-4">
                <Tag className="w-5 h-5 text-amber-500" />
                <h3 className="text-xl font-semibold text-slate-800">Add some details</h3>
              </div>

              {/* Date and Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-slate-700 font-medium flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>When did this happen?</span>
                  </Label>
                  <Input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="border-2 border-slate-200 focus:border-amber-400 rounded-xl bg-white/70 backdrop-blur-sm p-3"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-700 font-medium flex items-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span>Where did this happen?</span>
                  </Label>
                  <Input
                    placeholder="Location..."
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="border-2 border-slate-200 focus:border-amber-400 rounded-xl bg-white/70 backdrop-blur-sm p-3"
                  />
                </div>
              </div>

              {/* General Tags */}
              <div className="space-y-3">
                <Label className="text-slate-700 font-medium">Add tags for easier searching</Label>
                <div className="flex space-x-2">
                  <Input
                    placeholder="Add a tag..."
                    value={newGeneralTag}
                    onChange={(e) => setNewGeneralTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddGeneralTag()}
                    className="flex-1 border-2 border-slate-200 focus:border-amber-400 rounded-xl bg-white/70 backdrop-blur-sm p-3"
                  />
                  <Button 
                    onClick={handleAddGeneralTag} 
                    className="bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 px-6 py-3 rounded-xl"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                {generalTags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {generalTags.map((tag, index) => (
                      <Badge 
                        key={index} 
                        className="bg-amber-100 text-amber-700 border border-amber-300 flex items-center space-x-1"
                      >
                        <span>{tag}</span>
                        <button
                          onClick={() => handleRemoveGeneralTag(tag)}
                          className="hover:bg-amber-200 rounded-full p-0.5"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              {/* Enhanced Privacy Settings with Multiple Selection */}
              <div className="space-y-4">
                <Label className="text-slate-700 font-medium flex items-center space-x-2">
                  <Eye className="w-4 h-4" />
                  <span>Who can see this memory?</span>
                </Label>
                
                {/* Privacy toggle */}
                <div className="flex items-center space-x-4">
                  <Button
                    variant="outline"
                    onClick={() => setIsPrivate(!isPrivate)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl border-2 transition-all duration-300 ${
                      isPrivate 
                        ? 'border-red-300 bg-red-50 text-red-700' 
                        : 'border-green-300 bg-green-50 text-green-700'
                    }`}
                  >
                    {isPrivate ? <Lock className="w-4 h-4" /> : <Globe className="w-4 h-4" />}
                    <span>{isPrivate ? 'Private' : 'Shared'}</span>
                  </Button>
                  
                  {!isPrivate && (
                    <Button
                      variant="outline"
                      onClick={() => setShowSharingOptions(!showSharingOptions)}
                      className="flex items-center space-x-2 px-4 py-2 rounded-xl border-2 border-blue-300 bg-blue-50 text-blue-700 hover:bg-blue-100"
                    >
                      <UserCheck className="w-4 h-4" />
                      <span>Select People ({sharedWith.length})</span>
                    </Button>
                  )}
                </div>

                {/* Multi-select sharing options */}
                {!isPrivate && showSharingOptions && (
                  <div className="bg-blue-50 rounded-xl p-4 border border-blue-200 space-y-4 fade-in-section">
                    {/* Search for sharing */}
                    <div className="relative">
                      <Input
                        placeholder="Search family members to share with..."
                        value={sharingSearchTerm}
                        onChange={(e) => setSharingSearchTerm(e.target.value)}
                        className="border-2 border-blue-200 focus:border-blue-400 rounded-xl bg-white/70 backdrop-blur-sm p-3"
                      />
                      <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                    </div>

                    {/* Quick select options */}
                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleToggleSharing('Family')}
                        className={`flex items-center space-x-2 rounded-lg ${
                          sharedWith.includes('Family')
                            ? 'bg-blue-500 text-white border-blue-500' 
                            : 'border-blue-300 text-blue-700 hover:bg-blue-100'
                        }`}
                      >
                        <Users className="w-4 h-4" />
                        <span>Entire Family</span>
                        {sharedWith.includes('Family') && <CheckCircle2 className="w-4 h-4" />}
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleSelectAllFamily}
                        className="flex items-center space-x-2 border-blue-300 text-blue-700 hover:bg-blue-100 rounded-lg"
                      >
                        <UserPlus className="w-4 h-4" />
                        <span>{sharedWith.length === familyMembers.length ? 'Deselect All' : 'Select All'}</span>
                      </Button>
                    </div>

                    {/* Individual family members */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-48 overflow-y-auto">
                      {filteredSharingMembers.map((person) => {
                        const isSelected = sharedWith.includes(person);
                        return (
                          <div 
                            key={person}
                            className="flex items-center space-x-2 p-2 rounded-lg hover:bg-white/50 transition-colors"
                          >
                            <Checkbox
                              id={`share-${person}`}
                              checked={isSelected}
                              onCheckedChange={() => handleToggleSharing(person)}
                              className="border-blue-300 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                            />
                            <label
                              htmlFor={`share-${person}`}
                              className="text-sm font-medium text-blue-800 cursor-pointer flex-1 truncate"
                            >
                              {person}
                            </label>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Selected sharing display */}
                {!isPrivate && sharedWith.length > 0 && (
                  <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                    <p className="text-sm font-medium text-green-700 mb-2">
                      Sharing with ({sharedWith.length} {sharedWith.length === 1 ? 'person' : 'people'}):
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {sharedWith.map((person, index) => (
                        <Badge 
                          key={index} 
                          className="bg-green-500 text-white hover:bg-green-600 flex items-center space-x-1"
                        >
                          <span>{person}</span>
                          <button
                            onClick={() => handleToggleSharing(person)}
                            className="hover:bg-green-600 rounded-full p-0.5"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button
                variant="outline"
                onClick={onBack}
                className="flex-1 border-2 border-slate-300 text-slate-600 hover:bg-slate-50 py-3 rounded-xl font-medium"
              >
                Cancel
              </Button>
              <div className="flex-1">
                <Button
                  onClick={handleSubmit}
                  disabled={!title.trim() || completionProgress < 50}
                  className="w-full bg-gradient-to-r from-violet-500 to-pink-500 text-white hover:from-violet-600 hover:to-pink-600 py-3 rounded-xl font-medium shadow-lg disabled:opacity-50 disabled:cursor-not-allowed memory-card-hover"
                >
                  <div className="flex items-center justify-center space-x-2">
                    <Save className="w-5 h-5" />
                    <span>Save Memory</span>
                    <Flame className="w-5 h-5 streak-flame" />
                  </div>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Tips */}
        <div className="mt-8 bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/50 stagger-2">
          <h4 className="font-semibold text-slate-700 mb-3 flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-violet-500 icon-sparkle" />
            <span>💡 Pro Tips for Amazing Memories</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-600">
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-violet-500 rounded-full mt-2 flex-shrink-0"></div>
              <span>Tag everyone who appears in the memory to help family members find relevant content</span>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-pink-500 rounded-full mt-2 flex-shrink-0"></div>
              <span>Add emotion tags to capture the feelings and make memories more searchable</span>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <span>Select multiple family members to share with, or choose "Entire Family" for everyone</span>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
              <span>Use private mode for personal memories you want to keep to yourself</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}