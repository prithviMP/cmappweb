import React from "react";
import { Card, CardContent } from "../card/Card";
import { DivideIcon as LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  iconColor: string;
  iconBgColor: string;
}

export const StatsCard = ({
  title,
  value,
  icon: Icon,
  iconColor,
  iconBgColor,
}: StatsCardProps) => {
  return (
    <Card className="bg-white rounded-[14px] shadow-sm">
      <CardContent className="flex items-center justify-between p-[30px]">
        <div className="flex flex-col">
          <span className="text-[40px] font-medium text-[#060606]">
            {value}
          </span>
          <span className="text-sm text-[#060606] mt-4">
            {title}
          </span>
        </div>
        <div className={`flex items-center justify-center w-[52px] h-[52px] rounded-[26px] ${iconBgColor}`}>
          <Icon className={`w-[22px] h-[22px] ${iconColor}`} />
        </div>
      </CardContent>
    </Card>
  );
};