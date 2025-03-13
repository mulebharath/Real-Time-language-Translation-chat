
import { nanoid } from 'nanoid';

export type Language = 'English' | 'Spanish' | 'French' | 'German' | 'Japanese' | 'Chinese' | 'Russian' | 'Arabic' | 'Portuguese' | 'Hindi';

export interface Message {
  id: string;
  sender: 'me' | string;
  text: string;
  timestamp: string;
  translatedText: string;
  delivered?: boolean;
  read?: boolean;
  senderName?: string;
}

export interface Chat {
  id: string;
  name: string;
  avatar: string;
  language: Language;
  status: 'online' | 'offline' | 'away';
  lastSeen?: string;
  messages: Message[];
}

// Stock images for avatars
const stockImages = {
  'Alice': 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=120&h=120&fit=crop',
  'Bob': 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=120&h=120&fit=crop',
  'Carlos': 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=120&h=120&fit=crop',
  'Dieter': 'https://images.unsplash.com/photo-1466721591366-2d5fba72006d?w=120&h=120&fit=crop',
  'Yuki': 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=120&h=120&fit=crop',
  'Me': 'https://source.boringavatars.com/beam/120/You',
  'User': '/lovable-uploads/d3b8c3f5-99d7-4e68-a793-894924b80c68.png'
};

const generateAvatar = (name: string) => {
  // Use stock image if available, otherwise generate one
  if (stockImages[name as keyof typeof stockImages]) {
    return stockImages[name as keyof typeof stockImages];
  }
  
  // Generate a consistent color based on the name
  const colors = ['amber', 'blue', 'cyan', 'emerald', 'fuchsia', 'green', 'indigo', 'lime', 'orange', 'pink', 'purple', 'red', 'rose', 'sky', 'teal', 'violet', 'yellow'];
  const colorIndex = name.charCodeAt(0) % colors.length;
  return `https://source.boringavatars.com/beam/120/${encodeURIComponent(name)}?colors=${colors[colorIndex]}`;
};

// Generate timestamp for messages
const getRandomTime = () => {
  const hours = Math.floor(Math.random() * 12) + 1;
  const minutes = Math.floor(Math.random() * 60);
  const ampm = Math.random() > 0.5 ? 'AM' : 'PM';
  return `${hours}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`;
};

// Create sample messages for chat history
const createMessages = (contactName: string): Message[] => {
  const messages: Message[] = [];
  const sampleConversation = [
    { sender: contactName, text: 'Hey there!' },
    { sender: 'me', text: 'Hi! How are you doing?' },
    { sender: contactName, text: 'I\'m good, thanks for asking.' },
    { sender: 'me', text: 'Did you see the latest updates?' },
  ];
  
  sampleConversation.forEach((msg) => {
    messages.push({
      id: nanoid(),
      sender: msg.sender,
      text: msg.text,
      timestamp: getRandomTime(),
      translatedText: msg.text, // No translation in this implementation
      delivered: true,
      read: msg.sender !== 'me',
      senderName: msg.sender !== 'me' ? contactName : undefined
    });
  });
  
  return messages;
};

// Sample chats for the initial state
export const initialChats: Chat[] = [
  {
    id: nanoid(),
    name: 'Alice',
    avatar: generateAvatar('Alice'),
    language: 'English',
    status: 'online',
    messages: createMessages('Alice'),
  },
  {
    id: nanoid(),
    name: 'Bob',
    avatar: generateAvatar('Bob'),
    language: 'English',
    status: 'online',
    lastSeen: '5m ago',
    messages: createMessages('Bob'),
  },
  {
    id: nanoid(),
    name: 'Carlos',
    avatar: generateAvatar('Carlos'),
    language: 'English',
    status: 'offline',
    lastSeen: '2h ago',
    messages: createMessages('Carlos'),
  },
  {
    id: nanoid(),
    name: 'Dieter',
    avatar: generateAvatar('Dieter'),
    language: 'English',
    status: 'away',
    messages: createMessages('Dieter'),
  },
  {
    id: nanoid(),
    name: 'Yuki',
    avatar: generateAvatar('Yuki'),
    language: 'English',
    status: 'offline',
    lastSeen: '1d ago',
    messages: createMessages('Yuki'),
  },
];

// Sample responses for testing (no longer used for AI responses)
export const sampleResponses = [
  'Hello there!',
  'How are you today?',
  'Nice to hear from you!',
  'What are you up to?',
  'I was just thinking about you!',
  'Have you seen that new movie?',
  'Do you have plans for the weekend?',
  'I\'m working on a project right now.',
  'The weather is lovely today!',
  'Did you get my message earlier?',
  'Let\'s meet up soon!',
  'I agree with you completely!',
  'That\'s really interesting!',
  'I didn\'t know that, thanks for sharing!',
  'Sorry for the late reply!'
];
