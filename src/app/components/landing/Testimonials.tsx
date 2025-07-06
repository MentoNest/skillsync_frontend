import TestimonialCard from '../UI/TestimonialCard';

const testimonials = [
  {
    name: 'Sarah Yewer',
    title: 'Software Engineer',
    location: 'Nigeria',
    feedback:
      'SkillSync connected me with a mentor who completely changed my career trajectory. The blockchain credentials helped me land my dream job.',
  },
  {
    name: 'Sarah Yewer',
    title: 'Software Engineer',
    location: 'Nigeria',
    feedback:
      'As a mentor, I love how SkillSync makes it easy to collaborate in real-time with my mentees and track their progress through blockchain verification.',
  },
  {
    name: 'Sarah Yewer',
    title: 'Software Engineer',
    location: 'Nigeria',
    feedback:
      'SkillSync connected me with a mentor who completely changed my career trajectory. The blockchain credentials helped me land my dream job.',
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-10">What users are saying</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item, idx) => (
            <TestimonialCard key={idx} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
