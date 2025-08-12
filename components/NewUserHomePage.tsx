import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  TreePine, 
  Upload, 
  Heart, 
  Camera, 
  CheckCircle,
  ArrowRight,
  Sparkles,
  Clock,
  Users,
  UserPlus
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface NewUserHomePageProps {
  onNavigate: (page: string) => void;
}

export function NewUserHomePage({ onNavigate }: NewUserHomePageProps) {
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);

  // Updated quick actions with invite family member as 3rd step
  const quickActions = [
    {
      id: 'family-tree',
      title: 'Build Your Family Tree',
      description: 'Start by adding your family members',
      icon: TreePine,
      color: 'bg-gradient-to-br from-emerald-500 to-teal-600',
      action: () => onNavigate('family-tree'),
      primary: true,
      step: 1
    },
    {
      id: 'upload-memory',
      title: 'Upload First Memory',
      description: 'Add photos, videos, or stories',
      icon: Upload,
      color: 'bg-gradient-to-br from-coral to-secondary',
      action: () => onNavigate('upload-memory'),
      primary: true,
      step: 2
    },
    {
      id: 'invite-family',
      title: 'Invite Family Member',
      description: 'Share the vault with loved ones',
      icon: UserPlus,
      color: 'bg-gradient-to-br from-aqua to-teal-600',
      action: () => onNavigate('invite-family'),
      primary: true,
      step: 3
    }
  ];

  const setupSteps = [
    {
      id: 'build-family-tree',
      title: 'Build your family tree',
      description: 'Add family members to connect memories',
      completed: completedSteps.includes('build-family-tree')
    },
    {
      id: 'upload-first-memory',
      title: 'Upload your first memory',
      description: 'Add a photo, video, or story',
      completed: completedSteps.includes('upload-first-memory')
    },
    {
      id: 'invite-family',
      title: 'Invite family to join',
      description: 'Share the vault with loved ones',
      completed: completedSteps.includes('invite-family')
    },
    {
      id: 'create-time-capsule',
      title: 'Create your first time capsule',
      description: 'Preserve messages for future generations',
      completed: completedSteps.includes('create-time-capsule')
    }
  ];

  const handleStepComplete = (stepId: string) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId]);
    }
  };

  const progressPercentage = (completedSteps.length / setupSteps.length) * 100;

  return (
    <div className="min-h-screen bg-background vibrant-texture">
      <div className="px-4 py-6 space-y-8">
        
        {/* Welcome Header */}
        <div className="text-center space-y-6 stagger-1">
          <div className="space-y-4">
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-lg hero-float">
              <Heart className="w-10 h-10 text-primary-foreground" />
            </div>
            
            <div className="space-y-2">
              <h1 
                className="text-primary"
                style={{
                  fontSize: '24px',
                  fontWeight: '700',
                  lineHeight: '1.4',
                  fontFamily: "'Playfair Display', serif"
                }}
              >
                Welcome to Your Family Vault
              </h1>
              <p 
                className="text-muted-foreground max-w-lg mx-auto"
                style={{
                  fontSize: '16px',
                  fontWeight: '400',
                  lineHeight: '1.5',
                  color: '#666662'
                }}
              >
                Let's start preserving your family's precious memories together ✨
              </p>
            </div>

            <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 px-4 py-2">
              <Sparkles className="w-4 h-4 mr-2" />
              <span 
                style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  lineHeight: '1.4'
                }}
              >
                New Family Vault Created
              </span>
            </Badge>
          </div>
        </div>

        {/* Quick Start Actions - Updated with invite family member */}
        <div className="space-y-6 stagger-2">
          <div className="text-center space-y-2">
            <h2 
              className="text-primary"
              style={{
                fontSize: '22px',
                fontWeight: '700',
                lineHeight: '1.4',
                fontFamily: "'Playfair Display', serif"
              }}
            >
              Get Started in 3 Steps
            </h2>
            <p 
              className="text-muted-foreground"
              style={{
                fontSize: '15px',
                fontWeight: '400',
                lineHeight: '1.5',
                color: '#666662'
              }}
            >
              Follow these steps to create your complete family memory experience
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Card
                  key={action.id}
                  className={`memory-card cursor-pointer transition-all duration-300 hover:scale-105 relative overflow-hidden ${
                    action.primary ? 'ring-2 ring-primary/20' : 'ring-1 ring-border'
                  }`}
                  onClick={action.action}
                >
                  {/* Step Number Badge */}
                  <div className="absolute top-3 right-3 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <span 
                      className="text-primary"
                      style={{
                        fontSize: '14px',
                        fontWeight: '600',
                        lineHeight: '1.2'
                      }}
                    >
                      {action.step}
                    </span>
                  </div>
                  
                  <CardContent className="p-6 text-center space-y-4">
                    <div className={`w-16 h-16 mx-auto rounded-full ${action.color} flex items-center justify-center shadow-lg`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <div className="space-y-2">
                      <h3 
                        className="text-foreground"
                        style={{
                          fontSize: '16px',
                          fontWeight: '700',
                          lineHeight: '1.4',
                          fontFamily: "'Inter', sans-serif"
                        }}
                      >
                        {action.title}
                      </h3>
                      <p 
                        className="text-muted-foreground"
                        style={{
                          fontSize: '14px',
                          fontWeight: '400',
                          lineHeight: '1.5',
                          color: '#666662'
                        }}
                      >
                        {action.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-center space-x-2 text-primary">
                      <span 
                        style={{
                          fontSize: '14px',
                          fontWeight: '700',
                          lineHeight: '1.4'
                        }}
                      >
                        {action.step === 1 ? 'Start Here' : 'Continue'}
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Setup Progress - Updated with new sequence */}
        <div className="space-y-6 stagger-3">
          <Card className="memory-card max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center space-x-2">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
                <span 
                  style={{
                    fontSize: '20px',
                    fontWeight: '700',
                    lineHeight: '1.4',
                    fontFamily: "'Playfair Display', serif"
                  }}
                >
                  Setup Progress
                </span>
              </CardTitle>
              <CardDescription 
                style={{
                  fontSize: '14px',
                  fontWeight: '400',
                  lineHeight: '1.5',
                  color: '#666662'
                }}
              >
                Complete these steps to unlock the full power of your family vault
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span 
                    className="text-muted-foreground"
                    style={{
                      fontSize: '12px',
                      fontWeight: '500',
                      lineHeight: '1.4',
                      color: '#666662'
                    }}
                  >
                    Progress
                  </span>
                  <span 
                    className="text-primary"
                    style={{
                      fontSize: '12px',
                      fontWeight: '700',
                      lineHeight: '1.4'
                    }}
                  >
                    {completedSteps.length}/{setupSteps.length} completed
                  </span>
                </div>
                <Progress value={progressPercentage} className="h-3 progress-enhanced" />
              </div>

              {/* Setup Steps */}
              <div className="space-y-4">
                {setupSteps.map((step, index) => (
                  <div
                    key={step.id}
                    className={`flex items-center space-x-4 p-3 rounded-lg transition-all ${
                      step.completed 
                        ? 'bg-emerald-50 border border-emerald-200' 
                        : 'bg-muted/30 border border-border'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step.completed 
                        ? 'bg-emerald-500 text-white' 
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {step.completed ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        <span 
                          style={{
                            fontSize: '12px',
                            fontWeight: '600',
                            lineHeight: '1.2'
                          }}
                        >
                          {index + 1}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <h4 
                        className={step.completed ? 'text-emerald-800' : 'text-foreground'}
                        style={{
                          fontSize: '15px',
                          fontWeight: '700',
                          lineHeight: '1.4',
                          fontFamily: "'Inter', sans-serif"
                        }}
                      >
                        {step.title}
                      </h4>
                      <p 
                        className={step.completed ? 'text-emerald-600' : 'text-muted-foreground'}
                        style={{
                          fontSize: '13px',
                          fontWeight: '400',
                          lineHeight: '1.5'
                        }}
                      >
                        {step.description}
                      </p>
                    </div>

                    {step.completed && (
                      <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">
                        <span 
                          style={{
                            fontSize: '12px',
                            fontWeight: '600',
                            lineHeight: '1.4'
                          }}
                        >
                          Done
                        </span>
                      </Badge>
                    )}
                  </div>
                ))}
              </div>

              {/* Action Buttons - Updated to prioritize invite family */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-4">
                <Button 
                  onClick={() => {
                    handleStepComplete('build-family-tree');
                    onNavigate('family-tree');
                  }}
                  className="vibrant-button text-primary-foreground"
                  style={{
                    fontSize: '14px',
                    fontWeight: '700',
                    lineHeight: '1.4'
                  }}
                >
                  <TreePine className="w-4 h-4 mr-2" />
                  Start with Family Tree
                </Button>
                <Button 
                  onClick={() => {
                    handleStepComplete('invite-family');
                    onNavigate('invite-family');
                  }}
                  variant="outline"
                  className="border-aqua text-aqua hover:bg-aqua hover:text-white"
                  style={{
                    fontSize: '14px',
                    fontWeight: '700',
                    lineHeight: '1.4'
                  }}
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Invite Family
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Features Preview - Time Capsules moved to optional feature */}
        <div className="space-y-6 stagger-4">
          <Card className="memory-card max-w-2xl mx-auto bg-gradient-to-br from-violet/5 to-purple/5 border-violet/20">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-violet to-purple-600 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                
                <div className="space-y-3 flex-1">
                  <div>
                    <h3 
                      className="text-primary mb-1"
                      style={{
                        fontSize: '16px',
                        fontWeight: '700',
                        lineHeight: '1.4',
                        fontFamily: "'Inter', sans-serif"
                      }}
                    >
                      ✨ Advanced Feature: Time Capsules
                    </h3>
                    <p 
                      className="text-muted-foreground"
                      style={{
                        fontSize: '14px',
                        fontWeight: '400',
                        lineHeight: '1.5',
                        color: '#666662'
                      }}
                    >
                      Create sealed messages for future family members. Write to your children, grandchildren, 
                      or even your future self and set when these precious messages should be opened.
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <span 
                      style={{
                        fontSize: '12px',
                        fontWeight: '400',
                        lineHeight: '1.4',
                        color: '#666662'
                      }}
                    >
                      🔒 Sealed until date
                    </span>
                    <span 
                      style={{
                        fontSize: '12px',
                        fontWeight: '400',
                        lineHeight: '1.4',
                        color: '#666662'
                      }}
                    >
                      💌 Personal messages
                    </span>
                    <span 
                      style={{
                        fontSize: '12px',
                        fontWeight: '400',
                        lineHeight: '1.4',
                        color: '#666662'
                      }}
                    >
                      📅 Future delivery
                    </span>
                  </div>
                  
                  <Button 
                    size="sm"
                    onClick={() => onNavigate('time-capsules')}
                    className="bg-gradient-to-r from-violet to-purple-600 text-white hover:from-purple-600 hover:to-violet"
                    style={{
                      fontSize: '14px',
                      fontWeight: '700',
                      lineHeight: '1.4'
                    }}
                  >
                    <Clock className="w-4 h-4 mr-2" />
                    Explore Time Capsules
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Inspiration Section */}
        <div className="space-y-6 stagger-5">
          <Card className="memory-card max-w-2xl mx-auto bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
            <CardContent className="p-6 text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                <Heart className="w-8 h-8 text-white" />
              </div>
              
              <div className="space-y-2">
                <h3 
                  className="text-primary"
                  style={{
                    fontSize: '16px',
                    fontWeight: '700',
                    lineHeight: '1.4',
                    fontFamily: "'Inter', sans-serif"
                  }}
                >
                  💡 Getting Started Tip
                </h3>
                <p 
                  className="text-muted-foreground"
                  style={{
                    fontSize: '14px',
                    fontWeight: '400',
                    lineHeight: '1.5',
                    color: '#666662'
                  }}
                >
                  Begin with your family tree to create connections, then add memories and invite family members. 
                  Each step builds upon the last to create a rich, shared family history! 🌟
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Simple Navigation Footer */}
        <div className="text-center space-y-4 stagger-6">
          <div className="flex justify-center space-x-4">
            <Button 
              variant="outline" 
              onClick={() => onNavigate('help')}
              style={{
                fontSize: '14px',
                fontWeight: '600',
                lineHeight: '1.4'
              }}
            >
              Need Help?
            </Button>
            <Button 
              variant="outline" 
              onClick={() => onNavigate('profile')}
              style={{
                fontSize: '14px',
                fontWeight: '600',
                lineHeight: '1.4'
              }}
            >
              Profile Settings
            </Button>
          </div>
          
          <p 
            className="text-muted-foreground max-w-md mx-auto"
            style={{
              fontSize: '12px',
              fontWeight: '400',
              lineHeight: '1.5',
              color: '#666662'
            }}
          >
            Your family memories are precious. We'll help you preserve them with love and care. ❤️
          </p>
        </div>

      </div>
    </div>
  );
}