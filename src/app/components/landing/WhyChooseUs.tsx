import type React from "react";
import { Users, Award, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card className="border border-border bg-card p-6 h-full">
      <CardContent className="p-0 space-y-4">
        <div className="text-muted-foreground">{icon}</div>
        <h3 className="text-xl font-semibold text-foreground">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  );
}

export function WhyChooseUs() {
  const features = [
    {
      icon: <Users size={32} />,
      title: "Decentralized Mentorship",
      description:
        "Connect with mentors directly, without intermediaries, ensuring a transparent and efficient mentorship process.",
    },
    {
      icon: <Award size={32} />,
      title: "Verifiable Credentials",
      description:
        "Earn blockchain-based credentials that are tamper-proof and easily shareable, showcasing your skills to potential employers.",
    },
    {
      icon: <Shield size={32} />,
      title: "Reputation Building",
      description:
        "Build a reputation based on your contributions and achievements within the SkillUp community, enhancing your credibility in the web3 space.",
    },
  ];

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
          Why Choose SkillUp?
        </h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          SkillUp leverages web3 to enhance your learning journey, offering
          benefits not found on traditional platforms.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </section>
  );
}
