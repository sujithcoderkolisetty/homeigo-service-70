
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CartItem from '@/components/cart/CartItem';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useServices } from '@/contexts/ServiceContext';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

const CartPage = () => {
  const { cartItems, clearCart } = useCart();
  const { addBooking } = useServices();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);
  
  const handleCheckout = () => {
    if (!user) {
      toast.error("Please log in to complete your booking");
      navigate('/login');
      return;
    }
    
    setIsProcessing(true);
    
    // Process each booking
    cartItems.forEach((item) => {
      const booking = {
        serviceId: item.id,
        customerId: user.id,
        customerName: user.name,
        date: item.bookingDetails.date,
        time: item.bookingDetails.time,
        address: item.bookingDetails.address,
      };
      
      addBooking(booking);
    });
    
    // Clear cart and show success message
    setTimeout(() => {
      clearCart();
      toast.success("Bookings successfully created!");
      setIsProcessing(false);
      navigate('/customer');
    }, 1000);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
        
        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <CartItem key={item.cartId} item={item} />
              ))}
            </div>
            
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Services ({cartItems.length})</span>
                    <span>₹{totalPrice}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service Fee</span>
                    <span>₹0</span>
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>₹{totalPrice}</span>
                    </div>
                  </div>
                  
                  <Button
                    onClick={handleCheckout}
                    className="w-full bg-homeigo-500 hover:bg-homeigo-600"
                    disabled={isProcessing}
                  >
                    {isProcessing ? 'Processing...' : 'Checkout'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-16 bg-gray-50 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
            <p className="mb-8 text-gray-600">Looks like you haven't added any services to your cart yet.</p>
            <Button onClick={() => navigate('/services')}>
              Browse Services
            </Button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CartPage;
