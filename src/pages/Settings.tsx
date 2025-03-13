
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { 
  BellRing, Sun, Moon, Globe, Volume2, Lock, Shield, LogOut
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Settings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleLogout = () => {
    // Display toast
    toast({
      title: "Logging out",
      description: "Clearing session data...",
    });
    
    // Clear authentication data
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('authToken');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    
    // Small delay before redirecting
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };
  
  return (
    <div className="container max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <BellRing className="mr-2 h-5 w-5" />
            Notifications
          </h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="notifications">Enable notifications</Label>
                <p className="text-sm text-muted-foreground">Receive notifications for new messages</p>
              </div>
              <Switch id="notifications" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="sounds">Notification sounds</Label>
                <p className="text-sm text-muted-foreground">Play sounds for new messages</p>
              </div>
              <Switch id="sounds" defaultChecked />
            </div>
          </div>
        </div>
        
        <Separator />
        
        <div>
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <Sun className="mr-2 h-5 w-5" />
            Appearance
          </h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="darkMode">Dark mode</Label>
                <p className="text-sm text-muted-foreground">Toggle between light and dark theme</p>
              </div>
              <Switch id="darkMode" />
            </div>
          </div>
        </div>
        
        <Separator />
        
        <div>
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <Globe className="mr-2 h-5 w-5" />
            Language
          </h2>
          <div className="grid grid-cols-1 gap-3">
            <div className="flex items-center space-x-2">
              <div className="w-full p-2 border rounded-lg cursor-pointer bg-secondary/40">
                <div className="font-medium">English</div>
                <div className="text-sm text-muted-foreground">United States</div>
              </div>
            </div>
          </div>
        </div>
        
        <Separator />
        
        <div>
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <Volume2 className="mr-2 h-5 w-5" />
            Media
          </h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="autoPlay">Auto-play media</Label>
                <p className="text-sm text-muted-foreground">Automatically play videos and audio</p>
              </div>
              <Switch id="autoPlay" defaultChecked />
            </div>
          </div>
        </div>
        
        <Separator />
        
        <div>
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <Shield className="mr-2 h-5 w-5" />
            Privacy & Security
          </h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="readReceipts">Read receipts</Label>
                <p className="text-sm text-muted-foreground">Allow others to see when you've read their messages</p>
              </div>
              <Switch id="readReceipts" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="twoFactor">Two-factor authentication</Label>
                <p className="text-sm text-muted-foreground">Secure your account with a second verification step</p>
              </div>
              <Switch id="twoFactor" />
            </div>
          </div>
        </div>
        
        <Separator />
        
        <div>
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <Lock className="mr-2 h-5 w-5" />
            Account
          </h2>
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              Change password
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Manage account data
            </Button>
            <Button 
              variant="destructive" 
              className="w-full flex items-center"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-5 w-5" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
