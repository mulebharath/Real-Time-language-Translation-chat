
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserPlus, Search, UserCheck, Phone, Video, Mail } from "lucide-react";

const contacts = [
  { id: 1, name: "Alice Johnson", status: "online", avatar: "https://source.unsplash.com/collection/happy-people/100x100?1" },
  { id: 2, name: "Bob Smith", status: "away", avatar: "https://source.unsplash.com/collection/happy-people/100x100?2" },
  { id: 3, name: "Carol Williams", status: "offline", avatar: "https://source.unsplash.com/collection/happy-people/100x100?3" },
  { id: 4, name: "Dave Brown", status: "online", avatar: "https://source.unsplash.com/collection/happy-people/100x100?4" },
  { id: 5, name: "Eve Davis", status: "offline", avatar: "https://source.unsplash.com/collection/happy-people/100x100?5" }
];

const Contacts = () => {
  return (
    <div className="max-w-4xl mx-auto p-4 animate-fade-in">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Contacts</span>
            <Button size="sm" className="gap-1">
              <UserPlus className="h-4 w-4" />
              <span>Add Contact</span>
            </Button>
          </CardTitle>
          <CardDescription>Manage your contacts and connect with friends</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative mb-6">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search contacts..." className="pl-9" />
          </div>
          
          <div className="grid gap-4">
            {contacts.map(contact => (
              <div key={contact.id} className="flex items-center p-3 rounded-lg border border-border/20 hover:bg-secondary/30 transition-colors group animate-fade-in">
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
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full">
                    <Mail className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full">
                    <Video className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Contacts;
