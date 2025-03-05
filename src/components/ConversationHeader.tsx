
import React from 'react';
import { useChat } from '@/contexts/ChatContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BadgeCheck, MoreHorizontal, Phone, Video } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

const ConversationHeader = () => {
  const { activeChat } = useChat();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  if (!activeChat) return null;
  
  const handleBack = () => {
    navigate('/');
  };
  
  return (
    <div className="h-16 flex items-center px-4 border-b border-border/10">
      <div className="flex items-center gap-3 w-full">
        {isMobile && (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleBack} 
            className="mr-1"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        )}
        
        <div className="relative flex-shrink-0">
          <img
            src={activeChat.avatar}
            alt={`${activeChat.name}'s avatar`}
            className="w-10 h-10 rounded-full object-cover"
          />
          {activeChat.status === 'online' && (
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-primary border-2 border-background rounded-full"></span>
          )}
          {activeChat.status === 'away' && (
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-amber-500 border-2 border-background rounded-full"></span>
          )}
        </div>
        
        <div className="flex-1">
          <div className="flex flex-col">
            <h3 className="font-medium text-left flex items-center">
              {activeChat.name}
              {activeChat.name === 'Alice' && (
                <BadgeCheck className="ml-1 h-4 w-4 text-primary" />
              )}
            </h3>
            <p className="text-xs text-muted-foreground text-left">
              {activeChat.status === 'online' 
                ? 'Online' 
                : activeChat.status === 'away'
                ? 'Away'
                : `Last seen ${activeChat.lastSeen || 'some time ago'}`}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-muted-foreground hover:text-foreground rounded-full"
          >
            <Phone className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-muted-foreground hover:text-foreground rounded-full"
          >
            <Video className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-muted-foreground hover:text-foreground rounded-full"
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConversationHeader;
