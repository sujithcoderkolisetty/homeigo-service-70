
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BookingTable from '@/components/admin/BookingTable';
import { useAuth } from '@/contexts/AuthContext';

const AdminBookings = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Redirect if not logged in as admin
  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else if (user.role !== 'admin') {
      navigate(`/${user.role}`);
    }
  }, [user, navigate]);
  
  if (!user) {
    return null; // Will redirect in useEffect
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">All Bookings</h1>
          <p className="text-gray-600">Manage and monitor service bookings across the platform</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <BookingTable />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminBookings;
