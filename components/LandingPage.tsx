import { useState } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "./ui/avatar";
import {
  Heart,
  TreePine,
  Camera,
  Mic,
  Users,
  Shield,
  Clock,
  Star,
  Play,
  ArrowRight,
  Gift,
  BookOpen,
  Sparkles,
  Lock,
  Smartphone,
  Share,
  MapPin,
  Video,
  PlayCircle,
  CheckCircle,
  Zap,
  Crown,
  Baby,
  Coffee,
  MessageSquare,
  Trophy,
  Calendar,
  Download,
  Globe,
  Headphones,
  FileText,
  Image,
  Music,
  Archive
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface LandingPageProps {
  onGetStarted: () => void;
  onSignIn: () => void;
}

export function LandingPage({
  onGetStarted,
  onSignIn,
}: LandingPageProps) {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const heroFeatures = [
    {
      icon: Shield,
      title: "100% Private",
      description: "Your memories, your family only",
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200"
    },
    {
      icon: Heart,
      title: "Elder Friendly",
      description: "Simple for all generations",
      color: "text-rose-600",
      bgColor: "bg-rose-50",
      borderColor: "border-rose-200"
    },
    {
      icon: Download,
      title: "Always Yours",
      description: "Export anytime, anywhere",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    }
  ];

  const coreFeatures = [
    {
      icon: Mic,
      title: "Voice Memories",
      description: "Record and preserve the voices of loved ones forever",
      gradient: "from-amber-500 to-orange-500",
      textColor: "text-amber-700",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200"
    },
    {
      icon: TreePine,
      title: "Family Tree",
      description: "Connect memories to family members across generations",
      gradient: "from-emerald-500 to-teal-500",
      textColor: "text-emerald-700",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200"
    },
    {
      icon: Clock,
      title: "Time Capsules",
      description: "Schedule messages to unlock on special future dates",
      gradient: "from-purple-500 to-indigo-500",
      textColor: "text-purple-700",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200"
    },
    {
      icon: Camera,
      title: "Photo Stories",
      description: "Organize photos with rich context and family connections",
      gradient: "from-blue-500 to-cyan-500",
      textColor: "text-blue-700",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    {
      icon: Video,
      title: "Video Memories",
      description: "Capture and share precious video moments with family",
      gradient: "from-red-500 to-pink-500",
      textColor: "text-red-700",
      bgColor: "bg-red-50",
      borderColor: "border-red-200"
    },
    {
      icon: BookOpen,
      title: "Family Stories",
      description: "Write and preserve family history, recipes, and wisdom",
      gradient: "from-violet-500 to-purple-500",
      textColor: "text-violet-700",
      bgColor: "bg-violet-50",
      borderColor: "border-violet-200"
    }
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Mother of 3",
      location: "Mumbai, India",
      text: "Finally, a place where our family memories are safe and organized. My children love hearing their grandmother's stories.",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=100&h=100&fit=crop&crop=face",
      rating: 5
    },
    {
      name: "Rajesh Kumar",
      role: "Grandfather",
      location: "Delhi, India",
      text: "I can easily share my life stories with my grandchildren. The voice recording feature is perfect for preserving our family history.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      rating: 5
    },
    {
      name: "Anita Patel",
      role: "Family Historian",
      location: "Ahmedabad, Gujarat",
      text: "This app helped me digitize 50 years of family photos and connect them to our family tree. Absolutely incredible!",
      avatar: "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=100&h=100&fit=crop&crop=face",
      rating: 5
    }
  ];

  const stats = [
    {
      number: "50,000+",
      label: "Families",
      icon: Users,
      color: "text-blue-600"
    },
    {
      number: "2M+",
      label: "Memories",
      icon: Heart,
      color: "text-rose-600"
    },
    {
      number: "15+",
      label: "Countries",
      icon: Globe,
      color: "text-emerald-600"
    },
    {
      number: "4.9★",
      label: "Rating",
      icon: Star,
      color: "text-amber-600"
    }
  ];

  const howItWorks = [
    {
      step: "01",
      title: "Create Your Vault",
      description: "Set up your private family memory space in under 2 minutes",
      icon: Shield,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      step: "02",
      title: "Add Family Members",
      description: "Build your family tree and invite loved ones to join",
      icon: Users,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50"
    },
    {
      step: "03",
      title: "Preserve Memories",
      description: "Upload photos, record voices, and write family stories",
      icon: Camera,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      step: "04",
      title: "Share & Connect",
      description: "Your family can access and contribute to the shared vault",
      icon: Heart,
      color: "text-rose-600",
      bgColor: "bg-rose-50"
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background with subtle pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-50 via-rose-50 to-amber-50">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%236A0572" fill-opacity="0.03"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
          <div className="text-center space-y-12">
            {/* Main headline */}
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 border border-violet-200">
                <Sparkles className="w-4 h-4 text-violet-600" />
                <span className="text-sm font-medium text-violet-700">Trusted by 50,000+ families worldwide</span>
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
                Your Family's
                <span className="block bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Sacred Digital
                </span>
                <span className="block">Memory Vault</span>
              </h1>
              
              <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Preserve precious moments, stories, and wisdom for generations. 
                A private space where your family's heritage lives forever.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                onClick={onGetStarted}
                size="lg"
                className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Heart className="w-5 h-5 mr-2" />
                Start Your Family Vault - Free
              </Button>
              
              <Button
                onClick={onSignIn}
                variant="outline"
                size="lg"
                className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300"
              >
                Sign In
              </Button>
            </div>

            {/* Hero features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {heroFeatures.map((feature, index) => {
                const FeatureIcon = feature.icon;
                return (
                  <div
                    key={index}
                    className={`${feature.bgColor} ${feature.borderColor} border rounded-2xl p-6 text-center transition-all duration-300 hover:shadow-lg`}
                  >
                    <div className="w-12 h-12 mx-auto mb-4 bg-white rounded-xl flex items-center justify-center shadow-sm">
                      <FeatureIcon className={`w-6 h-6 ${feature.color}`} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const StatIcon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center">
                      <StatIcon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Core Features Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900">
              Everything Your Family Needs
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Powerful features designed to preserve, organize, and share your most precious family moments
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreFeatures.map((feature, index) => {
              const FeatureIcon = feature.icon;
              return (
                <Card
                  key={index}
                  className={`${feature.bgColor} ${feature.borderColor} border-2 hover:shadow-xl transition-all duration-300 cursor-pointer group`}
                  onClick={onGetStarted}
                >
                  <CardContent className="p-8 text-center space-y-6">
                    <div className={`w-16 h-16 mx-auto bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <FeatureIcon className="w-8 h-8 text-white" />
                    </div>
                    
                    <div className="space-y-3">
                      <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      className={`${feature.borderColor} ${feature.textColor} hover:bg-white group-hover:scale-105 transition-all duration-300`}
                    >
                      Learn More
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get started in minutes and begin preserving your family legacy today
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((step, index) => {
              const StepIcon = step.icon;
              return (
                <div key={index} className="text-center space-y-6">
                  <div className="relative">
                    <div className={`w-20 h-20 mx-auto ${step.bgColor} rounded-2xl flex items-center justify-center shadow-lg`}>
                      <StepIcon className={`w-10 h-10 ${step.color}`} />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-violet-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {step.step}
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-gray-900">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{step.description}</p>
                  </div>

                  {index < howItWorks.length - 1 && (
                    <div className="hidden lg:block absolute top-10 left-full w-full">
                      <ArrowRight className="w-6 h-6 text-gray-300 mx-auto" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="py-24 bg-gradient-to-br from-violet-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900">
              See Your Family Tree Come to Life
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Watch how memories connect across generations in your interactive family tree
            </p>
          </div>

          <Card className="bg-white/80 backdrop-blur-sm border-2 border-violet-200 shadow-2xl rounded-3xl overflow-hidden">
            <CardContent className="p-12">
              <div className="relative">
                {/* Family tree visualization */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
                  {/* Grandparents */}
                  <div className="text-center space-y-4">
                    <div className="flex justify-center space-x-4">
                      <div className="relative group cursor-pointer">
                        <Avatar className="w-16 h-16 border-4 border-amber-200 hover:border-amber-400 transition-all duration-300 group-hover:scale-110">
                          <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" />
                          <AvatarFallback>GF</AvatarFallback>
                        </Avatar>
                        <Badge className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-amber-500 text-white text-xs">
                          23 memories
                        </Badge>
                      </div>
                      <div className="relative group cursor-pointer">
                        <Avatar className="w-16 h-16 border-4 border-amber-200 hover:border-amber-400 transition-all duration-300 group-hover:scale-110">
                          <AvatarImage src="https://images.unsplash.com/photo-1554151228-14d9def656e4?w=100&h=100&fit=crop&crop=face" />
                          <AvatarFallback>GM</AvatarFallback>
                        </Avatar>
                        <Badge className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-amber-500 text-white text-xs">
                          31 memories
                        </Badge>
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Grandparents</p>
                      <p className="text-sm text-gray-600">54 total memories</p>
                    </div>
                  </div>

                  {/* Connection lines */}
                  <div className="hidden md:flex justify-center">
                    <div className="w-full h-px bg-gradient-to-r from-amber-300 via-violet-300 to-emerald-300"></div>
                  </div>

                  {/* Parents */}
                  <div className="text-center space-y-4">
                    <div className="flex justify-center space-x-4">
                      <div className="relative group cursor-pointer">
                        <Avatar className="w-16 h-16 border-4 border-violet-200 hover:border-violet-400 transition-all duration-300 group-hover:scale-110">
                          <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" />
                          <AvatarFallback>F</AvatarFallback>
                        </Avatar>
                        <Badge className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-violet-500 text-white text-xs">
                          42 memories
                        </Badge>
                      </div>
                      <div className="relative group cursor-pointer">
                        <Avatar className="w-16 h-16 border-4 border-violet-200 hover:border-violet-400 transition-all duration-300 group-hover:scale-110">
                          <AvatarImage src="https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=100&h=100&fit=crop&crop=face" />
                          <AvatarFallback>M</AvatarFallback>
                        </Avatar>
                        <Badge className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-violet-500 text-white text-xs">
                          38 memories
                        </Badge>
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Parents</p>
                      <p className="text-sm text-gray-600">80 total memories</p>
                    </div>
                  </div>
                </div>

                {/* Vertical connection */}
                <div className="flex justify-center my-8">
                  <div className="w-px h-12 bg-gradient-to-b from-violet-300 to-emerald-300"></div>
                </div>

                {/* Children */}
                <div className="text-center space-y-4">
                  <div className="flex justify-center space-x-4">
                    <div className="relative group cursor-pointer">
                      <Avatar className="w-16 h-16 border-4 border-emerald-200 hover:border-emerald-400 transition-all duration-300 group-hover:scale-110">
                        <AvatarImage src="https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=100&h=100&fit=crop&crop=face" />
                        <AvatarFallback>C1</AvatarFallback>
                      </Avatar>
                      <Badge className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-emerald-500 text-white text-xs">
                        15 memories
                      </Badge>
                      {/* Time capsule indicator */}
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                        <Clock className="w-3 h-3 text-white" />
                      </div>
                    </div>
                    <div className="relative group cursor-pointer">
                      <Avatar className="w-16 h-16 border-4 border-emerald-200 hover:border-emerald-400 transition-all duration-300 group-hover:scale-110">
                        <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" />
                        <AvatarFallback>C2</AvatarFallback>
                      </Avatar>
                      <Badge className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-emerald-500 text-white text-xs">
                        12 memories
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Children</p>
                    <p className="text-sm text-gray-600">27 total memories</p>
                  </div>
                </div>

                {/* Total count */}
                <div className="text-center mt-12 space-y-4">
                  <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-violet-100 to-purple-100 rounded-full px-6 py-3">
                    <Heart className="w-5 h-5 text-violet-600" />
                    <span className="text-lg font-semibold text-violet-700">161 precious family memories preserved</span>
                  </div>
                  
                  <Button
                    onClick={onGetStarted}
                    className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Start Building Your Tree
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900">
              Loved by Families Everywhere
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real stories from families who trust us with their most precious memories
            </p>
          </div>

          <Card className="bg-gradient-to-br from-violet-50 to-purple-50 border-2 border-violet-200 shadow-xl rounded-3xl">
            <CardContent className="p-12 text-center space-y-8">
              <div className="flex justify-center">
                <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
                  <AvatarImage src={testimonials[currentTestimonial].avatar} />
                  <AvatarFallback>
                    {testimonials[currentTestimonial].name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </div>

              <div className="space-y-4">
                <div className="flex justify-center space-x-1">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                
                <blockquote className="text-2xl font-medium text-gray-900 italic max-w-4xl mx-auto leading-relaxed">
                  "{testimonials[currentTestimonial].text}"
                </blockquote>
              </div>

              <div className="space-y-2">
                <p className="text-xl font-semibold text-gray-900">
                  {testimonials[currentTestimonial].name}
                </p>
                <p className="text-gray-600">
                  {testimonials[currentTestimonial].role} • {testimonials[currentTestimonial].location}
                </p>
              </div>

              <div className="flex justify-center space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentTestimonial
                        ? "bg-violet-600 scale-125"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>

              <Button
                onClick={nextTestimonial}
                variant="outline"
                className="border-violet-300 text-violet-700 hover:bg-violet-50"
              >
                Next Story
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-gradient-to-br from-violet-600 via-purple-600 to-pink-600 text-white relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          <div className="space-y-6">
            <h2 className="text-5xl sm:text-6xl font-bold leading-tight">
              Start Your Family Legacy Today
            </h2>
            <p className="text-xl sm:text-2xl text-violet-100 max-w-4xl mx-auto leading-relaxed">
              Join thousands of families who are preserving their precious memories for future generations. 
              Your family's story deserves to be remembered forever.
            </p>
          </div>

          <div className="space-y-8">
            <Button
              onClick={onGetStarted}
              size="lg"
              className="bg-white text-violet-600 hover:bg-gray-50 px-12 py-6 text-xl font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
            >
              <Heart className="w-6 h-6 mr-3" />
              Create Your Family Vault - Free Forever
            </Button>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="space-y-3">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold">100% Private</h3>
                <p className="text-violet-100">Your memories, your family only</p>
              </div>
              
              <div className="space-y-3">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold">Setup in 2 Minutes</h3>
                <p className="text-violet-100">Start preserving memories instantly</p>
              </div>
              
              <div className="space-y-3">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold">For All Generations</h3>
                <p className="text-violet-100">From grandparents to grandchildren</p>
              </div>
            </div>
          </div>

          {/* Trust indicators */}
          <div className="border-t border-white/20 pt-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold mb-2">256-bit</div>
                <div className="text-violet-200">Encryption</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">99.9%</div>
                <div className="text-violet-200">Uptime</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">24/7</div>
                <div className="text-violet-200">Support</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">GDPR</div>
                <div className="text-violet-200">Compliant</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Heart className="w-8 h-8 text-violet-400" />
                <span className="text-xl font-bold">Memory Vault</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Preserving family memories for generations. Your sacred digital space for precious moments.
              </p>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Product</h4>
              <div className="space-y-2 text-gray-400">
                <div>Features</div>
                <div>Pricing</div>
                <div>Security</div>
                <div>Mobile App</div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Support</h4>
              <div className="space-y-2 text-gray-400">
                <div>Help Center</div>
                <div>Contact Us</div>
                <div>Privacy Policy</div>
                <div>Terms of Service</div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Connect</h4>
              <div className="space-y-2 text-gray-400">
                <div>WhatsApp Support</div>
                <div>Email Updates</div>
                <div>Community</div>
                <div>Blog</div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Memory Vault. Made with ❤️ for families everywhere.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}