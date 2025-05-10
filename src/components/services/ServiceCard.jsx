
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const ServiceCard = ({ service }) => {
  return (
    <Card className="service-card overflow-hidden flex flex-col h-full">
      <div className="aspect-[16/9] overflow-hidden">
        <img 
          src={service.image || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158'} 
          alt={service.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158'; // Fallback image
          }}
        />
      </div>
      <CardContent className="flex-grow p-6">
        <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
        <p className="text-gray-600 mb-4">{service.description}</p>
        <div className="flex justify-between items-center">
          <p className="font-medium text-homeigo-600">${service.price}</p>
          <p className="text-sm text-gray-500">{service.provider}</p>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button asChild className="w-full bg-homeigo-500 hover:bg-homeigo-600">
          <Link to={`/service/${service.id}`}>Book Now</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ServiceCard;
