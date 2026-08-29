// Mentor availability status badge (#847)
import React from "react";
import type { AvailabilityStatus } from "@/types/mentor";

interface AvailabilityBadgeProps {
  status: AvailabilityStatus;
}

const STATUS_CONFIG: Record<AvailabilityStatus, { label: string; className: string }> = {
  available: { label: "Available", className: "bg-green-100 text-green-700 border-green-200" },
  busy: { label: "Busy", className: "bg-yellow-100 text-yellow-700 border-yellow-200" },
  unavailable: { label: "Unavailable", className: "bg-gray-100 text-gray-500 border-gray-200" },
};

const AvailabilityBadge = ({ status }: AvailabilityBadgeProps) => {
  const { label, className } = STATUS_CONFIG[status];
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${className}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current" aria-hidden="true" />
      {label}
    </span>
  );
};

export default React.memo(AvailabilityBadge);
