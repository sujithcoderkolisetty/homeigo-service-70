
import { CheckCircle, Calendar, Home } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: <Search size={40} className="text-homeigo-500" />,
      title: 'Browse Services',
      description: 'Explore our wide range of professional home services.'
    },
    {
      icon: <Calendar size={40} className="text-homeigo-500" />,
      title: 'Book Appointment',
      description: 'Choose a convenient date and time for your service.'
    },
    {
      icon: <Home size={40} className="text-homeigo-500" />,
      title: 'Get Service',
      description: 'Our verified professionals will arrive at your doorstep.'
    },
    {
      icon: <CheckCircle size={40} className="text-homeigo-500" />,
      title: 'Enjoy Results',
      description: 'Sit back, relax, and enjoy your perfectly maintained home.'
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Getting your home services has never been easier
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-4">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

function Search(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
