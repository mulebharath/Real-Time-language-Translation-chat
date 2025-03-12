
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Globe, Lock, Mail, User, Eye, EyeOff } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

const Login = () => {
  // Login state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  
  // Signup state
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Validation state
  const [loginErrors, setLoginErrors] = useState({ email: '', password: '' });
  const [signupErrors, setSignupErrors] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    confirmPassword: '' 
  });
  
  const { toast } = useToast();
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn) {
      navigate('/');
    }
  }, [navigate]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateLoginForm = () => {
    const errors = { email: '', password: '' };
    let isValid = true;

    if (!email) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!validateEmail(email)) {
      errors.email = 'Invalid email format';
      isValid = false;
    }

    if (!password) {
      errors.password = 'Password is required';
      isValid = false;
    }

    setLoginErrors(errors);
    return isValid;
  };

  const validateSignupForm = () => {
    const errors = { name: '', email: '', password: '', confirmPassword: '' };
    let isValid = true;

    if (!name) {
      errors.name = 'Name is required';
      isValid = false;
    }

    if (!signupEmail) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!validateEmail(signupEmail)) {
      errors.email = 'Invalid email format';
      isValid = false;
    }

    if (!signupPassword) {
      errors.password = 'Password is required';
      isValid = false;
    } else if (signupPassword.length < 6) {
      errors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    if (!confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
      isValid = false;
    } else if (signupPassword !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setSignupErrors(errors);
    return isValid;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateLoginForm()) {
      return;
    }
    
    try {
      setIsLoading(true);
      
      toast({
        title: "Connecting",
        description: "Authenticating with server...",
      });
      
      // Simulate authentication
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store auth token that would come from the backend
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('authToken', 'demo-jwt-token');
      localStorage.setItem('userEmail', email);
      
      toast({
        title: "Success",
        description: "Login successful! Connecting to messaging service...",
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

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateSignupForm()) {
      return;
    }
    
    try {
      setIsSigningUp(true);
      
      toast({
        title: "Creating Account",
        description: "Setting up your new account...",
      });
      
      // Simulate account creation
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Store auth token that would come from the backend
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('authToken', 'demo-jwt-token');
      localStorage.setItem('userName', name);
      localStorage.setItem('userEmail', signupEmail);
      
      toast({
        title: "Success",
        description: "Account created successfully! Welcome to ChatSphere.",
      });
      
      navigate('/');
    } catch (error) {
      toast({
        title: "Signup Failed",
        description: "There was an error creating your account. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSigningUp(false);
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
        <div className="w-full max-w-md space-y-6 animate-fade-in">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-center">Welcome Back</CardTitle>
                  <CardDescription className="text-center">
                    Sign in to continue to ChatSphere
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="Email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (loginErrors.email) {
                              setLoginErrors({...loginErrors, email: ''});
                            }
                          }}
                          className={`pl-10 ${loginErrors.email ? 'border-red-500' : ''}`}
                        />
                      </div>
                      {loginErrors.email && (
                        <p className="text-red-500 text-xs mt-1">{loginErrors.email}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="password"
                          type={showLoginPassword ? "text" : "password"}
                          placeholder="Password"
                          value={password}
                          onChange={(e) => {
                            setPassword(e.target.value);
                            if (loginErrors.password) {
                              setLoginErrors({...loginErrors, password: ''});
                            }
                          }}
                          className={`pl-10 ${loginErrors.password ? 'border-red-500' : ''}`}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-2 top-2"
                          onClick={() => setShowLoginPassword(!showLoginPassword)}
                        >
                          {showLoginPassword ? 
                            <EyeOff className="h-4 w-4 text-muted-foreground" /> : 
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          }
                        </Button>
                      </div>
                      {loginErrors.password && (
                        <p className="text-red-500 text-xs mt-1">{loginErrors.password}</p>
                      )}
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
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="signup">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-center">Create Account</CardTitle>
                  <CardDescription className="text-center">
                    Join ChatSphere to connect across languages
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSignup} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullname">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="fullname"
                          placeholder="Full Name"
                          value={name}
                          onChange={(e) => {
                            setName(e.target.value);
                            if (signupErrors.name) {
                              setSignupErrors({...signupErrors, name: ''});
                            }
                          }}
                          className={`pl-10 ${signupErrors.name ? 'border-red-500' : ''}`}
                        />
                      </div>
                      {signupErrors.name && (
                        <p className="text-red-500 text-xs mt-1">{signupErrors.name}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="signup-email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="signup-email"
                          type="email"
                          placeholder="Email"
                          value={signupEmail}
                          onChange={(e) => {
                            setSignupEmail(e.target.value);
                            if (signupErrors.email) {
                              setSignupErrors({...signupErrors, email: ''});
                            }
                          }}
                          className={`pl-10 ${signupErrors.email ? 'border-red-500' : ''}`}
                        />
                      </div>
                      {signupErrors.email && (
                        <p className="text-red-500 text-xs mt-1">{signupErrors.email}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="signup-password"
                          type={showSignupPassword ? "text" : "password"}
                          placeholder="Password"
                          value={signupPassword}
                          onChange={(e) => {
                            setSignupPassword(e.target.value);
                            if (signupErrors.password) {
                              setSignupErrors({...signupErrors, password: ''});
                            }
                          }}
                          className={`pl-10 ${signupErrors.password ? 'border-red-500' : ''}`}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-2 top-2"
                          onClick={() => setShowSignupPassword(!showSignupPassword)}
                        >
                          {showSignupPassword ? 
                            <EyeOff className="h-4 w-4 text-muted-foreground" /> : 
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          }
                        </Button>
                      </div>
                      {signupErrors.password && (
                        <p className="text-red-500 text-xs mt-1">{signupErrors.password}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="confirm-password"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm Password"
                          value={confirmPassword}
                          onChange={(e) => {
                            setConfirmPassword(e.target.value);
                            if (signupErrors.confirmPassword) {
                              setSignupErrors({...signupErrors, confirmPassword: ''});
                            }
                          }}
                          className={`pl-10 ${signupErrors.confirmPassword ? 'border-red-500' : ''}`}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-2 top-2"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? 
                            <EyeOff className="h-4 w-4 text-muted-foreground" /> : 
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          }
                        </Button>
                      </div>
                      {signupErrors.confirmPassword && (
                        <p className="text-red-500 text-xs mt-1">{signupErrors.confirmPassword}</p>
                      )}
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full"
                      disabled={isSigningUp}
                    >
                      {isSigningUp ? 'Creating Account...' : 'Create Account'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Login;
