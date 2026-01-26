import React from 'react';

const LearningPathSection = () => {
  const resources = [
    {
      image: 'https://images.unsplash.com/photo-1761839258803-21515f43190c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8',
      name: 'Cole Hathans',
      rating: 3,
      role: 'Expert Career Counsellor',
      description: '15+ years building products, business strategy, GTM and teams.',
      amount: '$25/month',
      link: '/resources/frontend',
    },
    {
      image: 'https://images.unsplash.com/photo-1761839271800-f44070ff0eb9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxNXx8fGVufDB8fHx8fA%3D%3D',
      name: 'Sarah Johnson',
      rating: 4.8,
      role: 'Tech Leadership Coach',
      description: '10+ years in software engineering and team leadership at Fortune 500 companies.',
      amount: '$50/month',
      link: '/resources/backend',
    },
    {
      image: 'https://images.unsplash.com/photo-1768137580619-76d7adbd8663?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyMXx8fGVufDB8fHx8fA%3D%3D',
      name: 'Marcus Williams',
      rating: 4.9,
      role: 'Business Strategy Consultant',
      description: '20+ years advising startups and established companies on growth strategies.',
      amount: '$75/month',
      link: '/resources/fullstack',
    },
    {
      image: 'https://images.unsplash.com/photo-1768185595109-18aded979f9d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyM3x8fGVufDB8fHx8fA%3D%3D',
      name: 'Emily Chen',
      rating: 4.7,
      role: 'UX Design Mentor',
      description: '8+ years leading design teams at top tech companies.',
      amount: '$40/month',
      link: '/resources/ux-design',
    },
    {
      image: 'https://images.unsplash.com/photo-1768268004424-0f30eb142ca3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyNnx8fGVufDB8fHx8fA%3D%3D',
      name: 'David Martinez',
      rating: 4.6,
      role: 'Data Science Coach',
      description: '12+ years in ML/AI and data analytics across multiple industries.',
      amount: '$55/month',
      link: '/resources/data-science',
    },
    {
      image: 'https://images.unsplash.com/photo-1768898795111-7c56e72fc592?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzN3x8fGVufDB8fHx8fA%3D%3D',
      name: 'Kate Conell',
      rating: 4.5,
      role: 'Career Development Specialist',
      description: 'Search by skills, industry, or name.',
      amount: '$30/month',
      link: '/resources/career-development',
    },
  ];

  return (
    <section className="min-h-screen bg-white py-8 flex items-center justify-center p-8">
      <div className="max-w-6xl w-full">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
          Discover Some of Africa's Best Mentors
        </h2>
        <p className="text-center text-gray-600 text-base mb-8">
          Connect with experienced professionals who can guide your journey
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {resources.map((resource, index) => (
            <div key={index} className="border rounded-lg shadow hover:shadow-lg transition overflow-hidden">
              <img
                src={resource.image}
                alt={resource.name}
                className="w-full h-72 object-cover"
              />
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold text-black">{resource.name}</h3>
                  <span className="text-yellow-500">⭐ {resource.rating}</span>
                </div>
                <p className="text-sm text-gray-500 mb-2">{resource.role}</p>
                <p className="text-gray-600 mb-4 truncate">{resource.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">{resource.amount}</span>
                  <a
                    href={resource.link}
                    className="bg-[#9810FA] text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                  >
                    Book Now
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LearningPathSection;