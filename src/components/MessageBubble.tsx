
import React from 'react';
import { cn } from '@/lib/utils';
import { Message } from '@/lib/data';
import { Check } from 'lucide-react';

interface MessageBubbleProps {
  message: Message;
  isMe: boolean;
}

const MessageBubble = ({ message, isMe }: MessageBubbleProps) => {
  return (
    <div 
      className={cn(
        "flex mb-3 animate-fade-in transition-all",
        isMe ? "justify-end" : "justify-start"
      )}
    >
      {!isMe && (
        <div className="h-8 w-8 rounded-full overflow-hidden flex-shrink-0 mr-2 mt-1 border border-border/20">
          <img 
            src={`https://source.unsplash.com/collection/happy-people/120/${message.sender}`} 
            alt={message.sender} 
            className="h-full w-full object-cover" 
          />
        </div>
      )}
      
      <div className="flex flex-col max-w-[85%]">
        {!isMe && message.senderName && (
          <span className="text-xs text-muted-foreground mb-1 ml-1">
            {message.senderName}
          </span>
        )}
        <div
          className={cn(
            "chat-bubble",
            isMe
              ? "bg-primary text-primary-foreground rounded-2xl rounded-tr-sm"
              : "bg-secondary text-secondary-foreground rounded-2xl rounded-tl-sm"
          )}
        >
          <div className="flex flex-col">
            <span className="break-words whitespace-pre-wrap">{message.text}</span>
          </div>
        </div>
        
        <div
          className={cn(
            "message-time flex items-center",
            isMe ? "justify-end" : "justify-start"
          )}
        >
          <span className="text-muted-foreground text-xs">{message.timestamp}</span>
          
          {isMe && (
            <span className="ml-1 flex">
              <Check className="h-3 w-3 text-muted-foreground" />
              {message.read && <Check className="h-3 w-3 -ml-1 text-muted-foreground" />}
            </span>
          )}
        </div>
      </div>
      
      {isMe && (
        <div className="h-8 w-8 rounded-full overflow-hidden flex-shrink-0 ml-2 mt-1 border border-border/20">
          <img 
            src={localStorage.getItem('userAvatar') || "https://source.unsplash.com/collection/happy-people/120/me"} 
            alt="You" 
            className="h-full w-full object-cover" 
          />
        </div>
      )}
    </div>
  );
};

export default MessageBubble;
