
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  UserPlus, Search, UserCheck, Phone, Video, Mail, X, 
  CheckCircle, UserSearch, AlertCircle 
} from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const initialContacts = [
  { id: 1, name: "Alice Johnson", status: "online", avatar: "https://source.unsplash.com/collection/happy-people/100x100?1" },
  { id: 2, name: "Bob Smith", status: "away", avatar: "https://source.unsplash.com/collection/happy-people/100x100?2" },
  { id: 3, name: "Carol Williams", status: "offline", avatar: "https://source.unsplash.com/collection/happy-people/100x100?3" },
  { id: 4, name: "Dave Brown", status: "online", avatar: "https://source.unsplash.com/collection/happy-people/100x100?4" },
  { id: 5, name: "Eve Davis", status: "offline", avatar: "https://source.unsplash.com/collection/happy-people/100x100?5" }
];

const Contacts = () => {
  const [contacts, setContacts] = useState(initialContacts);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showSearchDialog, setShowSearchDialog] = useState(false);
  const [newContact, setNewContact] = useState({ name: '', email: '', avatar: '' });
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const { toast } = useToast();

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleAddContact = () => {
    if (!newContact.name.trim()) {
      toast({
        title: "Error",
        description: "Please enter a name for the contact",
        variant: "destructive"
      });
      return;
    }

    // This would normally make a request to the backend
    const newId = Math.max(...contacts.map(c => c.id)) + 1;
    const avatar = newContact.avatar || `https://source.unsplash.com/collection/happy-people/100x100?${newId}`;
    
    setContacts([
      ...contacts,
      { 
        id: newId, 
        name: newContact.name, 
        status: "offline", 
        avatar 
      }
    ]);
    
    setNewContact({ name: '', email: '', avatar: '' });
    setShowAddDialog(false);
    
    toast({
      title: "Success",
      description: `Added ${newContact.name} to your contacts`,
    });
  };

  const handleSearchPeople = () => {
    if (!searchQuery.trim()) {
      toast({
        title: "Error",
        description: "Please enter a search term",
        variant: "destructive"
      });
      return;
    }

    setIsSearching(true);
    setShowSearchDialog(true);
    
    // This would normally make a request to the backend
    // Simulate a search request
    setTimeout(() => {
      // Mock search results
      const results = [
        { id: 101, name: `${searchQuery} Smith`, avatar: "https://source.unsplash.com/collection/happy-people/100x100?10" },
        { id: 102, name: `Jane ${searchQuery}`, avatar: "https://source.unsplash.com/collection/happy-people/100x100?11" },
        { id: 103, name: `${searchQuery} Johnson`, avatar: "https://source.unsplash.com/collection/happy-people/100x100?12" },
      ];
      
      setSearchResults(results);
      setIsSearching(false);
    }, 1500);
  };

  const addSearchResultToContacts = (result: any) => {
    // Check if contact already exists
    const exists = contacts.some(c => c.id === result.id);
    
    if (!exists) {
      setContacts([
        ...contacts,
        { ...result, status: "offline" }
      ]);
      
      toast({
        title: "Success",
        description: `Added ${result.name} to your contacts`,
      });
    } else {
      toast({
        title: "Contact exists",
        description: `${result.name} is already in your contacts`,
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 animate-fade-in">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Contacts</span>
            <div className="flex gap-2">
              <Button size="sm" className="gap-1" onClick={() => setShowSearchDialog(true)}>
                <UserSearch className="h-4 w-4" />
                <span>Find People</span>
              </Button>
              <Button size="sm" className="gap-1" onClick={() => setShowAddDialog(true)}>
                <UserPlus className="h-4 w-4" />
                <span>Add Contact</span>
              </Button>
            </div>
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
              onChange={handleSearch}
            />
          </div>
          
          {filteredContacts.length === 0 ? (
            <div className="text-center p-8 text-muted-foreground">
              <AlertCircle className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No contacts found matching "{searchQuery}"</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredContacts.map(contact => (
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
          )}
        </CardContent>
      </Card>

      {/* Add Contact Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Contact</DialogTitle>
            <DialogDescription>
              Enter the details of the person you want to add to your contacts.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input 
                id="name" 
                placeholder="Enter name" 
                value={newContact.name}
                onChange={(e) => setNewContact({...newContact, name: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="Enter email" 
                value={newContact.email}
                onChange={(e) => setNewContact({...newContact, email: e.target.value})}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>Cancel</Button>
            <Button onClick={handleAddContact}>
              <UserPlus className="h-4 w-4 mr-2" />
              Add Contact
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Search People Dialog */}
      <Dialog open={showSearchDialog} onOpenChange={setShowSearchDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Find People</DialogTitle>
            <DialogDescription>
              Search for people to add to your contacts.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="flex gap-2">
              <Input 
                placeholder="Search by name or email" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleSearchPeople}>
                {isSearching ? (
                  <div className="flex items-center gap-1">
                    <span className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
                    <span>Searching</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1">
                    <Search className="h-4 w-4" />
                    <span>Search</span>
                  </div>
                )}
              </Button>
            </div>

            {searchResults.length > 0 && (
              <div className="space-y-2 max-h-[300px] overflow-y-auto">
                <h3 className="text-sm font-medium text-muted-foreground">Results</h3>
                {searchResults.map(result => (
                  <div key={result.id} className="flex items-center p-2 rounded-md hover:bg-secondary/30">
                    <img 
                      src={result.avatar} 
                      alt={result.name}
                      className="w-10 h-10 rounded-full object-cover mr-3" 
                    />
                    <div className="flex-grow">
                      <h4 className="font-medium">{result.name}</h4>
                    </div>
                    <Button size="sm" variant="ghost" onClick={() => addSearchResultToContacts(result)}>
                      <UserPlus className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
            
            {searchResults.length === 0 && !isSearching && searchQuery && (
              <div className="text-center p-4 text-muted-foreground">
                <p>No results found for "{searchQuery}"</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Contacts;
