
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
        "flex mb-3 animate-fade-in",
        isMe ? "justify-end" : "justify-start"
      )}
    >
      {!isMe && (
        <div className="h-8 w-8 rounded-full overflow-hidden flex-shrink-0 mr-2 mt-1">
          <img src={`https://source.boringavatars.com/beam/120/${message.sender}`} alt={message.sender} className="h-full w-full object-cover" />
        </div>
      )}
      
      <div className="flex flex-col max-w-[85%]">
        <div
          className={cn(
            "chat-bubble",
            isMe
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground"
          )}
        >
          <div className="flex flex-col">
            <span>{message.text}</span>
            {!isMe && (
              <span className="translate-tag">
                Translated from {message.sender}'s language
              </span>
            )}
          </div>
        </div>
        
        <div
          className={cn(
            "message-time flex items-center",
            isMe ? "justify-end" : "justify-start"
          )}
        >
          <span>{message.timestamp}</span>
          
          {isMe && (
            <span className="ml-1 flex">
              <Check className="h-3 w-3" />
              {message.read && <Check className="h-3 w-3 -ml-1" />}
            </span>
          )}
        </div>
      </div>
      
      {isMe && (
        <div className="h-8 w-8 rounded-full overflow-hidden flex-shrink-0 ml-2 mt-1">
          <img src="https://source.boringavatars.com/beam/120/You" alt="You" className="h-full w-full object-cover" />
        </div>
      )}
    </div>
  );
};

export default MessageBubble;
