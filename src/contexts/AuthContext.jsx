
import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  // Load users and current user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('homeigoUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    const registeredUsers = JSON.parse(localStorage.getItem('homeigoRegisteredUsers') || '[]');
    setUsers(registeredUsers);
    
    setLoading(false);
  }, []);

  const login = (credentials) => {
    setLoading(true);
    
    // First check predefined users
    if (credentials.username === 'Customer' && credentials.password === 'Customer') {
      const userData = { id: 1, username: 'Customer', role: 'customer', name: 'Karthikeya', image: 'https://randomuser.me/api/portraits/men/32.jpg' };
      setUser(userData);
      localStorage.setItem('homeigoUser', JSON.stringify(userData));
      navigate('/customer');
      toast.success('Welcome back, Karthikeya!');
    } else if (credentials.username === 'Service Provider' && credentials.password === 'Service Provider') {
      const userData = { id: 2, username: 'Service Provider', role: 'provider', name: 'Ramya', image: 'https://randomuser.me/api/portraits/women/44.jpg' };
      setUser(userData);
      localStorage.setItem('homeigoUser', JSON.stringify(userData));
      navigate('/provider');
      toast.success('Welcome back, Ramya!');
    } else if (credentials.username === 'Admin' && credentials.password === 'Admin') {
      const userData = { id: 3, username: 'Admin', role: 'admin', name: 'Admin User', image: 'https://randomuser.me/api/portraits/men/1.jpg' };
      setUser(userData);
      localStorage.setItem('homeigoUser', JSON.stringify(userData));
      navigate('/admin');
      toast.success('Welcome, Admin!');
    } else {
      // Check for registered users from localStorage
      const registeredUsers = JSON.parse(localStorage.getItem('homeigoRegisteredUsers') || '[]');
      const foundUser = registeredUsers.find(
        u => u.username === credentials.username && u.password === credentials.password
      );
      
      if (foundUser) {
        // Remove password from user data before storing in state
        const { password, ...userData } = foundUser;
        setUser(userData);
        localStorage.setItem('homeigoUser', JSON.stringify(userData));
        
        // Redirect based on role
        switch (userData.role) {
          case 'provider':
            navigate('/provider');
            break;
          case 'admin':
            navigate('/admin');
            break;
          default:
            navigate('/customer');
        }
        
        toast.success(`Welcome back, ${userData.name}!`);
      } else {
        toast.error('Invalid credentials');
      }
    }
    
    setLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('homeigoUser');
    navigate('/login');
    toast.info('You have been logged out');
  };
  
  const updateUserProfile = (userData) => {
    try {
      // Update current user
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('homeigoUser', JSON.stringify(updatedUser));
      
      // If the user is a registered user, update in the list
      if (user.id !== 1 && user.id !== 2 && user.id !== 3) {
        const registeredUsers = JSON.parse(localStorage.getItem('homeigoRegisteredUsers') || '[]');
        const updatedUsers = registeredUsers.map(u => 
          u.id === user.id ? { ...u, ...userData, password: u.password } : u
        );
        localStorage.setItem('homeigoRegisteredUsers', JSON.stringify(updatedUsers));
      }
      
      toast.success('Profile updated successfully!');
      return true;
    } catch (error) {
      toast.error('Failed to update profile');
      return false;
    }
  };
  
  // Admin functions for provider management
  const getUsers = (role = null) => {
    let allUsers = [...users];
    
    // Add default users
    if (!allUsers.some(u => u.id === 1)) {
      allUsers.push({ id: 1, username: 'Customer', role: 'customer', name: 'Karthikeya', image: 'https://randomuser.me/api/portraits/men/32.jpg' });
    }
    
    if (!allUsers.some(u => u.id === 2)) {
      allUsers.push({ id: 2, username: 'Service Provider', role: 'provider', name: 'Ramya', image: 'https://randomuser.me/api/portraits/women/44.jpg' });
    }
    
    if (!allUsers.some(u => u.id === 3)) {
      allUsers.push({ id: 3, username: 'Admin', role: 'admin', name: 'Admin User', image: 'https://randomuser.me/api/portraits/men/1.jpg' });
    }
    
    // Filter by role if provided
    if (role) {
      return allUsers.filter(u => u.role === role);
    }
    
    return allUsers;
  };
  
  const addUser = (userData) => {
    try {
      const newUser = {
        ...userData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString()
      };
      
      const updatedUsers = [...users, newUser];
      setUsers(updatedUsers);
      localStorage.setItem('homeigoRegisteredUsers', JSON.stringify(updatedUsers));
      
      return true;
    } catch (error) {
      console.error('Failed to add user:', error);
      return false;
    }
  };
  
  const updateUser = (userId, userData) => {
    try {
      const updatedUsers = users.map(user => 
        user.id === userId ? { ...user, ...userData } : user
      );
      
      setUsers(updatedUsers);
      localStorage.setItem('homeigoRegisteredUsers', JSON.stringify(updatedUsers));
      
      // If updating the current logged-in user, update user state too
      if (user && user.id === userId) {
        const { password, ...updatedUserData } = { ...user, ...userData };
        setUser(updatedUserData);
        localStorage.setItem('homeigoUser', JSON.stringify(updatedUserData));
      }
      
      return true;
    } catch (error) {
      console.error('Failed to update user:', error);
      return false;
    }
  };
  
  const deleteUser = (userId) => {
    try {
      const updatedUsers = users.filter(user => user.id !== userId);
      setUsers(updatedUsers);
      localStorage.setItem('homeigoRegisteredUsers', JSON.stringify(updatedUsers));
      
      return true;
    } catch (error) {
      console.error('Failed to delete user:', error);
      return false;
    }
  };

  const value = {
    user,
    users,
    login,
    logout,
    loading,
    updateUserProfile,
    getUsers,
    addUser,
    updateUser,
    deleteUser
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
