import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Badge } from './ui/badge';
import { HelpCircle, Search, Phone, Mail, MessageCircle, BookOpen, Video, Camera, Mic, Users, Shield, Heart, Clock, ChevronRight } from 'lucide-react';

export function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const quickHelp = [
    {
      title: 'Getting Started',
      description: 'Learn the basics of using Memory Vault',
      icon: BookOpen,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      articles: 3
    },
    {
      title: 'Adding Memories',
      description: 'How to upload photos, videos, and voice notes',
      icon: Camera,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      articles: 5
    },
    {
      title: 'Family Tree',
      description: 'Building and managing your family connections',
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      articles: 4
    },
    {
      title: 'Privacy & Security',
      description: 'Keeping your memories safe and private',
      icon: Shield,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      articles: 6
    }
  ];

  const faqs = [
    {
      category: 'Getting Started',
      questions: [
        {
          question: 'How do I create my first family memory?',
          answer: 'To create your first memory, tap the "Add Memory" button on your home screen, choose the type of memory (photo, video, voice, or story), upload your content, and add details like title, date, and family members involved. It\'s that simple!'
        },
        {
          question: 'How do I invite family members to join?',
          answer: 'Go to your Family Tree page and tap "Add Family Member". You can send invitations via WhatsApp, email, or SMS. Once they join, they\'ll be able to see and contribute to your shared family vault.'
        },
        {
          question: 'Is there a limit to how many memories I can store?',
          answer: 'No! Memory Vault offers unlimited storage for your precious family moments. Store as many photos, videos, voice recordings, and stories as your heart desires - all completely free.'
        }
      ]
    },
    {
      category: 'Using WhatsApp',
      questions: [
        {
          question: 'How do I send memories through WhatsApp?',
          answer: 'Simply send your photos, videos, or voice messages to our WhatsApp number: +91 98765 00000. Include a brief description, and we\'ll automatically add it to your family vault within minutes.'
        },
        {
          question: 'What types of content can I send via WhatsApp?',
          answer: 'You can send photos, short videos (up to 2 minutes), voice messages (up to 5 minutes), and text messages. All content is automatically organized and added to your memory vault.'
        }
      ]
    },
    {
      category: 'Privacy & Security',
      questions: [
        {
          question: 'Who can see my family memories?',
          answer: 'Only the family members you invite can see your memories. We never share your content with third parties or use it for advertising. Your memories remain completely private to your family circle.'
        },
        {
          question: 'How secure is my data?',
          answer: 'We use bank-level encryption to protect your memories. All data is stored securely in the cloud with multiple backups. Your memories are safer here than on your phone or computer.'
        },
        {
          question: 'Can I delete memories if needed?',
          answer: 'Yes, you have complete control. You can delete any memory you\'ve added at any time. However, please note that once deleted, memories cannot be recovered.'
        }
      ]
    },
    {
      category: 'Technical Support',
      questions: [
        {
          question: 'The app is running slowly. What should I do?',
          answer: 'Try closing and reopening the app first. If that doesn\'t help, restart your phone. For persistent issues, clear the app cache or contact our support team for assistance.'
        },
        {
          question: 'I forgot my password. How do I reset it?',
          answer: 'On the sign-in page, tap "Forgot Password" and enter your email or phone number. We\'ll send you a secure link to create a new password. You can also use OTP login as an alternative.'
        }
      ]
    }
  ];

  const videoTutorials = [
    {
      title: 'Getting Started with Memory Vault',
      duration: '3:45',
      description: 'A complete walkthrough for new users',
      thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&h=200&fit=crop'
    },
    {
      title: 'Adding Your First Memory',
      duration: '2:30',
      description: 'Step-by-step guide to uploading memories',
      thumbnail: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=300&h=200&fit=crop'
    },
    {
      title: 'Building Your Family Tree',
      duration: '4:15',
      description: 'How to connect your family members',
      thumbnail: 'https://images.unsplash.com/photo-1516321165247-4aa89a48be28?w=300&h=200&fit=crop'
    }
  ];

  const filteredFaqs = faqs.map(category => ({
    ...category,
    questions: category.questions.filter(q => 
      searchQuery === '' || 
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen bg-background heritage-texture pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary/10 to-secondary/10 px-4 py-8">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="p-4 bg-primary/20 rounded-full">
              <HelpCircle className="w-12 h-12 text-primary" />
            </div>
          </div>
          <div>
            <h1 className="text-4xl text-primary">Help & Support</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We're here to help you preserve your family memories with ease
            </p>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-8">
        {/* Search */}
        <Card className="memory-card">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search for help topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-12 pl-10 text-lg bg-input-background border-border/50"
              />
            </div>
          </CardContent>
        </Card>

        {/* Quick Help Categories */}
        <div className="space-y-4">
          <h2 className="text-2xl text-primary">Quick Help</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {quickHelp.map((item, index) => {
              const ItemIcon = item.icon;
              return (
                <Card key={index} className="memory-card hover:shadow-lg transition-all duration-200 cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className={`p-3 ${item.bgColor} rounded-lg flex-shrink-0`}>
                          <ItemIcon className={`w-6 h-6 ${item.color}`} />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-medium text-primary">{item.title}</h3>
                          <p className="text-muted-foreground">{item.description}</p>
                          <Badge variant="secondary" className="mt-2">
                            {item.articles} articles
                          </Badge>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Video Tutorials */}
        <div className="space-y-4">
          <h2 className="text-2xl text-primary">Video Tutorials</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {videoTutorials.map((video, index) => (
              <Card key={index} className="memory-card hover:shadow-lg transition-all duration-200 cursor-pointer">
                <div className="relative">
                  <div 
                    className="h-32 bg-cover bg-center rounded-t-lg relative"
                    style={{ backgroundImage: `url(${video.thumbnail})` }}
                  >
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-t-lg">
                      <div className="p-3 bg-white/20 rounded-full">
                        <Video className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <Badge className="absolute top-2 right-2 bg-black/60 text-white">
                      <Clock className="w-3 h-3 mr-1" />
                      {video.duration}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="text-lg font-medium text-primary mb-2">{video.title}</h3>
                  <p className="text-sm text-muted-foreground">{video.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="space-y-4">
          <h2 className="text-2xl text-primary">Frequently Asked Questions</h2>
          
          {filteredFaqs.length === 0 ? (
            <Card className="memory-card">
              <CardContent className="p-8 text-center">
                <HelpCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl text-primary mb-2">No results found</h3>
                <p className="text-muted-foreground">
                  Try different search terms or browse our help categories above
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {filteredFaqs.map((category, categoryIndex) => (
                <Card key={categoryIndex} className="memory-card">
                  <CardHeader>
                    <CardTitle className="text-xl text-primary">{category.category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="space-y-2">
                      {category.questions.map((faq, faqIndex) => (
                        <AccordionItem 
                          key={faqIndex} 
                          value={`${categoryIndex}-${faqIndex}`}
                          className="border rounded-lg px-4"
                        >
                          <AccordionTrigger className="text-left text-primary hover:no-underline">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent className="text-muted-foreground pt-4">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Contact Support */}
        <Card className="memory-card bg-gradient-to-br from-primary/10 to-secondary/10">
          <CardHeader>
            <CardTitle className="text-2xl text-primary text-center">Still Need Help?</CardTitle>
            <CardDescription className="text-lg text-center">
              Our support team is here to help you every step of the way
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <Button 
                variant="outline" 
                className="h-20 border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white flex flex-col items-center space-y-2"
                onClick={() => window.open('https://wa.me/919876500000', '_blank')}
              >
                <MessageCircle className="w-6 h-6" />
                <span>WhatsApp Support</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="h-20 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white flex flex-col items-center space-y-2"
                onClick={() => window.open('tel:+919876500000')}
              >
                <Phone className="w-6 h-6" />
                <span>Call Support</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="h-20 border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white flex flex-col items-center space-y-2"
                onClick={() => window.open('mailto:support@memoryvault.app')}
              >
                <Mail className="w-6 h-6" />
                <span>Email Support</span>
              </Button>
            </div>
            
            <div className="text-center space-y-2">
              <p className="text-lg text-primary font-medium">Support Hours</p>
              <p className="text-muted-foreground">Monday - Sunday: 8:00 AM - 8:00 PM IST</p>
              <p className="text-muted-foreground">Average response time: Under 2 hours</p>
            </div>
          </CardContent>
        </Card>

        {/* Emergency Help */}
        <Card className="memory-card border-yellow-200 bg-yellow-50">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-yellow-200 rounded-full flex-shrink-0">
                <Heart className="w-6 h-6 text-yellow-700" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-yellow-800 mb-2">
                  Need Immediate Help with Important Memories?
                </h3>
                <p className="text-yellow-700 mb-4">
                  If you're trying to preserve urgent family memories or having technical difficulties 
                  with important content, our priority support team is available 24/7.
                </p>
                <Button className="bg-yellow-600 hover:bg-yellow-700 text-white">
                  Contact Priority Support
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}