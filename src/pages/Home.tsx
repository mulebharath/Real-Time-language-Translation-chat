
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useChat } from '@/contexts/ChatContext';
import { useIsMobile } from '@/hooks/use-mobile';

const Home = () => {
  const { chats } = useChat();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  // Redirect to the first chat on desktop
  React.useEffect(() => {
    if (!isMobile && chats.length > 0) {
      navigate(`chat/${chats[0].id}`);
    }
  }, [chats, isMobile, navigate]);
  
  if (!isMobile) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center space-y-3 max-w-md p-6">
          <h2 className="text-2xl font-semibold tracking-tight">Welcome to ChatSphere</h2>
          <p className="text-muted-foreground">
            Select a conversation from the sidebar to get started.
          </p>
        </div>
      </div>
    );
  }
  
  // On mobile, we just show the welcome screen
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center space-y-3 max-w-md p-6">
        <h2 className="text-2xl font-semibold tracking-tight">Welcome to ChatSphere</h2>
        <p className="text-muted-foreground">
          Chat with anyone in the world, in any language.
        </p>
      </div>
    </div>
  );
};

export default Home;
