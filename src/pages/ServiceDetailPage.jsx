
import { useEffect } from 'react';
import ServiceDetail from '@/components/services/ServiceDetail';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const ServiceDetailPage = () => {
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <ServiceDetail />
      </main>
      <Footer />
    </div>
  );
};

export default ServiceDetailPage;
