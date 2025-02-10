import React from "react";

interface BadgeProps {
  count: number;
}

const Badge = ({ count }: BadgeProps) => {
  if (count <= 0) return null;

  return (
    <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full shadow-lg">
      {count}
    </span>
  );
};

export default Badge;
