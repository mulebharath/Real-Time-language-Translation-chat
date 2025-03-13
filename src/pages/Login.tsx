
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Lock, Mail, User } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSignUp && !name) {
      toast({
        title: "Error",
        description: "Please enter your name",
        variant: "destructive",
      });
      return;
    }
    
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
      
      // Simulate authentication process
      toast({
        title: "Connecting",
        description: "Authenticating...",
      });
      
      // In a real implementation, this would connect to a backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store user information
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('authToken', 'demo-jwt-token');
      localStorage.setItem('userEmail', email);
      localStorage.setItem('userName', isSignUp ? name : email.split('@')[0]);
      
      toast({
        title: "Success",
        description: `${isSignUp ? "Account created" : "Login"} successful!`,
      });
      
      navigate('/');
    } catch (error) {
      toast({
        title: "Authentication Failed",
        description: "Invalid credentials or server error",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleAuthMode = () => {
    setIsSignUp(!isSignUp);
  };

  const demoLogin = () => {
    setEmail('demo@example.com');
    setPassword('password');
    if (isSignUp) {
      setName('Demo User');
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-background via-background to-secondary/20">
      <div className="p-4 flex items-center justify-center">
        <h1 className="text-xl font-semibold tracking-tight flex items-center">
          <span className="text-yellow-400 mr-1">◆</span> 
          <span>ChatSphere</span>
        </h1>
      </div>
      
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md space-y-6 p-6 bg-card rounded-xl border border-border/40 shadow-xl animate-fade-in">
          <div className="space-y-2 text-center">
            <h2 className="text-3xl font-bold">{isSignUp ? "Create Account" : "Welcome Back"}</h2>
            <p className="text-muted-foreground">
              {isSignUp ? "Sign up to start chatting" : "Sign in to continue to ChatSphere"}
            </p>
          </div>
          
          <form onSubmit={handleAuth} className="space-y-4">
            {isSignUp && (
              <div className="space-y-2">
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            )}
            
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
              {!isSignUp && (
                <div className="flex justify-end">
                  <Button variant="link" className="h-auto p-0 text-xs">
                    Forgot password?
                  </Button>
                </div>
              )}
            </div>
            
            <Button 
              type="submit" 
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : isSignUp ? 'Sign Up' : 'Sign In'}
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
              {isSignUp ? "Already have an account?" : "Don't have an account?"}
              <Button variant="link" className="h-auto p-0" onClick={toggleAuthMode}>
                {isSignUp ? "Sign in" : "Sign up"}
              </Button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
