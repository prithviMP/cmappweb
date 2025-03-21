import React from "react";
import { Button } from "../button";
import { cn } from "../../../lib/utils";

interface StatusFilterProps {
  statuses: string[];
  activeStatus: string;
  onChange: (status: string) => void;
}

export const StatusFilter = ({ statuses, activeStatus, onChange }: StatusFilterProps) => {
  return (
    <div className="flex gap-4 overflow-x-auto pb-2">
      {statuses.map((status) => (
        <Button
          key={status}
          variant={activeStatus === status ? "default" : "ghost"}
          onClick={() => onChange(status)}
          className={cn(
            "h-[42px] px-4 py-2 rounded-[8px] whitespace-nowrap",
            activeStatus === status 
              ? "bg-[#577bff] text-white hover:bg-[#4a69d9]" 
              : "text-[#71717A] hover:bg-[#F4F4F5]"
          )}
        >
          {status}
        </Button>
      ))}
    </div>
  );
};