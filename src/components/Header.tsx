import React, { useState, Dispatch, SetStateAction } from 'react';
import { useChat } from '@/contexts/ChatContext';
import { Button } from '@/components/ui/button';
import { Globe, Menu, Moon, Sun, User } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { Language } from '@/lib/data';
import { useIsMobile } from '@/hooks/use-mobile';

interface HeaderProps {
  theme: 'dark' | 'light';
  setTheme: Dispatch<SetStateAction<'dark' | 'light'>>;
}

const Header = ({ theme, setTheme }: HeaderProps) => {
  const { userLanguage, setUserLanguage, toggleChatList } = useChat();
  const isMobile = useIsMobile();
  
  const languages: Language[] = ['English', 'Spanish', 'French', 'German', 'Japanese'];
  
  return (
    <header className="h-16 bg-primary text-primary-foreground flex items-center px-4 sticky top-0 z-30 w-full glass">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-3">
          {isMobile && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleChatList}
              className="p-0 h-9 w-9 text-primary-foreground/90 hover:text-primary-foreground hover:bg-primary-foreground/10"
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}
          
          <h1 className="text-xl font-semibold tracking-tight">ChatSphere</h1>
        </div>
        
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-9 gap-1 px-2 text-primary-foreground/90 hover:text-primary-foreground hover:bg-primary-foreground/10"
              >
                <Globe className="h-4 w-4" />
                <span className="hidden sm:inline">{userLanguage}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
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
            className="p-0 h-9 w-9 text-primary-foreground/90 hover:text-primary-foreground hover:bg-primary-foreground/10"
          >
            {theme === 'dark' ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>
          
          <Separator orientation="vertical" className="h-6 bg-primary-foreground/20" />
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="p-0 h-9 w-9 text-primary-foreground/90 hover:text-primary-foreground hover:bg-primary-foreground/10"
          >
            <User className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
