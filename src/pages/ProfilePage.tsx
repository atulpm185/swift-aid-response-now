
import React, { useState } from "react";
import { toast } from "sonner";
import { UserRoundCog, Save, PlusCircle, Heart, Info, AlertTriangle } from "lucide-react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    name: "John Doe",
    age: "35",
    bloodType: "O+",
    allergies: "Penicillin",
    medications: "None",
    conditions: "Asthma",
    emergencyContact: "Jane Doe (555-123-4567)",
    notes: "Carries inhaler at all times",
  });
  
  const [medicalInfo, setMedicalInfo] = useState([
    { id: "1", type: "allergy", value: "Penicillin", severity: "High" },
    { id: "2", type: "condition", value: "Asthma", severity: "Moderate" },
    { id: "3", type: "medication", value: "Albuterol Inhaler", dosage: "2 puffs as needed" },
  ]);
  
  const [newInfo, setNewInfo] = useState({
    type: "allergy",
    value: "",
    severity: "",
    dosage: "",
  });
  
  const handleSaveProfile = () => {
    // In a real app, this would save to a database
    toast.success("Profile saved successfully");
  };
  
  const handleAddMedicalInfo = () => {
    if (!newInfo.value) {
      toast.error("Please enter a value");
      return;
    }
    
    const id = Math.random().toString(36).substring(2, 9);
    setMedicalInfo([...medicalInfo, { id, ...newInfo }]);
    setNewInfo({
      type: newInfo.type,
      value: "",
      severity: "",
      dosage: "",
    });
    
    toast.success(`${newInfo.type} added successfully`);
  };
  
  const handleRemoveMedicalInfo = (id: string) => {
    setMedicalInfo(medicalInfo.filter(item => item.id !== id));
    toast.success("Item removed successfully");
  };
  
  const getMedicalIcon = (type: string) => {
    switch (type) {
      case "allergy":
        return <AlertTriangle className="h-4 w-4 text-warning" />;
      case "condition":
        return <Heart className="h-4 w-4 text-emergency" />;
      case "medication":
        return <Info className="h-4 w-4 text-info" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container max-w-xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Emergency Profile</h1>
          <Button onClick={handleSaveProfile}>
            <Save className="mr-2 h-4 w-4" />
            Save Profile
          </Button>
        </div>
        
        <Tabs defaultValue="general">
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger value="general">General Info</TabsTrigger>
            <TabsTrigger value="medical">Medical Info</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general">
            <Card className="mb-6">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <UserRoundCog className="h-5 w-5 text-info" />
                  <CardTitle className="text-lg">Personal Information</CardTitle>
                </div>
                <CardDescription>
                  Your personal details for emergency situations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      value={profile.name}
                      onChange={(e) => setProfile({...profile, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input 
                      id="age" 
                      value={profile.age}
                      onChange={(e) => setProfile({...profile, age: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="bloodType">Blood Type</Label>
                    <Input 
                      id="bloodType" 
                      value={profile.bloodType}
                      onChange={(e) => setProfile({...profile, bloodType: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emergencyContact">Emergency Contact</Label>
                    <Input 
                      id="emergencyContact" 
                      value={profile.emergencyContact}
                      onChange={(e) => setProfile({...profile, emergencyContact: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea 
                    id="notes" 
                    placeholder="Any other important information"
                    value={profile.notes}
                    onChange={(e) => setProfile({...profile, notes: e.target.value})}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="medical">
            <Card className="mb-6">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-emergency" />
                    <CardTitle className="text-lg">Medical Information</CardTitle>
                  </div>
                </div>
                <CardDescription>
                  Add allergies, conditions, and medications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {medicalInfo.map((item) => (
                    <div key={item.id} className="flex items-center justify-between border p-3 rounded-md">
                      <div className="flex items-center gap-2">
                        {getMedicalIcon(item.type)}
                        <div>
                          <p className="font-medium">{item.value}</p>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              {item.type}
                            </Badge>
                            {item.severity && (
                              <Badge variant="secondary" className="text-xs">
                                Severity: {item.severity}
                              </Badge>
                            )}
                            {item.dosage && (
                              <Badge variant="secondary" className="text-xs">
                                {item.dosage}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleRemoveMedicalInfo(item.id)}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                  
                  <div className="border border-dashed p-4 rounded-md space-y-4">
                    <h3 className="font-medium">Add New Information</h3>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="info-type">Type</Label>
                        <select
                          id="info-type"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                          value={newInfo.type}
                          onChange={(e) => setNewInfo({...newInfo, type: e.target.value})}
                        >
                          <option value="allergy">Allergy</option>
                          <option value="condition">Medical Condition</option>
                          <option value="medication">Medication</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="info-value">
                          {newInfo.type === "medication" ? "Medication Name" : 
                           newInfo.type === "condition" ? "Condition Name" : 
                           "Allergy Name"}
                        </Label>
                        <Input 
                          id="info-value" 
                          value={newInfo.value}
                          onChange={(e) => setNewInfo({...newInfo, value: e.target.value})}
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      {newInfo.type === "medication" ? (
                        <div className="space-y-2">
                          <Label htmlFor="info-dosage">Dosage</Label>
                          <Input 
                            id="info-dosage" 
                            placeholder="E.g., 10mg daily"
                            value={newInfo.dosage}
                            onChange={(e) => setNewInfo({...newInfo, dosage: e.target.value})}
                          />
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <Label htmlFor="info-severity">Severity</Label>
                          <select
                            id="info-severity"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                            value={newInfo.severity}
                            onChange={(e) => setNewInfo({...newInfo, severity: e.target.value})}
                          >
                            <option value="">Select Severity</option>
                            <option value="Low">Low</option>
                            <option value="Moderate">Moderate</option>
                            <option value="High">High</option>
                            <option value="Severe">Severe</option>
                          </select>
                        </div>
                      )}
                      
                      <div className="flex items-end">
                        <Button 
                          className="w-full"
                          onClick={handleAddMedicalInfo}
                        >
                          <PlusCircle className="mr-2 h-4 w-4" />
                          Add {newInfo.type}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default ProfilePage;
