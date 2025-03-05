
import React, { useState } from 'react';
import { useChat } from '@/contexts/ChatContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Smile, Send, Paperclip, Mic } from 'lucide-react';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';

const MessageInput = () => {
  const [message, setMessage] = useState('');
  const { sendMessage, activeChat } = useChat();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      sendMessage(message);
      setMessage('');
    }
  };

  const emojis = ['😀', '😂', '😍', '🤔', '👍', '❤️', '🎉', '👋', '🙏', '🔥'];
  
  const insertEmoji = (emoji: string) => {
    setMessage(prev => prev + emoji);
  };
  
  if (!activeChat) return null;
  
  return (
    <form onSubmit={handleSubmit} className="p-3 border-t border-border/10 bg-background">
      <div className="max-w-3xl mx-auto flex items-center gap-2">
        <Button 
          type="button" 
          variant="ghost" 
          size="icon" 
          className="flex-shrink-0 text-muted-foreground hover:text-foreground rounded-full"
        >
          <Paperclip className="h-5 w-5" />
        </Button>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button 
              type="button" 
              variant="ghost" 
              size="icon" 
              className="flex-shrink-0 text-muted-foreground hover:text-foreground rounded-full"
            >
              <Smile className="h-5 w-5" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-2 bg-secondary border-border/20" align="start" side="top">
            <div className="flex gap-2 flex-wrap max-w-[200px]">
              {emojis.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => insertEmoji(emoji)}
                  className="text-xl hover:bg-muted p-1 rounded cursor-pointer"
                >
                  {emoji}
                </button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
        
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 bg-secondary/30 border-border/10 focus-visible:ring-primary/20"
          autoFocus
        />
        
        <Button 
          type="button" 
          variant="ghost" 
          size="icon" 
          className="flex-shrink-0 text-muted-foreground hover:text-foreground rounded-full"
        >
          <Mic className="h-5 w-5" />
        </Button>
        
        <Button 
          type="submit" 
          size="icon" 
          disabled={!message.trim()}
          className="flex-shrink-0 rounded-full"
        >
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </form>
  );
};

export default MessageInput;
