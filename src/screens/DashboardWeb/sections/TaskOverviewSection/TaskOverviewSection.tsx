import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';

export const TaskOverviewSection = (): JSX.Element => {
  const projectTypes = [
    { name: "Mobile home", value: 90 },
    { name: "Condominiums", value: 60 },
    { name: "Industrial", value: 30 },
    { name: "Residential", value: 15 },
    { name: "Farmhouse", value: 60 },
    { name: "Apartment", value: 90 },
  ];

  return (
    <div className="w-full h-auto">
      <Card className="w-full h-full">
        <CardContent className="p-6">
          <h3 className="font-normal text-base mb-6">
            Projects by Project type
          </h3>

          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={projectTypes} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 10 }}
                  interval={0}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis 
                  tick={{ fontSize: 10 }}
                  domain={[0, 100]}
                  ticks={[0, 20, 40, 60, 80, 100]}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    fontSize: '12px'
                  }}
                />
                <Bar 
                  dataKey="value" 
                  fill="#577bff" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};