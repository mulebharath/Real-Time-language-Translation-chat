
import React from 'react';
import { cn } from '@/lib/utils';
import { Chat } from '@/lib/data';
import { BadgeCheck } from 'lucide-react';

interface ChatItemProps {
  chat: Chat;
  isActive: boolean;
  onClick: () => void;
}

const ChatItem = ({ chat, isActive, onClick }: ChatItemProps) => {
  const lastMessage = chat.messages[chat.messages.length - 1];
  const previewText = lastMessage ? lastMessage.text : 'No messages yet';
  
  return (
    <div 
      className={cn(
        "flex items-center gap-3 p-2.5 cursor-pointer rounded-lg transition-all group",
        isActive 
          ? "bg-secondary/40" 
          : "hover:bg-secondary/20"
      )}
      onClick={onClick}
    >
      <div className="relative flex-shrink-0">
        <img
          src={chat.avatar}
          alt={`${chat.name}'s avatar`}
          className={cn(
            "w-10 h-10 rounded-full object-cover",
            chat.status === 'online' && "ring-2 ring-primary/30"
          )}
        />
        {chat.status === 'online' && (
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-primary border-2 border-background rounded-full"></span>
        )}
        {chat.status === 'away' && (
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-amber-500 border-2 border-background rounded-full"></span>
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center">
          <h3 className="font-medium truncate text-sm flex items-center">
            {chat.name}
            {chat.name === 'Alice' && (
              <BadgeCheck className="ml-1 h-3.5 w-3.5 text-primary" />
            )}
          </h3>
          <span className="text-xs text-muted-foreground ml-1 flex-shrink-0 opacity-70 group-hover:opacity-100">
            {lastMessage?.timestamp}
          </span>
        </div>
        
        <div className="flex items-center">
          <p className="text-xs text-muted-foreground truncate max-w-[13rem]">
            {lastMessage?.sender === 'me' ? 'You: ' : ''}
            {previewText.length > 25 ? `${previewText.substring(0, 25)}...` : previewText}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatItem;
