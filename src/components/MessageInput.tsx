
import React, { useState, useRef } from 'react';
import { useChat } from '@/contexts/ChatContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Smile, Send, Paperclip, Mic, Image, Camera, File } from 'lucide-react';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';

const MessageInput = () => {
  const [message, setMessage] = useState('');
  const { sendMessage, activeChat } = useChat();
  const inputRef = useRef<HTMLInputElement>(null);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      sendMessage(message);
      setMessage('');
    }
  };

  const emojis = [
    '😀', '😂', '😍', '🤔', '👍', '❤️', '🎉', '👋', '🙏', '🔥',
    '😊', '😎', '🙄', '😢', '😡', '👏', '🌟', '💯', '🤝', '🎂',
    '✨', '💖', '💕', '💪', '👀', '🍕', '🍦', '🌈', '⚡', '💤'
  ];
  
  const insertEmoji = (emoji: string) => {
    setMessage(prev => prev + emoji);
    // Focus input after adding emoji
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };
  
  if (!activeChat) return null;
  
  return (
    <form onSubmit={handleSubmit} className="p-3 border-t border-border/10 bg-background">
      <div className="max-w-3xl mx-auto flex items-center gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button 
              type="button" 
              variant="ghost" 
              size="icon" 
              className="flex-shrink-0 text-muted-foreground hover:text-foreground rounded-full transition-colors"
            >
              <Paperclip className="h-5 w-5" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-48 p-2 bg-secondary border-border/20" align="start" side="top">
            <div className="flex flex-col gap-1">
              <Button variant="ghost" size="sm" className="justify-start">
                <Image className="h-4 w-4 mr-2" />
                <span>Image</span>
              </Button>
              <Button variant="ghost" size="sm" className="justify-start">
                <Camera className="h-4 w-4 mr-2" />
                <span>Camera</span>
              </Button>
              <Button variant="ghost" size="sm" className="justify-start">
                <File className="h-4 w-4 mr-2" />
                <span>Document</span>
              </Button>
            </div>
          </PopoverContent>
        </Popover>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button 
              type="button" 
              variant="ghost" 
              size="icon" 
              className="flex-shrink-0 text-muted-foreground hover:text-foreground rounded-full transition-colors"
            >
              <Smile className="h-5 w-5" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-2 bg-secondary border-border/20" align="start" side="top">
            <div className="flex gap-2 flex-wrap max-w-[240px]">
              {emojis.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => insertEmoji(emoji)}
                  className="text-xl hover:bg-muted p-1 rounded cursor-pointer transition-colors"
                >
                  {emoji}
                </button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
        
        <Input
          ref={inputRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 bg-secondary/30 border-border/10 focus-visible:ring-primary/20 animate-fade-in"
          autoFocus
        />
        
        <Button 
          type="button" 
          variant="ghost" 
          size="icon" 
          className="flex-shrink-0 text-muted-foreground hover:text-foreground rounded-full transition-colors"
        >
          <Mic className="h-5 w-5" />
        </Button>
        
        <Button 
          type="submit" 
          size="icon" 
          disabled={!message.trim()}
          className="flex-shrink-0 rounded-full transition-all hover:shadow-lg hover:scale-105 active:scale-95"
        >
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </form>
  );
};

export default MessageInput;
