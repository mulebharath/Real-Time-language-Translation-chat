import React, { createContext, useContext, useState, useEffect, ReactNode, useRef } from 'react';
import { nanoid } from 'nanoid';
import { useToast } from '@/hooks/use-toast';
import { toast as sonnerToast } from 'sonner';
import { initialChats, Chat, Message, Language } from '@/lib/data';
import { useNavigate } from 'react-router-dom';

interface ChatContextProps {
  chats: Chat[];
  activeChat: Chat | null;
  activeChatId: string | null;
  userLanguage: Language;
  setUserLanguage: (lang: Language) => void;
  setActiveChatId: (id: string | null) => void;
  sendMessage: (text: string) => void;
  toggleChatList: () => void;
  isChatListOpen: boolean;
  connectionStatus: 'connected' | 'connecting' | 'disconnected';
  startNewChat: (userName: string, userAvatar: string) => string;
}

const ChatContext = createContext<ChatContextProps | undefined>(undefined);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [chats, setChats] = useState<Chat[]>(initialChats);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [userLanguage, setUserLanguage] = useState<Language>('English');
  const [isChatListOpen, setIsChatListOpen] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'connecting' | 'disconnected'>('disconnected');
  const socketRef = useRef<any>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const activeChat = activeChatId 
    ? chats.find(chat => chat.id === activeChatId) || null 
    : null;

  const startNewChat = (userName: string, userAvatar: string) => {
    const newChatId = nanoid();
    
    const newChat: Chat = {
      id: newChatId,
      name: userName,
      avatar: userAvatar,
      language: userLanguage,
      status: 'online',
      messages: [],
    };
    
    setChats(prev => [...prev, newChat]);
    setActiveChatId(newChatId);
    
    return newChatId;
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    if (isLoggedIn) {
      setConnectionStatus('connecting');
      
      const connectionTimeout = setTimeout(() => {
        setConnectionStatus('connected');
        toast({
          title: "Connected",
          description: "Successfully connected to chat service",
        });
      }, 1500);
      
      return () => {
        clearTimeout(connectionTimeout);
      };
    }
  }, [toast]);

  const toggleChatList = () => {
    setIsChatListOpen(!isChatListOpen);
  };

  const sendMessage = (text: string) => {
    if (!text.trim() || !activeChat) return;
    
    const currentTime = new Date();
    const hours = currentTime.getHours() % 12 || 12;
    const minutes = currentTime.getMinutes().toString().padStart(2, '0');
    const ampm = currentTime.getHours() >= 12 ? 'PM' : 'AM';
    const timestamp = `${hours}:${minutes} ${ampm}`;
    
    const userName = localStorage.getItem('userName') || 'You';
    
    const newMessage: Message = {
      id: nanoid(),
      sender: 'me',
      text,
      timestamp,
      translatedText: text, // No translation in this implementation
      delivered: true,
      read: false,
      senderName: userName
    };
    
    setChats(prevChats => prevChats.map(chat => 
      chat.id === activeChatId 
        ? { ...chat, messages: [...chat.messages, newMessage] } 
        : chat
    ));
  };
  
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);
  
  return (
    <ChatContext.Provider value={{
      chats,
      activeChat,
      activeChatId,
      userLanguage,
      setUserLanguage,
      setActiveChatId,
      sendMessage,
      toggleChatList,
      isChatListOpen,
      connectionStatus,
      startNewChat
    }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
