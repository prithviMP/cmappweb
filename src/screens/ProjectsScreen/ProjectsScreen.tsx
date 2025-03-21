import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BriefcaseIcon, TimerIcon } from "lucide-react";
import { Button } from "../../components/ui/button";
import { StatsCard } from "../../components/ui/stats-card/StatsCard";
import { ProjectCard } from "../../components/ui/project-card/ProjectCard";
import { Search } from "../../components/ui/search/Search";
import { StatusFilter } from "../../components/ui/status-filter/StatusFilter";
import { CreateProjectModal } from "../../components/create-project/CreateProjectModal";
import useProjectStore from "../../lib/store/useProjectStore";
import { BASE_URL,MEDIA_BASE_URL} from "../../lib/apiClient";

const projectStatuses = ["All Project", "Not Started", "In Progress", "Finished", "Unfinished"];

export const ProjectsScreen = () => {
  const navigate = useNavigate();
  const [activeStatus, setActiveStatus] = useState("All Project");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { projects, loading, error, fetchProjects } = useProjectStore();

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const stats = [
    {
      title: "Not Started",
      value: projects.filter(p => p.attributes.project_status === "pending").length.toString(),
      icon: BriefcaseIcon,
      iconColor: "text-white",
      iconBgColor: "bg-[#577bff]",
    },
    {
      title: "On Going Projects",
      value: projects.filter(p => p.attributes.project_status === "ongoing").length.toString(),
      icon: TimerIcon,
      iconColor: "text-white",
      iconBgColor: "bg-[#e65f2b]",
    },
    {
      title: "Finished Projects",
      value: projects.filter(p => p.attributes.project_status === "completed").length.toString(),
      icon: TimerIcon,
      iconColor: "text-white",
      iconBgColor: "bg-[#a3d65b]",
    },
    {
      title: "Unfinished Projects",
      value: projects.filter(p => !p.attributes.project_status || p.attributes.project_status === "pending").length.toString(),
      icon: TimerIcon,
      iconColor: "text-white",
      iconBgColor: "bg-[#ff7774]",
    },
  ];

  const getFilteredProjects = () => {
    return projects.filter(project => {
      if (activeStatus === "All Project") return true;
      switch (activeStatus) {
        case "Not Started":
          return project.attributes.project_status === "pending";
        case "In Progress":
          return project.attributes.project_status === "ongoing";
        case "Finished":
          return project.attributes.project_status === "completed";
        case "Unfinished":
          return !project.attributes.project_status || project.attributes.project_status === "pending";
        default:
          return true;
      }
    });
  };

  const handleProjectClick = (projectId: number) => {
    navigate(`/projects/${projectId}`);
  };

  if (loading) {
    return (
      <div className="col-span-12">
        <div className="p-6 max-w-[1440px] mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-lg text-gray-600">Loading projects...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="col-span-12">
        <div className="p-6 max-w-[1440px] mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-lg text-red-600">Error loading projects: {error}</div>
          </div>
        </div>
      </div>
    );
  }

  const filteredProjects = getFilteredProjects();

  return (
    <div className="col-span-12">
      <div className="p-6 max-w-[1440px] mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-[32px] font-medium text-[#060606] tracking-[0.16px]">Projects</h1>
          <Button 
            className="bg-[#577bff] hover:bg-[#4a69d9] text-white px-4 py-2 h-[42px] rounded-[8px]"
            onClick={() => setIsCreateModalOpen(true)}
          >
            + Create Project
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <StatusFilter
            statuses={projectStatuses}
            activeStatus={activeStatus}
            onChange={setActiveStatus}
          />

          <div className="flex gap-4">
            <Search
              containerClassName="w-[280px]"
              placeholder="Search project"
            />
            <Button 
              variant="outline" 
              className="h-[42px] px-4 py-2 border border-[#E4E4E7] rounded-[8px] text-[#71717A]"
            >
              Filters
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProjects.map((project) => (
            <div 
              key={project.id} 
              onClick={() => handleProjectClick(project.id)} 
              className="cursor-pointer"
            >
              <ProjectCard
                name={project.attributes.name}
                description={project.attributes.description}
                status={project.attributes.project_status}
                progress={50} // You might want to calculate this based on tasks or other metrics
                priority="Low"
                dueDate={project.attributes.end_date}
                image={project.attributes.documents.data?.[0] ? 
                  `${MEDIA_BASE_URL}${project.attributes.documents.data[0].attributes.formats.small.url}` : 
                  "/project-thumbnail.jpg"}
              />
            </div>
          ))}
        </div>

        <CreateProjectModal 
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
        />
      </div>
    </div>
  );
};