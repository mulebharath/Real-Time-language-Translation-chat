
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useChat } from '@/contexts/ChatContext';
import ConversationHeader from '@/components/ConversationHeader';
import MessageList from '@/components/MessageList';
import MessageInput from '@/components/MessageInput';

const ChatView = () => {
  const { chatId } = useParams<{ chatId: string }>();
  const { setActiveChatId, chats } = useChat();
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
  }, [chatId, chats, navigate, setActiveChatId]);
  
  return (
    <div className="flex flex-col h-full">
      <ConversationHeader />
      <MessageList />
      <MessageInput />
    </div>
  );
};

export default ChatView;
