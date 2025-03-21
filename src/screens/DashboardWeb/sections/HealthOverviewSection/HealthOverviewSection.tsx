import { ChevronDownIcon } from "lucide-react";
import React from "react";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";

export const HealthOverviewSection = (): JSX.Element => {
  // Project data for mapping
  const projects = [
    {
      name: "Skyline Tower Development",
      manager: "Michael Thompson",
      status: "Completed",
      statusColor: "bg-[#1a922d2e] text-[#1a922d]",
      progress: 100,
    },
    {
      name: "Greenfield Eco Park",
      manager: "Sarah Johnson",
      status: "Delayed",
      statusColor: "bg-[#e2b1322e] text-[#dfa50f]",
      progress: 35,
    },
    {
      name: "Riverside Bridge Expansion",
      manager: "David Martinez",
      status: "At risk",
      statusColor: "bg-[#ee1f1b2e] text-[#ee1f1b]",
      progress: 68,
    },
    {
      name: "Harborview Residential Complex",
      manager: "Emily Davis",
      status: "Completed",
      statusColor: "bg-[#1a922d2e] text-[#1a922d]",
      progress: 100,
    },
    {
      name: "Sunset Highway Overpass",
      manager: "Christopher Lee",
      status: "On going",
      statusColor: "bg-[#e65f2b2e] text-[#e65f2b]",
      progress: 50,
    },
    {
      name: "Liberty Plaza Renovation",
      manager: "Jessica Brown",
      status: "On going",
      statusColor: "bg-[#e65f2b2e] text-[#e65f2b]",
      progress: 50,
    },
  ];

  // Filter options
  const filterOptions = [
    { name: "Project" },
    { name: "Project manager" },
    { name: "Status" },
  ];

  return (
    <Card className="flex flex-col w-full h-[392px] gap-2.5 p-[18px] rounded-[14px]">
      <CardContent className="flex flex-col gap-6 p-0">
        <div className="flex w-full items-center justify-between">
          <h2 className="[-webkit-text-stroke:0.5px_#060606] text-base tracking-[0.16px] [font-family:'Work_Sans',Helvetica] font-normal text-[#060606]">
            Project summary
          </h2>

          <div className="flex items-center gap-2">
            {filterOptions.map((option, index) => (
              <Button
                key={index}
                variant="outline"
                className="h-[34px] px-3.5 py-0.5 bg-[#f7f7f7] rounded-[17px] border-none"
              >
                <span className="text-sm tracking-[0.14px] [font-family:'Work_Sans',Helvetica] font-normal text-[#060606]">
                  {option.name}
                </span>
                <ChevronDownIcon className="w-3.5 h-3.5 ml-2.5" />
              </Button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2.5">
          <div className="flex flex-col gap-2.5">
            <div className="grid grid-cols-4 w-full">
              <div className="[-webkit-text-stroke:0.5px_#060606] [font-family:'Work_Sans',Helvetica] font-normal text-[#060606] text-sm tracking-[0.14px]">
                Name
              </div>
              <div className="[-webkit-text-stroke:0.5px_#060606] [font-family:'Work_Sans',Helvetica] font-normal text-[#060606] text-sm tracking-[0.14px]">
                Project manager
              </div>
              <div className="[-webkit-text-stroke:0.5px_#060606] [font-family:'Work_Sans',Helvetica] font-normal text-[#060606] text-sm tracking-[0.14px]">
                Status
              </div>
              <div className="[-webkit-text-stroke:0.5px_#060606] [font-family:'Work_Sans',Helvetica] font-normal text-[#060606] text-sm tracking-[0.14px]">
                Progress
              </div>
            </div>
            <div className="w-full h-px bg-gray-200" />
          </div>

          <div className="flex flex-col gap-3">
            {projects.map((project, index) => (
              <div
                key={index}
                className="grid grid-cols-4 w-full h-8 items-center"
              >
                <div className="[font-family:'Work_Sans',Helvetica] font-normal text-[#060606] text-sm">
                  {project.name}
                </div>
                <div className="[font-family:'Work_Sans',Helvetica] font-normal text-[#060606] text-sm">
                  {project.manager}
                </div>
                <div>
                  <Badge
                    className={`px-2 py-[5px] font-normal text-xs ${project.statusColor} rounded-[20px]`}
                  >
                    {project.status}
                  </Badge>
                </div>
                <div className="flex items-center justify-center">
                  <div className="relative w-8 h-8">
                    <div className="absolute inset-0 rounded-full bg-gray-100">
                      <div
                        className="absolute top-0 left-0 h-full rounded-full bg-blue-500"
                        style={{
                          width: `${project.progress}%`,
                          clipPath: `path('M16 0 A16 16 0 ${project.progress >= 50 ? 1 : 0} 1 ${project.progress >= 50 ? "32" : "16"} 16 L16 16 Z')${project.progress >= 50 ? " M16 0 A16 16 0 0 0 0 16 L16 16 Z" : ""}`,
                        }}
                      />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center [-webkit-text-stroke:0.2px_#060606] [font-family:'Aeonik_Pro_TRIAL-Regular',Helvetica] font-normal text-[#060606] text-[9px] text-center tracking-[-0.18px]">
                      {project.progress}%
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
