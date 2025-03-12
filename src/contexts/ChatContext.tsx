
import React, { createContext, useContext, useState, useEffect, ReactNode, useRef } from 'react';
import { nanoid } from 'nanoid';
import { useToast } from '@/hooks/use-toast';
import { toast as sonnerToast } from 'sonner';
import { initialChats, Chat, Message, Language } from '@/lib/data';
import { useNavigate } from 'react-router-dom';
import { Client } from '@stomp/stompjs';

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

// Spring Boot WebSocket server URL
const WEBSOCKET_URL = 'http://localhost:8080/ws'; // Adjust this to your Spring Boot server URL

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [chats, setChats] = useState<Chat[]>(initialChats);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [userLanguage, setUserLanguage] = useState<Language>('English');
  const [isChatListOpen, setIsChatListOpen] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'connecting' | 'disconnected'>('disconnected');
  
  // STOMP client reference
  const stompClientRef = useRef<Client | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const activeChat = activeChatId 
    ? chats.find(chat => chat.id === activeChatId) || null 
    : null;

  // Initialize WebSocket connection
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    if (isLoggedIn) {
      setConnectionStatus('connecting');
      
      try {
        // Initialize STOMP client
        const client = new Client({
          brokerURL: WEBSOCKET_URL,
          connectHeaders: {
            // Add auth token if needed
            // 'Authorization': 'Bearer ' + localStorage.getItem('authToken')
          },
          debug: function (str) {
            console.log('STOMP: ' + str);
          },
          reconnectDelay: 5000,
          heartbeatIncoming: 4000,
          heartbeatOutgoing: 4000
        });

        // Connect event handlers
        client.onConnect = (frame) => {
          setConnectionStatus('connected');
          toast({
            title: "Connected",
            description: "Successfully connected to translation service",
          });
          
          // Subscribe to user's chats
          chats.forEach(chat => {
            client.subscribe(`/topic/chat/${chat.id}`, message => {
              const receivedMessage = JSON.parse(message.body);
              
              // Update chat with new message
              setChats(prevChats => prevChats.map(c => 
                c.id === receivedMessage.chatId 
                  ? { 
                      ...c, 
                      messages: [...c.messages, {
                        id: receivedMessage.id || nanoid(),
                        sender: receivedMessage.sender,
                        text: receivedMessage.text,
                        timestamp: receivedMessage.timestamp,
                        translatedText: receivedMessage.translatedText,
                        delivered: true,
                        read: c.id === activeChatId,
                      }] 
                    } 
                  : c
              ));
              
              // Show notification if not active chat
              if (receivedMessage.chatId !== activeChatId) {
                const senderChat = chats.find(c => c.id === receivedMessage.chatId);
                if (senderChat) {
                  showNotification(senderChat.name, receivedMessage.translatedText, receivedMessage.chatId);
                }
              }
            });
          });
        };

        client.onStompError = (frame) => {
          console.error('STOMP error', frame);
          setConnectionStatus('disconnected');
          toast({
            title: "Connection Error",
            description: "Failed to connect to chat server",
            variant: "destructive"
          });
        };
        
        client.onWebSocketClose = () => {
          setConnectionStatus('disconnected');
          toast({
            title: "Disconnected",
            description: "Lost connection to chat server",
            variant: "destructive"
          });
        };

        // Start connection
        client.activate();
        stompClientRef.current = client;
      } catch (error) {
        console.error('WebSocket connection error:', error);
        setConnectionStatus('disconnected');
        toast({
          title: "Connection Error",
          description: "Failed to connect to chat server",
          variant: "destructive"
        });
      }
      
      return () => {
        // Cleanup WebSocket connection
        if (stompClientRef.current && stompClientRef.current.connected) {
          stompClientRef.current.deactivate();
        }
      };
    }
  }, [toast, chats]);

  const showNotification = (sender: string, message: string, chatId: string) => {
    if (Notification.permission === 'granted') {
      try {
        new Notification(`New message from ${sender}`, {
          body: message,
          icon: '/logo.png'
        });
      } catch (e) {
        fallbackToastNotification(sender, message, chatId);
      }
    } else {
      fallbackToastNotification(sender, message, chatId);
    }
  };

  const fallbackToastNotification = (sender: string, message: string, chatId: string) => {
    sonnerToast(`New message from ${sender}`, {
      description: message,
      action: {
        label: "View",
        onClick: () => navigate(`/chat/${chatId}`),
      },
      duration: 5000,
    });
  };

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
      translatedText: text, // Will be translated by server
      delivered: true,
      read: false,
    };
    
    // Add message to local state immediately (optimistic update)
    setChats(prevChats => prevChats.map(chat => 
      chat.id === activeChatId 
        ? { ...chat, messages: [...chat.messages, newMessage] } 
        : chat
    ));
    
    // Send message to Spring Boot backend via STOMP
    if (stompClientRef.current && stompClientRef.current.connected) {
      stompClientRef.current.publish({
        destination: `/app/chat/${activeChatId}/send`,
        body: JSON.stringify({
          chatId: activeChatId,
          content: text,
          sourceLanguage: userLanguage,
          targetLanguage: activeChat.language,
          sender: 'me',
          timestamp
        })
      });
    } else {
      // Fallback for disconnected state
      toast({
        title: "Not Connected",
        description: "Message not sent. Please check your connection.",
        variant: "destructive"
      });
    }
  };
  
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
