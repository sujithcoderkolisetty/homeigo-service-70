
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BookingTable from '@/components/admin/BookingTable';
import { useAuth } from '@/contexts/AuthContext';

const ProviderBookings = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
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
  
  if (!user) {
    return null; // Will redirect in useEffect
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Manage Bookings</h1>
            <p className="text-gray-600">View and update your service bookings</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <BookingTable role="provider" />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProviderBookings;
