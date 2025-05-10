
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';

const CartItem = ({ item }) => {
  const { removeFromCart } = useCart();
  
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center gap-4 p-4 border rounded-lg">
      <div className="w-20 h-20 rounded overflow-hidden flex-shrink-0">
        <img
          src={item.image || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158'}
          alt={item.title}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="flex-grow">
        <h3 className="font-semibold text-lg">{item.title}</h3>
        <p className="text-sm text-gray-500">Provider: {item.provider}</p>
        <div className="mt-2 text-sm">
          <p>Date: {item.bookingDetails.date}</p>
          <p>Time: {item.bookingDetails.time}</p>
          <p className="truncate max-w-xs">Address: {item.bookingDetails.address}</p>
        </div>
      </div>
      
      <div className="flex flex-col items-end gap-4">
        <p className="font-semibold text-lg">₹{item.price}</p>
        <Button 
          variant="outline" 
          size="sm" 
          className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
          onClick={() => removeFromCart(item.cartId)}
        >
          Remove
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
