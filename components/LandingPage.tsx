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
  const [currentTestimonial, setCurrentTestimonial] =
    useState(0);

  const benefits = [
    {
      icon: Shield,
      title: "Sacred & Private",
      description:
        "Your memories are safe in a secure, invite-only vault — away from social media noise and unwanted exposure.",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      icon: Heart,
      title: "Simple for Everyone",
      description:
        "From grandparents to grandchildren — an experience designed to feel natural for all ages.",
      color: "text-coral",
      bgColor: "bg-coral/10",
    },
    {
      icon: Smartphone,
      title: "Download Anytime, Anywhere",
      description:
        "Your memories are always yours — export and keep them safely, no matter where life takes you.",
      color: "text-violet",
      bgColor: "bg-violet/10",
    },
    {
      icon: Mic,
      title: "Voices That Never Fade",
      description:
        "Preserve the voices, blessings, and stories of loved ones forever — as if they were spoken just yesterday.",
      color: "text-aqua",
      bgColor: "bg-aqua/10",
    },
    {
      icon: Share,
      title: "Share Moments Your Way",
      description:
        "You decide who sees each memory — private by default, but share special moments instantly to WhatsApp or social media when you wish.",
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
    {
      icon: TreePine,
      title: "Your Story, Beautifully Woven",
      description:
        "Every photo, video, and voice note connects into your family tree, creating a living story for generations.",
      color: "text-ink",
      bgColor: "bg-ink/10",
    },
  ];

  const testimonials = [
    {
      name: "Sita Devi",
      age: "78 years",
      relation: "Grandmother",
      text: "Finally, a place where I can share my stories with my grandchildren. They live so far away, but now they hear my voice every day.",
      avatar:
        "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=100&h=100&fit=crop&crop=face",
      location: "Jaipur, Rajasthan",
    },
    {
      name: "Priya Sharma",
      age: "45 years",
      relation: "Mother",
      text: "I can finally organize our family recipes and traditions in one place. My daughter will never lose our family heritage.",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=100&h=100&fit=crop&crop=face",
      location: "Mumbai, Maharashtra",
    },
    {
      name: "Rahul Gupta",
      age: "32 years",
      relation: "Son",
      text: "This app helped me record my father's last conversations. Now my children will know their grandfather through his own words.",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      location: "Bangalore, Karnataka",
    },
  ];

  const stats = [
    {
      number: "50,000+",
      label: "Families Connected",
      icon: Users,
      color: "text-aqua",
    },
    {
      number: "2M+",
      label: "Memories Preserved",
      icon: Heart,
      color: "text-coral",
    },
    {
      number: "15+",
      label: "Countries",
      icon: TreePine,
      color: "text-primary",
    },
    {
      number: "4.9★",
      label: "App Rating",
      icon: Star,
      color: "text-secondary",
    },
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial(
      (prev) => (prev + 1) % testimonials.length,
    );
  };

  return (
    <div className="min-h-screen bg-background vibrant-texture">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-coral/5 to-aqua/10 pt-16 pb-20">
        <div className="absolute inset-0 opacity-20">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=600&fit=crop&crop=center"
            alt="Family together"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-10 px-4 text-center space-y-8">
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="p-4 bg-primary/20 rounded-full hero-float">
                <Heart className="w-16 h-16 text-primary" />
              </div>
            </div>
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl text-primary max-w-4xl mx-auto">
                Your Family's Sacred Digital Memory Vault
              </h1>
              <p className="text-2xl text-muted-foreground max-w-3xl mx-auto">
                Preserve precious moments, stories, and wisdom
                for generations. A private space where your
                family's heritage lives forever.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={onGetStarted}
              className="vibrant-button text-primary-foreground text-xl px-8 py-4 h-auto"
            >
              <Sparkles className="w-6 h-6 mr-2" />
              Start Your Family Vault - Free
            </Button>
            <Button
              onClick={onSignIn}
              variant="outline"
              className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground text-xl px-8 py-4 h-auto"
            >
              Already Have an Account? Sign In
            </Button>
          </div>

          <div className="flex items-center justify-center space-x-6 pt-8 flex-wrap gap-y-4">
            <div className="text-center">
              <p className="text-3xl font-semibold text-primary">
                Free Starter
              </p>
              <p className="text-muted-foreground">Access</p>
            </div>
            <div className="w-px h-12 bg-border hidden sm:block"></div>
            <div className="text-center">
              <p className="text-3xl font-semibold text-coral">
                Private
              </p>
              <p className="text-muted-foreground">& Secure</p>
            </div>
            <div className="w-px h-12 bg-border hidden sm:block"></div>
            <div className="text-center">
              <p className="text-3xl font-semibold text-aqua">
                Elder
              </p>
              <p className="text-muted-foreground">Friendly</p>
            </div>
            <div className="w-px h-12 bg-border hidden sm:block"></div>
            <div className="text-center">
              <p className="text-3xl font-semibold text-violet">
                Download
              </p>
              <p className="text-muted-foreground">
                Anytime, Anywhere
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Strip - Quick Highlights */}
      <section className="py-16 px-4 bg-gradient-to-br from-background to-muted/20">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl text-primary">
              Signature Features That Make Memory Vault Special
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Built for Families, Designed for Generations
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Elders' Voices Feature */}
            <Card
              className="memory-card hover:scale-105 transition-all duration-300 rounded-2xl overflow-hidden bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200 cursor-pointer"
              onClick={onGetStarted}
            >
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center">
                  <Mic className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-primary mb-2">
                    🎙 Elders' Voices
                  </h3>
                  <p className="text-lg text-amber-700 mb-3">
                    Hear blessings anytime
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Record voice messages from elders. Their
                    blessings and stories live forever.
                  </p>
                </div>
                <div className="bg-amber-100 rounded-lg p-3">
                  <p className="text-xs text-amber-800 italic">
                    "Papa's advice" • "Nani's lullabies"
                  </p>
                </div>
                <Button
                  onClick={onGetStarted}
                  variant="outline"
                  size="sm"
                  className="border-amber-400 text-amber-700 hover:bg-amber-400 hover:text-white"
                >
                  Start Recording
                </Button>
              </CardContent>
            </Card>

            {/* Family Tree Feature */}
            <Card
              className="memory-card hover:scale-105 transition-all duration-300 rounded-2xl overflow-hidden bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200 cursor-pointer"
              onClick={onGetStarted}
            >
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center">
                  <TreePine className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-primary mb-2">
                    🌳 Family Tree
                  </h3>
                  <p className="text-lg text-emerald-700 mb-3">
                    Your family, beautifully connected
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Interactive family tree with memories
                    attached to each person.
                  </p>
                </div>
                <div className="bg-emerald-100 rounded-lg p-3">
                  <p className="text-xs text-emerald-800 italic">
                    "Grandpa's wedding photos" • "Dad's stories"
                  </p>
                </div>
                <Button
                  onClick={onGetStarted}
                  variant="outline"
                  size="sm"
                  className="border-emerald-400 text-emerald-700 hover:bg-emerald-400 hover:text-white"
                >
                  Build Tree
                </Button>
              </CardContent>
            </Card>

            {/* Time Capsule Feature */}
            <Card
              className="memory-card hover:scale-105 transition-all duration-300 rounded-2xl overflow-hidden bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 cursor-pointer"
              onClick={onGetStarted}
            >
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-primary mb-2">
                    🕰 Time Capsule
                  </h3>
                  <p className="text-lg text-purple-700 mb-3">
                    Unlock surprises on special dates
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Schedule messages to unlock on birthdays and
                    anniversaries.
                  </p>
                </div>
                <div className="bg-purple-100 rounded-lg p-3">
                  <p className="text-xs text-purple-800 italic">
                    "Dad's 18th birthday message" • "Anniversary
                    surprise"
                  </p>
                </div>
                <Button
                  onClick={onGetStarted}
                  variant="outline"
                  size="sm"
                  className="border-purple-400 text-purple-700 hover:bg-purple-400 hover:text-white"
                >
                  Create Capsule
                </Button>
              </CardContent>
            </Card>

            {/* Cultural Heritage Hub Feature */}
            <Card
              className="memory-card hover:scale-105 transition-all duration-300 rounded-2xl overflow-hidden bg-gradient-to-br from-red-50 to-orange-50 border-red-200 cursor-pointer"
              onClick={onGetStarted}
            >
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-red-600 to-orange-600 rounded-2xl flex items-center justify-center">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-primary mb-2">
                    🌏 Cultural Heritage Hub
                  </h3>
                  <p className="text-lg text-red-700 mb-3">
                    Preserve traditions, pass them on
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Organize family traditions, cultural
                    rituals, and festivals in one place.
                  </p>
                </div>
                <div className="bg-red-100 rounded-lg p-3">
                  <p className="text-xs text-red-800 italic">
                    "Diwali recipes" • "Christmas traditions"
                  </p>
                </div>
                <Button
                  onClick={onGetStarted}
                  variant="outline"
                  size="sm"
                  className="border-red-400 text-red-700 hover:bg-red-400 hover:text-white"
                >
                  Start Heritage
                </Button>
              </CardContent>
            </Card>

            {/* Festival & Milestone Reminders Feature */}
            <Card
              className="memory-card hover:scale-105 transition-all duration-300 rounded-2xl overflow-hidden bg-gradient-to-br from-cyan-50 to-blue-50 border-cyan-200 cursor-pointer"
              onClick={onGetStarted}
            >
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center">
                  <Gift className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-primary mb-2">
                    🎉 Festival & Milestone Reminders
                  </h3>
                  <p className="text-lg text-cyan-700 mb-3">
                    Never miss a family moment
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Track birthdays, anniversaries, and
                    festivals with smart reminders.
                  </p>
                </div>
                <div className="bg-cyan-100 rounded-lg p-3">
                  <p className="text-xs text-cyan-800 italic">
                    "Papa's birthday" • "Diwali celebration"
                  </p>
                </div>
                <Button
                  onClick={onGetStarted}
                  variant="outline"
                  size="sm"
                  className="border-cyan-400 text-cyan-700 hover:bg-cyan-400 hover:text-white"
                >
                  Set Reminders
                </Button>
              </CardContent>
            </Card>

            {/* Memory Journeys Feature */}
            <Card
              className="memory-card hover:scale-105 transition-all duration-300 rounded-2xl overflow-hidden bg-gradient-to-br from-rose-50 to-pink-50 border-rose-200 cursor-pointer"
              onClick={onGetStarted}
            >
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-rose-500 to-pink-500 rounded-2xl flex items-center justify-center">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-primary mb-2">
                    📖 Memory Journeys
                  </h3>
                  <p className="text-lg text-rose-700 mb-3">
                    Stories told over time
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Create timeline stories combining memories
                    across years into journeys.
                  </p>
                </div>
                <div className="bg-rose-100 rounded-lg p-3">
                  <p className="text-xs text-rose-800 italic">
                    "Aarav's childhood" • "Our Diwali years"
                  </p>
                </div>
                <Button
                  onClick={onGetStarted}
                  variant="outline"
                  size="sm"
                  className="border-rose-400 text-rose-700 hover:bg-rose-400 hover:text-white"
                >
                  Create Journey
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Call to Action under feature strip */}
          <div className="text-center pt-8">
            <Button
              onClick={onGetStarted}
              className="vibrant-button text-primary-foreground text-xl px-8 py-4 h-auto"
            >
              <Sparkles className="w-6 h-6 mr-2" />
              Try All Features Free
            </Button>
          </div>
        </div>
      </section>

      {/* Interactive Family Tree Preview */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto text-center space-y-12">
          <div className="space-y-4">
            <h2 className="text-4xl text-primary">
              See Your Family Tree Come to Life
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Watch how your family connections grow and
              memories multiply across generations
            </p>
          </div>

          <Card className="memory-card p-8 bg-gradient-to-br from-cream to-background relative overflow-hidden">
            {/* Animated connecting lines */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{ zIndex: 1 }}
            >
              <defs>
                <linearGradient
                  id="lineGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop
                    offset="0%"
                    stopColor="rgba(106, 5, 114, 0.3)"
                  />
                  <stop
                    offset="100%"
                    stopColor="rgba(23, 190, 187, 0.3)"
                  />
                </linearGradient>
              </defs>
              {/* Connection lines that animate */}
              <path
                d="M 200 120 L 400 120"
                stroke="url(#lineGradient)"
                strokeWidth="2"
                className="animate-pulse"
              />
              <path
                d="M 400 120 L 600 120"
                stroke="url(#lineGradient)"
                strokeWidth="2"
                className="animate-pulse"
                style={{ animationDelay: "0.5s" }}
              />
              <path
                d="M 400 120 L 400 200"
                stroke="url(#lineGradient)"
                strokeWidth="2"
                className="animate-pulse"
                style={{ animationDelay: "1s" }}
              />
            </svg>

            <div className="relative z-10 space-y-8">
              <div className="grid grid-cols-3 gap-8 items-center">
                {/* Grandparents */}
                <div className="text-center space-y-3">
                  <div className="flex justify-center space-x-4">
                    <div
                      className="relative group cursor-pointer transform hover:scale-110 transition-all duration-300"
                      onClick={() => {
                        const popup =
                          document.getElementById(
                            "grandpa-popup",
                          );
                        if (popup)
                          popup.classList.toggle("hidden");
                      }}
                    >
                      <Avatar className="w-16 h-16 border-4 border-primary/30 hover:border-primary transition-all">
                        <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" />
                        <AvatarFallback>GF</AvatarFallback>
                      </Avatar>
                      <Badge className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground text-xs">
                        23
                      </Badge>

                      {/* Interactive popup */}
                      <div
                        id="grandpa-popup"
                        className="hidden absolute -top-40 left-1/2 transform -translate-x-1/2 z-50"
                      >
                        <Card className="memory-card w-64 p-4 shadow-xl">
                          <div className="space-y-3">
                            <div className="flex items-center space-x-2">
                              <Camera className="w-4 h-4 text-primary" />
                              <span className="text-sm font-medium">
                                Wedding Photo, 1960
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Mic className="w-4 h-4 text-coral" />
                              <div className="flex-1 bg-coral/10 rounded-full h-2">
                                <div className="bg-coral h-2 rounded-full w-3/4 animate-pulse"></div>
                              </div>
                              <PlayCircle className="w-4 h-4 text-coral cursor-pointer" />
                            </div>
                            <div className="bg-purple-100 rounded p-2">
                              <div className="flex items-center space-x-1">
                                <Clock className="w-3 h-3 text-purple-600" />
                                <span className="text-xs text-purple-600">
                                  Unlock on Miraya's 18th
                                  Birthday
                                </span>
                              </div>
                            </div>
                          </div>
                        </Card>
                      </div>
                    </div>

                    <div
                      className="relative group cursor-pointer transform hover:scale-110 transition-all duration-300"
                      onClick={() => {
                        const popup =
                          document.getElementById(
                            "grandma-popup",
                          );
                        if (popup)
                          popup.classList.toggle("hidden");
                      }}
                    >
                      <Avatar className="w-16 h-16 border-4 border-primary/30 hover:border-primary transition-all">
                        <AvatarImage src="https://images.unsplash.com/photo-1554151228-14d9def656e4?w=100&h=100&fit=crop&crop=face" />
                        <AvatarFallback>GM</AvatarFallback>
                      </Avatar>
                      <Badge className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground text-xs">
                        31
                      </Badge>

                      {/* Interactive popup */}
                      <div
                        id="grandma-popup"
                        className="hidden absolute -top-32 left-1/2 transform -translate-x-1/2 z-50"
                      >
                        <Card className="memory-card w-56 p-4 shadow-xl">
                          <div className="space-y-3">
                            <div className="flex items-center space-x-2">
                              <Mic className="w-4 h-4 text-aqua" />
                              <span className="text-sm font-medium">
                                Family Recipe Story
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="flex-1 bg-aqua/10 rounded-full h-2">
                                <div className="bg-aqua h-2 rounded-full w-1/2"></div>
                              </div>
                              <span className="text-xs text-muted-foreground">
                                2:34
                              </span>
                            </div>
                          </div>
                        </Card>
                      </div>
                    </div>
                  </div>
                  <p className="text-primary font-medium">
                    Grandparents
                  </p>
                  <p className="text-sm text-muted-foreground">
                    54 memories
                  </p>
                </div>

                {/* Connection Lines */}
                <div className="flex justify-center">
                  <div className="w-full h-px bg-gradient-to-r from-primary/30 via-coral/50 to-aqua/30 animate-pulse"></div>
                </div>

                {/* Parents */}
                <div className="text-center space-y-3">
                  <div className="flex justify-center space-x-4">
                    <div
                      className="relative group cursor-pointer transform hover:scale-110 transition-all duration-300"
                      onClick={() => {
                        const popup =
                          document.getElementById(
                            "father-popup",
                          );
                        if (popup)
                          popup.classList.toggle("hidden");
                      }}
                    >
                      <Avatar className="w-16 h-16 border-4 border-coral/30 hover:border-coral transition-all">
                        <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" />
                        <AvatarFallback>F</AvatarFallback>
                      </Avatar>
                      <Badge className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-coral text-white text-xs">
                        42
                      </Badge>

                      {/* Interactive popup */}
                      <div
                        id="father-popup"
                        className="hidden absolute -top-36 left-1/2 transform -translate-x-1/2 z-50"
                      >
                        <Card className="memory-card w-60 p-4 shadow-xl">
                          <div className="space-y-3">
                            <div className="flex items-center space-x-2">
                              <Video className="w-4 h-4 text-coral" />
                              <span className="text-sm font-medium">
                                Career Journey
                              </span>
                            </div>
                            <ImageWithFallback
                              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=120&fit=crop&crop=face"
                              alt="Career moment"
                              className="w-full h-20 object-cover rounded"
                            />
                            <p className="text-xs text-muted-foreground">
                              From engineer to entrepreneur
                            </p>
                          </div>
                        </Card>
                      </div>
                    </div>

                    <div
                      className="relative group cursor-pointer transform hover:scale-110 transition-all duration-300"
                      onClick={() => {
                        const popup =
                          document.getElementById(
                            "mother-popup",
                          );
                        if (popup)
                          popup.classList.toggle("hidden");
                      }}
                    >
                      <Avatar className="w-16 h-16 border-4 border-coral/30 hover:border-coral transition-all">
                        <AvatarImage src="https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=100&h=100&fit=crop&crop=face" />
                        <AvatarFallback>M</AvatarFallback>
                      </Avatar>
                      <Badge className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-coral text-white text-xs">
                        38
                      </Badge>
                    </div>
                  </div>
                  <p className="text-coral font-medium">
                    Parents
                  </p>
                  <p className="text-sm text-muted-foreground">
                    80 memories
                  </p>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="w-px h-8 bg-gradient-to-b from-coral/30 to-aqua/30 animate-pulse"></div>
              </div>

              {/* Children */}
              <div className="text-center space-y-3">
                <div className="flex justify-center space-x-4">
                  <div
                    className="relative group cursor-pointer transform hover:scale-110 transition-all duration-300"
                    onClick={() => {
                      const popup =
                        document.getElementById("child1-popup");
                      if (popup)
                        popup.classList.toggle("hidden");
                    }}
                  >
                    <Avatar className="w-16 h-16 border-4 border-aqua/30 hover:border-aqua transition-all">
                      <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" />
                      <AvatarFallback>S</AvatarFallback>
                    </Avatar>
                    <Badge className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-aqua text-white text-xs">
                      15
                    </Badge>

                    {/* Time Capsule indicator */}
                    <div className="absolute -top-2 -right-2">
                      <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center animate-pulse">
                        <Clock className="w-3 h-3 text-white" />
                      </div>
                    </div>

                    {/* Interactive popup */}
                    <div
                      id="child1-popup"
                      className="hidden absolute -top-32 left-1/2 transform -translate-x-1/2 z-50"
                    >
                      <Card className="memory-card w-56 p-4 shadow-xl">
                        <div className="space-y-3">
                          <div className="bg-purple-100 rounded p-2">
                            <div className="flex items-center space-x-1">
                              <Clock className="w-3 h-3 text-purple-600" />
                              <span className="text-xs text-purple-600">
                                3 Time Capsules scheduled
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Camera className="w-4 h-4 text-aqua" />
                            <span className="text-sm font-medium">
                              School memories
                            </span>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </div>

                  <div className="relative group cursor-pointer transform hover:scale-110 transition-all duration-300">
                    <Avatar className="w-16 h-16 border-4 border-aqua/30 hover:border-aqua transition-all">
                      <AvatarImage src="https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=100&h=100&fit=crop&crop=face" />
                      <AvatarFallback>D</AvatarFallback>
                    </Avatar>
                    <Badge className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-aqua text-white text-xs">
                      12
                    </Badge>
                  </div>
                </div>
                <p className="text-aqua font-medium">
                  Children
                </p>
                <p className="text-sm text-muted-foreground">
                  27 memories
                </p>
              </div>

              <div className="text-center space-y-4">
                <p className="text-xl text-primary">
                  Total: 161 precious family memories preserved
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={onGetStarted}
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Start Building Your Tree
                  </Button>
                  <p className="text-sm text-muted-foreground self-center">
                    👆 Click on any family member above to see
                    how memories connect
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-16 px-4 bg-gradient-to-br from-muted/30 to-background">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl text-primary">
              Our Promise to Families
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Because your memories deserve more than storage —
              they deserve care, privacy, and preservation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const BenefitIcon = benefit.icon;
              return (
                <Card
                  key={index}
                  className="memory-card hover:shadow-lg transition-all duration-300"
                >
                  <CardContent className="p-6 space-y-4">
                    <div
                      className={`p-4 ${benefit.bgColor} rounded-full w-fit`}
                    >
                      <BenefitIcon
                        className={`w-8 h-8 ${benefit.color}`}
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-medium text-primary mb-2">
                        {benefit.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {benefit.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const StatIcon = stat.icon;
              return (
                <Card
                  key={index}
                  className="memory-card text-center p-6"
                >
                  <div className="space-y-3">
                    <StatIcon
                      className={`w-8 h-8 mx-auto ${stat.color}`}
                    />
                    <div>
                      <p
                        className={`text-3xl font-semibold ${stat.color}`}
                      >
                        {stat.number}
                      </p>
                      <p className="text-muted-foreground">
                        {stat.label}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 bg-gradient-to-br from-coral/10 to-primary/5">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <div className="space-y-4">
            <h2 className="text-4xl text-primary">
              Loved & Trusted by Families Across Generations
            </h2>
            <p className="text-xl text-muted-foreground">
              Real stories from the people who trust us with
              their most precious memories
            </p>
          </div>

          <Card className="memory-card p-8">
            <div className="space-y-6">
              <div className="flex justify-center">
                <Avatar className="w-20 h-20 border-4 border-primary/20">
                  <AvatarImage
                    src={
                      testimonials[currentTestimonial].avatar
                    }
                  />
                  <AvatarFallback>
                    {testimonials[
                      currentTestimonial
                    ].name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </div>

              <blockquote className="text-2xl text-primary italic max-w-3xl mx-auto">
                "{testimonials[currentTestimonial].text}"
              </blockquote>

              <div className="text-center">
                <p className="text-xl font-medium text-primary">
                  {testimonials[currentTestimonial].name}
                </p>
                <p className="text-lg text-muted-foreground">
                  {testimonials[currentTestimonial].age} •{" "}
                  {testimonials[currentTestimonial].relation}
                </p>
                <p className="text-muted-foreground">
                  {testimonials[currentTestimonial].location}
                </p>
              </div>

              <div className="flex justify-center space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentTestimonial
                        ? "bg-primary"
                        : "bg-muted-foreground/30"
                    }`}
                  />
                ))}
              </div>

              <Button
                onClick={nextTestimonial}
                variant="ghost"
                className="text-primary hover:bg-primary/10"
              >
                Next Story{" "}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary/10 to-aqua/10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-5xl text-primary">
              Start Your Family Legacy Today
            </h2>
            <p className="text-2xl text-muted-foreground max-w-3xl mx-auto">
              Join thousands of families who are preserving
              their precious memories for future generations
            </p>
          </div>

          <div className="space-y-6">
            <Button
              onClick={onGetStarted}
              className="vibrant-button text-primary-foreground text-2xl px-12 py-6 h-auto"
            >
              <Heart className="w-8 h-8 mr-3" />
              Create Your Family Vault - It's Free Forever
            </Button>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto text-center">
              <div className="space-y-2">
                <Shield className="w-8 h-8 text-primary mx-auto" />
                <p className="text-lg font-medium text-primary">
                  100% Private
                </p>
                <p className="text-muted-foreground">
                  Your memories, your family only
                </p>
              </div>
              <div className="space-y-2">
                <Clock className="w-8 h-8 text-coral mx-auto" />
                <p className="text-lg font-medium text-coral">
                  Setup in 2 Minutes
                </p>
                <p className="text-muted-foreground">
                  Start preserving memories instantly
                </p>
              </div>
              <div className="space-y-2">
                <BookOpen className="w-8 h-8 text-aqua mx-auto" />
                <p className="text-lg font-medium text-aqua">
                  For All Generations
                </p>
                <p className="text-muted-foreground">
                  From grandparents to grandchildren
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}