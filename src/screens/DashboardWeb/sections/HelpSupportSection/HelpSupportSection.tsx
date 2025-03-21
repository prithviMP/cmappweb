import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";
import { Separator } from "../../../../components/ui/separator";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

export const HelpSupportSection = (): JSX.Element => {
  const taskData = [
    { name: "Not started", value: 96, color: "#98a8d4" },
    { name: "Complete", value: 32, color: "#a3d65b" },
    { name: "In Progress", value: 10, color: "#e65f2b" },
  ];

  return (
    <div className="w-full h-full">
      <Card className="w-full h-[392px]">
        <div className="p-3.5 h-full">
          <h3 className="font-normal text-base font-['Roboto',Helvetica]">
            Tasks
          </h3>
          <Separator className="my-2.5" />
          <CardContent className="pt-0 h-[calc(100%-50px)]">
            <div className="h-full w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={taskData}
                    cx="50%"
                    cy="45%"
                    startAngle={90}
                    endAngle={-270}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {taskData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend
                    verticalAlign="bottom"
                    height={36}
                    formatter={(value, entry) => {
                      const item = taskData.find(d => d.name === value);
                      return (
                        <span className="text-xs font-normal text-black">
                          {value} ({item?.value})
                        </span>
                      );
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
};