
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const UserProfileForm = ({ onComplete }) => {
  const { user, updateUserProfile } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [image, setImage] = useState(user?.image || '');
  const [isUploading, setIsUploading] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const userData = {
      name,
      email,
      phone,
      image
    };
    
    const success = updateUserProfile(userData);
    if (success && onComplete) {
      onComplete();
    }
  };
  
  // Simulate image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Check file type
    if (!file.type.includes('image/')) {
      toast.error('Please upload an image file');
      return;
    }
    
    // Check file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast.error('Image size should be less than 2MB');
      return;
    }
    
    setIsUploading(true);
    
    // Simulate upload delay
    setTimeout(() => {
      // Convert file to base64 for demo purposes
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target.result);
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    }, 1000);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col items-center mb-6">
        <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 mb-3">
          {image ? (
            <img src={image} alt={name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-500">
              No Image
            </div>
          )}
        </div>
        <div className="flex items-center">
          <Label htmlFor="profileImage" className="cursor-pointer p-2 text-sm text-homeigo-500 hover:text-homeigo-600">
            {isUploading ? 'Uploading...' : 'Change Profile Picture'}
          </Label>
          <Input
            id="profileImage"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your full name"
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
          placeholder="Enter your email"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Enter your phone number"
        />
      </div>
      
      <Button type="submit" className="w-full bg-homeigo-500 hover:bg-homeigo-600" disabled={isUploading}>
        {isUploading ? 'Uploading Image...' : 'Update Profile'}
      </Button>
    </form>
  );
};

export default UserProfileForm;
