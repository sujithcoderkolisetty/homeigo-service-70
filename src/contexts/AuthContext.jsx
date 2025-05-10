
import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const storedUser = localStorage.getItem('homeigoUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (credentials) => {
    setLoading(true);
    
    // Mock authentication logic
    if (credentials.username === 'Customer' && credentials.password === 'Customer') {
      const userData = { id: 1, username: 'Customer', role: 'customer', name: 'John Doe' };
      setUser(userData);
      localStorage.setItem('homeigoUser', JSON.stringify(userData));
      navigate('/customer');
      toast.success('Welcome back, John!');
    } else if (credentials.username === 'Service Provider' && credentials.password === 'Service Provider') {
      const userData = { id: 2, username: 'Service Provider', role: 'provider', name: 'Jane Smith' };
      setUser(userData);
      localStorage.setItem('homeigoUser', JSON.stringify(userData));
      navigate('/provider');
      toast.success('Welcome back, Jane!');
    } else if (credentials.username === 'Admin' && credentials.password === 'Admin') {
      const userData = { id: 3, username: 'Admin', role: 'admin', name: 'Admin User' };
      setUser(userData);
      localStorage.setItem('homeigoUser', JSON.stringify(userData));
      navigate('/admin');
      toast.success('Welcome, Admin!');
    } else {
      toast.error('Invalid credentials');
    }
    
    setLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('homeigoUser');
    navigate('/login');
    toast.info('You have been logged out');
  };

  const value = {
    user,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
