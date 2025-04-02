
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { UserPlus, Search, UserCheck, Phone, Video, Mail, User } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Label } from "@/components/ui/label";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const contacts = [
  { id: 1, name: "Alice Johnson", status: "online", avatar: "https://source.unsplash.com/collection/happy-people/100x100?1", phone: "+1 (555) 123-4567", email: "alice@example.com" },
  { id: 2, name: "Bob Smith", status: "away", avatar: "https://source.unsplash.com/collection/happy-people/100x100?2", phone: "+1 (555) 234-5678", email: "bob@example.com" },
  { id: 3, name: "Carol Williams", status: "offline", avatar: "https://source.unsplash.com/collection/happy-people/100x100?3", phone: "+1 (555) 345-6789", email: "carol@example.com" },
  { id: 4, name: "Dave Brown", status: "online", avatar: "https://source.unsplash.com/collection/happy-people/100x100?4", phone: "+1 (555) 456-7890", email: "dave@example.com" },
  { id: 5, name: "Eve Davis", status: "offline", avatar: "https://source.unsplash.com/collection/happy-people/100x100?5", phone: "+1 (555) 567-8901", email: "eve@example.com" }
];

// Contact form schema
const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const Contacts = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddContact, setShowAddContact] = useState(false);
  const [showContactDetails, setShowContactDetails] = useState(false);
  const [selectedContact, setSelectedContact] = useState<typeof contacts[0] | null>(null);
  
  // Search functionality
  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.phone.includes(searchQuery) ||
    contact.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Form setup
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const onSubmit = (data: ContactFormValues) => {
    // In a real app, this would save to a database
    toast({
      title: "Contact added",
      description: `${data.name} has been added to your contacts`,
    });
    setShowAddContact(false);
    form.reset();
  };

  const handleContactClick = (contact: typeof contacts[0]) => {
    setSelectedContact(contact);
    setShowContactDetails(true);
  };

  const handleAction = (action: string, contact: typeof contacts[0]) => {
    switch(action) {
      case 'email':
        toast({
          title: "Email action",
          description: `Opening email to ${contact.name}`,
        });
        break;
      case 'call':
        toast({
          title: "Call action",
          description: `Calling ${contact.name} at ${contact.phone}`,
        });
        break;
      case 'video':
        toast({
          title: "Video call",
          description: `Starting video call with ${contact.name}`,
        });
        break;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 animate-fade-in">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Contacts</span>
            <Button size="sm" className="gap-1" onClick={() => setShowAddContact(true)}>
              <UserPlus className="h-4 w-4" />
              <span>Add Contact</span>
            </Button>
          </CardTitle>
          <CardDescription>Manage your contacts and connect with friends</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative mb-6">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search contacts..." 
              className="pl-9" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="grid gap-4">
            {filteredContacts.length > 0 ? (
              filteredContacts.map(contact => (
                <div 
                  key={contact.id} 
                  className="flex items-center p-3 rounded-lg border border-border/20 hover:bg-secondary/30 transition-colors group animate-fade-in cursor-pointer"
                  onClick={() => handleContactClick(contact)}
                >
                  <div className="relative mr-3">
                    <img 
                      src={contact.avatar} 
                      alt={contact.name}
                      className="w-12 h-12 rounded-full object-cover" 
                    />
                    <span className={`absolute bottom-0 right-0 w-3 h-3 border-2 border-background rounded-full ${
                      contact.status === 'online' ? 'bg-green-500' : 
                      contact.status === 'away' ? 'bg-amber-500' : 'bg-gray-400'
                    }`}></span>
                  </div>
                  
                  <div className="flex-grow">
                    <h3 className="font-medium">{contact.name}</h3>
                    <p className="text-xs text-muted-foreground capitalize">{contact.status}</p>
                  </div>
                  
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full" onClick={(e) => {
                      e.stopPropagation();
                      handleAction('email', contact);
                    }}>
                      <Mail className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full" onClick={(e) => {
                      e.stopPropagation();
                      handleAction('call', contact);
                    }}>
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full" onClick={(e) => {
                      e.stopPropagation();
                      handleAction('video', contact);
                    }}>
                      <Video className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <User className="h-12 w-12 mx-auto text-muted-foreground/50" />
                <h3 className="mt-4 font-medium">No contacts found</h3>
                <p className="text-sm text-muted-foreground">Try adjusting your search parameters</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Add Contact Dialog */}
      <Dialog open={showAddContact} onOpenChange={setShowAddContact}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Contact</DialogTitle>
            <DialogDescription>
              Enter the details of the person you want to add to your contacts.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="john@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="+1 (555) 123-4567" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter className="mt-6">
                <Button type="button" variant="outline" onClick={() => setShowAddContact(false)}>
                  Cancel
                </Button>
                <Button type="submit">Add Contact</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Contact Details Dialog */}
      <Dialog open={showContactDetails} onOpenChange={setShowContactDetails}>
        <DialogContent className="sm:max-w-md">
          {selectedContact && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3">
                  <img 
                    src={selectedContact.avatar} 
                    alt={selectedContact.name}
                    className="w-16 h-16 rounded-full object-cover" 
                  />
                  <div>
                    <DialogTitle>{selectedContact.name}</DialogTitle>
                    <DialogDescription className="capitalize">{selectedContact.status}</DialogDescription>
                  </div>
                </div>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{selectedContact.phone}</p>
                    <p className="text-xs text-muted-foreground">Mobile</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{selectedContact.email}</p>
                    <p className="text-xs text-muted-foreground">Email</p>
                  </div>
                </div>
              </div>
              <DialogFooter className="flex justify-between">
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => handleAction('call', selectedContact)}>
                    <Phone className="h-4 w-4 mr-2" /> Call
                  </Button>
                  <Button size="sm" onClick={() => handleAction('video', selectedContact)}>
                    <Video className="h-4 w-4 mr-2" /> Video
                  </Button>
                </div>
                <Button variant="outline" size="sm" onClick={() => setShowContactDetails(false)}>
                  Close
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Contacts;
