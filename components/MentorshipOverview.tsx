import React from 'react';

const ArrowRight: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M5 12h14" />
    <path d="M12 5l7 7-7 7" />
  </svg>
);

interface MentorTipCard {
  title: string;
  description: string;
}

interface ApproachColumn {
  title: string;
  features: {
    title: string;
    description: string;
  }[];
}

const MentorshipOverview: React.FC = () => {
  const mentorTips: MentorTipCard[] = [
    {
      title: "This Way to Raise Your Hand for a Promotion",
      description: "Learn the strategies top performers use to advance their careers and get recognized"
    },
    {
      title: "How to Navigate Career Transitions Successfully",
      description: "Expert advice on making smooth transitions between roles and industries"
    }
  ];

  const approachColumns: ApproachColumn[] = [
    {
      title: "Skills",
      features: [
        {
          title: "On-Demand Learning",
          description: "Access curated content and learn at your own pace"
        },
        {
          title: "Skill Assessments",
          description: "Track your progress with regular evaluations"
        },
        {
          title: "Live Workshops",
          description: "Join interactive sessions with experts"
        }
      ]
    },
    {
      title: "Sync",
      features: [
        {
          title: "1-on-1 Sessions",
          description: "Get personalized guidance from your mentor"
        },
        {
          title: "Mentorship Plans",
          description: "Structured programs tailored to your goals"
        },
        {
          title: "Community Forum",
          description: "Connect with peers and share experiences"
        }
      ]
    },
    {
      title: "Fit Coaching",
      features: [
        {
          title: "Career Planning",
          description: "Define your path with expert guidance"
        },
        {
          title: "Goal Setting",
          description: "Set and achieve meaningful objectives"
        },
        {
          title: "Progress Reviews",
          description: "Regular check-ins to keep you on track"
        }
      ]
    }
  ];

  return (
    <div className="w-full bg-gray-50 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Mentors Best Tips Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Mentors Best Tips
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {mentorTips.map((tip, index) => (
              <div 
                key={index}
                className="bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {tip.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {tip.description}
                </p>
                <button className="text-purple-600 font-medium flex items-center gap-2 hover:gap-3 transition-all">
                  Read More
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Empowering Growth Section */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Empowering Your Growth Journey through
            </h2>
            <p className="text-3xl font-bold text-purple-600">
              a Unique Approach
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {approachColumns.map((column, index) => (
              <div 
                key={index}
                className="bg-purple-50 rounded-lg p-8"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  {column.title}
                </h3>
                
                <div className="space-y-6">
                  {column.features.map((feature, featureIndex) => (
                    <div key={featureIndex}>
                      <h4 className="font-semibold text-gray-900 mb-2">
                        {feature.title}
                      </h4>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default MentorshipOverview;