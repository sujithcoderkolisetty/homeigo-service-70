
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import StatsCard from '@/components/admin/StatsCard';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useServices } from '@/contexts/ServiceContext';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

const AdminDashboard = () => {
  const { user } = useAuth();
  const { services, bookings } = useServices();
  const navigate = useNavigate();
  
  // Redirect if not logged in as admin
  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else if (user.role !== 'admin') {
      switch (user.role) {
        case 'customer':
          navigate('/customer');
          break;
        case 'provider':
          navigate('/provider');
          break;
        default:
          navigate('/login');
      }
    }
  }, [user, navigate]);
  
  // Mock data for analytics
  const totalCustomers = 15;
  const totalProviders = 8;
  
  // Calculate booking statistics
  const pendingBookings = bookings.filter(b => b.status === 'pending').length;
  const completedBookings = bookings.filter(b => b.status === 'completed').length;
  const totalBookings = bookings.length;
  
  // Generate chart data
  const chartData = [
    { name: 'Cleaning', value: services.filter(s => s.title.includes('Cleaning')).length },
    { name: 'Plumbing', value: services.filter(s => s.title.includes('Plumbing')).length },
    { name: 'Garden', value: services.filter(s => s.title.includes('Garden')).length },
    { name: 'Other', value: services.filter(s => 
      !s.title.includes('Cleaning') && 
      !s.title.includes('Plumbing') && 
      !s.title.includes('Garden')
    ).length },
  ];
  
  if (!user) {
    return null; // Will redirect in useEffect
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">Monitor and manage all platform activities</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Customers"
            value={totalCustomers}
            icon={<UserIcon className="h-6 w-6 text-homeigo-500" />}
            change={{ positive: true, value: '12' }}
          />
          <StatsCard
            title="Total Providers"
            value={totalProviders}
            icon={<UserIcon className="h-6 w-6 text-homeigo-500" />}
            change={{ positive: true, value: '5' }}
          />
          <StatsCard
            title="Total Services"
            value={services.length}
            icon={<LayersIcon className="h-6 w-6 text-homeigo-500" />}
            change={{ positive: true, value: '8' }}
          />
          <StatsCard
            title="Total Bookings"
            value={totalBookings}
            icon={<CalendarIcon className="h-6 w-6 text-homeigo-500" />}
            change={{ positive: true, value: '15' }}
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Service Categories</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#0099ff" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-6">Booking Status</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-yellow-400 mr-2"></div>
                  <span>Pending</span>
                </div>
                <span className="font-semibold">{pendingBookings}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-400 mr-2"></div>
                  <span>Completed</span>
                </div>
                <span className="font-semibold">{completedBookings}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-blue-400 mr-2"></div>
                  <span>Total</span>
                </div>
                <span className="font-semibold">{totalBookings}</span>
              </div>
            </div>
            
            <div className="mt-8">
              <Button onClick={() => navigate('/admin/bookings')} variant="outline" className="w-full">
                View All Bookings
              </Button>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Recent Services</h2>
            <Button variant="outline" size="sm" onClick={() => navigate('/admin/services')}>
              Manage Services
            </Button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="py-3 px-4 text-left">Service</th>
                  <th className="py-3 px-4 text-left">Provider</th>
                  <th className="py-3 px-4 text-left">Price</th>
                </tr>
              </thead>
              <tbody>
                {services.slice(0, 5).map((service) => (
                  <tr key={service.id} className="border-b">
                    <td className="py-4 px-4">{service.title}</td>
                    <td className="py-4 px-4">{service.provider}</td>
                    <td className="py-4 px-4">₹{service.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;

function UserIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function LayersIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
      <path d="m22 12.18-8.58 3.91a2 2 0 0 1-1.66 0L2 12.18" />
      <path d="m22 17.82-8.58 3.91a2 2 0 0 1-1.66 0L2 17.82" />
    </svg>
  );
}

function CalendarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}
