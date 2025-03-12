
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useChat } from '@/contexts/ChatContext';
import ConversationHeader from '@/components/ConversationHeader';
import MessageList from '@/components/MessageList';
import MessageInput from '@/components/MessageInput';
import { Loader2, WifiOff } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ChatView = () => {
  const { chatId } = useParams<{ chatId: string }>();
  const { setActiveChatId, chats, connectionStatus } = useChat();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!chatId) {
      navigate('/');
      return;
    }
    
    const chatExists = chats.some(chat => chat.id === chatId);
    if (!chatExists) {
      navigate('/');
      return;
    }
    
    setActiveChatId(chatId);
    
    // This would be where we'd connect to the specific chat channel via Socket.io
    console.log(`Connected to chat ${chatId}, connection status: ${connectionStatus}`);
    
    // In a real implementation, this is where we'd join the specific chat room
    // socketRef.current.emit('join_chat', { chatId });
    
    return () => {
      // Cleanup: leave chat room when component unmounts
      // socketRef.current.emit('leave_chat', { chatId });
    };
  }, [chatId, chats, navigate, setActiveChatId, connectionStatus]);
  
  if (!chatId) return null;
  
  return (
    <div className="flex flex-col h-full">
      <ConversationHeader />
      
      {connectionStatus === 'connecting' ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <Loader2 className="h-8 w-8 animate-spin" />
            <span>Connecting to chat server...</span>
          </div>
        </div>
      ) : connectionStatus === 'disconnected' ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3 text-muted-foreground">
            <WifiOff className="h-8 w-8" />
            <span>Disconnected from server</span>
            <Button 
              variant="secondary" 
              onClick={() => window.location.reload()}
              className="mt-2"
            >
              Reconnect
            </Button>
          </div>
        </div>
      ) : (
        <>
          <MessageList />
          <MessageInput />
        </>
      )}
    </div>
  );
};

export default ChatView;
