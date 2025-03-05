
import React, { useEffect, useRef } from 'react';
import { useChat } from '@/contexts/ChatContext';
import MessageBubble from './MessageBubble';
import { MessageCircle } from 'lucide-react';

const MessageList = () => {
  const { activeChat } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeChat?.messages]);
  
  if (!activeChat) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-4 animate-fade-in">
        <MessageCircle className="h-16 w-16 text-muted-foreground/20 mb-4" />
        <p className="text-muted-foreground text-center">
          Select a chat to start messaging<br />
          <span className="text-sm opacity-70">Your conversations will appear here</span>
        </p>
      </div>
    );
  }
  
  return (
    <div className="flex-1 overflow-y-auto p-4 scrollbar-thin bg-background">
      <div className="max-w-3xl mx-auto">
        {activeChat.messages.map((message, index) => (
          <div 
            key={message.id}
            className="animate-fade-in"
            style={{ 
              animationDelay: `${index * 0.05}s`,
              opacity: 0,
              animation: 'fade-in 0.3s ease-out forwards'
            }}
          >
            <MessageBubble
              message={message}
              isMe={message.sender === 'me'}
            />
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default MessageList;
