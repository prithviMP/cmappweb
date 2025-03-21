import React from "react";
import { cn } from "../../../lib/utils";

interface FormFieldProps {
  label: string;
  required?: boolean;
  error?: string;
  className?: string;
  children: React.ReactNode;
}

export const FormField = ({
  label,
  required,
  error,
  className,
  children
}: FormFieldProps) => {
  return (
    <div className={cn("space-y-2", className)}>
      <label className="block text-sm font-medium text-[#344054]">
        {label}
        {required && <span className="text-[#F04438]">*</span>}
      </label>
      {children}
      {error && (
        <p className="text-sm text-[#F04438]">{error}</p>
      )}
    </div>
  );
};