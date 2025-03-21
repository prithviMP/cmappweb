import React from "react";
import { UserIcon } from "lucide-react";

interface StatsBadgeProps {
  count: number;
  label: string;
  color: string;
}

export const StatsBadge = ({ count, label, color }: StatsBadgeProps) => {
  return (
    <div className="flex flex-col items-center justify-center bg-white p-6 rounded-lg">
      <div className="flex items-center gap-3">
        <span className="text-4xl font-medium">{count}</span>
        <div className={`p-2 rounded-full ${color}`}>
          <UserIcon className="h-6 w-6 text-white" />
        </div>
      </div>
      <p className="text-sm text-gray-600 mt-1">{label}</p>
    </div>
  );
};