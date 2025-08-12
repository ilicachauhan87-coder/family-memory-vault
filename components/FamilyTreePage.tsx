import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { ScrollArea } from './ui/scroll-area';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Textarea } from './ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Separator } from './ui/separator';
import { TreePine, Crown, Heart, Calendar, ZoomIn, ZoomOut, RotateCcw, UserPlus, Users, Plus, Check, ArrowRight, Sparkles, FileText, Edit, Star, MapPin, Phone, Mail, Book, X, Save, ArrowLeft } from 'lucide-react';

interface FamilyMember {
  id: string;
  name: string;
  shortName: string;
  gender: 'male' | 'female' | 'other';
  birthDate?: string;
  deathDate?: string;
  relationship: string;
  isUser?: boolean;
  memoryCount?: number;
  avatar?: string;
  x: number;
  y: number;
  spouseId?: string;
  parentIds?: string[];
  childIds?: string[];
  // Biography fields
  bio?: string;
  occupation?: string;
  location?: string;
  phone?: string;
  email?: string;
  hobbies?: string[];
  favoriteMemories?: string;
  personalNotes?: string;
}

interface Connection {
  from: string;
  to: string;
  type: 'parent' | 'spouse' | 'child';
  color: string;
}

interface FamilyTreePageProps {
  onBack: () => void;
  onPersonClick?: (personId: string) => void;
  onAddMember?: () => void;
  onNavigate?: (page: string) => void;
  isNewUser?: boolean;
}

