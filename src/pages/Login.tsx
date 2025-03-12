
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Globe, Lock, Mail, MessageCircle, Server, Database } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please enter both email and password",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsLoading(true);
      
      // Simulate connection to Spring Boot backend
      toast({
        title: "Connecting",
        description: "Authenticating with Spring Boot backend...",
      });
      
      // In actual implementation, this would be a fetch call to the Spring Boot login endpoint
      // const response = await fetch('http://localhost:8080/api/auth/login', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ email, password }),
      // });
      
      // if (!response.ok) {
      //   throw new Error('Login failed');
      // }
      
      // const data = await response.json();
      // localStorage.setItem('authToken', data.token);
      
      // For demo purposes, simulate a successful authentication
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store authentication token that would come from the backend
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('authToken', 'demo-jwt-token');
      
      toast({
        title: "Success",
        description: "Login successful! Initializing WebSocket connection...",
      });
      
      // Simulate Socket.io connection initialization
      toast({
        title: "Connecting",
        description: "Establishing real-time connection with translation service...",
      });
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      navigate('/');
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Invalid credentials or server error",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const demoLogin = () => {
    setEmail('demo@example.com');
    setPassword('password');
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-background via-background to-secondary/20">
      <div className="p-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold tracking-tight flex items-center">
          <span className="text-yellow-400 mr-1">◆</span> 
          <span>ChatSphere</span>
        </h1>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="gap-1">
            <Globe className="h-4 w-4" />
            <span>English</span>
          </Button>
        </div>
      </div>
      
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md space-y-6 p-6 bg-card rounded-xl border border-border/40 shadow-xl animate-fade-in">
          <div className="space-y-2 text-center">
            <h2 className="text-3xl font-bold">Welcome Back</h2>
            <p className="text-muted-foreground">Sign in to continue to ChatSphere</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex justify-end">
                <Button variant="link" className="h-auto p-0 text-xs">
                  Forgot password?
                </Button>
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Connecting...' : 'Sign In'}
            </Button>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>
            
            <Button 
              type="button" 
              variant="outline" 
              className="w-full"
              onClick={demoLogin}
            >
              Demo Account
            </Button>
          </form>
          
          <div className="pt-4 text-center text-sm">
            <p className="text-muted-foreground">
              Don't have an account?{' '}
              <Button variant="link" className="h-auto p-0" onClick={() => navigate('/login')}>
                Sign up
              </Button>
            </p>
          </div>
          
          <div className="bg-secondary/30 p-3 rounded-lg text-xs text-muted-foreground space-y-2">
            <div className="font-medium text-foreground">Technology Stack:</div>
            <div className="flex items-center gap-1">
              <Server className="h-3 w-3" />
              <span>Java Spring Boot backend with WebSocket protocol</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle className="h-3 w-3" />
              <span>Socket.io for real-time chat translation</span>
            </div>
            <div className="flex items-center gap-1">
              <Globe className="h-3 w-3" />
              <span>NLP & Google Translate API for message translation</span>
            </div>
            <div className="flex items-center gap-1">
              <Database className="h-3 w-3" />
              <span>MongoDB & Redis for data storage and caching</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
