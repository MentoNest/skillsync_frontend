import React from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  variant?: "blue" | "green" | "purple" | "orange" | "red";
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  variant = "blue",
  trend,
}) => {
  const variantStyles = {
    blue: {
      bg: "bg-blue-50",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      border: "border-blue-200",
    },
    green: {
      bg: "bg-green-50",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      border: "border-green-200",
    },
    purple: {
      bg: "bg-purple-50",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      border: "border-purple-200",
    },
    orange: {
      bg: "bg-orange-50",
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
      border: "border-orange-200",
    },
    red: {
      bg: "bg-red-50",
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
      border: "border-red-200",
    },
  };

  const currentVariant = variantStyles[variant];

  return (
    <div
      className={`
      ${currentVariant.bg} 
      ${currentVariant.border} 
      border rounded-xl p-6 transition-all duration-200 hover:shadow-md hover:scale-105
    `}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>

          {trend && (
            <div className="flex items-center mt-2">
              <span
                className={`text-sm font-medium ${
                  trend.isPositive ? "text-green-600" : "text-red-600"
                }`}
              >
                {trend.isPositive ? "↗" : "↘"} {Math.abs(trend.value)}%
              </span>
              <span className="text-sm text-gray-500 ml-1">vs last month</span>
            </div>
          )}
        </div>

        <div
          className={`
          ${currentVariant.iconBg} 
          ${currentVariant.iconColor} 
          w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ml-4
        `}
        >
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
