
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useChat } from '@/contexts/ChatContext';
import ConversationHeader from '@/components/ConversationHeader';
import MessageList from '@/components/MessageList';
import MessageInput from '@/components/MessageInput';
import { Loader2 } from 'lucide-react';

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
    
    // This would be handled by ChatContext's WebSocket subscription
    console.log(`Connected to chat ${chatId}, connection status: ${connectionStatus}`);
    
    return () => {
      // Cleanup handled by ChatContext
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
