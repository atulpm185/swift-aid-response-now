
import React from "react";
import { toast } from "sonner";
import { App } from '@capacitor/app';
import { 
  PhoneCall, 
  Ambulance, 
  Flame, 
  Shield, 
  UserRoundCog, 
  FileText, 
  AlertTriangle,
  Heart,
  Pill,
  BookOpen
} from "lucide-react";

import Header from "@/components/Header";
import EmergencyButton from "@/components/EmergencyButton";
import EmergencyTip from "@/components/EmergencyTip";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  const handleEmergencyCall = async (service: string) => {
    const phoneNumbers: Record<string, string> = {
      "Police": "911",
      "Ambulance": "911",
      "Fire": "911",
      "Disaster": "211"
    };
    
    const number = phoneNumbers[service] || "911";
    
    try {
      // Open native phone dialer
      const url = `tel:${number}`;
      await App.openUrl({ url });
    } catch (error) {
      console.error('Error making phone call:', error);
      toast.error(`Could not initiate call to ${service}`, {
        description: "Please check your device permissions",
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 container max-w-xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Emergency Services</h1>
        
        <Card className="mb-8 bg-emergency/5 border-emergency/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-emergency" />
              Emergency Call
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <EmergencyButton
                title="Police"
                icon={<Shield />}
                onClick={() => handleEmergencyCall("Police")}
                isPulsing
              />
              <EmergencyButton
                title="Ambulance"
                icon={<Ambulance />}
                onClick={() => handleEmergencyCall("Ambulance")}
              />
              <EmergencyButton
                title="Fire"
                icon={<Flame />}
                onClick={() => handleEmergencyCall("Fire")}
              />
              <EmergencyButton
                title="Disaster"
                icon={<AlertTriangle />}
                onClick={() => handleEmergencyCall("Disaster")}
              />
            </div>
          </CardContent>
        </Card>
        
        <h2 className="text-xl font-bold mb-4">Quick Access</h2>
        <div className="grid grid-cols-3 gap-3 mb-8">
          <Button 
            variant="outline" 
            className="flex flex-col items-center justify-center h-24 aspect-square"
            onClick={() => window.location.href = "/contacts"}
          >
            <PhoneCall className="h-6 w-6 mb-2 text-info" />
            <span className="text-xs">Contacts</span>
          </Button>
          <Button 
            variant="outline" 
            className="flex flex-col items-center justify-center h-24 aspect-square"
            onClick={() => window.location.href = "/profile"}
          >
            <UserRoundCog className="h-6 w-6 mb-2 text-info" />
            <span className="text-xs">Profile</span>
          </Button>
          <Button 
            variant="outline" 
            className="flex flex-col items-center justify-center h-24 aspect-square"
            onClick={() => window.location.href = "/guide"}
          >
            <BookOpen className="h-6 w-6 mb-2 text-info" />
            <span className="text-xs">Guide</span>
          </Button>
        </div>
        
        <h2 className="text-xl font-bold mb-4">Emergency Tips</h2>
        <div className="space-y-3 mb-6">
          <EmergencyTip 
            title="CPR Steps"
            description="Push hard and fast in the center of the chest. Aim for 100-120 compressions per minute."
            icon={<Heart className="h-5 w-5" />}
          />
          <EmergencyTip 
            title="Severe Bleeding"
            description="Apply direct pressure with a clean cloth and elevate the injured area above the heart if possible."
            icon={<Pill className="h-5 w-5" />}
          />
        </div>
      </main>
    </div>
  );
};

export default Index;
