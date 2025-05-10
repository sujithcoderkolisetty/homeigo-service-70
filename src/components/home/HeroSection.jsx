
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
            <span className="block text-2xl md:text-3xl mt-2 text-gray-700">మీ ఇంటి వద్దకు వృత్తిపరమైన హోమ్ సర్వీసెస్</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Book trusted professionals for all your home service needs.
            <span className="block mt-1">మీ ఇంటి సేవల అవసరాలకు నమ్మకమైన నిపుణులను బుక్ చేసుకోండి.</span>
            From cleaning to repairs, we've got you covered.
            <span className="block mt-1">క్లీనింగ్ నుండి రిపేర్లు వరకు, మేము మీకు అన్ని సేవలు అందిస్తాము.</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              onClick={() => navigate('/services')}
              className="bg-homeigo-500 hover:bg-homeigo-600 text-white px-8 py-3 rounded-md text-lg"
            >
              Explore Services
              <span className="block text-sm">సర్వీసులను అన్వేషించండి</span>
            </Button>
            <Button 
              onClick={() => navigate('/login')}
              variant="outline"
              className="border-homeigo-500 text-homeigo-500 hover:bg-homeigo-50 px-8 py-3 rounded-md text-lg"
            >
              Login / Sign Up
              <span className="block text-sm">లాగిన్ / సైన్ అప్</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
