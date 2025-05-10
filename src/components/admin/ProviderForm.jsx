
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

const ProviderForm = ({ existingProvider = null, onComplete }) => {
  const [name, setName] = useState(existingProvider?.name || '');
  const [email, setEmail] = useState(existingProvider?.email || '');
  const [username, setUsername] = useState(existingProvider?.username || '');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState(existingProvider?.status || 'Active');
  const [image, setImage] = useState(existingProvider?.image || '');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const providerData = {
      name,
      email,
      username,
      password: password || undefined,
      status,
      image,
    };
    
    // Add logic to create/update provider (to be implemented in AuthContext)
    if (existingProvider) {
      // Update existing provider
      const success = updateProvider(existingProvider.id, providerData);
      if (success) {
        toast.success('Provider updated successfully!');
        if (onComplete) onComplete();
      }
    } else {
      // Create new provider
      const success = addProvider(providerData);
      if (success) {
        toast.success('Provider added successfully!');
        if (onComplete) onComplete();
      }
    }
  };
  
  // Mock functions that will be implemented in AuthContext
  const addProvider = (data) => {
    try {
      const registeredUsers = JSON.parse(localStorage.getItem('homeigoRegisteredUsers') || '[]');
      const newProvider = {
        ...data,
        id: Date.now().toString(),
        role: 'provider',
        createdAt: new Date().toISOString()
      };
      
      registeredUsers.push(newProvider);
      localStorage.setItem('homeigoRegisteredUsers', JSON.stringify(registeredUsers));
      return true;
    } catch (error) {
      toast.error('Failed to add provider');
      return false;
    }
  };
  
  const updateProvider = (id, data) => {
    try {
      const registeredUsers = JSON.parse(localStorage.getItem('homeigoRegisteredUsers') || '[]');
      const updatedUsers = registeredUsers.map(user => 
        user.id === id ? { ...user, ...data } : user
      );
      
      localStorage.setItem('homeigoRegisteredUsers', JSON.stringify(updatedUsers));
      return true;
    } catch (error) {
      toast.error('Failed to update provider');
      return false;
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Provider Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter provider name"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email address"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="password">
          {existingProvider ? 'New Password (leave blank to keep current)' : 'Password'}
        </Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={existingProvider ? "Enter new password (optional)" : "Enter password"}
          required={!existingProvider}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <Select onValueChange={setStatus} defaultValue={status}>
          <SelectTrigger id="status">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Inactive">Inactive</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="image">Profile Image URL</Label>
        <Input
          id="image"
          type="url"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="Enter profile image URL"
        />
      </div>
      
      <Button type="submit" className="w-full bg-homeigo-500 hover:bg-homeigo-600">
        {existingProvider ? 'Update Provider' : 'Add Provider'}
      </Button>
    </form>
  );
};

export default ProviderForm;
