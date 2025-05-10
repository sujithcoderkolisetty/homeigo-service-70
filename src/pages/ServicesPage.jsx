
import { useEffect } from 'react';
import ServicesList from '@/components/services/ServicesList';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const ServicesPage = () => {
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Our Services</h1>
          <p className="text-gray-600">
            Browse through our comprehensive range of professional home services.
          </p>
        </div>
        <ServicesList />
      </main>
      <Footer />
    </div>
  );
};

export default ServicesPage;
