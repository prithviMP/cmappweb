import React from "react";
import { cn } from "../../../lib/utils";

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  variant?: "default" | "success" | "warning" | "danger";
}

const variants = {
  default: "bg-blue-600",
  success: "bg-green-600",
  warning: "bg-yellow-600",
  danger: "bg-red-600",
};

export const Progress = ({
  value,
  max = 100,
  variant = "default",
  className,
  ...props
}: ProgressProps) => {
  return (
    <div
      className={cn(
        "h-2 w-full overflow-hidden rounded-full bg-gray-200",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "h-full transition-all",
          variants[variant]
        )}
        style={{ width: `${Math.min(100, (value / max) * 100)}%` }}
      />
    </div>
  );
};