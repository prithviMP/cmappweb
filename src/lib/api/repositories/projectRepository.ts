import apiClient from "../../apiClient";
import projectEndpoints from "../endpoints/projectEndpoints";

interface ProjectData {
  name: string;
  description?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
  // Add other fields as needed
}

export const getProjects = () => 
  apiClient.get(projectEndpoints.getProjects);

export const getProjectById = (id: string) => 
  apiClient.get(projectEndpoints.getProjectById(id));

export const createProject = (data: ProjectData) => 
  apiClient.post(projectEndpoints.createProject, data);

export const updateProject = (id: string, data: Partial<ProjectData>) => 
  apiClient.put(projectEndpoints.updateProject(id), data);

export const deleteProject = (id: string) => 
  apiClient.delete(projectEndpoints.deleteProject(id));