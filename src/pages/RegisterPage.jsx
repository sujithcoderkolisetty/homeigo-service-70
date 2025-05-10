
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    username: '',
    password: '',
    confirmPassword: ''
  });
  
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }
    
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    
    setLoading(true);
    
    // Mock registration - in a real app, this would call an API
    setTimeout(() => {
      // Store the user data in localStorage so they can log in later
      const userData = {
        id: Date.now(), // Generate a unique ID
        username: formData.username,
        name: formData.name,
        role: 'customer', // All registered users are customers
        email: formData.email,
        phone: formData.phone
      };
      
      // Store in localStorage - in a real app this would be in a database
      const existingUsers = JSON.parse(localStorage.getItem('homeigoRegisteredUsers') || '[]');
      existingUsers.push({...userData, password: formData.password});
      localStorage.setItem('homeigoRegisteredUsers', JSON.stringify(existingUsers));
      
      setLoading(false);
      toast.success("Registration successful! You can now log in");
      navigate('/login');
    }, 1000);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-12 px-4 bg-gray-50">
        <div className="max-w-md w-full">
          <Button 
            variant="ghost" 
            className="mb-6 flex items-center text-homeigo-600" 
            onClick={() => navigate('/')}
          >
            <ArrowLeft size={18} className="mr-2" />
            Back to Home
          </Button>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-center">Register for Homeigo</CardTitle>
              <CardDescription className="text-center">
                Create your customer account to book services
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    type="text"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Choose a username"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    required
                  />
                </div>
                
                <Button type="submit" className="w-full bg-homeigo-500 hover:bg-homeigo-600" disabled={loading}>
                  {loading ? 'Registering...' : 'Register'}
                </Button>
                
                <p className="text-center text-sm text-gray-600">
                  Already have an account? <a href="/login" className="text-homeigo-600 hover:text-homeigo-500">Sign in</a>
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RegisterPage;
