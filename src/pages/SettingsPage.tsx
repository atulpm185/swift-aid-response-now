
import React, { useState } from "react";
import { toast } from "sonner";
import { 
  Settings, 
  Moon, 
  Sun, 
  BellRing, 
  Lock, 
  Smartphone, 
  Globe, 
  HelpCircle, 
  LogOut,
  Save
} from "lucide-react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    darkMode: false,
    emergencyNotifications: true,
    weatherAlerts: true,
    locationServices: true,
    autoDialEmergency: true,
    dataSync: true,
    language: "english",
    unitSystem: "imperial",
  });
  
  const handleToggleSetting = (key: keyof typeof settings) => {
    setSettings({
      ...settings,
      [key]: !settings[key as keyof typeof settings],
    });
    
    toast.success(`Setting updated successfully`);
  };
  
  const handleSelectChange = (key: keyof typeof settings, value: string) => {
    setSettings({
      ...settings,
      [key]: value,
    });
    
    toast.success(`Setting updated successfully`);
  };
  
  const handleSaveSettings = () => {
    // In a real app, this would save to a database or local storage
    toast.success("All settings saved successfully");
  };
  
  const handleLogout = () => {
    toast("Logged out successfully", {
      description: "You have been logged out of your account",
    });
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container max-w-xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Settings</h1>
          <Button onClick={handleSaveSettings}>
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-info" />
                <CardTitle className="text-lg">General Settings</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {settings.darkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                  <Label htmlFor="dark-mode">Dark Mode</Label>
                </div>
                <Switch
                  id="dark-mode"
                  checked={settings.darkMode}
                  onCheckedChange={() => handleToggleSetting('darkMode')}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select 
                  value={settings.language} 
                  onValueChange={(value) => handleSelectChange('language', value)}
                >
                  <SelectTrigger id="language">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="spanish">Spanish</SelectItem>
                    <SelectItem value="french">French</SelectItem>
                    <SelectItem value="chinese">Chinese</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="units">Unit System</Label>
                <Select 
                  value={settings.unitSystem} 
                  onValueChange={(value) => handleSelectChange('unitSystem', value)}
                >
                  <SelectTrigger id="units">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="imperial">Imperial (miles, °F)</SelectItem>
                    <SelectItem value="metric">Metric (kilometers, °C)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <BellRing className="h-5 w-5 text-info" />
                <CardTitle className="text-lg">Notification Settings</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="emergency-notifications">Emergency Notifications</Label>
                <Switch
                  id="emergency-notifications"
                  checked={settings.emergencyNotifications}
                  onCheckedChange={() => handleToggleSetting('emergencyNotifications')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="weather-alerts">Weather Alerts</Label>
                <Switch
                  id="weather-alerts"
                  checked={settings.weatherAlerts}
                  onCheckedChange={() => handleToggleSetting('weatherAlerts')}
                />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-info" />
                <CardTitle className="text-lg">Privacy & Security</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="location-services">Location Services</Label>
                <Switch
                  id="location-services"
                  checked={settings.locationServices}
                  onCheckedChange={() => handleToggleSetting('locationServices')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="data-sync">Sync Data to Cloud</Label>
                <Switch
                  id="data-sync"
                  checked={settings.dataSync}
                  onCheckedChange={() => handleToggleSetting('dataSync')}
                />
              </div>
              
              <Button variant="outline" className="w-full">
                Manage Privacy Settings
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Smartphone className="h-5 w-5 text-info" />
                <CardTitle className="text-lg">Emergency Features</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-dial">Auto-Dial Emergency</Label>
                  <p className="text-xs text-muted-foreground">
                    Automatically dial emergency number when using panic button
                  </p>
                </div>
                <Switch
                  id="auto-dial"
                  checked={settings.autoDialEmergency}
                  onCheckedChange={() => handleToggleSetting('autoDialEmergency')}
                />
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <Label>Emergency Contacts</Label>
                <Button variant="outline" className="w-full" onClick={() => window.location.href = "/contacts"}>
                  Manage Emergency Contacts
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-info" />
                <CardTitle className="text-lg">Help & Support</CardTitle>
              </div>
              <CardDescription>
                Get help using the app and emergency services
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full">
                <Globe className="mr-2 h-4 w-4" />
                Visit Help Center
              </Button>
              
              <Button variant="outline" className="w-full">
                Report a Problem
              </Button>
            </CardContent>
          </Card>
          
          <Button 
            variant="destructive" 
            className="w-full"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Log Out
          </Button>
        </div>
      </main>
    </div>
  );
};

export default SettingsPage;
