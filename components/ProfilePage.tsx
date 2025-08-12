import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Switch } from './ui/switch';
import { User, Camera, Heart, Users, Settings, Shield, Bell, HelpCircle, LogOut, Edit3, MapPin, Phone, Mail, Calendar } from 'lucide-react';

export function ProfilePage() {
  const [editMode, setEditMode] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Arjun Chauhan',
    email: 'arjun@email.com',
    phone: '+91 98765 43215',
    location: 'Bangalore, Karnataka',
    bio: 'Preserving our family memories for future generations',
    joinedDate: 'January 2024'
  });

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    pushNotifications: true,
    familyUpdates: true,
    weeklyDigest: false,
    privacyMode: true
  });

  const familyStats = [
    { label: 'My Memories', value: '45', icon: Heart, color: 'text-red-600' },
    { label: 'Family Members', value: '9', icon: Users, color: 'text-blue-600' },
    { label: 'Total Vault Memories', value: '233', icon: Camera, color: 'text-green-600' },
    { label: 'Days Active', value: '186', icon: Calendar, color: 'text-purple-600' }
  ];

  const recentActivity = [
    { action: 'Added photo', item: '"Diwali Celebration 2024"', time: '2 hours ago' },
    { action: 'Recorded voice note', item: '"Childhood Memory"', time: '1 day ago' },
    { action: 'Invited family member', item: 'Cousin Rahul', time: '3 days ago' },
    { action: 'Created story', item: '"Grandma\'s Recipe"', time: '1 week ago' }
  ];

  const handleSaveProfile = () => {
    setEditMode(false);
    // In a real app, save to backend
  };

  const handlePreferenceChange = (key: string, value: boolean) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-background heritage-texture pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary/10 to-secondary/10 px-4 py-8">
        <div className="text-center space-y-4">
          <div className="relative inline-block">
            <Avatar className="w-24 h-24 border-4 border-primary/20">
              <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" />
              <AvatarFallback className="text-2xl">AC</AvatarFallback>
            </Avatar>
            <Button
              size="sm"
              className="absolute bottom-0 right-0 w-8 h-8 rounded-full heritage-button text-primary-foreground p-0"
            >
              <Camera className="w-4 h-4" />
            </Button>
          </div>
          <div>
            <h1 className="text-3xl text-primary">{profileData.name}</h1>
            <p className="text-lg text-muted-foreground">{profileData.bio}</p>
            <Badge variant="secondary" className="mt-2">
              Member since {profileData.joinedDate}
            </Badge>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {familyStats.map((stat, index) => {
            const StatIcon = stat.icon;
            return (
              <Card key={index} className="memory-card text-center p-4">
                <div className="space-y-2">
                  <StatIcon className={`w-6 h-6 mx-auto ${stat.color}`} />
                  <p className="text-2xl font-semibold text-primary">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Profile Information */}
        <Card className="memory-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-xl text-primary">Profile Information</CardTitle>
              <CardDescription>Manage your personal details</CardDescription>
            </div>
            <Button
              variant="outline"
              onClick={() => setEditMode(!editMode)}
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              <Edit3 className="w-4 h-4 mr-2" />
              {editMode ? 'Cancel' : 'Edit'}
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            {editMode ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profileData.name}
                    onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                    className="bg-input-background"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Input
                    id="bio"
                    value={profileData.bio}
                    onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                    className="bg-input-background"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={profileData.location}
                    onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                    className="bg-input-background"
                  />
                </div>
                <Button onClick={handleSaveProfile} className="heritage-button text-primary-foreground">
                  Save Changes
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <User className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-primary">{profileData.name}</p>
                    <p className="text-sm text-muted-foreground">Full Name</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-primary">{profileData.email}</p>
                    <p className="text-sm text-muted-foreground">Email Address</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-primary">{profileData.phone}</p>
                    <p className="text-sm text-muted-foreground">Phone Number</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-primary">{profileData.location}</p>
                    <p className="text-sm text-muted-foreground">Location</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Notification Preferences */}
        <Card className="memory-card">
          <CardHeader>
            <CardTitle className="text-xl text-primary flex items-center space-x-2">
              <Bell className="w-6 h-6" />
              <span>Notification Preferences</span>
            </CardTitle>
            <CardDescription>Control how you receive updates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-primary">Email Notifications</p>
                  <p className="text-sm text-muted-foreground">Receive memory updates via email</p>
                </div>
                <Switch
                  checked={preferences.emailNotifications}
                  onCheckedChange={(checked) => handlePreferenceChange('emailNotifications', checked)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-primary">Push Notifications</p>
                  <p className="text-sm text-muted-foreground">Get instant alerts on your device</p>
                </div>
                <Switch
                  checked={preferences.pushNotifications}
                  onCheckedChange={(checked) => handlePreferenceChange('pushNotifications', checked)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-primary">Family Updates</p>
                  <p className="text-sm text-muted-foreground">When family members add memories</p>
                </div>
                <Switch
                  checked={preferences.familyUpdates}
                  onCheckedChange={(checked) => handlePreferenceChange('familyUpdates', checked)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-primary">Weekly Digest</p>
                  <p className="text-sm text-muted-foreground">Summary of family activity</p>
                </div>
                <Switch
                  checked={preferences.weeklyDigest}
                  onCheckedChange={(checked) => handlePreferenceChange('weeklyDigest', checked)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="memory-card">
          <CardHeader>
            <CardTitle className="text-xl text-primary">Recent Activity</CardTitle>
            <CardDescription>Your latest contributions to the family vault</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-4 p-3 bg-muted/20 rounded-lg">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Heart className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-primary">
                      <span className="font-medium">{activity.action}</span>{' '}
                      <span className="text-secondary">{activity.item}</span>
                    </p>
                    <p className="text-sm text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Privacy & Security */}
        <Card className="memory-card">
          <CardHeader>
            <CardTitle className="text-xl text-primary flex items-center space-x-2">
              <Shield className="w-6 h-6" />
              <span>Privacy & Security</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-primary">Private Mode</p>
                <p className="text-sm text-muted-foreground">Hide your profile from search</p>
              </div>
              <Switch
                checked={preferences.privacyMode}
                onCheckedChange={(checked) => handlePreferenceChange('privacyMode', checked)}
              />
            </div>
            <Separator />
            <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              <Settings className="w-4 h-4 mr-2" />
              Advanced Privacy Settings
            </Button>
          </CardContent>
        </Card>

        {/* Support & Help */}
        <Card className="memory-card">
          <CardHeader>
            <CardTitle className="text-xl text-primary flex items-center space-x-2">
              <HelpCircle className="w-6 h-6" />
              <span>Support & Help</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="ghost" className="w-full justify-start text-primary hover:bg-primary/10">
              <HelpCircle className="w-4 h-4 mr-2" />
              Help Center & FAQs
            </Button>
            <Button variant="ghost" className="w-full justify-start text-primary hover:bg-primary/10">
              <Mail className="w-4 h-4 mr-2" />
              Contact Support
            </Button>
            <Button variant="ghost" className="w-full justify-start text-primary hover:bg-primary/10">
              <Heart className="w-4 h-4 mr-2" />
              Share Feedback
            </Button>
          </CardContent>
        </Card>

        {/* Sign Out */}
        <Card className="memory-card border-destructive/20">
          <CardContent className="p-6">
            <Button 
              variant="destructive" 
              className="w-full"
              onClick={() => {
                if (confirm('Are you sure you want to sign out?')) {
                  // Handle sign out
                  window.location.reload();
                }
              }}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}