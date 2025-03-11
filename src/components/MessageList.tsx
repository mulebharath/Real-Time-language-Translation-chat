
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

  // Function to check if a message contains only emojis
  const isEmojiOnly = (text: string) => {
    const emojiRegex = /^[\p{Emoji}\p{Emoji_Presentation}\p{Extended_Pictographic}\s]+$/u;
    return emojiRegex.test(text);
  };
  
  if (!activeChat) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-4 animate-fade-in">
        <MessageCircle className="h-16 w-16 text-muted-foreground/20 mb-4 animate-pulse" />
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
              animation: 'fade-in 0.3s ease-out forwards',
              transform: message.sender === 'me' ? 'translateX(20px)' : 'translateX(-20px)',
              animationFillMode: 'forwards',
              // Apply special styling for emoji-only messages
              ...(isEmojiOnly(message.text) && { fontSize: '1.5rem', textAlign: 'center' })
            }}
          >
            <MessageBubble
              message={message}
              isMe={message.sender === 'me'}
              isEmojiOnly={isEmojiOnly(message.text)}
            />
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default MessageList;
