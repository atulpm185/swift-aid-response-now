
import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { MapPin, Share2, Compass, Locate } from "lucide-react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

const LocationPage = () => {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [shareEnabled, setShareEnabled] = useState(false);
  const [accuracy, setAccuracy] = useState<number | null>(null);
  
  const handleGetLocation = () => {
    setIsLocating(true);
    
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      setIsLocating(false);
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setAccuracy(position.coords.accuracy);
        setIsLocating(false);
        toast.success("Location updated successfully");
      },
      (error) => {
        console.error("Error getting location:", error);
        toast.error("Could not retrieve your location. Please check your permissions.");
        setIsLocating(false);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };
  
  const handleShareLocation = () => {
    if (!location) {
      toast.error("No location to share");
      return;
    }
    
    // In a real app, this would send the location to emergency contacts
    toast.success("Location shared with emergency contacts", {
      description: "Your emergency contacts have been notified of your location.",
    });
  };
  
  // In a real app, this might be a websocket or periodic update
  useEffect(() => {
    if (shareEnabled && navigator.geolocation) {
      const intervalId = setInterval(() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
            setAccuracy(position.coords.accuracy);
          },
          (error) => {
            console.error("Error updating location:", error);
          }
        );
      }, 30000); // Update every 30 seconds
      
      return () => clearInterval(intervalId);
    }
  }, [shareEnabled]);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container max-w-xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Location Services</h1>
        
        <Card className="mb-6">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-info" />
              <CardTitle className="text-lg">Your Current Location</CardTitle>
            </div>
            <CardDescription>
              {location
                ? "Your current location has been detected"
                : "Press the button below to get your current location"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {location ? (
              <div className="space-y-4">
                <div className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
                  <p><strong>Latitude:</strong> {location.lat.toFixed(6)}</p>
                  <p><strong>Longitude:</strong> {location.lng.toFixed(6)}</p>
                  {accuracy && (
                    <div className="mt-2">
                      <p className="mb-1"><strong>Accuracy:</strong> {Math.round(accuracy)} meters</p>
                      <Progress value={Math.max(0, 100 - (accuracy / 2))} className="h-2" />
                    </div>
                  )}
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    className="flex-1"
                    onClick={handleShareLocation}
                    disabled={!location}
                  >
                    <Share2 className="mr-2 h-4 w-4" />
                    Share Location
                  </Button>
                  
                  <Button 
                    variant="outline"
                    className="flex-1"
                    onClick={handleGetLocation}
                    disabled={isLocating}
                  >
                    <Compass className="mr-2 h-4 w-4" />
                    {isLocating ? "Getting Location..." : "Refresh"}
                  </Button>
                </div>
              </div>
            ) : (
              <Button 
                className="w-full"
                onClick={handleGetLocation}
                disabled={isLocating}
              >
                <Locate className="mr-2 h-4 w-4" />
                {isLocating ? "Getting Location..." : "Get My Location"}
              </Button>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Emergency Location Sharing</CardTitle>
            <CardDescription>
              Automatically share your location with emergency contacts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="location-sharing">Continuous Sharing</Label>
                <p className="text-sm text-muted-foreground">
                  Updates your location every 30 seconds
                </p>
              </div>
              <Switch
                id="location-sharing"
                checked={shareEnabled}
                onCheckedChange={setShareEnabled}
              />
            </div>
            
            <div className="mt-4">
              <h3 className="text-sm font-medium mb-2">Who can see my location?</h3>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Your emergency contacts</li>
                <li>• Emergency services when you call them</li>
              </ul>
              <p className="text-xs text-muted-foreground mt-2">
                Your location data is encrypted and only shared with those you've authorized.
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default LocationPage;
