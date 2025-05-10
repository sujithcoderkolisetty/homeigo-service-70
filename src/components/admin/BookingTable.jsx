
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useServices } from '@/contexts/ServiceContext';
import { toast } from 'sonner';
import { Check, X } from 'lucide-react';

const BookingTable = ({ role = 'admin' }) => {
  const { bookings, services, updateBookingStatus } = useServices();
  const [filter, setFilter] = useState('all');
  
  // Filter bookings based on the selected filter
  const filteredBookings = bookings.filter(booking => {
    if (filter === 'all') return true;
    return booking.status === filter;
  });
  
  // Find service details for each booking
  const bookingsWithDetails = filteredBookings.map(booking => {
    const service = services.find(s => s.id === booking.serviceId);
    return {
      ...booking,
      serviceTitle: service?.title || 'Unknown Service',
      servicePrice: service?.price || 0,
      provider: service?.provider || 'Unknown Provider'
    };
  });
  
  const handleStatusChange = (bookingId, newStatus) => {
    updateBookingStatus(bookingId, newStatus);
    toast.success(`Booking ${newStatus} successfully!`);
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Bookings</h2>
        
        <div className="flex flex-wrap space-x-2">
          <Button
            variant={filter === 'all' ? 'secondary' : 'outline'}
            size="sm"
            onClick={() => setFilter('all')}
          >
            All
          </Button>
          <Button
            variant={filter === 'pending' ? 'secondary' : 'outline'}
            size="sm"
            onClick={() => setFilter('pending')}
          >
            Pending
          </Button>
          <Button
            variant={filter === 'accepted' ? 'secondary' : 'outline'}
            size="sm"
            onClick={() => setFilter('accepted')}
          >
            Accepted
          </Button>
          <Button
            variant={filter === 'rejected' ? 'secondary' : 'outline'}
            size="sm"
            onClick={() => setFilter('rejected')}
          >
            Rejected
          </Button>
          <Button
            variant={filter === 'completed' ? 'secondary' : 'outline'}
            size="sm"
            onClick={() => setFilter('completed')}
          >
            Completed
          </Button>
        </div>
      </div>
      
      {bookingsWithDetails.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="py-3 px-4 text-left">Service</th>
                <th className="py-3 px-4 text-left">
                  {role === 'provider' ? 'Customer' : 'Provider'}
                </th>
                <th className="py-3 px-4 text-left">Date & Time</th>
                <th className="py-3 px-4 text-left">Address</th>
                <th className="py-3 px-4 text-left">Price</th>
                <th className="py-3 px-4 text-left">Status</th>
                {role !== 'customer' && <th className="py-3 px-4 text-left">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {bookingsWithDetails.map((booking) => (
                <tr key={booking.id} className="border-b">
                  <td className="py-4 px-4">{booking.serviceTitle}</td>
                  <td className="py-4 px-4">
                    {role === 'provider' ? booking.customerName || 'Customer' : booking.provider}
                  </td>
                  <td className="py-4 px-4">
                    {booking.date} at {booking.time}
                  </td>
                  <td className="py-4 px-4">{booking.address}</td>
                  <td className="py-4 px-4">₹{booking.servicePrice}</td>
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
                  {role !== 'customer' && (
                    <td className="py-4 px-4">
                      {booking.status === 'pending' && (
                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            onClick={() => handleStatusChange(booking.id, 'accepted')}
                            className="bg-green-500 hover:bg-green-600 text-xs"
                          >
                            <Check size={16} className="mr-1" />
                            Accept
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => handleStatusChange(booking.id, 'rejected')}
                            className="text-xs"
                          >
                            <X size={16} className="mr-1" />
                            Reject
                          </Button>
                        </div>
                      )}
                      {booking.status === 'accepted' && (
                        <Button 
                          size="sm"
                          onClick={() => handleStatusChange(booking.id, 'completed')}
                          className="bg-blue-500 hover:bg-blue-600 text-xs"
                        >
                          Mark Complete
                        </Button>
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No bookings found</p>
          <p className="text-sm text-gray-400">బుకింగ్‌లు ఏవీ కనుగొనబడలేదు</p>
        </div>
      )}
    </div>
  );
};

export default BookingTable;
