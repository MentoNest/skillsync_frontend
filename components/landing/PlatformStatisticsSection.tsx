import React from "react";

const stats = [
  {
    value: "1,200+",
    label: "Active Mentors",
  },
  {
    value: "5,000+",
    label: "Enrolled Mentees",
  },
  {
    value: "10,000+",
    label: "Completed Sessions",
  },
  {
    value: "98%",
    label: "Positive Feedback",
  },
];

const PlatformStatisticsSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index}>
              <p className="text-4xl font-bold">{stat.value}</p>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlatformStatisticsSection;
