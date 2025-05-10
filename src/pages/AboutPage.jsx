
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const AboutPage = () => {
  const team = [
    {
      name: 'Jahnavi',
      id: '2300030131',
      email: 'jahnavi@kluniversity.in',
      role: 'Frontend Developer'
    },
    {
      name: 'Ramya',
      id: '2300030326',
      email: 'ramya@kluniversity.in',
      role: 'Backend Developer'
    },
    {
      name: 'Karthikeya',
      id: '2300032330',
      email: 'karthikeya@kluniversity.in',
      role: 'UI/UX Designer'
    }
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-center">About Homeigo</h1>
            
            <div className="prose prose-lg mx-auto mb-12">
              <p>
                Homeigo is a comprehensive home services platform designed to connect homeowners with professional service providers. Our mission is to make home maintenance and improvement services accessible, reliable, and hassle-free for everyone.
              </p>
              <p>
                Founded as part of the Full Stack Application Development (FSAD) course at KL University, our platform aims to revolutionize the way people book and manage home services in Andhra Pradesh.
              </p>
              <p>
                Whether you need cleaning, repairs, maintenance, or any other home service, Homeigo provides a streamlined booking experience with verified professionals you can trust.
              </p>
            </div>
            
            <h2 className="text-2xl font-semibold mb-6 text-center">Our Team</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {team.map((member) => (
                <div key={member.id} className="bg-white p-6 rounded-lg shadow-md text-center">
                  <div className="w-20 h-20 bg-homeigo-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl font-semibold text-homeigo-500">
                      {member.name.charAt(0)}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-gray-500 mb-2">{member.role}</p>
                  <p className="text-sm mb-1">ID: {member.id}</p>
                  <p className="text-sm text-homeigo-600">{member.email}</p>
                </div>
              ))}
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-center">Course Information</h3>
              <div className="text-center">
                <p className="mb-1">KL University</p>
                <p className="mb-1">Full Stack Application Development (FSAD-S24)</p>
                <p>Green Fields, Vaddeswaram, Guntur, Andhra Pradesh</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
