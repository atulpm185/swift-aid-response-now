
import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { AlertTriangle, Bell, BellOff, MapPin, ArrowUpRight, ExternalLink } from "lucide-react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Alert {
  id: string;
  type: "warning" | "emergency" | "advisory";
  title: string;
  description: string;
  location: string;
  date: string;
  isNew: boolean;
}

const AlertsPage = () => {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: "1",
      type: "emergency",
      title: "Flash Flood Warning",
      description: "Flash flooding is occurring or imminent. Move to higher ground immediately.",
      location: "Central City Area",
      date: "2025-04-20T08:30:00Z",
      isNew: true,
    },
    {
      id: "2",
      type: "warning",
      title: "Severe Thunderstorm Watch",
      description: "Conditions are favorable for severe thunderstorms in and close to the watch area.",
      location: "Metro Region",
      date: "2025-04-19T14:15:00Z",
      isNew: false,
    },
    {
      id: "3",
      type: "advisory",
      title: "Heat Advisory",
      description: "High temperatures expected. Stay hydrated and avoid prolonged exposure to heat.",
      location: "Entire County",
      date: "2025-04-18T10:00:00Z",
      isNew: false,
    },
  ]);
  
  const [notificationSettings, setNotificationSettings] = useState({
    alerts: true,
    warnings: true,
    advisories: false,
    sound: true,
    vibration: true,
    location: true,
  });
  
  useEffect(() => {
    // Mark all alerts as read after viewing
    setTimeout(() => {
      setAlerts(alerts.map(alert => ({ ...alert, isNew: false })));
    }, 3000);
  }, []);
  
  const handleToggleNotification = (key: keyof typeof notificationSettings) => {
    setNotificationSettings({
      ...notificationSettings,
      [key]: !notificationSettings[key],
    });
    
    toast.success(`${key} notifications ${notificationSettings[key] ? 'disabled' : 'enabled'}`);
  };
  
  const getAlertTypeStyles = (type: Alert["type"]) => {
    switch (type) {
      case "emergency":
        return "bg-emergency/10 border-emergency text-emergency";
      case "warning":
        return "bg-warning/10 border-warning text-warning-foreground";
      case "advisory":
        return "bg-info/10 border-info text-info-foreground";
      default:
        return "bg-muted/10 border-muted text-muted-foreground";
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }).format(date);
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container max-w-xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Disaster Alerts</h1>
        
        <Tabs defaultValue="current">
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger value="current">Current Alerts</TabsTrigger>
            <TabsTrigger value="settings">Alert Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="current">
            <div className="space-y-4">
              {alerts.map((alert) => (
                <Card 
                  key={alert.id} 
                  className={`border-l-4 ${getAlertTypeStyles(alert.type)}`}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className={`h-5 w-5 ${alert.type === 'emergency' ? 'text-emergency' : alert.type === 'warning' ? 'text-warning' : 'text-info'}`} />
                        <div>
                          <div className="flex items-center gap-2">
                            <CardTitle className="text-lg">{alert.title}</CardTitle>
                            {alert.isNew && (
                              <Badge variant="secondary" className="text-xs">New</Badge>
                            )}
                          </div>
                          <CardDescription className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {alert.location} • {formatDate(alert.date)}
                          </CardDescription>
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className={`uppercase text-xs font-semibold ${
                          alert.type === 'emergency' 
                            ? 'border-emergency/30 text-emergency' 
                            : alert.type === 'warning'
                            ? 'border-warning/30 text-warning-foreground' 
                            : 'border-info/30 text-info-foreground'
                        }`}
                      >
                        {alert.type}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-4">{alert.description}</p>
                    <div className="flex justify-end">
                      <Button variant="outline" size="sm" className="text-xs">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              <div className="bg-muted/30 rounded-lg p-4 text-center text-sm text-muted-foreground">
                <p>Stay alert! Disaster information is updated in real-time.</p>
                <Button variant="link" className="text-xs mt-1 h-auto p-0">
                  View all past alerts <ArrowUpRight className="h-3 w-3 ml-1" />
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="settings">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-info" />
                  <CardTitle className="text-lg">Notification Settings</CardTitle>
                </div>
                <CardDescription>
                  Customize which alerts you receive and how
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <h3 className="font-medium text-sm">Alert Types</h3>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="alerts-emergency">Emergency Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Critical, life-threatening situations
                      </p>
                    </div>
                    <Switch
                      id="alerts-emergency"
                      checked={notificationSettings.alerts}
                      onCheckedChange={() => handleToggleNotification('alerts')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="alerts-warning">Warning Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Potentially dangerous situations
                      </p>
                    </div>
                    <Switch
                      id="alerts-warning"
                      checked={notificationSettings.warnings}
                      onCheckedChange={() => handleToggleNotification('warnings')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="alerts-advisory">Advisory Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        General information and precautions
                      </p>
                    </div>
                    <Switch
                      id="alerts-advisory"
                      checked={notificationSettings.advisories}
                      onCheckedChange={() => handleToggleNotification('advisories')}
                    />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h3 className="font-medium text-sm">Notification Methods</h3>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="alerts-sound">Sound Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Play sound when alerts are received
                      </p>
                    </div>
                    <Switch
                      id="alerts-sound"
                      checked={notificationSettings.sound}
                      onCheckedChange={() => handleToggleNotification('sound')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="alerts-vibration">Vibration</Label>
                      <p className="text-sm text-muted-foreground">
                        Vibrate when alerts are received
                      </p>
                    </div>
                    <Switch
                      id="alerts-vibration"
                      checked={notificationSettings.vibration}
                      onCheckedChange={() => handleToggleNotification('vibration')}
                    />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h3 className="font-medium text-sm">Location Settings</h3>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="alerts-location">Location-Based Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive alerts relevant to your current location
                      </p>
                    </div>
                    <Switch
                      id="alerts-location"
                      checked={notificationSettings.location}
                      onCheckedChange={() => handleToggleNotification('location')}
                    />
                  </div>
                </div>
                
                <div className="pt-2">
                  <Button variant="outline" className="w-full">
                    <BellOff className="mr-2 h-4 w-4" />
                    Mute All Alerts for 12 Hours
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AlertsPage;
