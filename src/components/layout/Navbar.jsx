
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navigateTo = (path) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  // Determine which links to show based on user role
  const getNavLinks = () => {
    if (!user) {
      return [
        { name: 'Home', path: '/' },
        { name: 'Services', path: '/services' },
        { name: 'About', path: '/about' },
      ];
    }
    
    switch (user.role) {
      case 'customer':
        return [
          { name: 'Home', path: '/customer' },
          { name: 'Services', path: '/services' },
          { name: 'About', path: '/about' },
        ];
      case 'provider':
        return [
          { name: 'Dashboard', path: '/provider' },
          { name: 'Manage Bookings', path: '/provider/bookings' },
        ];
      case 'admin':
        return [
          { name: 'Dashboard', path: '/admin' },
          { name: 'Services', path: '/admin/services' },
          { name: 'Providers', path: '/admin/providers' },
        ];
      default:
        return [
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
          { name: 'About', path: '/about' },
        ];
    }
  };

  const navLinks = getNavLinks();

  return (
    <nav className="bg-white shadow-sm py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <h1 className="text-2xl font-bold text-homeigo-600">
            Home<span className="text-homeigo-500">igo</span>
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-gray-600 hover:text-homeigo-500 transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Auth/Profile Section */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <>
              {user.role === 'customer' && (
                <Link to="/cart" className="relative text-gray-600 hover:text-homeigo-500">
                  <ShoppingCart size={20} />
                  {cartItems.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-homeigo-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cartItems.length}
                    </span>
                  )}
                </Link>
              )}
              <div className="flex items-center space-x-2">
                <User size={20} className="text-gray-600" />
                <span className="text-sm text-gray-600">
                  {user.name}
                </span>
              </div>
              <Button variant="ghost" size="sm" onClick={logout}>
                Logout
              </Button>
            </>
          ) : (
            <Button onClick={() => navigate('/login')} variant="outline">
              Login
            </Button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button onClick={toggleMenu} className="md:hidden text-gray-500 focus:outline-none">
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-4 px-6 animate-fade-in">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => navigateTo(link.path)}
                className="text-gray-600 hover:text-homeigo-500 py-2 transition-colors text-left"
              >
                {link.name}
              </button>
            ))}
            
            {user ? (
              <>
                {user.role === 'customer' && (
                  <button 
                    onClick={() => navigateTo('/cart')} 
                    className="flex items-center text-gray-600 hover:text-homeigo-500 py-2"
                  >
                    <ShoppingCart size={18} className="mr-2" />
                    Cart {cartItems.length > 0 && `(${cartItems.length})`}
                  </button>
                )}
                <div className="flex items-center py-2 text-gray-600">
                  <User size={18} className="mr-2" />
                  <span className="text-sm">{user.name}</span>
                </div>
                <Button variant="ghost" size="sm" onClick={logout} className="justify-start px-0">
                  Logout
                </Button>
              </>
            ) : (
              <Button onClick={() => navigateTo('/login')} variant="outline" className="mt-2">
                Login
              </Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
