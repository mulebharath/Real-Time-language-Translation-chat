
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useChat } from '@/contexts/ChatContext';
import ConversationHeader from '@/components/ConversationHeader';
import MessageList from '@/components/MessageList';
import MessageInput from '@/components/MessageInput';
import UserSearch from '@/components/UserSearch';

const ChatView = () => {
  const { chatId } = useParams<{ chatId: string }>();
  const { setActiveChatId, chats } = useChat();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!chatId) {
      navigate('/home');
      return;
    }
    
    const chatExists = chats.some(chat => chat.id === chatId);
    if (!chatExists) {
      navigate('/home');
      return;
    }
    
    setActiveChatId(chatId);
  }, [chatId, chats, navigate, setActiveChatId]);
  
  return (
    <div className="flex flex-col h-full">
      <ConversationHeader />
      <div className="px-4 py-2 border-b border-border/10">
        <UserSearch />
      </div>
      <MessageList />
      <MessageInput />
    </div>
  );
};

export default ChatView;
