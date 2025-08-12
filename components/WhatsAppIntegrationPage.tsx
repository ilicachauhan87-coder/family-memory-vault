import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { MessageCircle, Phone, Check, ArrowRight, Mic, Camera, FileText } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface WhatsAppIntegrationPageProps {
  onBack: () => void;
}

export function WhatsAppIntegrationPage({ onBack }: WhatsAppIntegrationPageProps) {
  const steps = [
    {
      id: 1,
      title: 'Send a WhatsApp Message',
      description: 'Send voice notes, photos, or text to our dedicated number',
      icon: MessageCircle,
      example: 'Send to: +91 98765 00000'
    },
    {
      id: 2,
      title: 'We Process Your Memory',
      description: 'Our system automatically converts and organizes your content',
      icon: Check,
      example: 'Voice → Text transcription'
    },
    {
      id: 3,
      title: 'Added to Your Vault',
      description: 'Your memory appears in your family vault within minutes',
      icon: ArrowRight,
      example: 'Categorized and tagged'
    }
  ];

  const supportedTypes = [
    {
      type: 'Voice Messages',
      icon: Mic,
      description: 'Send voice recordings up to 5 minutes',
      example: 'Record family stories, blessings, or daily moments',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      type: 'Photos & Videos',
      icon: Camera,
      description: 'Share photos and short videos (up to 2 minutes)',
      example: 'Family gatherings, festivals, milestones',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      type: 'Text Messages',
      icon: FileText,
      description: 'Type recipes, stories, or important information',
      example: 'Family recipes, wisdom, instructions',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  return (
    <div className="min-h-screen bg-background heritage-texture">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary/10 to-secondary/10 px-4 py-6">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            onClick={onBack}
            className="text-primary hover:bg-primary/10"
          >
            ← Back
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl text-primary">WhatsApp Integration</h1>
            <p className="text-lg text-muted-foreground">
              Easily add memories through WhatsApp
            </p>
          </div>
          <div className="p-3 bg-green-100 rounded-full">
            <MessageCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-8">
        {/* Connection Status */}
        <Card className="memory-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-green-100 rounded-full">
                  <Phone className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl text-primary">WhatsApp Connected</h3>
                  <p className="text-lg text-muted-foreground">
                    Your number +91 98765 43215 is linked
                  </p>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-800">Active</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Last Activity */}
        <Card className="memory-card">
          <CardHeader>
            <CardTitle className="text-xl text-primary">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-full">
                  <Mic className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-primary">Grandma's Blessing</p>
                  <p className="text-sm text-muted-foreground">Voice message received</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">July 20, 2025</p>
                <Badge variant="outline" className="text-xs">
                  Processed
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* How It Works */}
        <div className="space-y-6">
          <h2 className="text-2xl text-primary text-center">How It Works</h2>
          <div className="space-y-4">
            {steps.map((step, index) => (
              <Card key={step.id} className="memory-card">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <step.icon className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-medium text-primary">{step.title}</h3>
                          <p className="text-muted-foreground">{step.description}</p>
                          <p className="text-sm text-secondary font-medium mt-2">{step.example}</p>
                        </div>
                        <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                          <span className="text-primary font-medium">{step.id}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="mt-4 ml-6">
                      <div className="w-px h-4 bg-border"></div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Supported Content Types */}
        <div className="space-y-6">
          <h2 className="text-2xl text-primary text-center">What You Can Send</h2>
          <div className="space-y-4">
            {supportedTypes.map((type) => (
              <Card key={type.type} className="memory-card">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 ${type.bgColor} rounded-lg flex-shrink-0`}>
                      <type.icon className={`w-6 h-6 ${type.color}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-primary">{type.type}</h3>
                      <p className="text-muted-foreground mb-2">{type.description}</p>
                      <p className="text-sm text-secondary">{type.example}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* WhatsApp Number Card */}
        <Card className="memory-card bg-gradient-to-br from-green-50 to-blue-50">
          <CardHeader>
            <CardTitle className="text-xl text-primary text-center">
              Ready to Share a Memory?
            </CardTitle>
            <CardDescription className="text-lg text-center">
              Send your next memory via WhatsApp
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center space-y-4">
              <div className="p-6 bg-white rounded-lg shadow-sm border-2 border-green-200">
                <p className="text-sm text-muted-foreground">Send to WhatsApp Number:</p>
                <p className="text-2xl font-medium text-green-600">+91 98765 00000</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <Button
                  className="h-12 bg-green-600 hover:bg-green-700 text-white flex items-center space-x-2"
                  onClick={() => window.open('https://wa.me/919876500000', '_blank')}
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Open WhatsApp</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-12 border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
                  onClick={() => navigator.clipboard.writeText('+91 98765 00000')}
                >
                  Copy Number
                </Button>
              </div>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <p className="text-sm text-yellow-800">
                <strong>💡 Tip:</strong> Include a brief description with your media to help us categorize it better. 
                For example: "Diwali celebration 2024" or "Grandma's biryani recipe"
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Privacy Note */}
        <Card className="memory-card">
          <CardContent className="p-6 text-center">
            <h3 className="text-lg text-primary mb-3">🔐 Privacy & Security</h3>
            <p className="text-muted-foreground">
              Your WhatsApp messages are processed securely and automatically deleted from our systems 
              after being added to your vault. Only you and your family members can access these memories.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}