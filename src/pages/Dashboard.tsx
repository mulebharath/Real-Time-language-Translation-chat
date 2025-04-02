
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { initialChats } from '@/lib/data';
import { MessageCircle, Users, Globe, Bell, LayoutDashboard, Settings } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  
  // Calculate stats
  const totalMessages = initialChats.reduce(
    (total, chat) => total + chat.messages.length, 0
  );
  
  const onlineContacts = initialChats.filter(
    chat => chat.status === 'online'
  ).length;
  
  // Set languages count to 10 to match all available languages
  const languages = 10;
  
  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-secondary/20 border-r border-border/10 p-4 hidden md:block">
        <div className="flex items-center gap-2 mb-8">
          <MessageCircle className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold">ChatSphere</h1>
        </div>
        
        <nav className="space-y-1">
          <Button 
            variant="secondary" 
            className="w-full justify-start" 
            onClick={() => navigate('/dashboard')}
          >
            <LayoutDashboard className="h-4 w-4 mr-2" />
            Dashboard
          </Button>
          <Button 
            variant="ghost" 
            className="w-full justify-start" 
            onClick={() => navigate('/home')}
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            Chats
          </Button>
          <Button 
            variant="ghost" 
            className="w-full justify-start"
            onClick={() => navigate('/contacts')}
          >
            <Users className="h-4 w-4 mr-2" />
            Contacts
          </Button>
          <Button 
            variant="ghost" 
            className="w-full justify-start"
            onClick={() => navigate('/notifications')}
          >
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </Button>
          <Button 
            variant="ghost" 
            className="w-full justify-start"
            onClick={() => navigate('/settings')}
          >
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </nav>
      </div>
      
      {/* Main content */}
      <div className="md:ml-64 p-6">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome to ChatSphere</p>
        </header>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Total Messages</CardTitle>
              <CardDescription>Across all conversations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <MessageCircle className="h-8 w-8 text-primary mr-3" />
                <span className="text-3xl font-bold">{totalMessages}</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Online Contacts</CardTitle>
              <CardDescription>Ready to chat</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Users className="h-8 w-8 text-green-500 mr-3" />
                <span className="text-3xl font-bold">{onlineContacts}</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Languages</CardTitle>
              <CardDescription>Supported in chats</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Globe className="h-8 w-8 text-blue-500 mr-3" />
                <span className="text-3xl font-bold">{languages}</span>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Recent Conversations */}
        <h2 className="text-xl font-bold mb-4">Recent Conversations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {initialChats.map(chat => (
            <Card 
              key={chat.id} 
              className="cursor-pointer hover:bg-secondary/10" 
              onClick={() => navigate(`/home/chat/${chat.id}`)}
            >
              <CardHeader className="pb-2">
                <div className="flex items-center">
                  <div className="relative mr-3">
                    <img 
                      src={chat.avatar} 
                      alt={chat.name} 
                      className="w-10 h-10 rounded-full object-cover" 
                    />
                    {chat.status === 'online' && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-background rounded-full"></span>
                    )}
                  </div>
                  <div>
                    <CardTitle className="text-base">{chat.name}</CardTitle>
                    <CardDescription>
                      {chat.status === 'online' ? 'Online' : chat.status === 'away' ? 'Away' : `Last seen ${chat.lastSeen}`}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="text-sm truncate">
                {chat.messages[chat.messages.length-1]?.text || 'No messages yet'}
              </CardContent>
              <CardFooter className="text-xs text-muted-foreground">
                {chat.language} · {chat.messages.length} messages
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
