import {
  FileQuestionIcon,
  HelpCircleIcon,
  LayoutDashboardIcon,
  UserIcon,
} from "lucide-react";
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "../../../../components/ui/button";

export const MyProjectsSection = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Navigation menu items data
  const mainNavItems = [
    {
      icon: <LayoutDashboardIcon className="w-[22px] h-[22px]" />,
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      icon: (
        <div className="relative w-[22px] h-[22px]">
          <div className="relative w-[19px] h-5 top-px left-px bg-[url(/briefcase-1.png)] bg-[100%_100%]" />
        </div>
      ),
      label: "Projects",
      path: "/projects",
    },
    {
      icon: <FileQuestionIcon className="w-[22px] h-[22px]" />,
      label: "Requests",
      path: "/requests",
    },
    {
      icon: (
        <img
          className="w-[22px] h-[22px]"
          alt="Solar folder with"
          src="/solar-folder-with-files-outline.svg"
        />
      ),
      label: "Resources",
      path: "/resources",
    },
    {
      icon: <UserIcon className="w-[22px] h-[22px]" />,
      label: "Contractors",
      path: "/contractors",
    },
    {
      icon: (
        <div className="relative w-[22px] h-[22px]">
          <img
            className="absolute w-[19px] h-5 top-px left-0.5"
            alt="Settings"
            src="/group.png"
          />
        </div>
      ),
      label: "Settings",
      path: "/settings",
    },
  ];

  // Project items data
  const projectItems = [
    { color: "#599307", label: "Project 1" },
    { color: "#cdaf4f", label: "Project 2" },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        className="lg:hidden w-full flex items-center justify-between p-4 mb-2"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <span>Menu</span>
        <svg
          className={`w-6 h-6 transform ${isMenuOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={isMenuOpen ? "M19 9l-7 7-7-7" : "M9 5l7 7-7 7"}
          />
        </svg>
      </Button>

      <div className={`w-full lg:w-[218px] h-full py-5 bg-white rounded-xl flex flex-col ${isMenuOpen ? 'block' : 'hidden lg:flex'}`}>
        {/* Logo */}
        <div className="px-6 mb-10">
          <img
            className="w-[168px] h-7"
            alt="NETZE.HOMES Logo"
            src="/group-18186.svg"
          />
        </div>

        {/* Main Navigation */}
        <nav className="flex flex-col gap-1 px-2.5">
          {mainNavItems.map((item, index) => (
            <Button
              key={index}
              variant={location.pathname === item.path ? "default" : "ghost"}
              className={`flex items-center justify-start gap-4 pl-4 pr-[26px] py-[13px] w-full ${
                location.pathname === item.path
                  ? "bg-[#577bff] text-white"
                  : "text-[#010101] hover:bg-slate-100"
              }`}
              onClick={() => {
                navigate(item.path);
                setIsMenuOpen(false);
              }}
            >
              {item.icon}
              <span className="font-normal text-sm whitespace-nowrap">
                {item.label}
              </span>
            </Button>
          ))}
        </nav>

        {/* My Projects Section */}
        <div className="mt-4 px-[7px]">
          <div className="flex items-center pl-4 pr-[26px] py-[13px]">
            <span className="[font-family:'Work_Sans',Helvetica] font-normal text-[#010101] text-base">
              My Projects
            </span>
          </div>

          {/* Project List */}
          <div className="flex flex-col px-3">
            {projectItems.map((project, index) => (
              <Button
                key={index}
                variant="ghost"
                className="flex items-center justify-start gap-4 pl-4 pr-[26px] py-[13px] text-[#010101] hover:bg-slate-100"
              >
                <div
                  className="w-2 h-2 rounded"
                  style={{ backgroundColor: project.color }}
                />
                <span className="[font-family:'Work_Sans',Helvetica] font-normal text-base mt-[-1.00px]">
                  {project.label}
                </span>
              </Button>
            ))}
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="mt-auto px-2.5">
          <Button
            variant="ghost"
            className="flex items-center justify-start gap-4 pl-4 pr-[26px] py-[13px] w-full text-[#010101] hover:bg-slate-100"
            onClick={() => {
              navigate("/help");
              setIsMenuOpen(false);
            }}
          >
            <HelpCircleIcon className="w-[22px] h-[22px]" />
            <span className="[font-family:'Work_Sans',Helvetica] font-normal text-base">
              Help/Support
            </span>
          </Button>

          <Button
            variant="ghost"
            className="flex items-center justify-start gap-4 pl-4 pr-[26px] py-[13px] text-[#f34141] hover:bg-slate-100 mx-auto"
          >
            <img
              className="w-[27px] h-[23px]"
              alt="Logout Icon"
              src="/group-18099.png"
            />
            <span className="[font-family:'Rubik',Helvetica] font-normal text-lg">
              Logout
            </span>
          </Button>
        </div>
      </div>
    </>
  );
};