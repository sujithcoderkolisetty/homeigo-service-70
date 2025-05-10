
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ServiceForm from '@/components/admin/ServiceForm';
import { useAuth } from '@/contexts/AuthContext';
import { useServices } from '@/contexts/ServiceContext';

const ProviderDashboard = () => {
  const { user } = useAuth();
  const { services, bookings } = useServices();
  const navigate = useNavigate();
  const [isAddServiceOpen, setIsAddServiceOpen] = useState(false);
  
  // Redirect if not logged in as provider
  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else if (user.role !== 'provider') {
      switch (user.role) {
        case 'customer':
          navigate('/customer');
          break;
        case 'admin':
          navigate('/admin');
          break;
        default:
          navigate('/login');
      }
    }
  }, [user, navigate]);
  
  // Filter services and bookings for this provider
  // In a real app, this would be done server-side
  const providerServices = services.filter(service => service.provider === user?.name);
  const pendingBookingsCount = bookings.filter(b => b.status === 'pending').length;
  const acceptedBookingsCount = bookings.filter(b => b.status === 'accepted').length;
  
  const handleAddService = () => {
    setIsAddServiceOpen(false);
  };
  
  if (!user) {
    return null; // Will redirect in useEffect
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Provider Dashboard</h1>
            <p className="text-gray-600">Manage your services and bookings</p>
          </div>
          <Button 
            onClick={() => setIsAddServiceOpen(true)}
            className="mt-4 md:mt-0 bg-homeigo-500 hover:bg-homeigo-600"
          >
            Add New Service
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-2">Your Services</h3>
            <p className="text-3xl font-bold">{providerServices.length}</p>
            <p className="text-sm text-gray-500 mt-1">Total services offered</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-2">Pending Bookings</h3>
            <p className="text-3xl font-bold">{pendingBookingsCount}</p>
            <p className="text-sm text-gray-500 mt-1">Awaiting your response</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-2">Active Bookings</h3>
            <p className="text-3xl font-bold">{acceptedBookingsCount}</p>
            <p className="text-sm text-gray-500 mt-1">Currently in progress</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <h2 className="text-xl font-semibold mb-6">Your Services</h2>
          
          {providerServices.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {providerServices.map((service) => (
                <div key={service.id} className="border rounded-lg overflow-hidden">
                  <div className="aspect-[16/9] overflow-hidden">
                    <img 
                      src={service.image || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158'} 
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-1">{service.title}</h3>
                    <p className="text-sm text-gray-500 mb-2 line-clamp-2">{service.description}</p>
                    <p className="font-medium text-homeigo-600">₹{service.price}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-medium mb-2">No services yet</h3>
              <p className="text-gray-500 mb-4">You haven't added any services yet.</p>
              <Button onClick={() => setIsAddServiceOpen(true)} className="bg-homeigo-500 hover:bg-homeigo-600">
                Add Your First Service
              </Button>
            </div>
          )}
        </div>
        
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Recent Activity</h2>
          <Button variant="outline" size="sm" onClick={() => navigate('/provider/bookings')}>
            View All Bookings
          </Button>
        </div>
      </main>
      <Footer />
      
      {/* Add Service Dialog */}
      <Dialog open={isAddServiceOpen} onOpenChange={setIsAddServiceOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Service</DialogTitle>
          </DialogHeader>
          <ServiceForm onComplete={handleAddService} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProviderDashboard;
