import { useState, useRef, useEffect } from 'react';
import { Button } from './components/ui/button';
import { Badge } from './components/ui/badge';
import { LandingPage } from './components/LandingPage';
import { SignInPage } from './components/SignInPage';
import { NewUserHomePage } from './components/NewUserHomePage';
import { ReturningUserHomePage } from './components/ReturningUserHomePage';
import { MemoryUploadPage } from './components/MemoryUploadPage';
import { MemoryTypesPage } from './components/MemoryTypesPage';
import { VaultPage } from './components/VaultPage';
import { FamilyTreePage } from './components/FamilyTreePage';
import { AddFamilyMemberPage } from './components/AddFamilyMemberPage';
import { InviteFamilyMemberPage } from './components/InviteFamilyMemberPage';
import { PersonMemoriesPage } from './components/PersonMemoriesPage';
import { WhatsAppIntegrationPage } from './components/WhatsAppIntegrationPage';
import { TimeCapsulesPage } from './components/TimeCapsulesPage';
import { ProfilePage } from './components/ProfilePage';
import { HelpPage } from './components/HelpPage';
import { BottomNavigation } from './components/BottomNavigation';
import { FloatingHeader } from './components/FloatingHeader';
import { ChevronUp, UserPlus, Users, Eye, LogIn, Sparkles } from 'lucide-react';

type AppPage = 
  | 'landing'
  | 'sign-in'
  | 'home'
  | 'vault'
  | 'upload-memory'
  | 'memories'
  | 'family-tree'
  | 'add-family-member'
  | 'invite-family'
  | 'person-memories'
  | 'whatsapp-integration'
  | 'time-capsules'
  | 'profile'
  | 'help';

