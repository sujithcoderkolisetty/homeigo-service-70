
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const ServiceCard = ({ service }) => {
  // Telugu translations for common service titles
  const getTeluguServiceName = (title) => {
    const translations = {
      "Home Cleaning": "ఇంటి శుభ్రపరచడం",
      "Kitchen Cleaning": "వంటగది శుభ్రపరచడం",
      "Plumbing Services": "ప్లంబింగ్ సేవలు",
      "Garden Maintenance": "తోట నిర్వహణ",
      "Electrical Services": "విద్యుత్ సేవలు",
      "Painting Services": "పెయింటింగ్ సేవలు",
      "Carpentry": "వడ్రంగం",
      "Pest Control": "కీటక నియంత్రణ"
    };
    
    return translations[title] || "";
  };

  // Telugu translation for description (basic placeholder)
  const getTeluguDescription = (description) => {
    if (!description) return "";
    return "ప్రొఫెషనల్ సేవలు మరియు అనుభవజ్ఞులైన సిబ్బంది";
  };

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
        <h3 className="text-xl font-semibold mb-1">{service.title}</h3>
        <p className="text-sm text-gray-500 mb-2">{getTeluguServiceName(service.title)}</p>
        <p className="text-gray-600 mb-2">{service.description}</p>
        <p className="text-xs text-gray-500 mb-3">{getTeluguDescription(service.description)}</p>
        <div className="flex justify-between items-center mt-3">
          <div>
            <p className="font-medium text-homeigo-600">₹{service.price}</p>
            <p className="text-xs text-gray-500">ధర</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 text-right">{service.provider}</p>
            <p className="text-xs text-gray-500">ప్రొవైడర్</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button asChild className="w-full bg-homeigo-500 hover:bg-homeigo-600">
          <Link to={`/service/${service.id}`}>
            <span>Book Now</span>
            <span className="block text-xs">ఇప్పుడే బుక్ చేసుకోండి</span>
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ServiceCard;
