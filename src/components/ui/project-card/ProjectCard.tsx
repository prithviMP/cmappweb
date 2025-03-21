import React from "react";
import { MoreHorizontal } from "lucide-react";
import { Card, CardContent } from "../card/Card";
import { Progress } from "../progress/Progress";
import { Badge } from "../badge/Badge";
import { Button } from "../button";
import { cn } from "../../../lib/utils";

interface ProjectCardProps {
  name: string;
  description: string;
  status?: "pending" | "ongoing" | "completed" | null;
  progress: number;
  priority: "Low" | "Medium" | "High" | "Critical";
  dueDate: string;
  image?: string;
}

const statusConfig: Record<string, { label: string; color: string }> = {
  "pending": { 
    label: "Not Started",
    color: "bg-[#F2F4F7] text-[#344054]" 
  },
  "ongoing": { 
    label: "In Progress",
    color: "bg-[#FEF0C7] text-[#B54708]" 
  },
  "completed": { 
    label: "Finished",
    color: "bg-[#D1FADF] text-[#027A48]" 
  },
};

const priorityConfig = {
  "Low": "text-[#344054]",
  "Medium": "text-[#B54708]",
  "High": "text-[#B42318]",
  "Critical": "text-[#7A271A]",
};

export const ProjectCard = ({
  name,
  description,
  status,
  progress,
  priority,
  dueDate,
  image,
}: ProjectCardProps) => {
  const statusDisplay = status ? statusConfig[status] : { 
    label: "Not Started", 
    color: "bg-[#F2F4F7] text-[#344054]" 
  };

  return (
    <Card className="w-full bg-white rounded-[12px] shadow-sm">
      <CardContent className="p-0">
        {image && (
          <div className="w-full h-[160px] rounded-t-[12px] overflow-hidden">
            <img src={image} alt={name} className="w-full h-full object-cover" />
          </div>
        )}
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h3 className="text-base font-medium text-[#101828]">{name}</h3>
              <Badge className={cn("px-2 py-1 rounded-[16px]", statusDisplay.color)}>
                {statusDisplay.label}
              </Badge>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-[#98A2B3]">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>

          <p className="text-sm text-[#475467] mb-4 line-clamp-2">
            {description || "No description available"}
          </p>

          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#475467]">Progress</span>
              <span className="font-medium text-[#101828]">{progress}%</span>
            </div>
            
            <Progress 
              value={progress} 
              className="h-2 bg-[#F2F4F7]"
              indicatorClassName="bg-[#577bff]"
            />
            
            <div className="flex items-center justify-between text-sm">
              <span className={cn(
                "font-medium",
                priorityConfig[priority]
              )}>
                {priority}
              </span>
              <span className="text-[#475467]">{dueDate}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};