export default function App() {
  const [currentPage, setCurrentPage] = useState<AppPage>('landing');
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isNewUser, setIsNewUser] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [unreadMemories, setUnreadMemories] = useState(3); // Mock unread count
  const [notificationCount, setNotificationCount] = useState(2); // Mock notification count
  const [selectedPersonId, setSelectedPersonId] = useState<string>('');
  const [selectedPersonName, setSelectedPersonName] = useState<string>('');

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShowScrollTop(scrollY > 1000);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleGetStarted = () => {
    setCurrentPage('sign-in');
  };

  const handleSignIn = () => {
    if (currentPage === 'landing') {
      setCurrentPage('sign-in');
    } else {
      // Actually sign in
      setIsSignedIn(true);
      setCurrentPage('home');
    }
  };

  const handleBackToLanding = () => {
    setCurrentPage('landing');
  };

  const handlePersonClick = (personId: string) => {
    // Updated person data with corrected family members
    const personNames: Record<string, string> = {
      'ilica-chauhan': 'Ilica Chauhan',
      'priyam-alok': 'Priyam Alok',
      'miraya-chauhan-sinha': 'Miraya Chauhan Sinha',
      'rajeev-chauhan': 'Rajeev Kumar Chauhan',
      'priti-chauhan': 'Priti Chauhan',
      'ishan-chauhan': 'Ishan Chauhan',
      'gattu-chauhan': 'Gattu Chauhan (Parrot)',
      'ajai-singh': 'Shri Ajai Singh',
      'urmila-devi': 'Shrimati Urmila Devi',
      'yeshpal-singh': 'Shri Yeshpal Singh',
      'rohitash-devi': 'Shrimati Rohitash Devi',
      'sanjeev-kumar': 'Sanjeev Kumar',
      'sudha-chauhan': 'Sudha Chauhan',
      'usha-verma': 'Shrimati Usha Verma',
      'jitendra-verma': 'Dr Jitendra Verma',
      'pradeep-kumar': 'Pradeep Kumar',
      'ajay-kumar': 'Ajay Kumar',
      'sanjay-kumar': 'Sanjay Kumar',
      'seema-chaudhary': 'Seema Chaudhary',
      'somya-chauhan': 'Somya Chauhan',
      'shivam-verma': 'Shivam Verma',
      'shivani-bobo': 'Shivani Bobo',
      'praneet-asthana': 'Praneet Asthana',
      'viraj-chaudhary': 'Viraj Chaudhary',
      'aastha-chaudhary': 'Aastha Chaudhary',
      'samaira-singh': 'Samaira Singh',
      'kushagra-zulmi-jat': 'Kushagra Zulmi Jat',
      'hari': 'Hari'
    };

    setSelectedPersonId(personId);
    setSelectedPersonName(personNames[personId] || 'Unknown Person');
    setCurrentPage('person-memories');
  };

  const handleNavigation = (page: string) => {
    switch (page) {
      case 'home':
        setCurrentPage('home');
        break;
      case 'vault':
        if (isSignedIn) {
          setCurrentPage('vault');
          setUnreadMemories(0); // Clear unread count when visiting vault
        } else {
          setCurrentPage('sign-in');
        }
        break;
      case 'profile':
        if (isSignedIn) {
          setCurrentPage('profile');
        } else {
          setCurrentPage('sign-in');
        }
        break;
      case 'memories':
        if (isSignedIn) {
          setCurrentPage('memories');
          setUnreadMemories(0); // Clear unread count when visiting memories
        } else {
          setCurrentPage('sign-in');
        }
        break;
      case 'help':
        setCurrentPage('help');
        break;
      case 'upload-memory':
        setCurrentPage('upload-memory');
        break;
      case 'family-tree':
        setCurrentPage('family-tree');
        break;
      case 'add-family-member':
        setCurrentPage('add-family-member');
        break;
      case 'whatsapp-integration':
        setCurrentPage('whatsapp-integration');
        break;
      case 'time-capsules':
        setCurrentPage('time-capsules');
        break;
      case 'invite-family':
        setCurrentPage('invite-family');
        break;
      case 'festival-reminders':
        alert('Festival & Milestone Reminders feature coming soon!');
        break;
      default:
        break;
    }
  };

  const handleFloatingProfile = () => {
    if (isSignedIn) {
      setCurrentPage('profile');
    } else {
      setCurrentPage('sign-in');
    }
  };

  const handleNotifications = () => {
    setNotificationCount(0);
    // Show notifications modal or page
    alert('Notifications feature coming soon!');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Determine when to show floating header
  const shouldShowFloatingHeader = () => {
    const pagesWithHeader = ['home', 'vault', 'memories', 'family-tree', 'time-capsules'];
    return isSignedIn && pagesWithHeader.includes(currentPage);
  };

  const getFloatingHeaderProps = () => {
    switch (currentPage) {
      case 'home':
        return {
          showNotifications: true,
          showProfile: true
        };
      case 'vault':
      case 'memories':
      case 'family-tree':
      case 'time-capsules':
        return {
          showNotifications: false,
          showProfile: true
        };
      default:
        return {
          showNotifications: false,
          showProfile: false
        };
    }
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage onGetStarted={handleGetStarted} onSignIn={handleSignIn} />;
      
      case 'sign-in':
        return <SignInPage onSignIn={handleSignIn} onBack={handleBackToLanding} />;
      
      case 'home':
        if (!isSignedIn) {
          setCurrentPage('sign-in');
          return <SignInPage onSignIn={handleSignIn} onBack={handleBackToLanding} />;
        }
        return isNewUser ? (
          <NewUserHomePage onNavigate={handleNavigation} />
        ) : (
          <ReturningUserHomePage onNavigate={handleNavigation} />
        );
      
      case 'vault':
        return <VaultPage onNavigate={handleNavigation} />;
      
      case 'upload-memory':
        return <MemoryUploadPage onBack={() => setCurrentPage('home')} />;
      
      case 'memories':
        return (
          <MemoryTypesPage 
            onBack={() => setCurrentPage('home')}
            onNavigate={handleNavigation}
          />
        );
      
      case 'family-tree':
        return (
          <FamilyTreePage 
            onBack={() => setCurrentPage('home')} 
            onPersonClick={handlePersonClick}
            onAddMember={() => handleNavigation('add-family-member')}
            onNavigate={handleNavigation}
            isNewUser={isNewUser}  
          />
        );
      
      case 'add-family-member':
        return (
          <AddFamilyMemberPage 
            onBack={() => setCurrentPage('family-tree')}
            onSuccess={() => {
              setCurrentPage('family-tree');
              // You could show a success toast here
            }}
          />
        );
      
      case 'invite-family':
        return (
          <InviteFamilyMemberPage 
            onBack={() => setCurrentPage('home')}
            onSuccess={() => {
              setCurrentPage('home');
              // You could show a success toast here
            }}
          />
        );
      
      case 'person-memories':
        return (
          <PersonMemoriesPage 
            personId={selectedPersonId} 
            personName={selectedPersonName}
            onBack={() => setCurrentPage('family-tree')}
            onNavigate={handleNavigation}
          />
        );
      
      case 'whatsapp-integration':
        return <WhatsAppIntegrationPage onBack={() => setCurrentPage('home')} />;
      
      case 'time-capsules':
        return <TimeCapsulesPage onBack={() => setCurrentPage('home')} />;
      
      case 'profile':
        return <ProfilePage />;
      
      case 'help':
        return <HelpPage />;
      
      default:
        return <LandingPage onGetStarted={handleGetStarted} onSignIn={handleSignIn} />;
    }
  };

  const shouldShowBottomNav = currentPage !== 'landing' && currentPage !== 'sign-in' && currentPage !== 'person-memories';

  return (
    <div className="relative min-h-screen">
      {/* Demo Status Indicator */}
      <div className="fixed top-2 left-1/2 transform -translate-x-1/2 z-50">
        <Badge 
          variant="secondary" 
          className="bg-background/90 backdrop-blur-sm border border-primary/20 text-primary shadow-lg text-xs"
        >
          <Eye className="w-3 h-3 mr-1" />
          Demo - {isSignedIn ? 'Signed In' : 'Not Signed In'} - {currentPage}
        </Badge>
      </div>

      {/* Navigation Help for Landing/SignIn Pages */}
      {(currentPage === 'landing' || currentPage === 'sign-in') && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
          <Badge 
            variant="outline" 
            className="bg-primary/10 backdrop-blur-sm border-primary text-primary animate-pulse text-xs max-w-xs text-center"
          >
            {currentPage === 'landing' 
              ? '👆 Click "Start Your Family Vault" to see navigation' 
              : '👆 Click "Sign In" to access the app'
            }
          </Badge>
        </div>
      )}

      {/* Quick Sign In Button for Landing Page */}
      {currentPage === 'landing' && (
        <div className="fixed top-4 right-4 z-50">
          <Button
            onClick={() => {
              setIsSignedIn(true);
              setCurrentPage('home');
            }}
            className="vibrant-button text-primary-foreground shadow-lg text-sm"
            size="sm"
          >
            <LogIn className="w-4 h-4 mr-2" />
            Quick Demo
          </Button>
        </div>
      )}

      {/* Floating Header - Show on selected pages only */}
      {shouldShowFloatingHeader() && (
        <FloatingHeader 
          onProfile={handleFloatingProfile}
          onNotifications={handleNotifications}
          notificationCount={notificationCount}
          {...getFloatingHeaderProps()}
        />
      )}

      {/* Main Content - No top padding needed now */}
      <main className={`${shouldShowBottomNav ? 'pb-20' : ''}`}>
        <div className="vibrant-texture min-h-screen">
          {renderCurrentPage()}
        </div>
      </main>

      {/* Bottom Navigation - Show on most pages except landing, sign-in, and person-memories */}
      {shouldShowBottomNav && (
        <BottomNavigation 
          currentPage={currentPage}
          onNavigate={handleNavigation}
          unreadCount={unreadMemories}
        />
      )}

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-24 right-4 z-40 w-10 h-10 rounded-full vibrant-button text-primary-foreground shadow-lg"
          size="sm"
        >
          <ChevronUp className="w-4 h-4" />
        </Button>
      )}

      {/* Separate User Experience Buttons (Demo) - Only show when signed in and on home page */}
      {isSignedIn && currentPage === 'home' && (
        <div className="fixed top-14 right-4 z-40 mt-2 space-y-1">
          {/* Demo Experience Label */}
          <div className="text-center">
            <Badge 
              variant="outline" 
              className="bg-background/90 backdrop-blur-sm border-violet text-violet"
              style={{ fontSize: '10px' }}
            >
              <Sparkles className="w-2 h-2 mr-1" />
              Demo
            </Badge>
          </div>
          
          {/* New User Experience Button */}
          <Button
            onClick={() => setIsNewUser(true)}
            variant={isNewUser ? "default" : "outline"}
            size="sm"
            className={`w-full flex items-center space-x-1 transition-all duration-300 text-xs h-8 ${
              isNewUser 
                ? 'vibrant-button text-primary-foreground shadow-lg' 
                : 'bg-background/80 backdrop-blur-sm border-primary text-primary hover:bg-primary hover:text-primary-foreground'
            }`}
          >
            <UserPlus className="w-3 h-3" />
            <span>New</span>
          </Button>
          
          {/* Returning User Experience Button */}
          <Button
            onClick={() => setIsNewUser(false)}
            variant={!isNewUser ? "default" : "outline"}
            size="sm"
            className={`w-full flex items-center space-x-1 transition-all duration-300 text-xs h-8 ${
              !isNewUser 
                ? 'bg-gradient-to-r from-aqua to-secondary text-primary-foreground shadow-lg' 
                : 'bg-background/80 backdrop-blur-sm border-aqua text-aqua hover:bg-aqua hover:text-primary-foreground'
            }`}
          >
            <Users className="w-3 h-3" />
            <span>Return</span>
          </Button>
        </div>
      )}

      {/* Back to Landing Button (Demo) - Show when signed in */}
      {isSignedIn && (
        <div className="fixed top-12 left-4 z-40">
          <Button
            onClick={() => {
              setIsSignedIn(false);
              setCurrentPage('landing');
            }}
            variant="outline"
            size="sm"
            className="bg-background/80 backdrop-blur-sm border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground text-xs h-8"
          >
            ← Landing
          </Button>
        </div>
      )}
    </div>
  );
}