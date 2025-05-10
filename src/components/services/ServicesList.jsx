
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useServices } from '@/contexts/ServiceContext';
import ServiceCard from './ServiceCard';

const ServicesList = () => {
  const { services } = useServices();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('default');

  // Filter services based on search term
  const filteredServices = services.filter(service => 
    service.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    service.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort services based on selected sort order
  const sortedServices = [...filteredServices].sort((a, b) => {
    switch (sortOrder) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'name':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  return (
    <div>
      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <div className="flex-grow">
          <Input
            type="text"
            placeholder="Search services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={sortOrder === 'default' ? 'secondary' : 'outline'}
            onClick={() => setSortOrder('default')}
            className="whitespace-nowrap"
          >
            Default
          </Button>
          <Button
            variant={sortOrder === 'price-low' ? 'secondary' : 'outline'}
            onClick={() => setSortOrder('price-low')}
            className="whitespace-nowrap"
          >
            Price: Low to High
          </Button>
          <Button
            variant={sortOrder === 'price-high' ? 'secondary' : 'outline'}
            onClick={() => setSortOrder('price-high')}
            className="whitespace-nowrap"
          >
            Price: High to Low
          </Button>
          <Button
            variant={sortOrder === 'name' ? 'secondary' : 'outline'}
            onClick={() => setSortOrder('name')}
            className="whitespace-nowrap"
          >
            Name
          </Button>
        </div>
      </div>

      {sortedServices.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium mb-2">No services found</h3>
          <p className="text-gray-600">
            Try adjusting your search or filters to find what you're looking for.
          </p>
        </div>
      )}
    </div>
  );
};

export default ServicesList;
