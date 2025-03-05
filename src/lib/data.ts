
import { nanoid } from 'nanoid';

export type Language = 'English' | 'Spanish' | 'French' | 'German' | 'Japanese';

export interface Message {
  id: string;
  sender: 'me' | string;
  text: string;
  timestamp: string;
  translatedText: string;
  delivered?: boolean;
  read?: boolean;
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

const generateAvatar = (name: string) => {
  // Generate a consistent color based on the name
  const colors = ['amber', 'blue', 'cyan', 'emerald', 'fuchsia', 'green', 'indigo', 'lime', 'orange', 'pink', 'purple', 'red', 'rose', 'sky', 'teal', 'violet', 'yellow'];
  const colorIndex = name.charCodeAt(0) % colors.length;
  return `https://source.boringavatars.com/beam/120/${encodeURIComponent(name)}?colors=${colors[colorIndex]}`;
};

// Simulated translation function
export const translateText = (text: string, fromLang: Language, toLang: Language): string => {
  if (fromLang === toLang) return text;
  
  // Simple demo translations
  const translations: Record<string, Record<string, string>> = {
    'Hello!': {
      'Spanish': '¡Hola!',
      'French': 'Salut!',
      'German': 'Hallo!',
      'Japanese': 'こんにちは!'
    },
    '¡Hola!': {
      'English': 'Hello!',
      'French': 'Salut!',
      'German': 'Hallo!',
      'Japanese': 'こんにちは!'
    },
    'How are you?': {
      'Spanish': '¿Cómo estás?',
      'French': 'Comment ça va?',
      'German': 'Wie geht es dir?',
      'Japanese': 'お元気ですか?'
    },
    '¿Cómo estás?': {
      'English': 'How are you?',
      'French': 'Comment ça va?',
      'German': 'Wie geht es dir?',
      'Japanese': 'お元気ですか?'
    },
    'I\'m good, thanks!': {
      'Spanish': '¡Estoy bien, gracias!',
      'French': 'Je vais bien, merci!',
      'German': 'Mir geht es gut, danke!',
      'Japanese': '元気です、ありがとう!'
    },
    '¡Estoy bien, gracias!': {
      'English': 'I\'m good, thanks!',
      'French': 'Je vais bien, merci!',
      'German': 'Mir geht es gut, danke!',
      'Japanese': '元気です、ありがとう!'
    },
    'What are you doing?': {
      'Spanish': '¿Qué estás haciendo?',
      'French': 'Que fais-tu?',
      'German': 'Was machst du?',
      'Japanese': '何してるの?'
    },
    'Nice to meet you!': {
      'Spanish': '¡Encantado de conocerte!',
      'French': 'Ravi de vous rencontrer!',
      'German': 'Schön dich kennenzulernen!',
      'Japanese': 'はじめまして!'
    },
    'See you later!': {
      'Spanish': '¡Hasta luego!',
      'French': 'À plus tard!',
      'German': 'Bis später!',
      'Japanese': 'またね!'
    }
  };
  
  // Find translation if available
  if (fromLang === 'English' && translations[text] && translations[text][toLang]) {
    return translations[text][toLang];
  }
  
  // Try to find reverse translation
  for (const [srcText, targets] of Object.entries(translations)) {
    if (text === targets[fromLang as keyof typeof targets] && targets[toLang as keyof typeof targets]) {
      return targets[toLang as keyof typeof targets];
    }
  }
  
  // No translation found, return original with indicator
  return `[${text}]`;
};

// Generate timestamp for messages
const getRandomTime = () => {
  const hours = Math.floor(Math.random() * 12) + 1;
  const minutes = Math.floor(Math.random() * 60);
  const ampm = Math.random() > 0.5 ? 'AM' : 'PM';
  return `${hours}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`;
};

// Create sample messages
const createMessages = (contactName: string, contactLang: Language): Message[] => {
  const messages: Message[] = [];
  const greetings = [
    { sender: contactName, text: translateText('Hello!', 'English', contactLang) },
    { sender: 'me', text: 'Hello!' },
    { sender: contactName, text: translateText('How are you?', 'English', contactLang) },
    { sender: 'me', text: 'I\'m good, thanks!' },
  ];
  
  greetings.forEach((greeting, index) => {
    const fromLang = greeting.sender === 'me' ? 'English' : contactLang;
    const toLang = greeting.sender === 'me' ? contactLang : 'English';
    
    messages.push({
      id: nanoid(),
      sender: greeting.sender,
      text: greeting.text,
      timestamp: getRandomTime(),
      translatedText: translateText(greeting.text, fromLang, toLang),
      delivered: true,
      read: greeting.sender !== 'me' || index < greetings.length - 2,
    });
  });
  
  return messages;
};

// Sample conversations
export const initialChats: Chat[] = [
  {
    id: nanoid(),
    name: 'Alice',
    avatar: generateAvatar('Alice'),
    language: 'Spanish',
    status: 'online',
    messages: createMessages('Alice', 'Spanish'),
  },
  {
    id: nanoid(),
    name: 'Bob',
    avatar: generateAvatar('Bob'),
    language: 'French',
    status: 'online',
    lastSeen: '5m ago',
    messages: createMessages('Bob', 'French'),
  },
  {
    id: nanoid(),
    name: 'Carlos',
    avatar: generateAvatar('Carlos'),
    language: 'Spanish',
    status: 'offline',
    lastSeen: '2h ago',
    messages: createMessages('Carlos', 'Spanish'),
  },
  {
    id: nanoid(),
    name: 'Dieter',
    avatar: generateAvatar('Dieter'),
    language: 'German',
    status: 'away',
    messages: createMessages('Dieter', 'German'),
  },
  {
    id: nanoid(),
    name: 'Yuki',
    avatar: generateAvatar('Yuki'),
    language: 'Japanese',
    status: 'offline',
    lastSeen: '1d ago',
    messages: createMessages('Yuki', 'Japanese'),
  },
];

// Sample responses for the simulation
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
