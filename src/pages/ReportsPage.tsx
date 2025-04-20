import React, { useState } from "react";
import { toast } from "sonner";
import { FileText, UploadCloud, Camera, Paperclip, Send, MapPin } from "lucide-react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Report {
  id: string;
  type: string;
  location: string;
  description: string;
  date: string;
  status: "pending" | "reviewing" | "resolved";
  attachments: number;
}

const ReportsPage = () => {
  const [reports, setReports] = useState<Report[]>([
    {
      id: "1",
      type: "Fire",
      location: "123 Main St",
      description: "Building on fire on the east side",
      date: "2025-04-18",
      status: "resolved",
      attachments: 2,
    },
    {
      id: "2",
      type: "Medical",
      location: "456 Oak Ave",
      description: "Person collapsed on sidewalk",
      date: "2025-04-19",
      status: "reviewing",
      attachments: 1,
    },
    {
      id: "3",
      type: "Disaster",
      location: "789 Pine Rd",
      description: "Flooding in residential area",
      date: "2025-04-20",
      status: "pending",
      attachments: 3,
    },
  ]);
  
  const [newReport, setNewReport] = useState({
    type: "",
    location: "",
    description: "",
  });
  
  const [files, setFiles] = useState<File[]>([]);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFiles(Array.from(e.target.files));
      toast.success(`${e.target.files.length} file(s) selected`);
    }
  };
  
  const handleSubmitReport = () => {
    if (!newReport.type || !newReport.location || !newReport.description) {
      toast.error("Please fill all required fields");
      return;
    }
    
    const now = new Date();
    const id = Math.random().toString(36).substring(2, 9);
    
    const report: Report = {
      id,
      type: newReport.type,
      location: newReport.location,
      description: newReport.description,
      date: now.toISOString().split('T')[0],
      status: "pending",
      attachments: files.length,
    };
    
    setReports([report, ...reports]);
    setNewReport({
      type: "",
      location: "",
      description: "",
    });
    setFiles([]);
    
    toast.success("Emergency report submitted successfully", {
      description: "Your report has been sent to emergency services.",
    });
  };
  
  const getStatusBadge = (status: Report["status"]) => {
    switch (status) {
      case "pending":
        return <span className="px-2 py-1 rounded-full text-xs bg-warning/20 text-warning-foreground">Pending</span>;
      case "reviewing":
        return <span className="px-2 py-1 rounded-full text-xs bg-info/20 text-info-foreground">Reviewing</span>;
      case "resolved":
        return <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">Resolved</span>;
      default:
        return null;
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container max-w-4xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Emergency Reports</h1>
        
        <Tabs defaultValue="new">
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger value="new">New Report</TabsTrigger>
            <TabsTrigger value="history">Report History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="new">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-info" />
                  <CardTitle className="text-lg">Submit Emergency Report</CardTitle>
                </div>
                <CardDescription>
                  Report an emergency situation to local authorities
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="report-type">Emergency Type</Label>
                  <Select 
                    value={newReport.type} 
                    onValueChange={(value) => setNewReport({...newReport, type: value})}
                  >
                    <SelectTrigger id="report-type">
                      <SelectValue placeholder="Select type of emergency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Medical">Medical Emergency</SelectItem>
                      <SelectItem value="Fire">Fire</SelectItem>
                      <SelectItem value="Police">Crime/Safety</SelectItem>
                      <SelectItem value="Traffic">Traffic Accident</SelectItem>
                      <SelectItem value="Disaster">Natural Disaster</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="report-location">Location</Label>
                  <Input 
                    id="report-location" 
                    placeholder="Address or description of location"
                    value={newReport.location}
                    onChange={(e) => setNewReport({...newReport, location: e.target.value})}
                  />
                  <Button variant="outline" size="sm" className="mt-1">
                    <MapPin className="h-4 w-4 mr-2" />
                    Use Current Location
                  </Button>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="report-description">Description</Label>
                  <Textarea 
                    id="report-description" 
                    placeholder="Describe the emergency situation in detail"
                    value={newReport.description}
                    onChange={(e) => setNewReport({...newReport, description: e.target.value})}
                    className="min-h-[120px]"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Attachments</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" asChild className="w-full">
                      <label>
                        <Camera className="h-4 w-4 mr-2" />
                        Take Photo
                        <input 
                          type="file" 
                          accept="image/*" 
                          capture="environment" 
                          className="hidden"
                          onChange={handleFileChange}
                        />
                      </label>
                    </Button>
                    
                    <Button variant="outline" asChild className="w-full">
                      <label>
                        <Paperclip className="h-4 w-4 mr-2" />
                        Attach Files
                        <input 
                          type="file" 
                          multiple 
                          className="hidden"
                          onChange={handleFileChange}
                        />
                      </label>
                    </Button>
                  </div>
                  
                  {files.length > 0 && (
                    <div className="text-sm">
                      <p className="font-medium">{files.length} file(s) selected</p>
                      <ul className="mt-1 text-muted-foreground">
                        {files.map((file, index) => (
                          <li key={index} className="truncate">
                            {file.name} ({(file.size / 1024).toFixed(1)} KB)
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                
                <Button 
                  className="w-full"
                  onClick={handleSubmitReport}
                >
                  <Send className="mr-2 h-4 w-4" />
                  Submit Emergency Report
                </Button>
                
                <p className="text-xs text-muted-foreground text-center">
                  For immediate assistance, please call emergency services directly at 911
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="history">
            <div className="space-y-4">
              {reports.length > 0 ? (
                reports.map((report) => (
                  <Card key={report.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-medium">{report.type} Emergency</h3>
                          <p className="text-sm text-muted-foreground">{report.date}</p>
                        </div>
                        {getStatusBadge(report.status)}
                      </div>
                      
                      <div className="space-y-2">
                        <p className="text-sm"><strong>Location:</strong> {report.location}</p>
                        <p className="text-sm"><strong>Description:</strong> {report.description}</p>
                        {report.attachments > 0 && (
                          <p className="text-sm flex items-center">
                            <Paperclip className="h-3 w-3 mr-1" />
                            {report.attachments} attachment(s)
                          </p>
                        )}
                      </div>
                      
                      <div className="mt-4 flex justify-end">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center p-8 border border-dashed rounded-lg">
                  <FileText className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-medium mb-1">No Reports Yet</h3>
                  <p className="text-sm text-muted-foreground">
                    Your submitted emergency reports will appear here
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default ReportsPage;
