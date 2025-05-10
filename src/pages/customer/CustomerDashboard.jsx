
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useServices } from '@/contexts/ServiceContext';
import BookingTable from '@/components/admin/BookingTable';

const CustomerDashboard = () => {
  const { user } = useAuth();
  const { bookings } = useServices();
  const navigate = useNavigate();
  
  // Filter bookings for this customer (in a real app, this would be done server-side)
  const customerBookings = bookings.filter(booking => booking.customerId === user?.id);
  
  // Redirect if not logged in as customer
  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else if (user.role !== 'customer') {
      switch (user.role) {
        case 'provider':
          navigate('/provider');
          break;
        case 'admin':
          navigate('/admin');
          break;
        default:
          navigate('/login');
      }
    }
  }, [user, navigate]);
  
  if (!user) {
    return null; // Will redirect in useEffect
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-2">Welcome, {user.name}!</h1>
        <p className="text-gray-600 mb-8">Manage your home service bookings and appointments</p>
        
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
              <h2 className="text-xl font-semibold mb-6">Your Recent Bookings</h2>
              
              {customerBookings.length > 0 ? (
                <BookingTable role="customer" />
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-medium mb-2">No bookings yet</h3>
                  <p className="text-gray-500 mb-6">You haven't made any bookings yet.</p>
                  <Button onClick={() => navigate('/services')} className="bg-homeigo-500 hover:bg-homeigo-600">
                    Browse Services
                  </Button>
                </div>
              )}
            </div>
          </div>
          
          <div className="xl:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
              <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
              <div className="space-y-4">
                <Button onClick={() => navigate('/services')} className="w-full bg-homeigo-500 hover:bg-homeigo-600">
                  Book New Service
                </Button>
                <Button onClick={() => navigate('/cart')} variant="outline" className="w-full">
                  View Cart
                </Button>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Need Help?</h2>
              <p className="text-gray-600 mb-4">
                Having issues with a booking or need customer support? Our team is here to help.
              </p>
              <Button variant="outline" className="w-full">
                Contact Support
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CustomerDashboard;
