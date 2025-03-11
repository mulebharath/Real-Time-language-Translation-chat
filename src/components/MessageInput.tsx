
import React, { useState, useRef } from 'react';
import { useChat } from '@/contexts/ChatContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Smile, Send, Paperclip, Mic, Image, Camera, File, Loader2, Globe,
  Heart, Star, ThumbsUp, Zap, Party, Laugh, Frown, Coffee, Music, Sun
} from 'lucide-react';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const MessageInput = () => {
  const [message, setMessage] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const { sendMessage, activeChat, connectionStatus } = useChat();
  const inputRef = useRef<HTMLInputElement>(null);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    // In a real implementation, this is where we would show that the message is being translated
    setIsTranslating(true);
    
    try {
      // Simulate NLP translation processing delay
      // In the real implementation, this would be handled by the Spring Boot backend
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Send the message
      sendMessage(message);
      setMessage('');
    } finally {
      setIsTranslating(false);
    }
  };

  // Expanded emoji collection with categories
  const emojiCategories = {
    smileys: ['😀', '😂', '😍', '😊', '🙂', '😎', '🤔', '😢', '😭', '😡', '🙄', '😴', '🥺', '😏'],
    gestures: ['👍', '👎', '👌', '👋', '✌️', '🤞', '🤝', '👏', '🙏', '💪', '🤙', '👊'],
    hearts: ['❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '💕', '💓', '💗', '💖', '💘'],
    animals: ['🐶', '🐱', '🐭', '🐰', '🦊', '🐻', '🐼', '🐨', '🦁', '🐯', '🦄', '🐝'],
    food: ['🍎', '🍕', '🍔', '🍦', '🍩', '🍰', '🍺', '☕', '🍷', '🥂', '🍣', '🥗'],
    activities: ['⚽', '🏀', '🎮', '🎬', '🎵', '🎨', '🚗', '✈️', '🏠', '💻', '📱', '📚']
  };
  
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
        {connectionStatus !== 'connected' && (
          <div className="text-xs flex items-center gap-1 text-yellow-500 animate-pulse">
            <Loader2 className="h-3 w-3 animate-spin" />
            <span>{connectionStatus === 'connecting' ? 'Connecting...' : 'Disconnected'}</span>
          </div>
        )}
        
        <Popover>
          <PopoverTrigger asChild>
            <Button 
              type="button" 
              variant="ghost" 
              size="icon" 
              className="flex-shrink-0 text-muted-foreground hover:text-foreground rounded-full transition-colors"
              disabled={connectionStatus !== 'connected'}
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
              disabled={connectionStatus !== 'connected'}
            >
              <Smile className="h-5 w-5" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64 p-2 bg-secondary border-border/20" align="start" side="top">
            <Tabs defaultValue="smileys" className="w-full">
              <TabsList className="grid grid-cols-6 mb-2">
                <TabsTrigger value="smileys" className="p-1">😀</TabsTrigger>
                <TabsTrigger value="gestures" className="p-1">👍</TabsTrigger>
                <TabsTrigger value="hearts" className="p-1">❤️</TabsTrigger>
                <TabsTrigger value="animals" className="p-1">🐶</TabsTrigger>
                <TabsTrigger value="food" className="p-1">🍕</TabsTrigger>
                <TabsTrigger value="activities" className="p-1">⚽</TabsTrigger>
              </TabsList>
              
              {Object.entries(emojiCategories).map(([category, emojis]) => (
                <TabsContent key={category} value={category} className="mt-0">
                  <div className="flex gap-1.5 flex-wrap max-w-[240px]">
                    {emojis.map((emoji) => (
                      <button
                        key={emoji}
                        type="button"
                        onClick={() => insertEmoji(emoji)}
                        className="text-xl hover:bg-muted p-1.5 rounded cursor-pointer transition-colors"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </PopoverContent>
        </Popover>
        
        <Input
          ref={inputRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={connectionStatus === 'connected' ? "Type a message..." : "Waiting for connection..."}
          className="flex-1 bg-secondary/30 border-border/10 focus-visible:ring-primary/20 animate-fade-in"
          disabled={connectionStatus !== 'connected'}
          autoFocus
        />
        
        <Button 
          type="button" 
          variant="ghost" 
          size="icon" 
          className="flex-shrink-0 text-muted-foreground hover:text-foreground rounded-full transition-colors"
          disabled={connectionStatus !== 'connected'}
        >
          <Mic className="h-5 w-5" />
        </Button>
        
        <Button 
          type="submit" 
          size="icon" 
          disabled={!message.trim() || connectionStatus !== 'connected' || isTranslating}
          className="flex-shrink-0 rounded-full transition-all hover:shadow-lg hover:scale-105 active:scale-95"
        >
          {isTranslating ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Send className="h-5 w-5" />
          )}
        </Button>
      </div>
      
      {/* This section would show the current translation service status */}
      {activeChat && connectionStatus === 'connected' && (
        <div className="max-w-3xl mx-auto mt-1 text-xs text-muted-foreground flex items-center gap-1 pl-2">
          <Globe className="h-3 w-3" />
          <span>Translating to {activeChat.language} using NLP</span>
        </div>
      )}
    </form>
  );
};

export default MessageInput;
