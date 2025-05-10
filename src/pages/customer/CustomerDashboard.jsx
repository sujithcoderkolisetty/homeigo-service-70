
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useAuth } from '@/contexts/AuthContext';
import { useServices } from '@/contexts/ServiceContext';
import BookingTable from '@/components/admin/BookingTable';
import UserProfileForm from '@/components/customer/UserProfileForm';
import { UserCircle } from 'lucide-react';

const CustomerDashboard = () => {
  const { user } = useAuth();
  const { getUserBookings } = useServices();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
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
  
  // Load bookings
  useEffect(() => {
    if (user && user.role === 'customer') {
      const customerBookings = getUserBookings();
      setBookings(customerBookings);
    }
  }, [user, getUserBookings]);
  
  const handleProfileComplete = () => {
    setIsProfileOpen(false);
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
            <h1 className="text-3xl font-bold mb-2">Welcome, {user.name}!</h1>
            <p className="text-gray-600 mb-1">Manage your home service bookings and appointments</p>
            <p className="text-sm text-gray-500">మీ హోమ్ సర్వీస్ బుకింగ్‌లు మరియు అపాయింట్‌మెంట్‌లను నిర్వహించండి</p>
          </div>
          <Button 
            onClick={() => setIsProfileOpen(true)}
            className="mt-4 md:mt-0 flex items-center"
            variant="outline"
          >
            <UserCircle size={18} className="mr-2" />
            Edit Profile
          </Button>
        </div>
        
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
              <h2 className="text-xl font-semibold mb-6">Your Recent Bookings</h2>
              
              {bookings.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="py-3 px-4 text-left">Service</th>
                        <th className="py-3 px-4 text-left">Provider</th>
                        <th className="py-3 px-4 text-left">Date & Time</th>
                        <th className="py-3 px-4 text-left">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.slice(0, 5).map((booking) => {
                        // Find service details
                        const service = booking.service || { title: 'Unknown Service', provider: 'Unknown Provider' };
                        
                        return (
                          <tr key={booking.id} className="border-b">
                            <td className="py-4 px-4">{service.title}</td>
                            <td className="py-4 px-4">{service.provider}</td>
                            <td className="py-4 px-4">
                              {booking.date} at {booking.time}
                            </td>
                            <td className="py-4 px-4">
                              <span 
                                className={`inline-block rounded px-2 py-1 text-xs font-medium
                                  ${booking.status === 'pending' && 'bg-yellow-100 text-yellow-800'}
                                  ${booking.status === 'accepted' && 'bg-green-100 text-green-800'}
                                  ${booking.status === 'rejected' && 'bg-red-100 text-red-800'}
                                  ${booking.status === 'completed' && 'bg-blue-100 text-blue-800'}
                                `}
                              >
                                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
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
              <h2 className="text-xl font-semibold mb-4">Your Profile</h2>
              
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100">
                  {user.image ? (
                    <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-homeigo-100 text-homeigo-600">
                      {user.name?.charAt(0)}
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="font-medium text-lg">{user.name}</h3>
                  <p className="text-gray-500">{user.email || 'No email provided'}</p>
                  <p className="text-gray-500">{user.phone || 'No phone provided'}</p>
                </div>
              </div>
              
              <Button onClick={() => setIsProfileOpen(true)} className="w-full">
                Edit Profile
              </Button>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
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
          </div>
        </div>
      </main>
      <Footer />
      
      {/* Edit Profile Dialog */}
      <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>
          <UserProfileForm onComplete={handleProfileComplete} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CustomerDashboard;
