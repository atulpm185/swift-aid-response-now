
import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import { Heart, Flame, Ambulance, AlertTriangle, Pill, BookOpen } from "lucide-react";

const GuidePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container max-w-4xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Emergency Guide</h1>
        
        <Tabs defaultValue="firstaid">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="firstaid">First Aid</TabsTrigger>
            <TabsTrigger value="disaster">Disaster</TabsTrigger>
            <TabsTrigger value="safety">Safety Tips</TabsTrigger>
          </TabsList>
          
          <TabsContent value="firstaid">
            <div className="grid gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-emergency" />
                    <CardTitle className="text-lg">CPR Instructions</CardTitle>
                  </div>
                  <CardDescription>
                    Follow these steps to perform CPR in an emergency situation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="step1">
                      <AccordionTrigger>Step 1: Check responsiveness</AccordionTrigger>
                      <AccordionContent>
                        <p className="mb-2">Tap the person's shoulder and shout "Are you OK?"</p>
                        <p className="mb-2">If there is no response and the person is not breathing or only gasping, call emergency services (911) and get an AED if available.</p>
                        <div className="rounded-md border p-4 bg-muted/50 mt-2">
                          <p className="text-sm text-muted-foreground">Note: If you're alone with an adult, call emergency services first. For a child, perform 2 minutes of CPR before calling.</p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="step2">
                      <AccordionTrigger>Step 2: Start chest compressions</AccordionTrigger>
                      <AccordionContent>
                        <p className="mb-2">Place the person on their back on a firm surface.</p>
                        <p className="mb-2">Kneel beside them and place the heel of one hand on the center of their chest (lower half of sternum).</p>
                        <p className="mb-2">Place your other hand on top of the first with your fingers interlaced.</p>
                        <p className="mb-2">Position your shoulders directly over your hands, lock your elbows, and using your body weight, push hard and fast.</p>
                        <p className="mb-2">Compress the chest at least 2 inches (5 cm) at a rate of 100-120 compressions per minute.</p>
                        <p className="mb-2">Allow the chest to fully recoil after each compression.</p>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="step3">
                      <AccordionTrigger>Step 3: Open the airway</AccordionTrigger>
                      <AccordionContent>
                        <p className="mb-2">After 30 compressions, gently tilt the head back and lift the chin to open the airway.</p>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="step4">
                      <AccordionTrigger>Step 4: Give rescue breaths</AccordionTrigger>
                      <AccordionContent>
                        <p className="mb-2">Pinch the nose closed and cover the person's mouth with yours, creating a seal.</p>
                        <p className="mb-2">Give 2 rescue breaths (1 second each), watching for the chest to rise.</p>
                        <p className="mb-2">If the chest doesn't rise, reposition the head and try again.</p>
                        <div className="rounded-md border p-4 bg-muted/50 mt-2">
                          <p className="text-sm text-muted-foreground">Note: If you're not trained or uncomfortable with rescue breaths, hands-only CPR (continuous chest compressions) is still effective.</p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="step5">
                      <AccordionTrigger>Step 5: Continue CPR</AccordionTrigger>
                      <AccordionContent>
                        <p className="mb-2">Continue cycles of 30 chest compressions followed by 2 rescue breaths.</p>
                        <p className="mb-2">Do not stop CPR except in these situations:</p>
                        <ul className="list-disc pl-6 space-y-1 mt-2">
                          <li>You see signs of life (breathing, movement)</li>
                          <li>Another trained responder can take over</li>
                          <li>Emergency medical services arrive</li>
                          <li>An AED is ready to use</li>
                          <li>You are too exhausted to continue</li>
                          <li>The scene becomes unsafe</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  <Button className="w-full mt-4">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Watch CPR Training Video
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <Pill className="h-5 w-5 text-emergency" />
                    <CardTitle className="text-lg">Severe Bleeding</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ol className="list-decimal pl-6 space-y-2">
                    <li>Apply direct pressure with a clean cloth or bandage</li>
                    <li>If possible, elevate the wound above the heart</li>
                    <li>Apply pressure to the artery if direct pressure isn't stopping the bleeding</li>
                    <li>Don't remove the first cloth if it soaks through - add another on top</li>
                    <li>Use a tourniquet only as a last resort for limb wounds</li>
                    <li>Get immediate emergency medical attention</li>
                  </ol>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="disaster">
            <div className="grid gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <Flame className="h-5 w-5 text-emergency" />
                    <CardTitle className="text-lg">Fire Emergency</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <h3 className="font-medium mb-2">If a fire starts:</h3>
                  <ol className="list-decimal pl-6 space-y-2 mb-4">
                    <li>Alert everyone in the building by yelling "Fire!"</li>
                    <li>Call emergency services (911) once you're safely outside</li>
                    <li>If the fire is small and contained, use a fire extinguisher</li>
                    <li>If the fire grows or you don't have an extinguisher, evacuate immediately</li>
                    <li>Close doors behind you to slow the spread of fire</li>
                  </ol>
                  
                  <h3 className="font-medium mb-2">If trapped in a building:</h3>
                  <ol className="list-decimal pl-6 space-y-2">
                    <li>Stay low to the ground where air is clearer</li>
                    <li>Cover your nose and mouth with a wet cloth if possible</li>
                    <li>Feel doors before opening - if hot, find another exit</li>
                    <li>If you can't escape, seal door cracks and vents with wet towels</li>
                    <li>Signal for help from a window using a light-colored cloth</li>
                  </ol>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-warning" />
                    <CardTitle className="text-lg">Earthquake Safety</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <h3 className="font-medium mb-2">During an earthquake:</h3>
                  <ol className="list-decimal pl-6 space-y-2 mb-4">
                    <li><strong>Drop, Cover, Hold On</strong> - Drop to the ground, take cover under a sturdy table, and hold on</li>
                    <li>Stay indoors until the shaking stops</li>
                    <li>Stay away from windows, exterior walls, and anything that could fall</li>
                    <li>If outdoors, move to an open area away from buildings, trees, and power lines</li>
                    <li>If in a vehicle, pull over to a clear location, stop, and stay inside with seatbelt fastened</li>
                  </ol>
                  
                  <h3 className="font-medium mb-2">After an earthquake:</h3>
                  <ol className="list-decimal pl-6 space-y-2">
                    <li>Check yourself and others for injuries</li>
                    <li>Be prepared for aftershocks</li>
                    <li>Check for gas leaks, water, and electrical system damage</li>
                    <li>Turn on a battery-powered radio for emergency information</li>
                    <li>Avoid entering damaged buildings</li>
                  </ol>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="safety">
            <div className="grid gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-warning" />
                    <CardTitle className="text-lg">General Safety Tips</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-1">Create an Emergency Plan</h3>
                      <p className="text-sm text-muted-foreground">Develop and practice a family emergency plan that includes meeting locations and communication strategies.</p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-1">Emergency Kit</h3>
                      <p className="text-sm text-muted-foreground">Prepare an emergency kit with water, non-perishable food, medications, first aid supplies, flashlight, battery-powered radio, and essential documents.</p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-1">Stay Informed</h3>
                      <p className="text-sm text-muted-foreground">Keep updated on weather alerts and emergency notifications through reliable sources.</p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-1">Learn Basic Skills</h3>
                      <p className="text-sm text-muted-foreground">Take courses in CPR, first aid, and basic disaster response to be prepared for emergencies.</p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-1">Know Your Area</h3>
                      <p className="text-sm text-muted-foreground">Be aware of evacuation routes, shelter locations, and local emergency services in your community.</p>
                    </div>
                  </div>
                  
                  <Button className="w-full mt-4">
                    Download Full Safety Guide (PDF)
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <Ambulance className="h-5 w-5 text-info" />
                    <CardTitle className="text-lg">Medical Emergency Preparation</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="bg-muted rounded-full p-1 mt-0.5">✓</span>
                      <span>Keep a list of emergency contacts readily available</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-muted rounded-full p-1 mt-0.5">✓</span>
                      <span>Maintain a current list of medications and allergies</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-muted rounded-full p-1 mt-0.5">✓</span>
                      <span>Know the location of the nearest emergency room</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-muted rounded-full p-1 mt-0.5">✓</span>
                      <span>Learn to recognize signs of common emergencies like heart attack and stroke</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-muted rounded-full p-1 mt-0.5">✓</span>
                      <span>Store important medical information in your phone's emergency access feature</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default GuidePage;
