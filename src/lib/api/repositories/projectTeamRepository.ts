import apiClient from "../../apiClient";
import projectTeamsEndpoints from "../endpoints/projectTeamsEndpoints";

interface ProjectTeamData {
  name: string;
  projectId: string;
  members?: string[];
  // Add other fields as needed
}

export const getProjectTeams = () => 
  apiClient.get(projectTeamsEndpoints.getProjectTeams);

export const getProjectTeamById = (id: string) => 
  apiClient.get(projectTeamsEndpoints.getProjectTeamById(id));

export const createProjectTeam = (data: ProjectTeamData) => 
  apiClient.post(projectTeamsEndpoints.createProjectTeam, data);

export const updateProjectTeam = (id: string, data: Partial<ProjectTeamData>) => 
  apiClient.put(projectTeamsEndpoints.updateProjectTeam(id), data);

export const deleteProjectTeam = (id: string) => 
  apiClient.delete(projectTeamsEndpoints.deleteProjectTeam(id));

export const getProjectTeamIdByUserId = (userId: string) =>
  apiClient.get(projectTeamsEndpoints.getProjectTeamIdByUserId(userId));

export const getProjectsfromProjectTeam = () => 
  apiClient.get(projectTeamsEndpoints.getProjectsfromProjectTeam);