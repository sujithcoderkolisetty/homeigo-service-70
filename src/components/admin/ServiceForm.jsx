
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useServices } from '@/contexts/ServiceContext';

const ServiceForm = ({ existingService = null, onComplete }) => {
  const { addService, updateService } = useServices();
  const [title, setTitle] = useState(existingService?.title || '');
  const [description, setDescription] = useState(existingService?.description || '');
  const [price, setPrice] = useState(existingService?.price || '');
  const [image, setImage] = useState(existingService?.image || '');
  const [provider, setProvider] = useState(existingService?.provider || '');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const serviceData = {
      title,
      description,
      price: Number(price),
      image,
      provider,
    };
    
    if (existingService) {
      updateService(existingService.id, serviceData);
    } else {
      addService(serviceData);
    }
    
    if (onComplete) {
      onComplete();
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Service Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter service title"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter service description"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="price">Price ($)</Label>
        <Input
          id="price"
          type="number"
          min="0"
          step="0.01"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Enter price"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="image">Image URL</Label>
        <Input
          id="image"
          type="url"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="Enter image URL"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="provider">Service Provider</Label>
        <Input
          id="provider"
          value={provider}
          onChange={(e) => setProvider(e.target.value)}
          placeholder="Enter service provider name"
          required
        />
      </div>
      
      <Button type="submit" className="w-full bg-homeigo-500 hover:bg-homeigo-600">
        {existingService ? 'Update Service' : 'Add Service'}
      </Button>
    </form>
  );
};

export default ServiceForm;
