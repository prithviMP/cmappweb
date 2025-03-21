import React from "react";
import { Card } from "../card";
import { Badge } from "../badge";
import { CalendarIcon } from "lucide-react";

interface RequestCardProps {
  contractorName?: string;
  newSignUp?: string;
  taskName: string;
  projectName: string;
  status: "Approved" | "Pending" | "Rejected";
  submittedDate: string;
}

export const RequestCard = ({
  contractorName,
  newSignUp,
  taskName,
  projectName,
  status,
  submittedDate,
}: RequestCardProps) => {
  const getStatusStyles = (status: string) => {
    const styles = {
      "Approved": "bg-[#1a922d2e] text-[#1a922d]",
      "Pending": "bg-[#dfa50f2e] text-[#dfa50f]",
      "Rejected": "bg-[#ee1f1b2e] text-[#ee1f1b]",
    };
    return styles[status as keyof typeof styles] || "";
  };

  return (
    <Card className="p-4 bg-white hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-base font-medium text-[#060606]">
              {contractorName || newSignUp}
            </h3>
            <Badge className={`px-2 py-1 rounded-full text-xs ${getStatusStyles(status)}`}>
              {status}
            </Badge>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[#71717A]">
              <span className="w-4 h-4">≡</span>
              <span className="text-sm">{taskName}</span>
            </div>
            <div className="flex items-center gap-2 text-[#71717A]">
              <span className="w-4 h-4">⌂</span>
              <span className="text-sm">{projectName}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2 min-w-[120px]">
          <div className="flex items-center gap-1 text-xs text-[#71717A]">
            <CalendarIcon className="w-4 h-4" />
            <span>Submitted On: {submittedDate}</span>
          </div>
          <button className="text-[#577bff] text-sm hover:underline">
            View Details
          </button>
        </div>
      </div>
    </Card>
  );
};