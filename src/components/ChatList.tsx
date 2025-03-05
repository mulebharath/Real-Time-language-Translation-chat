
import React, { useState } from 'react';
import { useChat } from '@/contexts/ChatContext';
import ChatItem from './ChatItem';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Search, MessageCircle, BadgeCheck, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const ChatList = () => {
  const { chats, activeChatId, setActiveChatId } = useChat();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('chats');
  
  const handleChatClick = (chatId: string) => {
    setActiveChatId(chatId);
    navigate(`/chat/${chatId}`);
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
        
        <div className="flex items-center mb-3 border-b border-border/10 pb-3">
          <Button
            variant={activeTab === 'dashboard' ? 'secondary' : 'ghost'}
            size="sm"
            className={cn(
              "flex items-center gap-2 text-sm rounded-md flex-1 justify-start",
              activeTab === 'dashboard' ? "bg-secondary/50" : ""
            )}
            onClick={() => setActiveTab('dashboard')}
          >
            <LayoutDashboard className="h-4 w-4" />
            <span>Dashboard</span>
          </Button>
          <Button
            variant={activeTab === 'chats' ? 'secondary' : 'ghost'}
            size="sm"
            className={cn(
              "flex items-center gap-2 text-sm rounded-md flex-1 justify-start",
              activeTab === 'chats' ? "bg-secondary/50" : ""
            )}
            onClick={() => setActiveTab('chats')}
          >
            <MessageCircle className="h-4 w-4" />
            <span>Chats</span>
          </Button>
        </div>
      </div>
      
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
      
      <div className="p-3 mt-auto border-t border-border/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-secondary/50 flex items-center justify-center text-xs">
            VM
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
