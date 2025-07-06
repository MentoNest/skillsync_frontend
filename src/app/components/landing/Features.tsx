import FeatureCard from '../ui/FeatureCard';
import { ShieldCheck, BadgeCheck, Users } from 'lucide-react';

const features = [
  {
    icon: <Users />,
    title: 'Decentralized Mentorship',
    description:
      'Connect with mentors directly without intermediaries, encouraging a transparent and efficient mentorship process.',
  },
  {
    icon: <BadgeCheck />,
    title: 'Verifiable Credentials',
    description:
      'Earn blockchain-verified credentials that can be ported across platforms and ecosystems, showcasing your skills to potential employers.',
  },
  {
    icon: <ShieldCheck />,
    title: 'Reputation Building',
    description:
      'Build a verifiable record of your contributions and community engagement across the SkillSync network.',
  },
];

const Features = () => {
  return (
    <section className="py-16 bg-[#F9F7FF]">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Why Choose SkillSync?</h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
          SkillSync leverages web3 to enhance your learning journey, offering benefits not found on traditional platforms.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <FeatureCard
              key={idx}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
