import { BriefcaseIcon, ChevronDownIcon, TimerIcon } from "lucide-react";
import React from "react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";

export const DashboardStatsSection = (): JSX.Element => {
  // Data for stat cards to enable mapping
  const statCards = [
    {
      value: "15",
      label: "Total Projects",
      icon: <BriefcaseIcon className="h-[22px] w-[22px] text-white" />,
      bgColor: "bg-[#577bff]",
    },
    {
      value: "6",
      label: "On Going Projects",
      icon: (
        <img
          className="w-[22px] h-[22px]"
          alt="Ion hourglass"
          src="/ion-hourglass-outline.svg"
        />
      ),
      bgColor: "bg-[#e65f2b]",
    },
    {
      value: "100",
      label: "Finished Projects",
      icon: <TimerIcon className="h-[22px] w-[22px] text-white" />,
      bgColor: "bg-[#a3d65b]",
    },
    {
      value: "8",
      label: "Unfinished Projects",
      icon: <TimerIcon className="h-[22px] w-[22px] text-white" />,
      bgColor: "bg-[#ff7774]",
    },
  ];

  return (
    <div className="w-full py-[20px]">
      <div className="flex w-full items-center justify-between mb-6">
        <h1 className="text-[32px] font-normal font-['Work_Sans',Helvetica] text-[#000606] tracking-[0.16px] [-webkit-text-stroke:0.5px_#060606]">
          Dashboard
        </h1>

        <Button variant="outline" className="h-[34px] rounded-[17px] bg-white">
          <span className="text-sm font-normal font-['Aeonik_Pro_TRIAL-Regular',Helvetica] text-[#060606] tracking-[0.14px]">
            Last 30 days
          </span>
          <ChevronDownIcon className="ml-3 h-3.5 w-3.5" />
        </Button>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {statCards.map((card, index) => (
          <Card key={index} className="rounded-xl bg-white">
            <CardContent className="flex items-center justify-between p-[30px]">
              <div className="flex flex-col">
                <span className="text-5xl font-medium font-['Work_Sans',Helvetica] text-black">
                  {card.value}
                </span>
                <span className="text-xs font-normal font-['Work_Sans',Helvetica] text-black mt-4">
                  {card.label}
                </span>
              </div>
              <div
                className={`flex items-center justify-center p-3 rounded-[26px] ${card.bgColor}`}
              >
                {card.icon}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
