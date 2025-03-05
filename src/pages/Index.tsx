
import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { ChatProvider } from '@/contexts/ChatContext';
import Header from '@/components/Header';
import ChatList from '@/components/ChatList';
import { useIsMobile } from '@/hooks/use-mobile';
import { useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

const Index = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>('light');
  const isMobile = useIsMobile();
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  // Set up theme class on document
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);
  
  return (
    <ChatProvider>
      <div className="h-screen w-full flex flex-col bg-background text-foreground">
        <Header theme={theme} setTheme={setTheme} />
        <div className="flex-1 flex overflow-hidden">
          {/* Sidebar */}
          <div 
            className={cn(
              "w-full max-w-xs border-r bg-sidebar transition-transform duration-300 ease-in-out relative z-20",
              isMobile && !isHomePage && "-translate-x-full",
              isMobile && "absolute inset-y-0 left-0 h-[calc(100vh-64px)]"
            )}
          >
            <ChatList />
          </div>
          
          {/* Main content */}
          <div className={cn(
            "flex-1 relative", 
            isMobile && !isHomePage && "z-10"
          )}>
            <Outlet />
          </div>
        </div>
      </div>
    </ChatProvider>
  );
};

export default Index;