export function FamilyTreePage({ onBack, onPersonClick, onAddMember, onNavigate, isNewUser = false }: FamilyTreePageProps) {
  const [zoom, setZoom] = useState(1);
  const [selectedPerson, setSelectedPerson] = useState<string>('');
  const [buildingStep, setBuildingStep] = useState<'start' | 'adding-family' | 'complete'>('start');
  const [showPersonDialog, setShowPersonDialog] = useState(false);
  const [editingPerson, setEditingPerson] = useState<FamilyMember | null>(null);
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [newUserFamilyMembers, setNewUserFamilyMembers] = useState<FamilyMember[]>([
    {
      id: 'user',
      name: 'You',
      shortName: 'You',
      gender: 'female',
      relationship: 'Self',
      isUser: true,
      memoryCount: 0,
      x: 400,
      y: 250,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=100&h=100&fit=crop&crop=face',
      bio: 'Welcome to your family tree! You can add your biography, interests, and memories here.',
      occupation: 'Family Memory Keeper',
      location: 'Home',
      hobbies: ['Photography', 'Cooking', 'Storytelling']
    }
  ]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newMember, setNewMember] = useState({
    name: '',
    relationship: '',
    gender: 'male' as 'male' | 'female' | 'other',
    birthDate: '',
    status: 'alive' as 'alive' | 'deceased',
    deathDate: ''
  });

  // Existing full family tree data for returning users
  const existingFamilyMembers: FamilyMember[] = [
    // Generation 4 - Great Grandparents (Top level)
    { 
      id: 'ajai-singh', 
      name: 'Shri Ajai Singh', 
      shortName: 'Ajai Singh',
      gender: 'male', 
      relationship: 'Paternal Great Grandfather', 
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      memoryCount: 15,
      x: 150, y: 50,
      spouseId: 'urmila-devi',
      bio: 'A respected patriarch who laid the foundation of our family values. Known for his wisdom, kindness, and dedication to family traditions. He was a teacher who educated many children in the village and always emphasized the importance of knowledge and moral values.',
      occupation: 'Village School Teacher',
      location: 'Mathura, Uttar Pradesh',
      deathDate: '12 Jan 2010',
      hobbies: ['Teaching', 'Reading', 'Storytelling'],
      personalNotes: 'Always said "Vidya hi param dhan hai" - Knowledge is the ultimate wealth'
    },
    { 
      id: 'urmila-devi', 
      name: 'Shrimati Urmila Devi', 
      shortName: 'Urmila Devi',
      gender: 'female', 
      relationship: 'Paternal Great Grandmother', 
      avatar: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?w=100&h=100&fit=crop&crop=face',
      memoryCount: 18,
      x: 250, y: 50,
      spouseId: 'ajai-singh',
      bio: 'The heart of our family, known for her incredible cooking and nurturing nature. She could make anyone feel at home with her warm smile and delicious food. Her recipes are still treasured and passed down through generations.',
      occupation: 'Homemaker & Community Helper',
      location: 'Mathura, Uttar Pradesh',
      deathDate: '8 Mar 2012',
      hobbies: ['Cooking', 'Gardening', 'Bhajan singing'],
      personalNotes: 'Her kada prasad recipe is legendary in our family'
    },
    { 
      id: 'yeshpal-singh', 
      name: 'Shri Yeshpal Singh', 
      shortName: 'Yeshpal Singh',
      gender: 'male', 
      relationship: 'Maternal Great Grandfather', 
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      memoryCount: 12,
      x: 700, y: 50,
      spouseId: 'rohitash-devi'
    },
    { 
      id: 'rohitash-devi', 
      name: 'Shrimati Rohitash Devi', 
      shortName: 'Rohitash Devi',
      gender: 'female', 
      relationship: 'Maternal Great Grandmother', 
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=100&h=100&fit=crop&crop=face',
      memoryCount: 20,
      x: 800, y: 50,
      spouseId: 'yeshpal-singh'
    },

    // Generation 3 - Grandparents & Aunts/Uncles
    { 
      id: 'rajeev-chauhan', 
      name: 'Rajeev Kumar Chauhan', 
      shortName: 'Rajeev Chauhan',
      gender: 'male', 
      birthDate: '25 Oct 1960', 
      relationship: 'Father', 
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      memoryCount: 42,
      x: 350, y: 180,
      spouseId: 'priti-chauhan',
      parentIds: ['ajai-singh', 'urmila-devi'],
      bio: 'A loving father and dedicated government employee who always put family first. Known for his patience, wisdom, and ability to solve any problem with a smile. He loves photography and has documented most of our family celebrations over the years.',
      occupation: 'Senior Government Officer (Retired)',
      location: 'Delhi, India',
      phone: '+91 98765 43210',
      email: 'rajeev.chauhan@email.com',
      hobbies: ['Photography', 'Gardening', 'Cricket', 'Family documentaries'],
      personalNotes: 'Has the best collection of family photos spanning 40+ years'
    },
    { 
      id: 'priti-chauhan', 
      name: 'Priti Chauhan', 
      shortName: 'Priti Chauhan',
      gender: 'female', 
      birthDate: '15 Aug 1965', 
      relationship: 'Mother', 
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=100&h=100&fit=crop&crop=face',
      memoryCount: 38,
      x: 450, y: 180,
      spouseId: 'rajeev-chauhan',
      parentIds: ['yeshpal-singh', 'rohitash-devi']
    },
    
    // Paternal Uncles/Aunts
    { 
      id: 'sanjeev-kumar', 
      name: 'Sanjeev Kumar', 
      shortName: 'Sanjeev Kumar',
      gender: 'male', 
      relationship: 'Paternal Uncle', 
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      memoryCount: 25,
      x: 100, y: 180,
      spouseId: 'sudha-chauhan',
      parentIds: ['ajai-singh', 'urmila-devi']
    },
    { 
      id: 'sudha-chauhan', 
      name: 'Sudha Chauhan', 
      shortName: 'Sudha Chauhan',
      gender: 'female', 
      relationship: 'Paternal Aunt', 
      avatar: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?w=100&h=100&fit=crop&crop=face',
      memoryCount: 22,
      x: 200, y: 180,
      spouseId: 'sanjeev-kumar'
    },
    { 
      id: 'usha-verma', 
      name: 'Shrimati Usha Verma', 
      shortName: 'Usha Verma',
      gender: 'female', 
      relationship: 'Paternal Aunt', 
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=100&h=100&fit=crop&crop=face',
      memoryCount: 28,
      x: 550, y: 180,
      spouseId: 'jitendra-verma',
      parentIds: ['ajai-singh', 'urmila-devi']
    },
    { 
      id: 'jitendra-verma', 
      name: 'Dr Jitendra Verma', 
      shortName: 'Jitendra Verma',
      gender: 'male', 
      relationship: 'Paternal Uncle', 
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      memoryCount: 31,
      x: 650, y: 180,
      spouseId: 'usha-verma'
    },

    // Maternal Uncles
    { 
      id: 'pradeep-kumar', 
      name: 'Pradeep Kumar', 
      shortName: 'Pradeep Kumar',
      gender: 'male', 
      relationship: 'Maternal Uncle', 
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      memoryCount: 19,
      x: 850, y: 180,
      parentIds: ['yeshpal-singh', 'rohitash-devi']
    },
    { 
      id: 'ajay-kumar', 
      name: 'Ajay Kumar', 
      shortName: 'Ajay Kumar',
      gender: 'male', 
      relationship: 'Maternal Uncle', 
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      memoryCount: 24,
      x: 950, y: 180,
      parentIds: ['yeshpal-singh', 'rohitash-devi']
    },
    { 
      id: 'sanjay-kumar', 
      name: 'Sanjay Kumar', 
      shortName: 'Sanjay Kumar',
      gender: 'male', 
      relationship: 'Maternal Uncle', 
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      memoryCount: 27,
      x: 1050, y: 180,
      spouseId: 'seema-chaudhary',
      parentIds: ['yeshpal-singh', 'rohitash-devi']
    },
    { 
      id: 'seema-chaudhary', 
      name: 'Seema Chaudhary', 
      shortName: 'Seema Chaudhary',
      gender: 'female', 
      relationship: 'Maternal Aunt', 
      avatar: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?w=100&h=100&fit=crop&crop=face',
      memoryCount: 23,
      x: 1150, y: 180,
      spouseId: 'sanjay-kumar'
    },

    // Generation 2 - Main Generation (Ilica & Siblings & Cousins)
    { 
      id: 'ilica-chauhan', 
      name: 'Ilica Chauhan', 
      shortName: 'Ilica Chauhan',
      gender: 'female', 
      birthDate: '31 Mar 1987', 
      relationship: 'Self (User)', 
      isUser: true,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=100&h=100&fit=crop&crop=face',
      memoryCount: 89,
      x: 400, y: 320,
      spouseId: 'priyam-alok',
      parentIds: ['rajeev-chauhan', 'priti-chauhan'],
      bio: 'A passionate family memory keeper and loving mother. I believe in preserving our family\'s beautiful traditions and stories for future generations. Creating this digital family vault is my way of ensuring our memories live forever.',
      occupation: 'Family Memory Keeper & Software Developer',
      location: 'Delhi, India',
      phone: '+91 98765 43214',
      email: 'ilica.chauhan@email.com',
      hobbies: ['Photography', 'Digital storytelling', 'Cooking traditional recipes', 'Family history research'],
      personalNotes: 'Currently creating a comprehensive digital archive of our family history'
    },
    { 
      id: 'priyam-alok', 
      name: 'Priyam Alok', 
      shortName: 'Priyam Alok',
      gender: 'male', 
      relationship: 'Husband', 
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      memoryCount: 67,
      x: 500, y: 320,
      spouseId: 'ilica-chauhan'
    },
    { 
      id: 'ishan-chauhan', 
      name: 'Ishan Chauhan', 
      shortName: 'Ishan Chauhan',
      gender: 'male', 
      birthDate: '25 Jan 1991', 
      relationship: 'Brother', 
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      memoryCount: 45,
      x: 250, y: 320,
      parentIds: ['rajeev-chauhan', 'priti-chauhan']
    },
    { 
      id: 'gattu-chauhan', 
      name: 'Gattu Chauhan (Parrot)', 
      shortName: 'Gattu 🦜',
      gender: 'other', 
      birthDate: '31 Mar 2021', 
      relationship: 'Brother (Parrot)', 
      avatar: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=100&h=100&fit=crop&crop=face',
      memoryCount: 12,
      x: 300, y: 320,
      parentIds: ['rajeev-chauhan', 'priti-chauhan']
    },
    
    // Cousins
    { 
      id: 'somya-chauhan', 
      name: 'Somya Chauhan', 
      shortName: 'Somya Chauhan',
      gender: 'female', 
      relationship: 'Cousin', 
      avatar: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?w=100&h=100&fit=crop&crop=face',
      memoryCount: 28,
      x: 150, y: 320,
      parentIds: ['sanjeev-kumar', 'sudha-chauhan']
    },
    { 
      id: 'shivam-verma', 
      name: 'Shivam Verma', 
      shortName: 'Shivam Verma',
      gender: 'male', 
      relationship: 'Cousin', 
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      memoryCount: 22,
      x: 600, y: 320,
      parentIds: ['jitendra-verma', 'usha-verma']
    },
    { 
      id: 'shivani-bobo', 
      name: 'Shivani Bobo', 
      shortName: 'Shivani Bobo',
      gender: 'female', 
      relationship: 'Cousin', 
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=100&h=100&fit=crop&crop=face',
      memoryCount: 31,
      x: 700, y: 320,
      spouseId: 'praneet-asthana',
      parentIds: ['jitendra-verma', 'usha-verma']
    },
    { 
      id: 'praneet-asthana', 
      name: 'Praneet Asthana', 
      shortName: 'Praneet Asthana',
      gender: 'male', 
      relationship: 'Cousin-in-Law', 
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      memoryCount: 18,
      x: 800, y: 320,
      spouseId: 'shivani-bobo'
    },
    
    // Ajay Kumar's children
    { 
      id: 'viraj-chaudhary', 
      name: 'Viraj Chaudhary', 
      shortName: 'Viraj Chaudhary',
      gender: 'male', 
      relationship: 'Cousin', 
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      memoryCount: 16,
      x: 900, y: 320,
      parentIds: ['ajay-kumar']
    },
    { 
      id: 'aastha-chaudhary', 
      name: 'Aastha Chaudhary', 
      shortName: 'Aastha Chaudhary',
      gender: 'female', 
      relationship: 'Cousin', 
      avatar: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?w=100&h=100&fit=crop&crop=face',
      memoryCount: 19,
      x: 1000, y: 320,
      parentIds: ['ajay-kumar']
    },
    
    // Sanjay Kumar's children
    { 
      id: 'samaira-singh', 
      name: 'Samaira Singh', 
      shortName: 'Samaira Singh',
      gender: 'female', 
      relationship: 'Cousin', 
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=100&h=100&fit=crop&crop=face',
      memoryCount: 21,
      x: 1100, y: 320,
      parentIds: ['sanjay-kumar', 'seema-chaudhary']
    },
    { 
      id: 'kushagra-zulmi-jat', 
      name: 'Kushagra Zulmi Jat', 
      shortName: 'Kushagra Jat',
      gender: 'male', 
      relationship: 'Cousin', 
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      memoryCount: 14,
      x: 1200, y: 320,
      parentIds: ['sanjay-kumar', 'seema-chaudhary']
    },

    // Generation 1 - Children
    { 
      id: 'miraya-chauhan-sinha', 
      name: 'Miraya Chauhan Sinha', 
      shortName: 'Miraya',
      gender: 'female', 
      birthDate: '6 Sept 2023', 
      relationship: 'Daughter', 
      avatar: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=100&h=100&fit=crop&crop=face',
      memoryCount: 156,
      x: 450, y: 460,
      parentIds: ['ilica-chauhan', 'priyam-alok']
    },
    { 
      id: 'hari', 
      name: 'Hari', 
      shortName: 'Hari',
      gender: 'male', 
      birthDate: '6 Nov 2024', 
      relationship: 'Grand Nephew', 
      avatar: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=100&h=100&fit=crop&crop=face',
      memoryCount: 8,
      x: 750, y: 460,
      parentIds: ['shivani-bobo', 'praneet-asthana']
    }
  ];

  const familyMembers = isNewUser ? newUserFamilyMembers : existingFamilyMembers;

  // Generate connections for the tree
  const generateConnections = (): Connection[] => {
    const connections: Connection[] = [];

    familyMembers.forEach(member => {
      // Spouse connections
      if (member.spouseId) {
        const spouse = familyMembers.find(m => m.id === member.spouseId);
        if (spouse && member.id < spouse.id) { // Avoid duplicate connections
          connections.push({
            from: member.id,
            to: spouse.id,
            type: 'spouse',
            color: '#FF6F61'
          });
        }
      }

      // Parent-child connections
      if (member.parentIds) {
        member.parentIds.forEach(parentId => {
          connections.push({
            from: parentId,
            to: member.id,
            type: 'parent',
            color: '#6A0572'
          });
        });
      }
    });

    return connections;
  };

  const connections = generateConnections();

  const handlePersonClick = (person: FamilyMember) => {
    setSelectedPerson(person.id);
    setEditingPerson(person);
    setShowPersonDialog(true);
    if (onPersonClick) {
      onPersonClick(person.id);
    }
  };

  const handleSaveBio = () => {
    if (!editingPerson) return;

    if (isNewUser) {
      setNewUserFamilyMembers(prev => 
        prev.map(member => 
          member.id === editingPerson.id ? { ...editingPerson } : member
        )
      );
    }
    setIsEditingBio(false);
  };

  const handleZoomIn = () => setZoom(Math.min(zoom + 0.2, 2));
  const handleZoomOut = () => setZoom(Math.max(zoom - 0.2, 0.5));
  const handleResetZoom = () => setZoom(1);

  const handleAddFamilyMember = () => {
    if (!newMember.name || !newMember.relationship) return;

    const avatars = [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=100&h=100&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1554151228-14d9def656e4?w=100&h=100&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
    ];

    const newFamilyMember: FamilyMember = {
      id: `member-${Date.now()}`,
      name: newMember.name,
      shortName: newMember.name.length > 15 ? newMember.name.substring(0, 15) + '...' : newMember.name,
      gender: newMember.gender,
      relationship: newMember.relationship,
      birthDate: newMember.birthDate,
      deathDate: newMember.status === 'deceased' ? newMember.deathDate : undefined,
      memoryCount: 0,
      avatar: avatars[Math.floor(Math.random() * avatars.length)],
      x: 300 + (newUserFamilyMembers.length * 120),
      y: newMember.relationship.toLowerCase().includes('parent') || newMember.relationship.toLowerCase().includes('father') || newMember.relationship.toLowerCase().includes('mother') ? 150 : 
         newMember.relationship.toLowerCase().includes('child') || newMember.relationship.toLowerCase().includes('son') || newMember.relationship.toLowerCase().includes('daughter') ? 350 : 250,
      bio: 'Add a biography to share this person\'s story, achievements, and memories.',
      occupation: '',
      location: '',
      hobbies: []
    };

    setNewUserFamilyMembers(prev => [...prev, newFamilyMember]);
    setNewMember({ name: '', relationship: '', gender: 'male', birthDate: '', status: 'alive', deathDate: '' });
    setShowAddForm(false);
    setBuildingStep('adding-family');
  };

  const getRelationshipSuggestions = () => [
    // IMMEDIATE FAMILY
    'Father', 'Mother', 'Son', 'Daughter', 'Husband', 'Wife', 'Brother', 'Sister',

    // PATERNAL SIDE (Father's family) - Including the 4 specific grandparent types
    'Paternal Grandfather (Dada/Dadaji/Baba)', 'Paternal Grandmother (Dadi/Dadiji/Amma)',
    'Paternal Uncle (Younger) - Chacha', 'Paternal Uncle (Elder) - Tau', 
    'Paternal Aunt (Chacha\'s wife) - Chachi', 'Paternal Aunt (Tau\'s wife) - Taiji',
    'Paternal Aunt (Father\'s sister) - Bua', 'Paternal Uncle (Bua\'s husband) - Fufa',

    // MATERNAL SIDE (Mother's family) - Including the 4 specific grandparent types
    'Maternal Grandfather (Nana/Nanaji/Baba)', 'Maternal Grandmother (Nani/Naniji/Amma)',
    'Maternal Uncle - Mama', 'Maternal Aunt (Mama\'s wife) - Mami',
    'Maternal Aunt (Mother\'s sister) - Mausi', 'Maternal Uncle (Mausi\'s husband) - Mausaji',

    // IN-LAWS
    'Father-in-law (Sasur)', 'Mother-in-law (Saas)',
    'Brother-in-law (Elder) - Jeth', 'Brother-in-law (Younger) - Devar',
    'Sister-in-law (Jeth\'s wife) - Jethani', 'Sister-in-law (Devar\'s wife) - Devrani',
    'Sister-in-law (Husband\'s sister) - Nanad', 'Brother-in-law (Wife\'s brother) - Saala',
    'Sister-in-law (Wife\'s sister) - Saali', 'Daughter-in-law (Bahu)', 'Son-in-law (Damaad)',

    // EXTENDED FAMILY - Great-Grandparents and more
    'Paternal Great-grandfather (Par-Dadaji)', 'Paternal Great-grandmother (Par-Dadiji)',
    'Maternal Great-grandfather (Par-Nanaji)', 'Maternal Great-grandmother (Par-Naniji)',
    'Nephew (Bhatija)', 'Niece (Bhatiji)',
    'Grandson (Son\'s son) - Pota', 'Granddaughter (Son\'s daughter) - Poti',
    'Grandson (Daughter\'s son) - Nata', 'Granddaughter (Daughter\'s daughter) - Nati',

    // COUSINS
    'Cousin Brother', 'Cousin Sister',

    // STEP FAMILY
    'Step-Father', 'Step-Mother', 'Step-Brother', 'Step-Sister', 'Step-Son', 'Step-Daughter',

    // ADOPTIVE FAMILY
    'Adopted Father', 'Adopted Mother', 'Adopted Son', 'Adopted Daughter'
  ];

  // New user tree building interface
  if (isNewUser) {
    return (
      <div className="min-h-screen bg-background vibrant-texture">
        <div className="px-4 py-6 space-y-6">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-3">
              <div className="p-3 bg-primary/20 rounded-full">
                <TreePine className="w-8 h-8 text-primary" />
              </div>
            </div>
            <div>
              <h1 className="text-3xl text-primary">Build Your Family Tree</h1>
              <p className="text-lg text-muted-foreground">
                Start with yourself and add your family members one by one
              </p>
            </div>
          </div>

          {buildingStep === 'start' && (
            <Card className="memory-card max-w-2xl mx-auto">
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center space-x-2">
                  <Sparkles className="w-6 h-6 text-primary" />
                  <span>Welcome to Your Family Tree</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center space-y-4">
                  <div className="mx-auto">
                    <Avatar className="w-24 h-24 border-4 border-primary/20 mx-auto">
                      <AvatarImage src="https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=100&h=100&fit=crop&crop=face" />
                      <AvatarFallback>You</AvatarFallback>
                    </Avatar>
                    <Crown className="w-6 h-6 text-primary mx-auto mt-2" />
                  </div>
                  <div>
                    <h3 className="text-xl text-primary">You are at the center of your family tree</h3>
                    <p className="text-muted-foreground">
                      Your tree will grow as you add your family members. Start by adding your closest family members first.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg text-primary text-center">Quick Start Options</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      onClick={() => {
                        setBuildingStep('adding-family');
                        setShowAddForm(true);
                        setNewMember({ ...newMember, relationship: 'Father', status: 'alive', deathDate: '' });
                      }}
                      className="h-16 flex-col space-y-1 vibrant-button text-primary-foreground"
                    >
                      <UserPlus className="w-6 h-6" />
                      <span>Add Parents</span>
                    </Button>
                    <Button
                      onClick={() => {
                        setBuildingStep('adding-family');
                        setShowAddForm(true);
                        setNewMember({ ...newMember, relationship: 'Husband', status: 'alive', deathDate: '' });
                      }}
                      className="h-16 flex-col space-y-1 aqua-button text-primary-foreground"
                    >
                      <Heart className="w-6 h-6" />
                      <span>Add Spouse</span>
                    </Button>
                    <Button
                      onClick={() => {
                        setBuildingStep('adding-family');
                        setShowAddForm(true);
                        setNewMember({ ...newMember, relationship: 'Brother', status: 'alive', deathDate: '' });
                      }}
                      variant="outline"
                      className="h-16 flex-col space-y-1 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                    >
                      <Users className="w-6 h-6" />
                      <span>Add Siblings</span>
                    </Button>
                    <Button
                      onClick={() => {
                        setBuildingStep('adding-family');
                        setShowAddForm(true);
                        setNewMember({ ...newMember, status: 'alive', deathDate: '' });
                      }}
                      variant="outline"
                      className="h-16 flex-col space-y-1 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground"
                    >
                      <Plus className="w-6 h-6" />
                      <span>Add Anyone</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {buildingStep === 'adding-family' && (
            <>
              {/* Family Tree Visualization */}
              <Card className="memory-card">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h3 className="text-lg text-primary">Your Family Tree</h3>
                      <p className="text-sm text-muted-foreground">{familyMembers.length} family member{familyMembers.length !== 1 ? 's' : ''}</p>
                    </div>
                    <Button
                      onClick={() => {
                        if (onAddMember) {
                          onAddMember();
                        } else {
                          setShowAddForm(true);
                        }
                      }}
                      className="vibrant-button text-primary-foreground"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Family Member
                    </Button>
                  </div>

                  <ScrollArea className="h-96 w-full">
                    <div 
                      className="relative bg-gradient-to-br from-cream/30 to-background family-tree-container"
                      style={{ 
                        width: '800px', 
                        height: '500px',
                        transform: `scale(${zoom})`,
                        transformOrigin: 'top left'
                      }}
                    >
                      {/* Family Members */}
                      {familyMembers.map((person) => (
                        <div
                          key={person.id}
                          className={`absolute cursor-pointer transition-all duration-200 family-member-card ${
                            selectedPerson === person.id ? 'family-member-selected scale-110 z-30' : 'z-20'
                          }`}
                          style={{ 
                            left: `${person.x}px`, 
                            top: `${person.y}px`
                          }}
                          onClick={() => handlePersonClick(person)}
                        >
                          <div className={`memory-card p-3 w-20 text-center space-y-1 ${
                            person.isUser ? 'ring-2 ring-primary ring-opacity-50 bg-primary/5' : ''
                          }`}>
                            <div className="relative mx-auto">
                              <Avatar className="w-12 h-12 border-2 border-background">
                                <AvatarImage src={person.avatar} />
                                <AvatarFallback className="text-xs">
                                  {person.shortName.split(' ').map(n => n.charAt(0)).join('').slice(0, 2)}
                                </AvatarFallback>
                              </Avatar>
                              {person.isUser && (
                                <Crown className="absolute -top-1 -right-1 w-4 h-4 text-primary fill-primary" />
                              )}
                              {person.bio && person.bio.length > 50 && (
                                <div className="absolute -top-1 -left-1 w-4 h-4 bg-coral rounded-full flex items-center justify-center">
                                  <FileText className="w-2 h-2 text-white" />
                                </div>
                              )}
                            </div>
                            
                            <div className="space-y-1">
                              <h3 className="text-xs font-medium text-primary leading-tight line-clamp-2">
                                {person.shortName}
                              </h3>
                              <p className="text-xs text-muted-foreground">{person.relationship}</p>
                              {person.deathDate && (
                                <p className="text-xs text-muted-foreground">† {person.deathDate}</p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              {/* Add Family Member Form */}
              {showAddForm && (
                <Card className="memory-card max-w-md mx-auto">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <UserPlus className="w-5 h-5 text-primary" />
                      <span>Add Family Member</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={newMember.name}
                        onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                        placeholder="Enter full name"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="relationship">Relationship to You</Label>
                      <Select value={newMember.relationship} onValueChange={(value) => setNewMember({ ...newMember, relationship: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select relationship" />
                        </SelectTrigger>
                        <SelectContent>
                          {getRelationshipSuggestions().map((rel) => (
                            <SelectItem key={rel} value={rel}>{rel}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="gender">Gender</Label>
                      <Select value={newMember.gender} onValueChange={(value: 'male' | 'female' | 'other') => setNewMember({ ...newMember, gender: value })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="birthDate">Birth Date (Optional)</Label>
                      <Input
                        id="birthDate"
                        value={newMember.birthDate}
                        onChange={(e) => setNewMember({ ...newMember, birthDate: e.target.value })}
                        placeholder="e.g., 15 Aug 1990"
                      />
                    </div>

                    <div className="space-y-3">
                      <Label>Life Status</Label>
                      <RadioGroup 
                        value={newMember.status} 
                        onValueChange={(value: 'alive' | 'deceased') => setNewMember({ ...newMember, status: value, deathDate: value === 'alive' ? '' : newMember.deathDate })}
                        className="flex space-x-6"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="alive" id="alive" />
                          <Label htmlFor="alive" className="text-sm font-normal cursor-pointer">Alive</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="deceased" id="deceased" />
                          <Label htmlFor="deceased" className="text-sm font-normal cursor-pointer">Late (Deceased)</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    {newMember.status === 'deceased' && (
                      <div className="space-y-2">
                        <Label htmlFor="deathDate">Death Date</Label>
                        <Input
                          id="deathDate"
                          value={newMember.deathDate}
                          onChange={(e) => setNewMember({ ...newMember, deathDate: e.target.value })}
                          placeholder="e.g., 10 May 2020"
                          className="border-muted-foreground/30 focus:border-primary"
                        />
                      </div>
                    )}

                    <div className="flex space-x-2 pt-4">
                      <Button
                        onClick={handleAddFamilyMember}
                        className="flex-1 vibrant-button text-primary-foreground"
                      >
                        <Check className="w-4 h-4 mr-2" />
                        Add Member
                      </Button>
                      <Button
                        onClick={() => setShowAddForm(false)}
                        variant="outline"
                        className="border-muted-foreground text-muted-foreground hover:bg-muted"
                      >
                        Cancel
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Progress indicator */}
              {familyMembers.length > 1 && (
                <Card className="memory-card">
                  <CardContent className="p-4 text-center">
                    <div className="space-y-3">
                      <div className="flex items-center justify-center space-x-2">
                        <Check className="w-5 h-5 text-aqua" />
                        <span className="text-lg text-primary">Great start! You've added {familyMembers.length - 1} family member{familyMembers.length !== 2 ? 's' : ''}.</span>
                      </div>
                      <p className="text-muted-foreground">
                        Keep adding family members to build your complete family tree. You can always add more later!
                      </p>
                      <Button
                        onClick={() => {
                          setBuildingStep('complete');
                        }}
                        className="aqua-button text-primary-foreground"
                      >
                        <ArrowRight className="w-4 h-4 mr-2" />
                        Continue to Upload Memories
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </>
          )}

          {buildingStep === 'complete' && (
            <Card className="memory-card max-w-2xl mx-auto">
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center space-x-2">
                  <Check className="w-6 h-6 text-aqua" />
                  <span>Your Family Tree is Ready!</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 text-center">
                <p className="text-lg text-muted-foreground">
                  You've successfully created your family tree with {familyMembers.length} member{familyMembers.length !== 1 ? 's' : ''}. 
                  Now you can start uploading memories and connecting them to your family members.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button
                    onClick={() => {
                      if (onNavigate) {
                        onNavigate('upload-memory');
                      }
                    }}
                    className="h-16 flex-col space-y-1 vibrant-button text-primary-foreground"
                  >
                    <Plus className="w-6 h-6" />
                    <span>Upload First Memory</span>
                  </Button>
                  <Button
                    onClick={() => {
                      if (onAddMember) {
                        onAddMember();
                      } else {
                        setShowAddForm(true);
                      }
                    }}
                    variant="outline"
                    className="h-16 flex-col space-y-1 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    <UserPlus className="w-6 h-6" />
                    <span>Add More Family</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    );
  }

  // Existing returning user interface
  return (
    <div className="min-h-screen bg-background vibrant-texture">
      <div className="px-4 py-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <div className="p-3 bg-primary/20 rounded-full">
              <TreePine className="w-8 h-8 text-primary" />
            </div>
          </div>
          <div>
            <h1 className="text-3xl text-primary">Chauhan Family Tree</h1>
            <p className="text-lg text-muted-foreground">
              {familyMembers.length} family members across 4 generations
            </p>
          </div>
          
          {/* Add Member Button for Returning Users */}
          {onAddMember && (
            <Button
              onClick={onAddMember}
              className="vibrant-button text-primary-foreground"
            >
              <UserPlus className="w-5 h-5 mr-2" />
              Add Family Member
            </Button>
          )}
        </div>

        {/* Controls */}
        <div className="flex justify-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleZoomOut}
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            <ZoomOut className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleResetZoom}
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-4"
          >
            {Math.round(zoom * 100)}%
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleZoomIn}
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            <ZoomIn className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleResetZoom}
            className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </div>

        {/* Family Tree Visualization */}
        <Card className="memory-card">
          <CardContent className="p-4">
            <ScrollArea className="h-[calc(100vh-300px)] w-full">
              <div 
                className="relative bg-gradient-to-br from-cream/30 to-background family-tree-container"
                style={{ 
                  width: '1400px', 
                  height: '600px',
                  transform: `scale(${zoom})`,
                  transformOrigin: 'top left'
                }}
              >
                {/* SVG for connections */}
                <svg 
                  className="absolute inset-0 pointer-events-none z-10" 
                  width="1400" 
                  height="600"
                >
                  <defs>
                    {/* Gradient for spouse connections */}
                    <linearGradient id="spouseGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#FF6F61" />
                      <stop offset="100%" stopColor="#6A0572" />
                    </linearGradient>
                    
                    {/* Gradient for parent-child connections */}
                    <linearGradient id="parentGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#6A0572" />
                      <stop offset="100%" stopColor="#17BEBB" />
                    </linearGradient>
                  </defs>

                  {connections.map((connection, index) => {
                    const fromMember = familyMembers.find(m => m.id === connection.from);
                    const toMember = familyMembers.find(m => m.id === connection.to);
                    
                    if (!fromMember || !toMember) return null;

                    const fromX = fromMember.x + 40; // Center of avatar
                    const fromY = fromMember.y + 40;
                    const toX = toMember.x + 40;
                    const toY = toMember.y + 40;

                    if (connection.type === 'spouse') {
                      // Straight line for spouses
                      return (
                        <line
                          key={`${connection.from}-${connection.to}-${index}`}
                          x1={fromX}
                          y1={fromY}
                          x2={toX}
                          y2={toY}
                          stroke="url(#spouseGradient)"
                          strokeWidth="3"
                          strokeDasharray="5,5"
                          opacity="0.8"
                          className="tree-connection-spouse"
                        />
                      );
                    } else if (connection.type === 'parent') {
                      // Curved line for parent-child
                      const midY = (fromY + toY) / 2;
                      return (
                        <path
                          key={`${connection.from}-${connection.to}-${index}`}
                          d={`M ${fromX} ${fromY} Q ${fromX} ${midY} ${(fromX + toX) / 2} ${midY} Q ${toX} ${midY} ${toX} ${toY}`}
                          stroke="url(#parentGradient)"
                          strokeWidth="2"
                          fill="none"
                          opacity="0.7"
                          className="tree-connection-parent"
                        />
                      );
                    }
                    return null;
                  })}

                  {/* Decorative tree branches */}
                  <g opacity="0.2" className="tree-branch">
                    {/* Main trunk from Ilica */}
                    <line x1="440" y1="360" x2="440" y2="500" stroke="#8B4513" strokeWidth="8" />
                    
                    {/* Branch to parents */}
                    <line x1="440" y1="360" x2="400" y2="220" stroke="#8B4513" strokeWidth="6" />
                    
                    {/* Branch to grandparents */}
                    <line x1="400" y1="220" x2="200" y2="90" stroke="#8B4513" strokeWidth="4" />
                    <line x1="400" y1="220" x2="750" y2="90" stroke="#8B4513" strokeWidth="4" />
                    
                    {/* Additional decorative branches */}
                    <line x1="200" y1="90" x2="150" y2="60" stroke="#8B4513" strokeWidth="3" />
                    <line x1="750" y1="90" x2="800" y2="60" stroke="#8B4513" strokeWidth="3" />
                  </g>
                </svg>

                {/* Family Members */}
                {familyMembers.map((person) => (
                  <div
                    key={person.id}
                    className={`absolute cursor-pointer transition-all duration-200 family-member-card ${
                      selectedPerson === person.id ? 'family-member-selected scale-110 z-30' : 'z-20'
                    }`}
                    style={{ 
                      left: `${person.x}px`, 
                      top: `${person.y}px`
                    }}
                    onClick={() => handlePersonClick(person)}
                  >
                    <div className={`memory-card p-3 w-20 text-center space-y-1 ${
                      person.isUser ? 'ring-2 ring-primary ring-opacity-50 bg-primary/5' : ''
                    }`}>
                      <div className="relative mx-auto">
                        <Avatar className="w-12 h-12 border-2 border-background">
                          <AvatarImage src={person.avatar} />
                          <AvatarFallback className="text-xs">
                            {person.shortName.split(' ').map(n => n.charAt(0)).join('').slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        {person.isUser && (
                          <Crown className="absolute -top-1 -right-1 w-4 h-4 text-primary fill-primary" />
                        )}
                        {person.memoryCount && person.memoryCount > 0 && (
                          <Badge className="absolute -bottom-1 -right-1 w-4 h-4 p-0 flex items-center justify-center bg-coral text-white text-xs">
                            {person.memoryCount > 99 ? '99+' : person.memoryCount}
                          </Badge>
                        )}
                      </div>
                      
                      <div className="space-y-1">
                        <h3 className="text-xs font-medium text-primary leading-tight line-clamp-2">
                          {person.shortName}
                        </h3>
                        
                        {person.birthDate && (
                          <div className="flex items-center justify-center space-x-1">
                            <Calendar className="w-2 h-2 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">{person.birthDate.split(' ')[2]}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Generation Labels */}
                <div className="absolute left-4 top-4 space-y-2">
                  <Badge variant="outline" className="generation-badge bg-violet/10 border-violet text-violet">
                    Great Grandparents
                  </Badge>
                </div>
                <div className="absolute left-4 top-140 space-y-2">
                  <Badge variant="outline" className="generation-badge bg-primary/10 border-primary text-primary">
                    Grandparents & Uncles/Aunts
                  </Badge>
                </div>
                <div className="absolute left-4 top-280 space-y-2">
                  <Badge variant="outline" className="generation-badge bg-coral/10 border-coral text-coral">
                    Parents & Siblings & Cousins
                  </Badge>
                </div>
                <div className="absolute left-4 top-420 space-y-2">
                  <Badge variant="outline" className="generation-badge bg-aqua/10 border-aqua text-aqua">
                    Children
                  </Badge>
                </div>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Legend */}
        <Card className="memory-card">
          <CardContent className="p-4">
            <h3 className="text-lg font-medium text-primary mb-3">Legend</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <Crown className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">Current User</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-1 bg-gradient-to-r from-coral to-primary rounded"></div>
                <span className="text-muted-foreground">Marriage</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-1 bg-gradient-to-b from-primary to-aqua rounded"></div>
                <span className="text-muted-foreground">Parent-Child</span>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className="w-4 h-4 p-0 flex items-center justify-center bg-coral text-white text-xs">42</Badge>
                <span className="text-muted-foreground">Memory Count</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Selected Person Info */}
        {selectedPerson && (
          <Card className="memory-card border-primary/50">
            <CardContent className="p-4">
              {(() => {
                const person = familyMembers.find(p => p.id === selectedPerson);
                if (!person) return null;
                return (
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-16 h-16 border-2 border-primary/20">
                      <AvatarImage src={person.avatar} />
                      <AvatarFallback>{person.shortName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="text-xl font-medium text-primary">{person.name}</h3>
                      <p className="text-muted-foreground">{person.relationship}</p>
                      {person.birthDate && (
                        <div className="flex items-center space-x-1 mt-1">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">Born: {person.birthDate}</span>
                        </div>
                      )}
                      <div className="flex items-center space-x-1 mt-1">
                        <Heart className="w-4 h-4 text-coral" />
                        <span className="text-sm text-muted-foreground">{person.memoryCount || 0} memories</span>
                      </div>
                    </div>
                    <Button 
                      className="vibrant-button text-primary-foreground"
                      onClick={() => handlePersonClick(person)}
                    >
                      View Memories
                    </Button>
                  </div>
                );
              })()}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

// Simpler returning user interface - this won't be reached due to the above return