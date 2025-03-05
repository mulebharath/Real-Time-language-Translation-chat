
import React, { useEffect, useRef } from 'react';
import { useChat } from '@/contexts/ChatContext';
import MessageBubble from './MessageBubble';

const MessageList = () => {
  const { activeChat } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeChat?.messages]);
  
  if (!activeChat) {
    return (
      <div className="flex-1 flex items-center justify-center p-4">
        <p className="text-muted-foreground">Select a chat to start messaging</p>
      </div>
    );
  }
  
  return (
    <div className="flex-1 overflow-y-auto p-4 scrollbar-thin">
      {activeChat.messages.map((message) => (
        <MessageBubble
          key={message.id}
          message={message}
          isMe={message.sender === 'me'}
        />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
