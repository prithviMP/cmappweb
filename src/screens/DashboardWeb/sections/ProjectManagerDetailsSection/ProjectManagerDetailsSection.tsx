import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";
import { Separator } from "../../../../components/ui/separator";

export const ProjectManagerDetailsSection = (): JSX.Element => {
  const healthMetrics = [
    { label: "Time", value: "34% ahead of schedule" },
    { label: "Tasks", value: "8 tasks to be completed" },
    { label: "Workload", value: "5 tasks are overdue" },
    { label: "Progress", value: "58% of projects are completed" },
    { label: "Contractors", value: "75% of the contractors active" },
    { label: "EAC", value: "62%  on EAC" },
    { label: "Future Endeavours", value: "12 projects inline" },
  ];

  return (
    <div className="w-full h-full">
      <Card className="w-full h-[392px]">
        <div className="p-6 pt-3.5 h-full">
          <div className="font-normal text-black text-base">Health</div>
          <Separator className="my-3" />

          <CardContent className="p-0 pt-2 space-y-6">
            {healthMetrics.map((metric, index) => (
              <div key={index} className="flex">
                <div className="w-[142px] font-normal text-black text-sm">
                  {metric.label}
                </div>
                <div className="font-normal text-[#8e8e8e] text-sm">
                  {metric.value}
                </div>
              </div>
            ))}
          </CardContent>
        </div>
      </Card>
    </div>
  );
};