
import React, { Dispatch, SetStateAction, useState } from 'react';
import { useChat } from '@/contexts/ChatContext';
import { Button } from '@/components/ui/button';
import { Globe, Menu, Moon, Sun, User, Search, MessageCircle } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { Language } from '@/lib/data';
import { useIsMobile } from '@/hooks/use-mobile';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

interface HeaderProps {
  theme: 'dark' | 'light';
  setTheme: Dispatch<SetStateAction<'dark' | 'light'>>;
}

const Header = ({ theme, setTheme }: HeaderProps) => {
  const { userLanguage, setUserLanguage, toggleChatList } = useChat();
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);
  
  const languages: Language[] = ['English', 'Spanish', 'French', 'German', 'Japanese', 'Chinese', 'Russian', 'Arabic', 'Portuguese', 'Hindi'];
  
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('authToken');
    navigate('/login');
  };
  
  return (
    <header className="h-16 bg-background text-foreground flex items-center px-4 sticky top-0 z-30 w-full border-b border-border/10">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-3">
          {isMobile && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleChatList}
              className="p-0 h-9 w-9 text-foreground hover:text-primary hover:bg-background"
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}
          
          <h1 className="text-xl font-semibold tracking-tight flex items-center">
            <span className="text-yellow-400 mr-1">◆</span> 
            <span>ChatSphere</span>
          </h1>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowSearch(true)}
            className="h-9 gap-1 px-3 text-foreground/90 hover:text-primary hover:bg-background rounded-full border border-border/20"
          >
            <Search className="h-4 w-4" />
            <span className="hidden sm:inline">Search</span>
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-9 gap-1 px-2 text-foreground/90 hover:text-primary hover:bg-background"
              >
                <Globe className="h-4 w-4" />
                <span className="hidden sm:inline">{userLanguage}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-secondary border border-border/20">
              {languages.map((lang) => (
                <DropdownMenuItem key={lang} onClick={() => setUserLanguage(lang)}>
                  {lang}
                  {userLanguage === lang && (
                    <span className="ml-2 h-1.5 w-1.5 rounded-full bg-primary"></span>
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-0 h-9 w-9 text-foreground/90 hover:text-primary hover:bg-background"
          >
            {theme === 'dark' ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>
          
          <Separator orientation="vertical" className="h-6 bg-border/20" />
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="p-0 h-9 w-9 text-foreground/90 hover:text-primary hover:bg-background"
              >
                <User className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-secondary border border-border/20">
              <DropdownMenuItem onClick={() => navigate('/settings')}>
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/contacts')}>
                Contacts
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-red-500">
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {/* Global Search Dialog */}
      <Dialog open={showSearch} onOpenChange={setShowSearch}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Search</DialogTitle>
            <DialogDescription>
              Search for contacts, messages, or conversations
            </DialogDescription>
          </DialogHeader>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Type to search..." 
              className="pl-9"
              autoFocus
            />
          </div>
          <div className="pt-4">
            <h4 className="text-sm font-medium mb-2">Recent Searches</h4>
            <div className="space-y-1">
              <Button 
                variant="ghost" 
                className="w-full justify-start text-sm"
                onClick={() => {
                  navigate('/contacts');
                  setShowSearch(false);
                }}
              >
                <User className="h-4 w-4 mr-2" />
                <span>All Contacts</span>
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start text-sm"
                onClick={() => {
                  navigate('/home');
                  setShowSearch(false);
                }}
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                <span>Recent Chats</span>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </header>
  );
};

export default Header;
