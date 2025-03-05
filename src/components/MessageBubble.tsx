
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
      <div className="flex flex-col max-w-[85%]">
        <div
          className={cn(
            "chat-bubble",
            isMe
              ? "bg-chat-sent text-chat-sent-foreground"
              : "bg-chat-received text-chat-received-foreground"
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
    </div>
  );
};

export default MessageBubble;
