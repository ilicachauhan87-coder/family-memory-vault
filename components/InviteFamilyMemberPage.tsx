import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Input } from './ui/input';
import { Separator } from './ui/separator';
import { 
  UserPlus, 
  Search, 
  MessageCircle, 
  Mail, 
  Phone, 
  Send,
  Users,
  ArrowLeft,
  CheckCircle,
  Sparkles,
  TreePine,
  Heart,
  Crown,
  Baby
} from 'lucide-react';

interface FamilyMember {
  id: string;
  name: string;
  avatar: string;
  relationship: string;
  generation: number;
  isOnApp: boolean;
  phoneNumber?: string;
  email?: string;
}

interface InviteFamilyMemberPageProps {
  onBack: () => void;
  onSuccess: () => void;
}

export function InviteFamilyMemberPage({ onBack, onSuccess }: InviteFamilyMemberPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [step, setStep] = useState<'select' | 'invite'>('select');

  // Complete family tree data - all members from the app
  const allFamilyMembers: FamilyMember[] = [
    // Current user's generation (0)
    { id: 'ilica-chauhan', name: 'Ilica Chauhan', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=100&h=100&fit=crop&crop=face', relationship: 'You', generation: 0, isOnApp: true },
    { id: 'priyam-alok', name: 'Priyam Alok', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face', relationship: 'Husband', generation: 0, isOnApp: true },
    { id: 'ishan-chauhan', name: 'Ishan Chauhan', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face', relationship: 'Brother', generation: 0, isOnApp: true },
    
    // Parents generation (+1)
    { id: 'rajeev-chauhan', name: 'Rajeev Kumar Chauhan', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face', relationship: 'Father', generation: 1, isOnApp: true, phoneNumber: '+91 98765 43210', email: 'rajeev.chauhan@email.com' },
    { id: 'priti-chauhan', name: 'Priti Chauhan', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=100&h=100&fit=crop&crop=face', relationship: 'Mother', generation: 1, isOnApp: true, phoneNumber: '+91 98765 43211', email: 'priti.chauhan@email.com' },
    { id: 'sanjeev-kumar', name: 'Sanjeev Kumar', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face', relationship: 'Father-in-law', generation: 1, isOnApp: false, phoneNumber: '+91 98765 43212', email: 'sanjeev.kumar@email.com' },
    { id: 'sudha-chauhan', name: 'Sudha Chauhan', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=100&h=100&fit=crop&crop=face', relationship: 'Mother-in-law', generation: 1, isOnApp: false, phoneNumber: '+91 98765 43213', email: 'sudha.chauhan@email.com' },
    
    // Children generation (-1)
    { id: 'miraya-chauhan-sinha', name: 'Miraya Chauhan Sinha', avatar: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=100&h=100&fit=crop&crop=face', relationship: 'Daughter', generation: -1, isOnApp: false, phoneNumber: '+91 98765 43214', email: 'miraya@email.com' },
    
    // Grandparents generation (+2)
    { id: 'ajai-singh', name: 'Shri Ajai Singh', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face', relationship: 'Maternal Grandfather (Nanaji)', generation: 2, isOnApp: false, phoneNumber: '+91 98765 43215', email: 'ajai.singh@email.com' },
    { id: 'urmila-devi', name: 'Shrimati Urmila Devi', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=100&h=100&fit=crop&crop=face', relationship: 'Maternal Grandmother (Naniji)', generation: 2, isOnApp: false, phoneNumber: '+91 98765 43216', email: 'urmila.devi@email.com' },
    { id: 'yeshpal-singh', name: 'Shri Yeshpal Singh', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face', relationship: 'Paternal Grandfather (Dadaji)', generation: 2, isOnApp: false, phoneNumber: '+91 98765 43217', email: 'yeshpal.singh@email.com' },
    { id: 'rohitash-devi', name: 'Shrimati Rohitash Devi', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=100&h=100&fit=crop&crop=face', relationship: 'Paternal Grandmother (Dadiji)', generation: 2, isOnApp: false, phoneNumber: '+91 98765 43218', email: 'rohitash.devi@email.com' },
    
    // Extended family
    { id: 'usha-verma', name: 'Shrimati Usha Verma', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=100&h=100&fit=crop&crop=face', relationship: 'Maternal Aunt (Mausi)', generation: 1, isOnApp: false, phoneNumber: '+91 98765 43219', email: 'usha.verma@email.com' },
    { id: 'jitendra-verma', name: 'Dr Jitendra Verma', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face', relationship: 'Maternal Uncle (Mausaji)', generation: 1, isOnApp: false, phoneNumber: '+91 98765 43220', email: 'jitendra.verma@email.com' },
    { id: 'pradeep-kumar', name: 'Pradeep Kumar', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face', relationship: 'Paternal Uncle (Chacha)', generation: 1, isOnApp: false, phoneNumber: '+91 98765 43221', email: 'pradeep.kumar@email.com' },
    { id: 'ajay-kumar', name: 'Ajay Kumar', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face', relationship: 'Paternal Uncle (Tau)', generation: 1, isOnApp: false, phoneNumber: '+91 98765 43222', email: 'ajay.kumar@email.com' },
    { id: 'sanjay-kumar', name: 'Sanjay Kumar', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face', relationship: 'Maternal Uncle (Mama)', generation: 1, isOnApp: false, phoneNumber: '+91 98765 43223', email: 'sanjay.kumar@email.com' },
    { id: 'seema-chaudhary', name: 'Seema Chaudhary', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=100&h=100&fit=crop&crop=face', relationship: 'Sister-in-law', generation: 0, isOnApp: false, phoneNumber: '+91 98765 43224', email: 'seema.chaudhary@email.com' },
    
    // Cousins and extended family same generation
    { id: 'somya-chauhan', name: 'Somya Chauhan', avatar: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=100&h=100&fit=crop&crop=face', relationship: 'Cousin Sister', generation: 0, isOnApp: false, phoneNumber: '+91 98765 43225', email: 'somya.chauhan@email.com' },
    { id: 'shivam-verma', name: 'Shivam Verma', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face', relationship: 'Cousin Brother', generation: 0, isOnApp: false, phoneNumber: '+91 98765 43226', email: 'shivam.verma@email.com' },
    { id: 'shivani-bobo', name: 'Shivani Bobo', avatar: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=100&h=100&fit=crop&crop=face', relationship: 'Cousin Sister', generation: 0, isOnApp: false, phoneNumber: '+91 98765 43227', email: 'shivani.bobo@email.com' },
    { id: 'praneet-asthana', name: 'Praneet Asthana', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face', relationship: 'Cousin Brother', generation: 0, isOnApp: false, phoneNumber: '+91 98765 43228', email: 'praneet.asthana@email.com' },
    
    // Next generation (-1)
    { id: 'viraj-chaudhary', name: 'Viraj Chaudhary', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face', relationship: 'Nephew', generation: -1, isOnApp: false, phoneNumber: '+91 98765 43229', email: 'viraj.chaudhary@email.com' },
    { id: 'aastha-chaudhary', name: 'Aastha Chaudhary', avatar: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=100&h=100&fit=crop&crop=face', relationship: 'Niece', generation: -1, isOnApp: false, phoneNumber: '+91 98765 43230', email: 'aastha.chaudhary@email.com' },
    { id: 'samaira-singh', name: 'Samaira Singh', avatar: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=100&h=100&fit=crop&crop=face', relationship: 'Niece', generation: -1, isOnApp: false, phoneNumber: '+91 98765 43231', email: 'samaira.singh@email.com' },
    { id: 'kushagra-zulmi-jat', name: 'Kushagra Zulmi Jat', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face', relationship: 'Nephew', generation: -1, isOnApp: false, phoneNumber: '+91 98765 43232', email: 'kushagra.jat@email.com' },
    
    // Pets
    { id: 'gattu-chauhan', name: 'Gattu Chauhan (Parrot)', avatar: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=100&h=100&fit=crop', relationship: 'Pet', generation: 0, isOnApp: false },
    { id: 'hari', name: 'Hari', avatar: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=100&h=100&fit=crop', relationship: 'Pet', generation: 0, isOnApp: false },
  ];

  // Filter out current user and those already on app, plus pets for invitations
  const invitableMembers = allFamilyMembers.filter(member => 
    member.id !== 'ilica-chauhan' && 
    !member.isOnApp && 
    member.relationship !== 'Pet' &&
    member.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedMemberDetails = allFamilyMembers.filter(member => 
    selectedMembers.includes(member.id)
  );

  const getGenerationIcon = (generation: number) => {
    if (generation > 1) return Crown;
    if (generation === 1) return Heart;
    if (generation === 0) return Users;
    if (generation < 0) return Baby;
    return Users;
  };

  const getGenerationColor = (generation: number) => {
    if (generation > 1) return 'text-amber-600 bg-amber-100';
    if (generation === 1) return 'text-emerald-600 bg-emerald-100';
    if (generation === 0) return 'text-blue-600 bg-blue-100';
    if (generation < 0) return 'text-pink-600 bg-pink-100';
    return 'text-gray-600 bg-gray-100';
  };

  const handleMemberToggle = (memberId: string) => {
    setSelectedMembers(prev => 
      prev.includes(memberId) 
        ? prev.filter(id => id !== memberId)
        : [...prev, memberId]
    );
  };

  const handleInvite = (method: 'whatsapp' | 'email' | 'sms') => {
    const memberNames = selectedMemberDetails.map(m => m.name).join(', ');
    const inviteMessage = `Hi! 👋\n\nI've been building our Family Memory Vault - a special digital space where we can preserve and share our precious family memories together.\n\nJoin us to:\n✨ View family photos and videos\n🎙️ Listen to voice messages from loved ones\n📱 Share your own memories\n🌳 Connect with our family tree\n\nDownload the Family Memory Vault app and join our family!\n\nWith love,\nIlica ❤️`;
    
    switch (method) {
      case 'whatsapp':
        alert(`WhatsApp invitations sent to:\n${memberNames}\n\nMessage: "${inviteMessage}"`);
        break;
      case 'email':
        alert(`Email invitations sent to:\n${memberNames}\n\nSubject: "Join our Family Memory Vault"\nMessage: "${inviteMessage}"`);
        break;
      case 'sms':
        alert(`SMS invitations sent to:\n${memberNames}\n\nMessage: "${inviteMessage}"`);
        break;
    }
    
    onSuccess();
  };

  if (step === 'invite') {
    return (
      <div className="min-h-screen bg-background vibrant-texture">
        <div className="px-4 py-6 space-y-6">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-2">
              <Send className="w-6 h-6 text-primary" />
              <h1 className="text-2xl lg:text-3xl text-primary">Send Invitations</h1>
              <Sparkles className="w-6 h-6 text-aqua" />
            </div>
            <p className="text-muted-foreground">
              Invite {selectedMemberDetails.length} family member{selectedMemberDetails.length > 1 ? 's' : ''} to join your Memory Vault
            </p>
          </div>

          {/* Selected Members Preview */}
          <Card className="memory-card max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-aqua" />
                <span>Selected Family Members</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {selectedMemberDetails.map((member) => {
                const GenerationIcon = getGenerationIcon(member.generation);
                return (
                  <div key={member.id} className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={member.avatar} />
                      <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h4 className="font-medium">{member.name}</h4>
                      <p className="text-sm text-muted-foreground">{member.relationship}</p>
                      {member.phoneNumber && (
                        <p className="text-xs text-muted-foreground">{member.phoneNumber}</p>
                      )}
                    </div>
                    <div className={`p-2 rounded-full ${getGenerationColor(member.generation)}`}>
                      <GenerationIcon className="w-4 h-4" />
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Invitation Methods */}
          <Card className="memory-card max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Choose how to invite them:</CardTitle>
              <CardDescription>
                Select your preferred method to send the invitation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                onClick={() => handleInvite('whatsapp')}
                className="w-full flex items-center justify-center space-x-3 bg-green-500 hover:bg-green-600 text-white h-12"
              >
                <MessageCircle className="w-5 h-5" />
                <span>WhatsApp</span>
                <Badge className="bg-green-600 text-white ml-auto">Most Popular</Badge>
              </Button>
              
              <Button
                onClick={() => handleInvite('email')}
                className="w-full flex items-center justify-center space-x-3 bg-blue-500 hover:bg-blue-600 text-white h-12"
              >
                <Mail className="w-5 h-5" />
                <span>Email</span>
              </Button>
              
              <Button
                onClick={() => handleInvite('sms')}
                className="w-full flex items-center justify-center space-x-3 bg-purple-500 hover:bg-purple-600 text-white h-12"
              >
                <Phone className="w-5 h-5" />
                <span>SMS</span>
              </Button>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex space-x-4 max-w-2xl mx-auto">
            <Button variant="outline" onClick={() => setStep('select')} className="flex-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Selection
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background vibrant-texture">
      <div className="px-4 py-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <UserPlus className="w-6 h-6 text-primary" />
            <h1 className="text-2xl lg:text-3xl text-primary">Invite Family Members</h1>
            <TreePine className="w-6 h-6 text-aqua" />
          </div>
          <p className="text-muted-foreground">
            Invite family members who aren't on the app yet to join your Memory Vault
          </p>
        </div>

        {/* Search */}
        <Card className="memory-card max-w-2xl mx-auto">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search family members to invite..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 text-base"
              />
            </div>
          </CardContent>
        </Card>

        {/* Selected Count */}
        {selectedMembers.length > 0 && (
          <div className="text-center">
            <Badge className="bg-primary text-primary-foreground px-4 py-2">
              <CheckCircle className="w-4 h-4 mr-2" />
              {selectedMembers.length} member{selectedMembers.length > 1 ? 's' : ''} selected
            </Badge>
          </div>
        )}

        {/* Family Members List */}
        <Card className="memory-card max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-aqua" />
              <span>Family Members Not on App</span>
            </CardTitle>
            <CardDescription>
              {invitableMembers.length} family members haven't joined your Memory Vault yet
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {invitableMembers.length === 0 ? (
              <div className="text-center py-8">
                <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  {searchQuery ? 'No family members found matching your search.' : 'All your family members are already on the app! 🎉'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {invitableMembers.map((member) => {
                  const isSelected = selectedMembers.includes(member.id);
                  const GenerationIcon = getGenerationIcon(member.generation);
                  
                  return (
                    <div
                      key={member.id}
                      className={`flex items-center space-x-3 p-3 border rounded-lg cursor-pointer transition-all ${
                        isSelected 
                          ? 'border-primary bg-primary/10 ring-2 ring-primary/20' 
                          : 'border-border hover:border-primary/50 hover:bg-muted/30'
                      }`}
                      onClick={() => handleMemberToggle(member.id)}
                    >
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h4 className="font-medium">{member.name}</h4>
                        <p className="text-sm text-muted-foreground">{member.relationship}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            Generation {member.generation === 0 ? 'same' : member.generation > 0 ? `+${member.generation}` : member.generation}
                          </Badge>
                          {member.phoneNumber && (
                            <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                              Phone ✓
                            </Badge>
                          )}
                          {member.email && (
                            <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                              Email ✓
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className={`p-2 rounded-full ${getGenerationColor(member.generation)}`}>
                        <GenerationIcon className="w-4 h-4" />
                      </div>
                      {isSelected && (
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex space-x-4 max-w-2xl mx-auto">
          <Button variant="outline" onClick={onBack} className="flex-1">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          <Button 
            onClick={() => setStep('invite')}
            disabled={selectedMembers.length === 0}
            className="flex-1 vibrant-button text-primary-foreground"
          >
            <Send className="w-4 h-4 mr-2" />
            Invite {selectedMembers.length} Member{selectedMembers.length > 1 ? 's' : ''}
          </Button>
        </div>
      </div>
    </div>
  );
}