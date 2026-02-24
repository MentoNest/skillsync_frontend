"use client";

import { ReactNode, useState } from "react";
import { cn } from "@/lib/utils";

interface ToolCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  buttonText: string;
  gradient?: string;
  buttonColor?: string;
  className?: string;
  onClick?: () => void;
}

const ToolCard = ({
  icon,
  title,
  description,
  buttonText,
  gradient = "linear-gradient(135deg, #dbeafe 0%, #ede9fe 100%)",
  buttonColor = "#4f46e5",
  className,
  onClick,
}: ToolCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <div
      className={cn(
        "rounded-2xl p-7 flex flex-col gap-2.5 min-w-[260px] max-w-[380px] flex-1 transition-all duration-300 cursor-default",
        className
      )}
      style={{
        background: gradient,
        boxShadow: isHovered 
          ? "0 8px 32px rgba(99,102,241,0.13)" 
          : "0 2px 12px rgba(99,102,241,0.06)",
        transform: isHovered ? "translateY(-2px)" : "translateY(0)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="text-2xl mb-1 leading-none">
        {icon}
      </div>
      <h3 className="font-bold text-lg text-gray-900 mb-2 tracking-tight">
        {title}
      </h3>
      <p className="text-sm text-gray-600 leading-relaxed mb-3">
        {description}
      </p>
      <button
        className="mt-2 rounded-lg px-5 py-2.5 text-sm font-semibold self-start transition-all duration-200"
        style={{
          background: buttonColor,
          boxShadow: isButtonHovered 
            ? `0 4px 16px ${buttonColor}66` 
            : `0 2px 8px ${buttonColor}55`,
          filter: isButtonHovered ? "brightness(1.1)" : "brightness(1)",
        }}
        onMouseEnter={() => setIsButtonHovered(true)}
        onMouseLeave={() => setIsButtonHovered(false)}
        onClick={handleClick}
      >
        {buttonText}
      </button>
    </div>
  );
};

export { ToolCard };