
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MessageCircle, Lock } from 'lucide-react';
import { toast } from 'sonner';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      if (email.trim() && password.trim()) {
        // Just for demo, any valid input works
        localStorage.setItem('isLoggedIn', 'true');
        toast.success('Logged in successfully!');
        navigate('/dashboard');
      } else {
        toast.error('Please enter valid credentials');
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <MessageCircle className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold">ChatSphere</h1>
          <p className="text-muted-foreground mt-2">
            Sign in to connect across languages
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 mt-8">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading}
          >
            {isLoading ? (
              <>Loading...</>
            ) : (
              <>
                <Lock className="h-4 w-4 mr-2" />
                Sign In
              </>
            )}
          </Button>
          
          <div className="text-center text-sm">
            <span className="text-muted-foreground">Don't have an account? </span>
            <a href="#" className="text-primary hover:underline">Sign up</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
