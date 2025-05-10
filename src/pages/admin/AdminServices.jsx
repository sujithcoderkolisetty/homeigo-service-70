
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ServiceForm from '@/components/admin/ServiceForm';
import { useAuth } from '@/contexts/AuthContext';
import { useServices } from '@/contexts/ServiceContext';

const AdminServices = () => {
  const { user } = useAuth();
  const { services, deleteService } = useServices();
  const navigate = useNavigate();
  const [isAddServiceOpen, setIsAddServiceOpen] = useState(false);
  const [isEditServiceOpen, setIsEditServiceOpen] = useState(false);
  const [currentService, setCurrentService] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Redirect if not logged in as admin
  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else if (user.role !== 'admin') {
      navigate(`/${user.role}`);
    }
  }, [user, navigate]);
  
  // Filter services based on search term
  const filteredServices = services.filter(service => 
    service.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.provider.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleAddService = () => {
    setIsAddServiceOpen(false);
  };
  
  const handleEditService = (service) => {
    setCurrentService(service);
    setIsEditServiceOpen(true);
  };
  
  const handleEditComplete = () => {
    setIsEditServiceOpen(false);
    setCurrentService(null);
  };
  
  const handleDeleteService = (serviceId) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      deleteService(serviceId);
    }
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
            <h1 className="text-3xl font-bold mb-2">Manage Services</h1>
            <p className="text-gray-600">Add, edit, or remove services from the platform</p>
          </div>
          <Button 
            onClick={() => setIsAddServiceOpen(true)}
            className="mt-4 md:mt-0 bg-homeigo-500 hover:bg-homeigo-600"
          >
            Add New Service
          </Button>
        </div>
        
        <div className="mb-6">
          <Input
            type="text"
            placeholder="Search services by title, description, or provider..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
        </div>
        
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {filteredServices.length > 0 ? (
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="py-3 px-4 text-left">Service</th>
                  <th className="py-3 px-4 text-left">Provider</th>
                  <th className="py-3 px-4 text-left">Price</th>
                  <th className="py-3 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredServices.map((service) => (
                  <tr key={service.id} className="border-t">
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <img 
                          src={service.image || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158'} 
                          alt={service.title}
                          className="w-10 h-10 object-cover rounded mr-3"
                        />
                        <div>
                          <p className="font-medium">{service.title}</p>
                          <p className="text-sm text-gray-500 truncate max-w-xs">
                            {service.description}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">{service.provider}</td>
                    <td className="py-4 px-4">${service.price}</td>
                    <td className="py-4 px-4">
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEditService(service)}
                        >
                          Edit
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handleDeleteService(service.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No services found</p>
            </div>
          )}
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
      
      {/* Edit Service Dialog */}
      <Dialog open={isEditServiceOpen} onOpenChange={setIsEditServiceOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Service</DialogTitle>
          </DialogHeader>
          {currentService && (
            <ServiceForm 
              existingService={currentService} 
              onComplete={handleEditComplete} 
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminServices;
