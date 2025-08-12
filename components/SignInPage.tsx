import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Heart, Phone, Mail, ArrowLeft, Home } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface SignInPageProps {
  onSignIn: () => void;
  onBack?: () => void;
}

export function SignInPage({ onSignIn, onBack }: SignInPageProps) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);

  const handlePhoneLogin = () => {
    if (phoneNumber.length >= 10) {
      setShowOtpInput(true);
    }
  };

  const handleOtpVerify = () => {
    if (otp.length === 6) {
      onSignIn();
    }
  };

  const handleEmailLogin = () => {
    if (email && password) {
      onSignIn();
    }
  };

  return (
    <div className="min-h-screen bg-background vibrant-texture flex flex-col items-center justify-center p-4 relative">
      {/* Back to Home Button */}
      {onBack && (
        <div className="absolute top-6 left-6 z-20">
          <Button
            onClick={onBack}
            variant="outline"
            className="flex items-center space-x-2 bg-white/90 backdrop-blur-sm border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground shadow-lg memory-card-hover"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Button>
        </div>
      )}

      {/* Alternative Home Icon Button for Mobile */}
      {onBack && (
        <div className="absolute top-6 right-6 z-20 sm:hidden">
          <Button
            onClick={onBack}
            variant="outline"
            size="sm"
            className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground shadow-lg memory-card-hover p-0"
          >
            <Home className="w-5 h-5" />
          </Button>
        </div>
      )}

      {/* Background Image */}
      <div className="absolute inset-0 opacity-20">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=1200&fit=crop&crop=center"
          alt="Family memories background"
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Content */}
      <div className="relative z-10 w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 fade-in-section">
          <div className="flex justify-center">
            <div className="p-4 bg-gradient-to-br from-primary/20 to-coral/20 rounded-full rotating-gradient shadow-lg">
              <Heart className="w-12 h-12 text-primary icon-sparkle" />
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="text-4xl text-primary">Family Memory Vault</h1>
            <p className="text-xl text-muted-foreground">
              A sacred space for your precious memories
            </p>
          </div>
        </div>

        {/* Sign In Card */}
        <Card className="memory-card stagger-1">
          <CardHeader className="space-y-2 text-center">
            <CardTitle className="text-2xl text-primary">Welcome Home</CardTitle>
            <CardDescription className="text-lg">
              Sign in to access your family's treasure chest
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <Tabs defaultValue="phone" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2 bg-muted/50">
                <TabsTrigger value="phone" className="text-lg py-3">
                  <Phone className="w-5 h-5 mr-2" />
                  Phone
                </TabsTrigger>
                <TabsTrigger value="email" className="text-lg py-3">
                  <Mail className="w-5 h-5 mr-2" />
                  Email
                </TabsTrigger>
              </TabsList>

              {/* Phone Login */}
              <TabsContent value="phone" className="space-y-6">
                {!showOtpInput ? (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-lg">Mobile Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="Enter your mobile number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="h-14 text-lg bg-white/70 backdrop-blur-sm border-primary/30 focus:border-primary"
                      />
                    </div>
                    <Button
                      onClick={handlePhoneLogin}
                      className="w-full h-14 text-lg vibrant-button text-primary-foreground"
                      disabled={phoneNumber.length < 10}
                    >
                      Send OTP
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="otp" className="text-lg">Enter OTP</Label>
                      <Input
                        id="otp"
                        type="text"
                        placeholder="6-digit code"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        maxLength={6}
                        className="h-14 text-lg text-center tracking-widest bg-white/70 backdrop-blur-sm border-primary/30 focus:border-primary"
                      />
                    </div>
                    <Button
                      onClick={handleOtpVerify}
                      className="w-full h-14 text-lg vibrant-button text-primary-foreground"
                      disabled={otp.length !== 6}
                    >
                      Verify & Sign In
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => setShowOtpInput(false)}
                      className="w-full text-lg text-muted-foreground hover:bg-primary/10"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back to phone number
                    </Button>
                  </div>
                )}
              </TabsContent>

              {/* Email Login */}
              <TabsContent value="email" className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-lg">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-14 text-lg bg-white/70 backdrop-blur-sm border-primary/30 focus:border-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-lg">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-14 text-lg bg-white/70 backdrop-blur-sm border-primary/30 focus:border-primary"
                    />
                  </div>
                  <Button
                    onClick={handleEmailLogin}
                    className="w-full h-14 text-lg vibrant-button text-primary-foreground"
                    disabled={!email || !password}
                  >
                    Sign In
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-muted-foreground stagger-2">
          <p className="text-lg">
            Your memories are safe and sacred with us
          </p>
        </div>

        {/* Additional Navigation Help */}
        {onBack && (
          <div className="text-center stagger-3">
            <Button
              onClick={onBack}
              variant="ghost"
              className="text-primary hover:bg-primary/10 flex items-center space-x-2 mx-auto"
            >
              <Home className="w-4 h-4" />
              <span>Return to Landing Page</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}