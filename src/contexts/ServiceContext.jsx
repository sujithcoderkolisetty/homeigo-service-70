
import { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useAuth } from './AuthContext';

// Initial services data
const initialServices = [
  {
    id: '1',
    title: 'Home Cleaning',
    description: 'Professional home cleaning service including dusting, vacuuming, and sanitizing.',
    price: 80,
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=600',
    provider: 'CleanHome Services',
    providerId: '2'
  },
  {
    id: '2',
    title: 'Kitchen Cleaning',
    description: 'Deep cleaning for your kitchen including appliances, countertops, and cabinets.',
    price: 60,
    image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=600',
    provider: 'ShineKitchen Co.',
    providerId: '2'
  },
  {
    id: '3',
    title: 'Garden Maintenance',
    description: 'Comprehensive garden care including lawn mowing, pruning, and weeding.',
    price: 120,
    image: 'https://images.unsplash.com/photo-1558904541-efa843a96f01?q=80&w=600',
    provider: 'GreenThumb Gardens',
    providerId: '2'
  },
  {
    id: '4',
    title: 'Plumbing Services',
    description: 'Professional plumbing repair and maintenance for all your water system needs.',
    price: 95,
    image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?q=80&w=600',
    provider: 'QuickFix Plumbing',
    providerId: '2'
  }
];

const ServiceContext = createContext();

export function ServiceProvider({ children }) {
  const [services, setServices] = useState([]);
  const [bookings, setBookings] = useState([]);
  const { user } = useAuth();
  
  // Load services and bookings from localStorage on initial render
  useEffect(() => {
    const storedServices = localStorage.getItem('homeigoServices');
    const storedBookings = localStorage.getItem('homeigoBookings');
    
    if (storedServices) {
      setServices(JSON.parse(storedServices));
    } else {
      setServices(initialServices);
      localStorage.setItem('homeigoServices', JSON.stringify(initialServices));
    }
    
    if (storedBookings) {
      setBookings(JSON.parse(storedBookings));
    }
  }, []);
  
  // Save services and bookings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('homeigoServices', JSON.stringify(services));
  }, [services]);
  
  useEffect(() => {
    localStorage.setItem('homeigoBookings', JSON.stringify(bookings));
  }, [bookings]);
  
  const addService = (serviceData) => {
    if (!user) {
      toast.error('You must be logged in to add a service');
      return null;
    }
    
    const newService = {
      ...serviceData,
      id: Date.now().toString(),
      providerId: user.id.toString(),
      provider: user.name || serviceData.provider,
    };
    
    setServices(prevServices => [...prevServices, newService]);
    toast.success('Service added successfully!');
    return newService;
  };
  
  const updateService = (id, serviceData) => {
    setServices(prevServices => 
      prevServices.map(service => 
        service.id === id ? { ...service, ...serviceData } : service
      )
    );
    toast.success('Service updated successfully!');
  };
  
  const deleteService = (id) => {
    // Check if there are any bookings for this service
    const hasBookings = bookings.some(booking => booking.serviceId === id);
    
    if (hasBookings) {
      toast.error('Cannot delete service with active bookings');
      return false;
    }
    
    setServices(prevServices => prevServices.filter(service => service.id !== id));
    toast.success('Service deleted successfully!');
    return true;
  };
  
  const addBooking = (booking) => {
    const newBooking = {
      ...booking,
      id: Date.now().toString(),
      status: 'pending',
      createdAt: new Date().toISOString(),
      customerId: user?.id.toString(),
      customerName: user?.name || 'Customer'
    };
    
    setBookings(prevBookings => [...prevBookings, newBooking]);
    toast.success('Service booked successfully!');
    return newBooking;
  };
  
  const updateBookingStatus = (id, status) => {
    setBookings(prevBookings => 
      prevBookings.map(booking => 
        booking.id === id ? { ...booking, status } : booking
      )
    );
    toast.success(`Booking ${status} successfully!`);
  };
  
  // Get user's services (based on role)
  const getUserServices = () => {
    if (!user) return [];
    
    if (user.role === 'admin') {
      return services;
    }
    
    if (user.role === 'provider') {
      return services.filter(service => 
        service.providerId === user.id.toString() || service.provider === user.name
      );
    }
    
    return [];
  };
  
  // Get user's bookings (based on role)
  const getUserBookings = () => {
    if (!user) return [];
    
    if (user.role === 'admin') {
      return bookings;
    }
    
    if (user.role === 'provider') {
      const userServices = getUserServices();
      return bookings.filter(booking => 
        userServices.some(service => service.id === booking.serviceId)
      );
    }
    
    if (user.role === 'customer') {
      return bookings.filter(booking => 
        booking.customerId === user.id.toString() || booking.customerName === user.name
      );
    }
    
    return [];
  };
  
  const value = {
    services,
    bookings,
    addService,
    updateService,
    deleteService,
    addBooking,
    updateBookingStatus,
    getUserServices,
    getUserBookings
  };
  
  return (
    <ServiceContext.Provider value={value}>
      {children}
    </ServiceContext.Provider>
  );
}

export function useServices() {
  return useContext(ServiceContext);
}
