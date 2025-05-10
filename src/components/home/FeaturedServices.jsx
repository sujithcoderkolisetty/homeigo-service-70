
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useServices } from '@/contexts/ServiceContext';

const FeaturedServices = () => {
  const { services } = useServices();
  
  // Get up to 3 featured services
  const featuredServices = services.slice(0, 3);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Featured Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Professional and reliable home services to keep your living space perfect
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredServices.map((service) => (
            <Card key={service.id} className="service-card overflow-hidden flex flex-col">
              <div className="aspect-[16/9] overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="flex-grow p-6">
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <p className="font-medium text-homeigo-600">₹{service.price}</p>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button asChild className="w-full bg-homeigo-500 hover:bg-homeigo-600">
                  <Link to={`/service/${service.id}`}>Book Now</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild variant="outline" className="border-homeigo-500 text-homeigo-500 hover:bg-homeigo-50">
            <Link to="/services">View All Services</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedServices;
