
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="hero-section py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Professional Home Services at Your Doorstep
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Book trusted professionals for all your home service needs. From cleaning to repairs, we've got you covered.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              onClick={() => navigate('/services')}
              className="bg-homeigo-500 hover:bg-homeigo-600 text-white px-8 py-3 rounded-md text-lg"
            >
              Explore Services
            </Button>
            <Button 
              onClick={() => navigate('/login')}
              variant="outline"
              className="border-homeigo-500 text-homeigo-500 hover:bg-homeigo-50 px-8 py-3 rounded-md text-lg"
            >
              Login / Sign Up
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
