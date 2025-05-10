
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';

const testimonials = [
  {
    id: 1,
    name: 'Emily Johnson',
    service: 'Home Cleaning',
    comment: 'The cleaning service was exceptional! My house has never looked this good. Will definitely book again.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Michael Brown',
    service: 'Garden Maintenance',
    comment: 'The gardening team did a fantastic job. They were professional, punctual, and my garden looks beautiful now.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Sarah Williams',
    service: 'Kitchen Cleaning',
    comment: 'I\'m amazed at how clean my kitchen is. They paid attention to every detail and were very thorough.',
    rating: 4,
  },
  {
    id: 4,
    name: 'David Lee',
    service: 'Plumbing Services',
    comment: 'Quick response and professional service. Fixed my leaky faucet in no time. Highly recommend!',
    rating: 5,
  },
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const displayedTestimonials = testimonials.slice(activeIndex, activeIndex + 3);
  
  const moveLeft = () => {
    setActiveIndex(prev => Math.max(prev - 1, 0));
  };
  
  const moveRight = () => {
    setActiveIndex(prev => Math.min(prev + 1, testimonials.length - 3));
  };
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it — hear from our satisfied customers
          </p>
        </div>
        
        <div className="relative">
          {activeIndex > 0 && (
            <button 
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-md z-10 hidden md:block" 
              onClick={moveLeft}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {displayedTestimonials.map((testimonial) => (
              <Card key={testimonial.id} className="border-none shadow-md">
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon 
                        key={i} 
                        className={`h-5 w-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  <p className="mb-4 text-gray-700">"{testimonial.comment}"</p>
                  <div className="mt-4">
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.service}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {activeIndex < testimonials.length - 3 && (
            <button 
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-md z-10 hidden md:block" 
              onClick={moveRight}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
        
        {/* Mobile navigation dots */}
        <div className="flex justify-center space-x-2 mt-8 md:hidden">
          {testimonials.slice(0, testimonials.length - 2).map((_, idx) => (
            <button
              key={idx}
              className={`w-2 h-2 rounded-full ${activeIndex === idx ? 'bg-homeigo-500' : 'bg-gray-300'}`}
              onClick={() => setActiveIndex(idx)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

function StarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
