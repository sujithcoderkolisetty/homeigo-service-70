
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useAuth } from '@/contexts/AuthContext';
import { useServices } from '@/contexts/ServiceContext';
import { Plus, Edit, Trash2 } from 'lucide-react';
import ProviderForm from '@/components/admin/ProviderForm';
import { toast } from 'sonner';

const AdminProviders = () => {
  const { user, getUsers, deleteUser } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [providers, setProviders] = useState([]);
  const [isAddProviderOpen, setIsAddProviderOpen] = useState(false);
  const [isEditProviderOpen, setIsEditProviderOpen] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(null);
  
  // Redirect if not logged in as admin
  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else if (user.role !== 'admin') {
      navigate(`/${user.role}`);
    }
  }, [user, navigate]);
  
  // Load providers
  useEffect(() => {
    if (user && user.role === 'admin') {
      // Get all providers from the auth context
      const allProviders = getUsers('provider');
      setProviders(allProviders);
    }
  }, [user, getUsers]);
  
  // Filter providers based on search term
  const filteredProviders = providers.filter(provider => 
    provider.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    provider.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleAddProvider = () => {
    setIsAddProviderOpen(false);
    // Refresh providers list
    setProviders(getUsers('provider'));
  };
  
  const handleEditProvider = (provider) => {
    setSelectedProvider(provider);
    setIsEditProviderOpen(true);
  };
  
  const handleDeleteProvider = (providerId) => {
    if (window.confirm('Are you sure you want to delete this provider?')) {
      const success = deleteUser(providerId);
      if (success) {
        toast.success('Provider deleted successfully!');
        setProviders(getUsers('provider'));
      } else {
        toast.error('Failed to delete provider');
      }
    }
  };
  
  const handleEditComplete = () => {
    setIsEditProviderOpen(false);
    setSelectedProvider(null);
    // Refresh providers list
    setProviders(getUsers('provider'));
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
            <h1 className="text-3xl font-bold mb-2">Manage Providers</h1>
            <p className="text-gray-600">View and manage service providers on the platform</p>
            <p className="text-sm text-gray-500">సేవా ప్రొవైడర్లను నిర్వహించండి</p>
          </div>
          <Button 
            className="mt-4 md:mt-0 bg-homeigo-500 hover:bg-homeigo-600"
            onClick={() => setIsAddProviderOpen(true)}
          >
            <Plus size={18} className="mr-1" />
            Add New Provider
          </Button>
        </div>
        
        <div className="mb-6">
          <Input
            type="text"
            placeholder="Search providers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
        </div>
        
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {filteredProviders.length > 0 ? (
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="py-3 px-4 text-left">Provider</th>
                  <th className="py-3 px-4 text-left">Email</th>
                  <th className="py-3 px-4 text-left">Username</th>
                  <th className="py-3 px-4 text-left">Status</th>
                  <th className="py-3 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProviders.map((provider) => (
                  <tr key={provider.id} className="border-t">
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-homeigo-100 flex items-center justify-center mr-3 overflow-hidden">
                          {provider.image ? (
                            <img 
                              src={provider.image} 
                              alt={provider.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-homeigo-600 font-medium">
                              {provider.name?.charAt(0)}
                            </span>
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{provider.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">{provider.email || 'N/A'}</td>
                    <td className="py-4 px-4">{provider.username}</td>
                    <td className="py-4 px-4">
                      <span className="inline-block rounded px-2 py-1 text-xs font-medium bg-green-100 text-green-800">
                        {provider.status || 'Active'}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleEditProvider(provider)}
                        >
                          <Edit size={16} className="mr-1" />
                          Edit
                        </Button>
                        {provider.id !== '2' && (
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => handleDeleteProvider(provider.id)}
                          >
                            <Trash2 size={16} className="mr-1" />
                            Delete
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No providers found</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
      
      {/* Add Provider Dialog */}
      <Dialog open={isAddProviderOpen} onOpenChange={setIsAddProviderOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Provider</DialogTitle>
          </DialogHeader>
          <ProviderForm onComplete={handleAddProvider} />
        </DialogContent>
      </Dialog>
      
      {/* Edit Provider Dialog */}
      <Dialog open={isEditProviderOpen} onOpenChange={setIsEditProviderOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Provider</DialogTitle>
          </DialogHeader>
          {selectedProvider && (
            <ProviderForm existingProvider={selectedProvider} onComplete={handleEditComplete} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminProviders;
