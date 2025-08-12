import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';
import { Alert, AlertDescription } from './ui/alert';
import { 
  UserPlus, 
  Search, 
  Heart, 
  Users, 
  Crown, 
  Baby,
  CircleCheck,
  AlertCircle,
  Info,
  ArrowRight,
  ArrowLeft,
  Link2,
  Camera,
  Sparkles,
  TreePine,
  ChevronDown,
  X,
  MessageCircle,
  Mail,
  Phone,
  Send,
  UserCheck,
  Book
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface FamilyMember {
  id: string;
  name: string;
  avatar: string;
  generation: number;
  relationships: string[];
  isExisting?: boolean;
}

interface Relationship {
  type: string;
  label: string;
  hindiLabel?: string;
  reverseType: string;
  reverseLabel: string;
  category: 'immediate' | 'paternal' | 'maternal' | 'inlaw' | 'extended' | 'step' | 'adoptive';
  generationDiff: number;
  icon: any;
  description: string;
}

interface AddFamilyMemberPageProps {
  onBack: () => void;
  onSuccess: () => void;
}

export function AddFamilyMemberPage({ onBack, onSuccess }: AddFamilyMemberPageProps) {
  const [step, setStep] = useState<'basic' | 'relationship' | 'biography' | 'confirm' | 'invite'>('basic');
  const [progress, setProgress] = useState(20);
  
  // Basic Info State
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const [avatar, setAvatar] = useState('');
  const [notes, setNotes] = useState('');
  
  // Biography State
  const [bio, setBio] = useState('');
  const [occupation, setOccupation] = useState('');
  const [location, setLocation] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [personalNotes, setPersonalNotes] = useState('');
  
  // Relationship State
  const [selectedConnection, setSelectedConnection] = useState<string>('');
  const [selectedRelationship, setSelectedRelationship] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // Complete family tree data - all existing family members
  const existingMembers: FamilyMember[] = [
    // Current user's generation (0)
    { id: 'ilica-chauhan', name: 'Ilica Chauhan', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=100&h=100&fit=crop&crop=face', generation: 0, relationships: ['self'], isExisting: true },
    { id: 'priyam-alok', name: 'Priyam Alok', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face', generation: 0, relationships: ['spouse'], isExisting: true },
    { id: 'ishan-chauhan', name: 'Ishan Chauhan', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face', generation: 0, relationships: ['brother'], isExisting: true },
    { id: 'seema-chaudhary', name: 'Seema Chaudhary', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=100&h=100&fit=crop&crop=face', generation: 0, relationships: ['sister-in-law'], isExisting: true },
    { id: 'somya-chauhan', name: 'Somya Chauhan', avatar: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=100&h=100&fit=crop&crop=face', generation: 0, relationships: ['cousin-sister'], isExisting: true },
    { id: 'shivam-verma', name: 'Shivam Verma', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face', generation: 0, relationships: ['cousin-brother'], isExisting: true },
    { id: 'shivani-bobo', name: 'Shivani Bobo', avatar: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=100&h=100&fit=crop&crop=face', generation: 0, relationships: ['cousin-sister'], isExisting: true },
    { id: 'praneet-asthana', name: 'Praneet Asthana', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face', generation: 0, relationships: ['cousin-brother'], isExisting: true },
    
    // Parents generation (+1)
    { id: 'rajeev-chauhan', name: 'Rajeev Kumar Chauhan', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face', generation: 1, relationships: ['father'], isExisting: true },
    { id: 'priti-chauhan', name: 'Priti Chauhan', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=100&h=100&fit=crop&crop=face', generation: 1, relationships: ['mother'], isExisting: true },
    { id: 'sanjeev-kumar', name: 'Sanjeev Kumar', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face', generation: 1, relationships: ['father-in-law'], isExisting: true },
    { id: 'sudha-chauhan', name: 'Sudha Chauhan', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=100&h=100&fit=crop&crop=face', generation: 1, relationships: ['mother-in-law'], isExisting: true },
    { id: 'usha-verma', name: 'Shrimati Usha Verma', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=100&h=100&fit=crop&crop=face', generation: 1, relationships: ['mausi'], isExisting: true },
    { id: 'jitendra-verma', name: 'Dr Jitendra Verma', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face', generation: 1, relationships: ['mausaji'], isExisting: true },
    { id: 'pradeep-kumar', name: 'Pradeep Kumar', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face', generation: 1, relationships: ['chacha'], isExisting: true },
    { id: 'ajay-kumar', name: 'Ajay Kumar', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face', generation: 1, relationships: ['tau'], isExisting: true },
    { id: 'sanjay-kumar', name: 'Sanjay Kumar', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face', generation: 1, relationships: ['mama'], isExisting: true },
    
    // Children generation (-1)
    { id: 'miraya-chauhan-sinha', name: 'Miraya Chauhan Sinha', avatar: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=100&h=100&fit=crop&crop=face', generation: -1, relationships: ['daughter'], isExisting: true },
    { id: 'viraj-chaudhary', name: 'Viraj Chaudhary', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face', generation: -1, relationships: ['nephew'], isExisting: true },
    { id: 'aastha-chaudhary', name: 'Aastha Chaudhary', avatar: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=100&h=100&fit=crop&crop=face', generation: -1, relationships: ['niece'], isExisting: true },
    { id: 'samaira-singh', name: 'Samaira Singh', avatar: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=100&h=100&fit=crop&crop=face', generation: -1, relationships: ['niece'], isExisting: true },
    { id: 'kushagra-zulmi-jat', name: 'Kushagra Zulmi Jat', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face', generation: -1, relationships: ['nephew'], isExisting: true },
    
    // Grandparents generation (+2)
    { id: 'ajai-singh', name: 'Shri Ajai Singh', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face', generation: 2, relationships: ['maternal-grandfather'], isExisting: true },
    { id: 'urmila-devi', name: 'Shrimati Urmila Devi', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=100&h=100&fit=crop&crop=face', generation: 2, relationships: ['maternal-grandmother'], isExisting: true },
    { id: 'yeshpal-singh', name: 'Shri Yeshpal Singh', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face', generation: 2, relationships: ['paternal-grandfather'], isExisting: true },
    { id: 'rohitash-devi', name: 'Shrimati Rohitash Devi', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=100&h=100&fit=crop&crop=face', generation: 2, relationships: ['paternal-grandmother'], isExisting: true },
    
    // Pets
    { id: 'gattu-chauhan', name: 'Gattu Chauhan (Parrot)', avatar: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=100&h=100&fit=crop', generation: 0, relationships: ['pet'], isExisting: true },
    { id: 'hari', name: 'Hari', avatar: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=100&h=100&fit=crop', generation: 0, relationships: ['pet'], isExisting: true },
  ];

  // Comprehensive Indian family relationships including the 4 specific grandparent types
  const relationshipTypes: Relationship[] = [
    // IMMEDIATE FAMILY
    { type: 'father', label: 'Father', hindiLabel: 'Pitaji/Papa', reverseType: 'child', reverseLabel: 'Child', category: 'immediate', generationDiff: 1, icon: Crown, description: 'Your biological or adoptive father' },
    { type: 'mother', label: 'Mother', hindiLabel: 'Mataji/Mama', reverseType: 'child', reverseLabel: 'Child', category: 'immediate', generationDiff: 1, icon: Heart, description: 'Your biological or adoptive mother' },
    { type: 'son', label: 'Son', hindiLabel: 'Beta', reverseType: 'parent', reverseLabel: 'Parent', category: 'immediate', generationDiff: -1, icon: Users, description: 'Your son' },
    { type: 'daughter', label: 'Daughter', hindiLabel: 'Beti', reverseType: 'parent', reverseLabel: 'Parent', category: 'immediate', generationDiff: -1, icon: Baby, description: 'Your daughter' },
    { type: 'husband', label: 'Husband', hindiLabel: 'Pati', reverseType: 'wife', reverseLabel: 'Wife', category: 'immediate', generationDiff: 0, icon: Heart, description: 'Your husband' },
    { type: 'wife', label: 'Wife', hindiLabel: 'Patni', reverseType: 'husband', reverseLabel: 'Husband', category: 'immediate', generationDiff: 0, icon: Heart, description: 'Your wife' },
    { type: 'brother', label: 'Brother', hindiLabel: 'Bhai', reverseType: 'sibling', reverseLabel: 'Sibling', category: 'immediate', generationDiff: 0, icon: Users, description: 'Your brother' },
    { type: 'sister', label: 'Sister', hindiLabel: 'Behan', reverseType: 'sibling', reverseLabel: 'Sibling', category: 'immediate', generationDiff: 0, icon: Users, description: 'Your sister' },

    // PATERNAL SIDE (Father's family) - Including the 4 specific grandparent types
    { type: 'paternal-grandfather', label: 'Paternal Grandfather', hindiLabel: 'Dada/Dadaji/Baba', reverseType: 'grandchild', reverseLabel: 'Grandchild', category: 'paternal', generationDiff: 2, icon: Crown, description: 'Your father\'s father' },
    { type: 'paternal-grandmother', label: 'Paternal Grandmother', hindiLabel: 'Dadi/Dadiji/Amma', reverseType: 'grandchild', reverseLabel: 'Grandchild', category: 'paternal', generationDiff: 2, icon: Heart, description: 'Your father\'s mother' },
    
    { type: 'chacha', label: 'Paternal Uncle (Younger)', hindiLabel: 'Chacha/Chachaji', reverseType: 'nephew', reverseLabel: 'Nephew/Niece', category: 'paternal', generationDiff: 1, icon: Crown, description: 'Your father\'s younger brother' },
    { type: 'tau', label: 'Paternal Uncle (Elder)', hindiLabel: 'Tau/Tauji', reverseType: 'nephew', reverseLabel: 'Nephew/Niece', category: 'paternal', generationDiff: 1, icon: Crown, description: 'Your father\'s elder brother' },
    { type: 'chachi', label: 'Paternal Aunt (Chacha\'s wife)', hindiLabel: 'Chachi/Chachiji', reverseType: 'nephew', reverseLabel: 'Nephew/Niece', category: 'paternal', generationDiff: 1, icon: Heart, description: 'Your chacha\'s wife' },
    { type: 'taiji', label: 'Paternal Aunt (Tau\'s wife)', hindiLabel: 'Taiji', reverseType: 'nephew', reverseLabel: 'Nephew/Niece', category: 'paternal', generationDiff: 1, icon: Heart, description: 'Your tau\'s wife' },
    { type: 'bua', label: 'Paternal Aunt (Father\'s sister)', hindiLabel: 'Bua/Buaji', reverseType: 'nephew', reverseLabel: 'Nephew/Niece', category: 'paternal', generationDiff: 1, icon: Heart, description: 'Your father\'s sister' },
    { type: 'fufa', label: 'Paternal Uncle (Bua\'s husband)', hindiLabel: 'Fufa/Fufaji', reverseType: 'nephew', reverseLabel: 'Nephew/Niece', category: 'paternal', generationDiff: 1, icon: Crown, description: 'Your bua\'s husband' },

    // MATERNAL SIDE (Mother's family) - Including the 4 specific grandparent types
    { type: 'maternal-grandfather', label: 'Maternal Grandfather', hindiLabel: 'Nana/Nanaji/Baba', reverseType: 'grandchild', reverseLabel: 'Grandchild', category: 'maternal', generationDiff: 2, icon: Crown, description: 'Your mother\'s father' },
    { type: 'maternal-grandmother', label: 'Maternal Grandmother', hindiLabel: 'Nani/Naniji/Amma', reverseType: 'grandchild', reverseLabel: 'Grandchild', category: 'maternal', generationDiff: 2, icon: Heart, description: 'Your mother\'s mother' },
    
    { type: 'mama', label: 'Maternal Uncle', hindiLabel: 'Mama/Mamaji', reverseType: 'nephew', reverseLabel: 'Nephew/Niece', category: 'maternal', generationDiff: 1, icon: Crown, description: 'Your mother\'s brother' },
    { type: 'mami', label: 'Maternal Aunt (Mama\'s wife)', hindiLabel: 'Mami/Mamiji', reverseType: 'nephew', reverseLabel: 'Nephew/Niece', category: 'maternal', generationDiff: 1, icon: Heart, description: 'Your mama\'s wife' },
    { type: 'mausi', label: 'Maternal Aunt (Mother\'s sister)', hindiLabel: 'Mausi/Mausiji', reverseType: 'nephew', reverseLabel: 'Nephew/Niece', category: 'maternal', generationDiff: 1, icon: Heart, description: 'Your mother\'s sister' },
    { type: 'mausaji', label: 'Maternal Uncle (Mausi\'s husband)', hindiLabel: 'Mausaji', reverseType: 'nephew', reverseLabel: 'Nephew/Niece', category: 'maternal', generationDiff: 1, icon: Crown, description: 'Your mausi\'s husband' },

    // IN-LAWS
    { type: 'sasur', label: 'Father-in-law', hindiLabel: 'Sasur/Sasurji', reverseType: 'daughter-in-law', reverseLabel: 'Son/Daughter-in-law', category: 'inlaw', generationDiff: 1, icon: Crown, description: 'Your spouse\'s father' },
    { type: 'saas', label: 'Mother-in-law', hindiLabel: 'Saas/Saasji', reverseType: 'daughter-in-law', reverseLabel: 'Son/Daughter-in-law', category: 'inlaw', generationDiff: 1, icon: Heart, description: 'Your spouse\'s mother' },
    { type: 'jeth', label: 'Brother-in-law (Elder)', hindiLabel: 'Jeth/Jethji', reverseType: 'sister-in-law', reverseLabel: 'Brother/Sister-in-law', category: 'inlaw', generationDiff: 0, icon: Crown, description: 'Your husband\'s elder brother' },
    { type: 'devar', label: 'Brother-in-law (Younger)', hindiLabel: 'Devar', reverseType: 'sister-in-law', reverseLabel: 'Brother/Sister-in-law', category: 'inlaw', generationDiff: 0, icon: Users, description: 'Your husband\'s younger brother' },
    { type: 'jethani', label: 'Sister-in-law (Jeth\'s wife)', hindiLabel: 'Jethani', reverseType: 'sister-in-law', reverseLabel: 'Brother/Sister-in-law', category: 'inlaw', generationDiff: 0, icon: Heart, description: 'Your jeth\'s wife' },
    { type: 'devrani', label: 'Sister-in-law (Devar\'s wife)', hindiLabel: 'Devrani', reverseType: 'sister-in-law', reverseLabel: 'Brother/Sister-in-law', category: 'inlaw', generationDiff: 0, icon: Heart, description: 'Your devar\'s wife' },
    { type: 'nanad', label: 'Sister-in-law (Husband\'s sister)', hindiLabel: 'Nanad', reverseType: 'brother-in-law', reverseLabel: 'Brother/Sister-in-law', category: 'inlaw', generationDiff: 0, icon: Heart, description: 'Your husband\'s sister' },
    { type: 'saala', label: 'Brother-in-law (Wife\'s brother)', hindiLabel: 'Saala/Saalaji', reverseType: 'sister-in-law', reverseLabel: 'Brother/Sister-in-law', category: 'inlaw', generationDiff: 0, icon: Users, description: 'Your wife\'s brother' },
    { type: 'saali', label: 'Sister-in-law (Wife\'s sister)', hindiLabel: 'Saali', reverseType: 'brother-in-law', reverseLabel: 'Brother/Sister-in-law', category: 'inlaw', generationDiff: 0, icon: Heart, description: 'Your wife\'s sister' },
    { type: 'bahu', label: 'Daughter-in-law', hindiLabel: 'Bahu', reverseType: 'father-in-law', reverseLabel: 'Father/Mother-in-law', category: 'inlaw', generationDiff: -1, icon: Heart, description: 'Your son\'s wife' },
    { type: 'damaad', label: 'Son-in-law', hindiLabel: 'Damaad', reverseType: 'father-in-law', reverseLabel: 'Father/Mother-in-law', category: 'inlaw', generationDiff: -1, icon: Users, description: 'Your daughter\'s husband' },

    // EXTENDED FAMILY - Great-Grandparents and more
    { type: 'par-dadaji', label: 'Paternal Great-grandfather', hindiLabel: 'Par-Dadaji', reverseType: 'great-grandchild', reverseLabel: 'Great-grandchild', category: 'extended', generationDiff: 3, icon: Crown, description: 'Your paternal grandfather\'s father' },
    { type: 'par-dadiji', label: 'Paternal Great-grandmother', hindiLabel: 'Par-Dadiji', reverseType: 'great-grandchild', reverseLabel: 'Great-grandchild', category: 'extended', generationDiff: 3, icon: Heart, description: 'Your paternal grandfather\'s mother' },
    { type: 'par-nanaji', label: 'Maternal Great-grandfather', hindiLabel: 'Par-Nanaji', reverseType: 'great-grandchild', reverseLabel: 'Great-grandchild', category: 'extended', generationDiff: 3, icon: Crown, description: 'Your maternal grandfather\'s father' },
    { type: 'par-naniji', label: 'Maternal Great-grandmother', hindiLabel: 'Par-Naniji', reverseType: 'great-grandchild', reverseLabel: 'Great-grandchild', category: 'extended', generationDiff: 3, icon: Heart, description: 'Your maternal grandfather\'s mother' },
    
    { type: 'bhatija', label: 'Nephew', hindiLabel: 'Bhatija', reverseType: 'uncle', reverseLabel: 'Uncle/Aunt', category: 'extended', generationDiff: -1, icon: Users, description: 'Your brother\'s son' },
    { type: 'bhatiji', label: 'Niece', hindiLabel: 'Bhatiji', reverseType: 'uncle', reverseLabel: 'Uncle/Aunt', category: 'extended', generationDiff: -1, icon: Baby, description: 'Your brother\'s daughter' },
    { type: 'pota', label: 'Grandson (Son\'s son)', hindiLabel: 'Pota', reverseType: 'dada', reverseLabel: 'Grandfather', category: 'extended', generationDiff: -2, icon: Users, description: 'Your son\'s son' },
    { type: 'poti', label: 'Granddaughter (Son\'s daughter)', hindiLabel: 'Poti', reverseType: 'dada', reverseLabel: 'Grandmother', category: 'extended', generationDiff: -2, icon: Baby, description: 'Your son\'s daughter' },
    { type: 'nata', label: 'Grandson (Daughter\'s son)', hindiLabel: 'Nata', reverseType: 'nana', reverseLabel: 'Grandfather', category: 'extended', generationDiff: -2, icon: Users, description: 'Your daughter\'s son' },
    { type: 'nati', label: 'Granddaughter (Daughter\'s daughter)', hindiLabel: 'Nati', reverseType: 'nana', reverseLabel: 'Grandmother', category: 'extended', generationDiff: -2, icon: Baby, description: 'Your daughter\'s daughter' },

    // COUSINS
    { type: 'cousin-brother', label: 'Cousin Brother', hindiLabel: 'Cousin Bhai', reverseType: 'cousin', reverseLabel: 'Cousin', category: 'extended', generationDiff: 0, icon: Users, description: 'Your aunt/uncle\'s son' },
    { type: 'cousin-sister', label: 'Cousin Sister', hindiLabel: 'Cousin Behan', reverseType: 'cousin', reverseLabel: 'Cousin', category: 'extended', generationDiff: 0, icon: Users, description: 'Your aunt/uncle\'s daughter' },
  ];

  const categoryLabels = {
    'all': 'All Relationships',
    'immediate': 'Immediate Family',
    'paternal': 'Paternal Side (Father\'s Family)',
    'maternal': 'Maternal Side (Mother\'s Family)',
    'inlaw': 'In-laws',
    'extended': 'Extended Family & Great-Grandparents',
    'step': 'Step Family',
    'adoptive': 'Adoptive Family'
  };

  const categoryColors = {
    'immediate': 'bg-red-100 text-red-800 border-red-200',
    'paternal': 'bg-blue-100 text-blue-800 border-blue-200',
    'maternal': 'bg-green-100 text-green-800 border-green-200',
    'inlaw': 'bg-purple-100 text-purple-800 border-purple-200',
    'extended': 'bg-orange-100 text-orange-800 border-orange-200',
    'step': 'bg-gray-100 text-gray-800 border-gray-200',
    'adoptive': 'bg-pink-100 text-pink-800 border-pink-200'
  };

  const filteredMembers = existingMembers.filter(member => 
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.relationships.some(rel => rel.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const getRelationshipSuggestions = (targetMember: FamilyMember) => {
    const targetGeneration = targetMember.generation;
    const myGeneration = 0;
    const generationDiff = targetGeneration - myGeneration;
    
    return relationshipTypes.filter(rel => {
      if (selectedCategory !== 'all' && rel.category !== selectedCategory) return false;
      if (Math.abs(rel.generationDiff - generationDiff) <= 1) return true;
      if (rel.category === 'extended' || rel.category === 'inlaw') return true;
      return false;
    }).sort((a, b) => {
      const aScore = Math.abs(a.generationDiff - generationDiff);
      const bScore = Math.abs(b.generationDiff - generationDiff);
      return aScore - bScore;
    });
  };

  const selectedMember = existingMembers.find(m => m.id === selectedConnection);
  const suggestedRelationships = selectedMember ? getRelationshipSuggestions(selectedMember) : relationshipTypes.filter(rel => selectedCategory === 'all' || rel.category === selectedCategory);

  const handleNext = () => {
    if (step === 'basic') {
      setStep('relationship');
      setProgress(40);
    } else if (step === 'relationship') {
      setStep('biography');
      setProgress(60);
    } else if (step === 'biography') {
      setStep('confirm');
      setProgress(80);
    } else if (step === 'confirm') {
      setStep('invite');
      setProgress(100);
    }
  };

  const handleBack = () => {
    if (step === 'relationship') {
      setStep('basic');
      setProgress(20);
    } else if (step === 'biography') {
      setStep('relationship');
      setProgress(40);
    } else if (step === 'confirm') {
      setStep('biography');
      setProgress(60);
    } else if (step === 'invite') {
      setStep('confirm');
      setProgress(80);
    } else {
      onBack();
    }
  };

  const handleSubmit = () => {
    console.log('Adding family member:', {
      name,
      nickname,
      birthYear,
      avatar,
      notes,
      bio,
      occupation,
      location,
      phone,
      email,
      personalNotes,
      connection: selectedConnection,
      relationship: selectedRelationship
    });
    
    // Move to invitation step instead of completing
    handleNext();
  };

  const handleInvite = (method: 'whatsapp' | 'email' | 'sms') => {
    const inviteMessage = `Hi ${name}! 👋\n\nI've added you to our Family Memory Vault app - a special place where we can share and preserve our precious family memories together.\n\nJoin us to:\n✨ See family photos and videos\n🎙️ Listen to voice messages from loved ones\n📱 Share your own memories\n🌳 Connect with our family tree\n\nDownload the app and join our family vault!\n\nWith love,\nIlica ❤️`;
    
    switch (method) {
      case 'whatsapp':
        alert(`WhatsApp invitation sent to ${name}!\n\nMessage: "${inviteMessage}"`);
        break;
      case 'email':
        alert(`Email invitation sent to ${name}!\n\nSubject: "Join our Family Memory Vault"\nMessage: "${inviteMessage}"`);
        break;
      case 'sms':
        alert(`SMS invitation sent to ${name}!\n\nMessage: "${inviteMessage}"`);
        break;
    }
    
    onSuccess();
  };

  const handleSkipInvite = () => {
    onSuccess();
  };

  const canProceedFromBasic = name.trim().length >= 2;
  const canProceedFromRelationship = selectedConnection && selectedRelationship;

  const relationshipData = relationshipTypes.find(r => r.type === selectedRelationship);

  return (
    <div className="min-h-screen bg-background vibrant-texture">
      <div className="px-4 py-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <UserPlus className="w-6 h-6 text-primary" />
            <h1 className="text-2xl lg:text-3xl text-primary">Add Family Member</h1>
            <TreePine className="w-6 h-6 text-aqua" />
          </div>
          <div className="flex items-center justify-center space-x-4">
            <Badge className="bg-primary/10 text-primary">
              Step {step === 'basic' ? '1' : step === 'relationship' ? '2' : step === 'biography' ? '3' : step === 'confirm' ? '4' : '5'} of 5
            </Badge>
          </div>
          <Progress value={progress} className="max-w-md mx-auto h-2" />
        </div>

        {/* Basic Info Step */}
        {step === 'basic' && (
          <Card className="memory-card max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-xl flex items-center justify-center space-x-2">
                <Sparkles className="w-5 h-5 text-coral" />
                <span>Basic Information</span>
              </CardTitle>
              <CardDescription>
                Let's start with the basics about your family member
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Photo Upload */}
              <div className="text-center space-y-4">
                <div className="w-24 h-24 mx-auto relative">
                  {avatar ? (
                    <ImageWithFallback
                      src={avatar}
                      alt="Profile photo"
                      className="w-full h-full rounded-full object-cover border-4 border-primary/20"
                    />
                  ) : (
                    <div className="w-full h-full rounded-full bg-muted/50 flex items-center justify-center border-4 border-dashed border-primary/20">
                      <Camera className="w-8 h-8 text-muted-foreground" />
                    </div>
                  )}
                  <Button
                    size="sm"
                    className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full vibrant-button"
                    onClick={() => {
                      const photos = [
                        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
                        'https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=200&h=200&fit=crop&crop=face',
                        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
                        'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=200&h=200&fit=crop&crop=face'
                      ];
                      setAvatar(photos[Math.floor(Math.random() * photos.length)]);
                    }}
                  >
                    <Camera className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">Tap to add photo</p>
              </div>

              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    placeholder="e.g., Sarah Johnson"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="text-base"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nickname">Nickname (Optional)</Label>
                  <Input
                    id="nickname"
                    placeholder="e.g., Aunty Sarah"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    className="text-base"
                  />
                </div>
              </div>

              {/* Birth Year */}
              <div className="space-y-2">
                <Label htmlFor="birthYear">Birth Year (Optional)</Label>
                <Input
                  id="birthYear"
                  placeholder="e.g., 1985"
                  value={birthYear}
                  onChange={(e) => setBirthYear(e.target.value)}
                  className="text-base"
                  type="number"
                  min="1900"
                  max={new Date().getFullYear()}
                />
              </div>

              {/* Quick Bio Option */}
              <div className="space-y-2">
                <Label htmlFor="basicBio" className="flex items-center space-x-2">
                  <Book className="w-4 h-4 text-aqua" />
                  <span>Quick Bio (Optional)</span>
                </Label>
                <Textarea
                  id="basicBio"
                  placeholder="A brief description about this person..."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="text-base min-h-[80px]"
                />
                <p className="text-xs text-muted-foreground">
                  You can add more detailed biography information in the next steps
                </p>
              </div>

              {/* Notes */}
              <div className="space-y-2">
                <Label htmlFor="notes">Personal Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  placeholder="Any special notes about this person..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="text-base"
                />
              </div>

              {/* Navigation */}
              <div className="flex justify-between pt-4">
                <Button 
                  variant="outline" 
                  onClick={handleBack}
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <Button 
                  className="vibrant-button text-primary-foreground"
                  onClick={handleNext}
                  disabled={!canProceedFromBasic}
                >
                  Next: Relationship
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Relationship Step */}
        {step === 'relationship' && (
          <Card className="memory-card max-w-4xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-xl flex items-center justify-center space-x-2">
                <Link2 className="w-5 h-5 text-coral" />
                <span>Family Relationship</span>
              </CardTitle>
              <CardDescription>
                How is {name} related to you? Connect them to someone in your family tree.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Search existing members */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Search className="w-5 h-5 text-muted-foreground" />
                  <Label>Connect {name} to existing family member:</Label>
                </div>
                
                <div className="relative">
                  <Input
                    placeholder="Search family members..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setShowSuggestions(true);
                    }}
                    onFocus={() => setShowSuggestions(true)}
                    className="text-base"
                  />
                  
                  {showSuggestions && searchQuery && (
                    <Card className="absolute top-full left-0 right-0 z-20 mt-1 max-h-60 overflow-y-auto">
                      <CardContent className="p-2">
                        {filteredMembers.length === 0 ? (
                          <p className="text-muted-foreground text-center py-4">No family members found</p>
                        ) : (
                          <div className="space-y-1">
                            {filteredMembers.slice(0, 8).map((member) => (
                              <Button
                                key={member.id}
                                variant="ghost"
                                className="w-full justify-start p-3 h-auto"
                                onClick={() => {
                                  setSelectedConnection(member.id);
                                  setSearchQuery(member.name);
                                  setShowSuggestions(false);
                                }}
                              >
                                <div className="flex items-center space-x-3">
                                  <Avatar className="w-8 h-8">
                                    <AvatarImage src={member.avatar} />
                                    <AvatarFallback className="text-xs">
                                      {member.name.split(' ').map(n => n.charAt(0)).join('').slice(0, 2)}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div className="text-left">
                                    <p className="font-medium">{member.name}</p>
                                    <p className="text-xs text-muted-foreground">
                                      {member.relationships.join(', ')}
                                    </p>
                                  </div>
                                </div>
                              </Button>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>

              {selectedConnection && (
                <>
                  <Separator />
                  
                  {/* Selected connection display */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Users className="w-5 h-5 text-muted-foreground" />
                      <Label>Selected Connection:</Label>
                    </div>
                    
                    <Card className="p-4 bg-primary/5 border-primary/20">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={selectedMember?.avatar} />
                            <AvatarFallback>
                              {selectedMember?.name.split(' ').map(n => n.charAt(0)).join('').slice(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{selectedMember?.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {selectedMember?.relationships.join(', ')}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedConnection('');
                            setSearchQuery('');
                            setSelectedRelationship('');
                          }}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </Card>

                    {/* Relationship category filter */}
                    <div className="space-y-3">
                      <Label>Filter by relationship category:</Label>
                      <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                        <SelectTrigger className="text-base">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(categoryLabels).map(([key, label]) => (
                            <SelectItem key={key} value={key}>
                              {label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Relationship selection */}
                    <div className="space-y-3">
                      <Label>How is {name} related to {selectedMember?.name}?</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-80 overflow-y-auto">
                        {suggestedRelationships.map((rel) => {
                          const IconComponent = rel.icon;
                          return (
                            <Card
                              key={rel.type}
                              className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                                selectedRelationship === rel.type
                                  ? 'ring-2 ring-primary bg-primary/5'
                                  : 'hover:bg-muted/50'
                              }`}
                              onClick={() => setSelectedRelationship(rel.type)}
                            >
                              <div className="flex items-start space-x-3">
                                <div className={`p-2 rounded-lg ${categoryColors[rel.category]} flex-shrink-0`}>
                                  <IconComponent className="w-4 h-4" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-medium text-sm">{rel.label}</h4>
                                  {rel.hindiLabel && (
                                    <p className="text-xs text-muted-foreground">{rel.hindiLabel}</p>
                                  )}
                                  <p className="text-xs text-muted-foreground mt-1">{rel.description}</p>
                                </div>
                              </div>
                            </Card>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Navigation */}
              <div className="flex justify-between pt-4">
                <Button 
                  variant="outline" 
                  onClick={handleBack}
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <Button 
                  className="vibrant-button text-primary-foreground"
                  onClick={handleNext}
                  disabled={!canProceedFromRelationship}
                >
                  Next: Biography Details
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Biography Details Step */}
        {step === 'biography' && (
          <Card className="memory-card max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-xl flex items-center justify-center space-x-2">
                <Book className="w-5 h-5 text-aqua" />
                <span>Biography Details</span>
              </CardTitle>
              <CardDescription>
                Add more details about {name} to create a rich family biography
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Enhanced Bio */}
              <div className="space-y-2">
                <Label htmlFor="fullBio">Full Biography</Label>
                <Textarea
                  id="fullBio"
                  placeholder="Share their life story, achievements, personality, and what makes them special..."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="text-base min-h-[120px]"
                />
              </div>

              {/* Professional Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="occupation">Occupation</Label>
                  <Input
                    id="occupation"
                    placeholder="e.g., Teacher, Engineer, Homemaker"
                    value={occupation}
                    onChange={(e) => setOccupation(e.target.value)}
                    className="text-base"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="e.g., Delhi, India"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="text-base"
                  />
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    placeholder="e.g., +91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="text-base"
                    type="tel"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    placeholder="e.g., name@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="text-base"
                    type="email"
                  />
                </div>
              </div>

              {/* Personal Notes */}
              <div className="space-y-2">
                <Label htmlFor="personalNotes">Personal Notes & Memories</Label>
                <Textarea
                  id="personalNotes"
                  placeholder="Special memories, quirks, favorite sayings, or anything that captures their essence..."
                  value={personalNotes}
                  onChange={(e) => setPersonalNotes(e.target.value)}
                  className="text-base min-h-[100px]"
                />
              </div>

              {/* Info Alert */}
              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  All information is optional. You can always add or edit these details later from their personal page.
                </AlertDescription>
              </Alert>

              {/* Navigation */}
              <div className="flex justify-between pt-4">
                <Button 
                  variant="outline" 
                  onClick={handleBack}
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <Button 
                  className="aqua-button text-accent-foreground"
                  onClick={handleNext}
                >
                  Next: Review & Confirm
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Confirm Step */}
        {step === 'confirm' && (
          <Card className="memory-card max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-xl flex items-center justify-center space-x-2">
                <CircleCheck className="w-5 h-5 text-green-600" />
                <span>Review & Confirm</span>
              </CardTitle>
              <CardDescription>
                Please review the information before adding {name} to your family tree
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Profile Preview */}
              <div className="text-center space-y-4">
                <Avatar className="w-24 h-24 mx-auto border-4 border-primary/20">
                  <AvatarImage src={avatar} />
                  <AvatarFallback className="text-xl">
                    {name.split(' ').map(n => n.charAt(0)).join('').slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl text-primary">{name}</h3>
                  {nickname && (
                    <p className="text-muted-foreground">"{nickname}"</p>
                  )}
                </div>
              </div>

              {/* Details Summary */}
              <div className="space-y-4">
                {birthYear && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Birth Year:</span>
                    <span>{birthYear}</span>
                  </div>
                )}
                
                {selectedConnection && relationshipData && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Relationship:</span>
                    <span>{relationshipData.label} of {selectedMember?.name}</span>
                  </div>
                )}
                
                {occupation && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Occupation:</span>
                    <span>{occupation}</span>
                  </div>
                )}
                
                {location && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Location:</span>
                    <span>{location}</span>
                  </div>
                )}

                {bio && (
                  <div className="space-y-2">
                    <span className="text-muted-foreground">Biography:</span>
                    <p className="text-sm bg-muted/30 p-3 rounded-lg">{bio}</p>
                  </div>
                )}

                {notes && (
                  <div className="space-y-2">
                    <span className="text-muted-foreground">Notes:</span>
                    <p className="text-sm bg-muted/30 p-3 rounded-lg">{notes}</p>
                  </div>
                )}
              </div>

              {/* Navigation */}
              <div className="flex justify-between pt-4">
                <Button 
                  variant="outline" 
                  onClick={handleBack}
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Edit
                </Button>
                <Button 
                  className="vibrant-button text-primary-foreground"
                  onClick={handleSubmit}
                >
                  Add to Family Tree
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Invite Step */}
        {step === 'invite' && (
          <Card className="memory-card max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-xl flex items-center justify-center space-x-2">
                <Send className="w-5 h-5 text-coral" />
                <span>Invite {name}</span>
              </CardTitle>
              <CardDescription>
                Great! {name} has been added to your family tree. Would you like to invite them to join the app?
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Success Message */}
              <Alert className="border-green-200 bg-green-50">
                <CircleCheck className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  {name} has been successfully added to your family tree! They can now be tagged in memories and will appear in your family connections.
                </AlertDescription>
              </Alert>

              {/* Profile Preview */}
              <div className="text-center space-y-4">
                <Avatar className="w-20 h-20 mx-auto border-4 border-primary/20">
                  <AvatarImage src={avatar} />
                  <AvatarFallback className="text-lg">
                    {name.split(' ').map(n => n.charAt(0)).join('').slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg text-primary">{name}</h3>
                  {relationshipData && selectedMember && (
                    <p className="text-sm text-muted-foreground">
                      {relationshipData.label} of {selectedMember.name}
                    </p>
                  )}
                </div>
              </div>

              {/* Invitation Options */}
              <div className="space-y-4">
                <h4 className="text-center text-muted-foreground">Choose how to invite {name}:</h4>
                
                <div className="grid grid-cols-1 gap-3">
                  {phone && (
                    <Button
                      variant="outline"
                      className="h-auto p-4 border-green-200 hover:bg-green-50"
                      onClick={() => handleInvite('whatsapp')}
                    >
                      <div className="flex items-center space-x-3">
                        <MessageCircle className="w-5 h-5 text-green-600" />
                        <div className="text-left">
                          <p className="font-medium">WhatsApp</p>
                          <p className="text-sm text-muted-foreground">{phone}</p>
                        </div>
                      </div>
                    </Button>
                  )}
                  
                  {email && (
                    <Button
                      variant="outline"
                      className="h-auto p-4 border-blue-200 hover:bg-blue-50"
                      onClick={() => handleInvite('email')}
                    >
                      <div className="flex items-center space-x-3">
                        <Mail className="w-5 h-5 text-blue-600" />
                        <div className="text-left">
                          <p className="font-medium">Email</p>
                          <p className="text-sm text-muted-foreground">{email}</p>
                        </div>
                      </div>
                    </Button>
                  )}
                  
                  {phone && (
                    <Button
                      variant="outline"
                      className="h-auto p-4 border-coral/30 hover:bg-coral/10"
                      onClick={() => handleInvite('sms')}
                    >
                      <div className="flex items-center space-x-3">
                        <Phone className="w-5 h-5 text-coral" />
                        <div className="text-left">
                          <p className="font-medium">SMS</p>
                          <p className="text-sm text-muted-foreground">{phone}</p>
                        </div>
                      </div>
                    </Button>
                  )}
                </div>
              </div>

              {/* Skip Option */}
              <div className="text-center space-y-4">
                <Separator />
                <Button
                  variant="ghost"
                  onClick={handleSkipInvite}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Skip invitation for now
                </Button>
                <p className="text-xs text-muted-foreground">
                  You can always invite them later from their profile page
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}