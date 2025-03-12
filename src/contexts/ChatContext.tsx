
import React, { createContext, useContext, useState, useEffect, ReactNode, useRef } from 'react';
import { nanoid } from 'nanoid';
import { useToast } from '@/hooks/use-toast';
import { toast as sonnerToast } from 'sonner';
import { initialChats, sampleResponses, Chat, Message, Language, translateText } from '@/lib/data';
import { useNavigate } from 'react-router-dom';
// Placeholder for Socket.io - will be implemented when backend is ready
// import { io, Socket } from 'socket.io-client';

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
}

const ChatContext = createContext<ChatContextProps | undefined>(undefined);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [chats, setChats] = useState<Chat[]>(initialChats);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [userLanguage, setUserLanguage] = useState<Language>('English');
  const [isChatListOpen, setIsChatListOpen] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'connecting' | 'disconnected'>('disconnected');
  // Socket.io reference - will be used when backend is ready
  const socketRef = useRef<any>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const activeChat = activeChatId 
    ? chats.find(chat => chat.id === activeChatId) || null 
    : null;

  // Simulating Socket.io connection for now
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    if (isLoggedIn) {
      setConnectionStatus('connecting');
      
      // Simulate WebSocket connection
      const connectionTimeout = setTimeout(() => {
        setConnectionStatus('connected');
        toast({
          title: "Connected",
          description: "Successfully connected to translation service",
        });
        
        // This is where we would initialize the actual Socket.io connection
        // socketRef.current = io('http://localhost:8080', {
        //   auth: {
        //     token: localStorage.getItem('authToken')
        //   }
        // });
        
        // socketRef.current.on('connect', () => {
        //   setConnectionStatus('connected');
        // });
        
        // socketRef.current.on('message', (data) => {
        //   // Handle incoming messages
        // });
        
        // socketRef.current.on('disconnect', () => {
        //   setConnectionStatus('disconnected');
        // });
        
      }, 1500);
      
      return () => {
        clearTimeout(connectionTimeout);
        // Clean up socket connection when component unmounts
        // if (socketRef.current) {
        //   socketRef.current.disconnect();
        // }
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
    
    // This would be where we send the message to the Spring Boot backend via Socket.io
    // if (socketRef.current && socketRef.current.connected) {
    //   socketRef.current.emit('send_message', {
    //     chatId: activeChatId,
    //     message: text,
    //     sourceLanguage: 'English',
    //     targetLanguage: activeChat.language
    //   });
    // }
    
    // For now, simulate a response after a delay
    setTimeout(() => {
      const responseText = sampleResponses[Math.floor(Math.random() * sampleResponses.length)];
      // This would normally come from the Spring Boot backend with NLP translation
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
  
  // Simulate incoming messages periodically (would be replaced by actual Socket.io events)
  useEffect(() => {
    if (connectionStatus !== 'connected') return;
    
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
      // This would normally be translated by the Spring Boot backend using NLP
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
      
      // Use the browser Notifications API (placeholder for Push API integration)
      if (Notification.permission === 'granted') {
        try {
          // This would be replaced by proper Push API integration
          new Notification(`New message from ${randomChat.name}`, {
            body: randomResponse,
            icon: '/logo.png'
          });
        } catch (e) {
          // Fallback to toast notification
          sonnerToast(`New message from ${randomChat.name}`, {
            description: randomResponse,
            action: {
              label: "View",
              onClick: () => navigate(`/chat/${randomChat.id}`),
            },
            duration: 5000,
          });
        }
      } else {
        // Fallback to toast notification
        sonnerToast(`New message from ${randomChat.name}`, {
          description: randomResponse,
          action: {
            label: "View",
            onClick: () => navigate(`/chat/${randomChat.id}`),
          },
          duration: 5000,
        });
      }
      
    }, 30000); // Every 30 seconds
    
    return () => clearInterval(interval);
  }, [chats, activeChatId, navigate, connectionStatus]);

  // Request notification permission when the app loads
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
      connectionStatus
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

