import React from "react";
import { Card, CardContent, CardHeader } from "../../../../components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

export const ProjectSummarySection = (): JSX.Element => {
  const projectStatusData = [
    {
      name: "In Progress",
      value: 58,
      color: "#e65f2b",
    },
    { 
      name: "Finished", 
      value: 25, 
      color: "#a3d65b" 
    },
    { 
      name: "Unfinished", 
      value: 8, 
      color: "#ff5956" 
    },
  ];

  return (
    <div className="w-full h-full">
      <Card className="w-full h-[392px]">
        <CardHeader className="flex flex-col items-start justify-center gap-[5px] px-4 py-1.5 bg-white rounded-[12px_12px_0px_0px]">
          <div className="relative self-stretch font-normal text-black text-sm tracking-[0] leading-[normal]">
            All Projects
          </div>
          <div className="relative self-stretch font-normal text-[#787878] text-[10px] tracking-[0] leading-[normal]">
            Based on status
          </div>
        </CardHeader>

        <CardContent className="flex flex-col items-center justify-center h-[calc(100%-60px)] px-4 py-5 bg-white rounded-[0px_0px_12px_12px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={projectStatusData}
                cx="50%"
                cy="45%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {projectStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Legend
                verticalAlign="bottom"
                height={36}
                formatter={(value, entry) => {
                  const item = projectStatusData.find(d => d.name === value);
                  return (
                    <span className="text-xs font-normal text-black">
                      {value} ({item?.value}%)
                    </span>
                  );
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};