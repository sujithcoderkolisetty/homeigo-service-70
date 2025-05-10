
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import { ServiceProvider } from "./contexts/ServiceContext";

// Pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ServicesPage from "./pages/ServicesPage";
import ServiceDetailPage from "./pages/ServiceDetailPage";
import CartPage from "./pages/CartPage";
import AboutPage from "./pages/AboutPage";
import NotFound from "./pages/NotFound";

// Customer Pages
import CustomerDashboard from "./pages/customer/CustomerDashboard";

// Provider Pages
import ProviderDashboard from "./pages/provider/ProviderDashboard";
import ProviderBookings from "./pages/provider/ProviderBookings";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminServices from "./pages/admin/AdminServices";
import AdminProviders from "./pages/admin/AdminProviders";
import AdminBookings from "./pages/admin/AdminBookings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AuthProvider>
          <ServiceProvider>
            <CartProvider>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/service/:id" element={<ServiceDetailPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/cart" element={<CartPage />} />
                
                {/* Customer Routes */}
                <Route path="/customer" element={<CustomerDashboard />} />
                
                {/* Provider Routes */}
                <Route path="/provider" element={<ProviderDashboard />} />
                <Route path="/provider/bookings" element={<ProviderBookings />} />
                
                {/* Admin Routes */}
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/services" element={<AdminServices />} />
                <Route path="/admin/providers" element={<AdminProviders />} />
                <Route path="/admin/bookings" element={<AdminBookings />} />
                
                {/* Catch-all Route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
              
              <Toaster />
              <Sonner />
            </CartProvider>
          </ServiceProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
