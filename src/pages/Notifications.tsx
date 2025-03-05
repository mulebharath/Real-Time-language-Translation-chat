
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, CheckCheck, Trash2 } from "lucide-react";

const initialNotifications = [
  { 
    id: 1, 
    title: "New message from Alice",
    description: "Hey, how are you doing today?",
    time: "Just now",
    read: false,
    avatar: "https://source.unsplash.com/collection/happy-people/100x100?1"
  },
  { 
    id: 2, 
    title: "Bob shared a photo with you",
    description: "Check out this amazing sunset!",
    time: "2 hours ago",
    read: false,
    avatar: "https://source.unsplash.com/collection/happy-people/100x100?2"
  },
  { 
    id: 3, 
    title: "Carol sent you a friend request",
    description: "Carol Williams wants to connect with you",
    time: "Yesterday",
    read: true,
    avatar: "https://source.unsplash.com/collection/happy-people/100x100?3"
  },
  { 
    id: 4, 
    title: "Dave invited you to a group",
    description: "Join 'Project Discussion' group chat",
    time: "2 days ago",
    read: true,
    avatar: "https://source.unsplash.com/collection/happy-people/100x100?4"
  },
];

const Notifications = () => {
  const [notifications, setNotifications] = useState(initialNotifications);
  
  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
  };
  
  const handleClearAll = () => {
    setNotifications([]);
  };
  
  const handleMarkAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notif => notif.id === id ? { ...notif, read: true } : notif)
    );
  };
  
  return (
    <div className="max-w-4xl mx-auto p-4 animate-fade-in">
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              <span>Notifications</span>
              {notifications.some(n => !n.read) && (
                <Badge variant="destructive" className="ml-2">
                  {notifications.filter(n => !n.read).length} new
                </Badge>
              )}
            </CardTitle>
            <div className="flex gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleMarkAllAsRead}
                disabled={!notifications.some(n => !n.read)}
              >
                <CheckCheck className="h-4 w-4 mr-1" />
                Mark all as read
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleClearAll}
                disabled={notifications.length === 0}
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Clear all
              </Button>
            </div>
          </div>
          <CardDescription>Stay updated with your latest notifications</CardDescription>
        </CardHeader>
        <CardContent>
          {notifications.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground animate-fade-in">
              <Bell className="h-12 w-12 mx-auto mb-4 opacity-20" />
              <p>No notifications to display</p>
            </div>
          ) : (
            <div className="space-y-3">
              {notifications.map(notification => (
                <div
                  key={notification.id}
                  className={`p-3 rounded-lg border border-border/20 hover:bg-secondary/30 transition-all animate-fade-in ${
                    !notification.read ? 'bg-secondary/50' : ''
                  }`}
                  onClick={() => handleMarkAsRead(notification.id)}
                >
                  <div className="flex items-start gap-3">
                    <img 
                      src={notification.avatar} 
                      alt="User avatar"
                      className="w-10 h-10 rounded-full object-cover mt-1" 
                    />
                    <div className="flex-grow">
                      <h3 className="font-medium text-sm">{notification.title}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{notification.description}</p>
                      <p className="text-xs text-muted-foreground mt-2">{notification.time}</p>
                    </div>
                    {!notification.read && (
                      <div className="h-2 w-2 rounded-full bg-primary flex-shrink-0 mt-2"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Notifications;
