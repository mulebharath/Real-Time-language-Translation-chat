
import React from 'react';
import { useChat } from '@/contexts/ChatContext';
import ChatItem from './ChatItem';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const ChatList = () => {
  const { chats, activeChatId, setActiveChatId } = useChat();
  const navigate = useNavigate();
  
  const handleChatClick = (chatId: string) => {
    setActiveChatId(chatId);
    navigate(`/chat/${chatId}`);
  };
  
  return (
    <div className="flex flex-col h-full">
      <div className="p-3">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search conversations" 
            className="pl-9 bg-secondary/50 border-none"
          />
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
    </div>
  );
};

export default ChatList;
