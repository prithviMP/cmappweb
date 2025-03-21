import React from "react";
import { Header } from "./Header";
import { MyProjectsSection } from "../../screens/DashboardWeb/sections/MyProjectsSection";

interface PageLayoutProps {
  children: React.ReactNode;
}

export const PageLayout = ({ children }: PageLayoutProps): JSX.Element => {
  return (
    <div className="bg-[#f0f1f7] flex flex-col lg:flex-row justify-center w-full min-h-screen">
      <div className="lg:w-[218px] w-full">
        <MyProjectsSection />
      </div>
      <div className="flex-1 max-w-[1440px] p-4 overflow-hidden">
        <Header />
        <div className="grid grid-cols-12 gap-4 overflow-x-hidden">
          {children}
        </div>
      </div>
    </div>
  );
};