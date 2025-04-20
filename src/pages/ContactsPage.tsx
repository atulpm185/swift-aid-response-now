
import React, { useState } from "react";
import { toast } from "sonner";
import { Plus, Search } from "lucide-react";
import Header from "@/components/Header";
import ContactCard from "@/components/ContactCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

interface Contact {
  id: string;
  name: string;
  phoneNumber: string;
  relation: string;
}

const ContactsPage = () => {
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: "1",
      name: "Emergency Services",
      phoneNumber: "911",
      relation: "Emergency",
    },
    {
      id: "2",
      name: "John Doe",
      phoneNumber: "555-123-4567",
      relation: "Family",
    },
    {
      id: "3",
      name: "Jane Smith",
      phoneNumber: "555-987-6543",
      relation: "Friend",
    },
  ]);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [newContact, setNewContact] = useState({
    name: "",
    phoneNumber: "",
    relation: "",
  });
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.phoneNumber.includes(searchTerm)
  );

  const handleCall = (contact: Contact) => {
    toast(`Calling ${contact.name} at ${contact.phoneNumber}...`, {
      description: "In a real app, this would open your phone dialer.",
      action: {
        label: "Cancel",
        onClick: () => toast.dismiss(),
      },
    });
    
    console.log(`Calling ${contact.name} at ${contact.phoneNumber}`);
  };

  const handleAddContact = () => {
    const id = Math.random().toString(36).substring(2, 9);
    setContacts([...contacts, { ...newContact, id }]);
    setNewContact({ name: "", phoneNumber: "", relation: "" });
    setIsAddDialogOpen(false);
    toast.success("Contact added successfully");
  };

  const handleEditContact = () => {
    if (editingContact) {
      setContacts(
        contacts.map((contact) =>
          contact.id === editingContact.id ? editingContact : contact
        )
      );
      setEditingContact(null);
      setIsEditDialogOpen(false);
      toast.success("Contact updated successfully");
    }
  };

  const handleDeleteContact = (id: string) => {
    if (id === "1") {
      toast.error("Emergency services contact cannot be deleted");
      return;
    }
    
    setContacts(contacts.filter((contact) => contact.id !== id));
    toast.success("Contact deleted successfully");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container max-w-xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Emergency Contacts</h1>
        
        <div className="flex items-center gap-2 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search contacts..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Contact
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Emergency Contact</DialogTitle>
                <DialogDescription>
                  Add a new emergency contact to your list.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={newContact.name}
                    onChange={(e) =>
                      setNewContact({ ...newContact, name: e.target.value })
                    }
                    placeholder="Contact name"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={newContact.phoneNumber}
                    onChange={(e) =>
                      setNewContact({ ...newContact, phoneNumber: e.target.value })
                    }
                    placeholder="Phone number"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="relation">Relation</Label>
                  <Input
                    id="relation"
                    value={newContact.relation}
                    onChange={(e) =>
                      setNewContact({ ...newContact, relation: e.target.value })
                    }
                    placeholder="Relation (e.g. Family, Friend)"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddContact}>Save Contact</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="space-y-3">
          {filteredContacts.length > 0 ? (
            filteredContacts.map((contact) => (
              <ContactCard
                key={contact.id}
                name={contact.name}
                phoneNumber={contact.phoneNumber}
                relation={contact.relation}
                onCall={() => handleCall(contact)}
                onEdit={() => {
                  setEditingContact(contact);
                  setIsEditDialogOpen(true);
                }}
                onDelete={() => handleDeleteContact(contact.id)}
              />
            ))
          ) : (
            <div className="text-center p-6 border border-dashed rounded-lg">
              <p className="text-muted-foreground">No contacts found</p>
            </div>
          )}
        </div>
      </main>

      {/* Edit Contact Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Contact</DialogTitle>
            <DialogDescription>
              Update the contact information.
            </DialogDescription>
          </DialogHeader>
          {editingContact && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Name</Label>
                <Input
                  id="edit-name"
                  value={editingContact.name}
                  onChange={(e) =>
                    setEditingContact({
                      ...editingContact,
                      name: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-phone">Phone Number</Label>
                <Input
                  id="edit-phone"
                  value={editingContact.phoneNumber}
                  onChange={(e) =>
                    setEditingContact({
                      ...editingContact,
                      phoneNumber: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-relation">Relation</Label>
                <Input
                  id="edit-relation"
                  value={editingContact.relation}
                  onChange={(e) =>
                    setEditingContact({
                      ...editingContact,
                      relation: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditContact}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ContactsPage;
