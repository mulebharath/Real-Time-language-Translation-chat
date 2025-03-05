
import React, { useState } from 'react';
import { useChat } from '@/contexts/ChatContext';
import ChatItem from './ChatItem';
import { useNavigate, useLocation } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Search, MessageCircle, LayoutDashboard, Users, Bell, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const ChatList = () => {
  const { chats, activeChatId, setActiveChatId } = useChat();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('chats');
  
  const handleChatClick = (chatId: string) => {
    setActiveChatId(chatId);
    navigate(`/chat/${chatId}`);
  };

  const handleNavigation = (path: string, tab: string) => {
    setActiveTab(tab);
    navigate(path);
  };
  
  return (
    <div className="flex flex-col h-full">
      <div className="p-3">
        <div className="relative mb-3">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search..." 
            className="pl-9 bg-secondary/30 border-border/10 text-sm focus-visible:ring-primary/20"
          />
        </div>
        
        <div className="flex flex-col gap-1 mb-3 border-b border-border/10 pb-3">
          <Button
            variant={location.pathname === '/dashboard' ? 'secondary' : 'ghost'}
            size="sm"
            className={cn(
              "flex items-center gap-2 text-sm rounded-md w-full justify-start",
              location.pathname === '/dashboard' ? "bg-secondary/50" : ""
            )}
            onClick={() => handleNavigation('/dashboard', 'dashboard')}
          >
            <LayoutDashboard className="h-4 w-4" />
            <span>Dashboard</span>
          </Button>
          <Button
            variant={activeTab === 'chats' && location.pathname.includes('/chat') ? 'secondary' : 'ghost'}
            size="sm"
            className={cn(
              "flex items-center gap-2 text-sm rounded-md w-full justify-start",
              activeTab === 'chats' && location.pathname.includes('/chat') ? "bg-secondary/50" : ""
            )}
            onClick={() => handleNavigation('/', 'chats')}
          >
            <MessageCircle className="h-4 w-4" />
            <span>Chats</span>
          </Button>
          <Button
            variant={location.pathname === '/contacts' ? 'secondary' : 'ghost'}
            size="sm"
            className={cn(
              "flex items-center gap-2 text-sm rounded-md w-full justify-start",
              location.pathname === '/contacts' ? "bg-secondary/50" : ""
            )}
            onClick={() => handleNavigation('/contacts', 'contacts')}
          >
            <Users className="h-4 w-4" />
            <span>Contacts</span>
          </Button>
          <Button
            variant={location.pathname === '/notifications' ? 'secondary' : 'ghost'}
            size="sm"
            className={cn(
              "flex items-center gap-2 text-sm rounded-md w-full justify-start",
              location.pathname === '/notifications' ? "bg-secondary/50" : ""
            )}
            onClick={() => handleNavigation('/notifications', 'notifications')}
          >
            <Bell className="h-4 w-4" />
            <span>Notifications</span>
            <span className="ml-auto bg-primary text-xs px-1.5 py-0.5 rounded-full text-primary-foreground">3</span>
          </Button>
          <Button
            variant={location.pathname === '/settings' ? 'secondary' : 'ghost'}
            size="sm"
            className={cn(
              "flex items-center gap-2 text-sm rounded-md w-full justify-start",
              location.pathname === '/settings' ? "bg-secondary/50" : ""
            )}
            onClick={() => handleNavigation('/settings', 'settings')}
          >
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </Button>
        </div>
      </div>
      
      {activeTab === 'chats' && (
        <div className="flex-1 overflow-y-auto scrollbar-thin">
          <div className="px-2 space-y-1">
            {chats.map((chat) => (
              <ChatItem
                key={chat.id}
                chat={chat}
                isActive={chat.id === activeChatId}
                onClick={() => handleChatClick(chat.id)}
              />
            ))}
          </div>
        </div>
      )}
      
      <div className="p-3 mt-auto border-t border-border/10">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img 
              src="/lovable-uploads/d3b8c3f5-99d7-4e68-a793-894924b80c68.png" 
              alt="User avatar"
              className="w-8 h-8 rounded-full object-cover" 
            />
            <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 border-2 border-background rounded-full"></span>
          </div>
          <div className="flex-1 text-xs">
            <div className="font-medium">User</div>
            <div className="text-muted-foreground">user@example.com</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatList;
