
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { nanoid } from 'nanoid';
import { useToast } from '@/components/ui/use-toast';
import { toast as sonnerToast } from 'sonner';
import { initialChats, sampleResponses, Chat, Message, Language, translateText } from '@/lib/data';
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
}

const ChatContext = createContext<ChatContextProps | undefined>(undefined);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [chats, setChats] = useState<Chat[]>(initialChats);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [userLanguage, setUserLanguage] = useState<Language>('English');
  const [isChatListOpen, setIsChatListOpen] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  const activeChat = activeChatId 
    ? chats.find(chat => chat.id === activeChatId) || null 
    : null;

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
    
    const newMessage: Message = {
      id: nanoid(),
      sender: 'me',
      text,
      timestamp,
      translatedText: translateText(text, 'English', activeChat.language),
      delivered: true,
      read: false,
    };
    
    setChats(prevChats => prevChats.map(chat => 
      chat.id === activeChatId 
        ? { ...chat, messages: [...chat.messages, newMessage] } 
        : chat
    ));
    
    // Simulate a response after a delay
    setTimeout(() => {
      const responseText = sampleResponses[Math.floor(Math.random() * sampleResponses.length)];
      const translatedResponse = translateText(responseText, 'English', activeChat.language);
      
      const responseMessage: Message = {
        id: nanoid(),
        sender: activeChat.name,
        text: translatedResponse,
        timestamp,
        translatedText: responseText,
        delivered: true,
        read: true,
      };
      
      setChats(prevChats => prevChats.map(chat => 
        chat.id === activeChatId 
          ? { ...chat, messages: [...chat.messages, responseMessage] } 
          : chat
      ));
    }, 1500);
  };
  
  // Simulate incoming messages periodically
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly select a chat
      const randomChatIndex = Math.floor(Math.random() * chats.length);
      const randomChat = chats[randomChatIndex];
      
      // Skip if this is the active chat
      if (randomChat.id === activeChatId) return;
      
      const currentTime = new Date();
      const hours = currentTime.getHours() % 12 || 12;
      const minutes = currentTime.getMinutes().toString().padStart(2, '0');
      const ampm = currentTime.getHours() >= 12 ? 'PM' : 'AM';
      const timestamp = `${hours}:${minutes} ${ampm}`;
      
      const randomResponse = sampleResponses[Math.floor(Math.random() * sampleResponses.length)];
      const translatedResponse = translateText(randomResponse, 'English', randomChat.language);
      
      const newMessage: Message = {
        id: nanoid(),
        sender: randomChat.name,
        text: translatedResponse,
        timestamp,
        translatedText: randomResponse,
        delivered: true,
        read: false,
      };
      
      setChats(prevChats => prevChats.map(chat => 
        chat.id === randomChat.id 
          ? { ...chat, messages: [...chat.messages, newMessage] } 
          : chat
      ));
      
      // Show a notification
      sonnerToast(`New message from ${randomChat.name}`, {
        description: randomResponse,
        action: {
          label: "View",
          onClick: () => navigate(`/chat/${randomChat.id}`),
        },
        duration: 5000,
      });
      
    }, 30000); // Every 30 seconds
    
    return () => clearInterval(interval);
  }, [chats, activeChatId, navigate]);
  
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
      isChatListOpen
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
