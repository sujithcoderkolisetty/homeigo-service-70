
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useToast } from '@/components/ui/use-toast';
import { useServices } from '@/contexts/ServiceContext';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

const ServiceDetail = () => {
  const { id } = useParams();
  const { services } = useServices();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [date, setDate] = useState(null);
  const [time, setTime] = useState('');
  const [address, setAddress] = useState('');
  
  const service = services.find(s => s.id === id);
  
  if (!service) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Service not found</h2>
          <p className="mb-6 text-gray-600">The service you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate('/services')}>
            Go back to Services
          </Button>
        </div>
      </div>
    );
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Not logged in",
        description: "Please log in to book this service",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }
    
    if (!date || !time || !address) {
      toast({
        title: "Missing information",
        description: "Please fill all the required fields",
        variant: "destructive",
      });
      return;
    }
    
    const bookingDetails = {
      date: format(date, 'PPP'),
      time,
      address,
    };
    
    addToCart(service, bookingDetails);
    navigate('/cart');
  };
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Service Image and Info */}
        <div>
          <img
            src={service.image || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158'}
            alt={service.title}
            className="w-full h-72 object-cover rounded-lg mb-6"
          />
          <h1 className="text-3xl font-bold mb-4">{service.title}</h1>
          <p className="text-gray-600 mb-6">{service.description}</p>
          
          <div className="flex items-center justify-between mb-8">
            <p className="text-2xl font-semibold text-homeigo-600">₹{service.price}</p>
            <p className="text-gray-500">Provided by: {service.provider}</p>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="font-semibold text-lg mb-3">Service Details</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className="text-homeigo-600 mr-2">✓</span>
                <span>Professional equipment</span>
              </li>
              <li className="flex items-center">
                <span className="text-homeigo-600 mr-2">✓</span>
                <span>Experienced staff</span>
              </li>
              <li className="flex items-center">
                <span className="text-homeigo-600 mr-2">✓</span>
                <span>100% satisfaction guarantee</span>
              </li>
              <li className="flex items-center">
                <span className="text-homeigo-600 mr-2">✓</span>
                <span>Customer support</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Booking Form */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-6">Book This Service</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="date">Select Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, 'PPP') : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    disabled={(d) => d < new Date()}
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="time">Select Time</Label>
              <Input
                id="time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address">Your Address</Label>
              <Input
                id="address"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your full address"
                required
              />
            </div>
            
            <div className="pt-4">
              <Button type="submit" className="w-full bg-homeigo-500 hover:bg-homeigo-600">
                Add to Cart
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
