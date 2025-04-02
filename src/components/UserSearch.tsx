
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useChat } from '@/contexts/ChatContext';
import { initialChats } from '@/lib/data';

type SearchResult = {
  id: string;
  name: string;
  username?: string;
  phoneNumber?: string;
  avatar: string;
};

const UserSearch = () => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { startNewChat } = useChat();

  // Search for users when query changes
  useEffect(() => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    
    // Simulate API call with a timeout
    const timeout = setTimeout(() => {
      // Filter users based on query (username or phone)
      const results = initialChats
        .filter(chat => {
          const lowerQuery = query.toLowerCase();
          // Search by name (simulating username)
          const nameMatch = chat.name.toLowerCase().includes(lowerQuery);
          
          // Simulate phone number (not in original data)
          const phoneNumber = `+1${Math.floor(Math.random() * 9000000000) + 1000000000}`;
          const phoneMatch = phoneNumber.includes(query);
          
          return nameMatch || phoneMatch;
        })
        .map(chat => ({
          id: chat.id,
          name: chat.name,
          username: chat.name.toLowerCase().replace(' ', ''),
          phoneNumber: `+1${Math.floor(Math.random() * 9000000000) + 1000000000}`,
          avatar: chat.avatar
        }));
      
      setSearchResults(results);
      setIsSearching(false);
    }, 500);
    
    return () => clearTimeout(timeout);
  }, [query]);

  const handleUserSelect = (user: SearchResult) => {
    // Check if chat already exists or create a new one
    const existingChat = initialChats.find(chat => chat.id === user.id);
    
    if (existingChat) {
      navigate(`/chat/${existingChat.id}`);
    } else {
      const newChatId = startNewChat(user.name, user.avatar);
      
      toast({
        title: "New conversation",
        description: `You started a conversation with ${user.name}`
      });
      
      navigate(`/chat/${newChatId}`);
    }
    
    // Clear search
    setQuery('');
  };

  return (
    <div className="relative">
      <div className="flex items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by username or phone number..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9 pr-8 bg-secondary/30 border-border/10"
          />
          {query && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-1 top-1 h-8 w-8 p-0"
              onClick={() => setQuery('')}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
      
      {/* Search Results Dropdown */}
      {query && searchResults.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-background border border-border rounded-md shadow-lg max-h-60 overflow-y-auto">
          <ul className="py-1">
            {searchResults.map((result) => (
              <li 
                key={result.id}
                className="px-3 py-2 hover:bg-secondary/30 cursor-pointer flex items-center gap-2"
                onClick={() => handleUserSelect(result)}
              >
                <img 
                  src={result.avatar} 
                  alt={result.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div className="flex-1">
                  <p className="font-medium">{result.name}</p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <span>@{result.username}</span>
                    {result.phoneNumber && (
                      <span className="before:content-['•'] before:mx-1">{result.phoneNumber}</span>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {query && isSearching && (
        <div className="absolute z-10 w-full mt-1 bg-background border border-border rounded-md shadow-lg p-4 text-center">
          <p className="text-muted-foreground">Searching...</p>
        </div>
      )}
      
      {query && !isSearching && searchResults.length === 0 && (
        <div className="absolute z-10 w-full mt-1 bg-background border border-border rounded-md shadow-lg p-4 text-center">
          <p className="text-muted-foreground">User not found.</p>
        </div>
      )}
    </div>
  );
};

export default UserSearch;
