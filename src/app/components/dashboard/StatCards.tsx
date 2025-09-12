import React from "react";
import StatCard from "../UI/StatCard";

// Icons - You can replace these with your preferred icon library (Heroicons, Lucide, etc.)
const UsersIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
    />
  </svg>
);

const BookOpenIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253z"
    />
  </svg>
);

const CurrencyDollarIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
    />
  </svg>
);

const CheckCircleIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

interface StatCardsProps {
  mentorCount?: number;
  coursesCompleted?: number;
  walletEarned?: number;
  tasksCompleted?: number;
}

const StatCards: React.FC<StatCardsProps> = ({
  mentorCount = 245,
  coursesCompleted = 89,
  walletEarned = 15420,
  tasksCompleted = 156,
}) => {
  const statsData = [
    {
      title: "Total no. of Mentors",
      value: mentorCount.toLocaleString(),
      icon: <UsersIcon />,
      variant: "blue" as const,
      trend: {
        value: 12.5,
        isPositive: true,
      },
    },
    {
      title: "Courses Completed",
      value: coursesCompleted,
      icon: <BookOpenIcon />,
      variant: "green" as const,
      trend: {
        value: 8.2,
        isPositive: true,
      },
    },
    {
      title: "Wallet Earned",
      value: `$${walletEarned.toLocaleString()}`,
      icon: <CurrencyDollarIcon />,
      variant: "purple" as const,
      trend: {
        value: 23.1,
        isPositive: true,
      },
    },
    {
      title: "Tasks Completed",
      value: tasksCompleted,
      icon: <CheckCircleIcon />,
      variant: "orange" as const,
      trend: {
        value: 3.8,
        isPositive: false,
      },
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statsData.map((stat, index) => (
        <StatCard
          key={index}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          variant={stat.variant}
          trend={stat.trend}
        />
      ))}
    </div>
  );
};

export default StatCards;
