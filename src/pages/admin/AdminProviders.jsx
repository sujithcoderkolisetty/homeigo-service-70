
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { useServices } from '@/contexts/ServiceContext';

const AdminProviders = () => {
  const { user } = useAuth();
  const { services } = useServices();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Redirect if not logged in as admin
  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else if (user.role !== 'admin') {
      navigate(`/${user.role}`);
    }
  }, [user, navigate]);
  
  // Get unique providers from services
  const allProviders = [...new Set(services.map(service => service.provider))];
  
  // Generate mock data for display
  const providersData = allProviders.map(providerName => {
    const providerServices = services.filter(s => s.provider === providerName);
    return {
      id: providerName.toLowerCase().replace(/\s+/g, '-'),
      name: providerName,
      email: `${providerName.toLowerCase().replace(/\s+/g, '.')}@example.com`,
      servicesCount: providerServices.length,
      status: 'Active'
    };
  });
  
  // Filter providers based on search term
  const filteredProviders = providersData.filter(provider => 
    provider.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    provider.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
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
          </div>
          <Button className="mt-4 md:mt-0 bg-homeigo-500 hover:bg-homeigo-600">
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
                  <th className="py-3 px-4 text-left">Services</th>
                  <th className="py-3 px-4 text-left">Status</th>
                  <th className="py-3 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProviders.map((provider) => (
                  <tr key={provider.id} className="border-t">
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-homeigo-100 flex items-center justify-center mr-3">
                          <span className="text-homeigo-600 font-medium">
                            {provider.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium">{provider.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">{provider.email}</td>
                    <td className="py-4 px-4">{provider.servicesCount}</td>
                    <td className="py-4 px-4">
                      <span className="inline-block rounded px-2 py-1 text-xs font-medium bg-green-100 text-green-800">
                        {provider.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                        <Button variant="destructive" size="sm">
                          Suspend
                        </Button>
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
    </div>
  );
};

export default AdminProviders;
