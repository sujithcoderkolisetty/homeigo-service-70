
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-10 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h2 className="text-xl font-bold mb-4 text-homeigo-600">
              Home<span className="text-homeigo-500">igo</span>
            </h2>
            <p className="text-gray-500 mb-4">
              Your trusted platform for professional home services in Andhra Pradesh.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-500 hover:text-homeigo-500">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-500 hover:text-homeigo-500">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-500 hover:text-homeigo-500">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-500 hover:text-homeigo-500">
                  Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/services" className="text-gray-500 hover:text-homeigo-500">
                  Home Cleaning
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-500 hover:text-homeigo-500">
                  Kitchen Cleaning
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-500 hover:text-homeigo-500">
                  Garden Maintenance
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="text-gray-500">
                Email: support@homeigo.com
              </li>
              <li className="text-gray-500">
                Phone: +91 9876543210
              </li>
              <li className="text-gray-500">
                Address: KL University, Green Fields, Vaddeswaram, Guntur, Andhra Pradesh
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500 mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Homeigo. All rights reserved.
            </p>
            <p className="text-sm text-gray-500">
              Developed by: Jahnavi-2300030131, Ramya-2300030326, Karthikeya-2300032330 | FSAD-S24
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
