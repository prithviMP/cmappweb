import * as projectTeamRepository from '../repositories/projectTeamRepository';

export const getProjectTeams = async () => {
  try {
    const response = await projectTeamRepository.getProjectTeams();
    return response.data;
  } catch (error) {
    console.error('Error fetching project teams:', error);
    throw error;
  }
};

export const getProjectTeamById = async (id: string) => {
  try {
    const response = await projectTeamRepository.getProjectTeamById(id);
    return response.data;
  } catch (error) {
    console.error(`Error fetching project team with ID ${id}:`, error);
    throw error;
  }
};

export const createProjectTeam = async (data: Parameters<typeof projectTeamRepository.createProjectTeam>[0]) => {
  try {
    const response = await projectTeamRepository.createProjectTeam(data);
    return response.data;
  } catch (error) {
    console.error('Error creating project team:', error);
    throw error;
  }
};

export const updateProjectTeam = async (id: string, data: Parameters<typeof projectTeamRepository.updateProjectTeam>[1]) => {
  try {
    const response = await projectTeamRepository.updateProjectTeam(id, data);
    return response.data;
  } catch (error) {
    console.error(`Error updating project team with ID ${id}:`, error);
    throw error;
  }
};

export const deleteProjectTeam = async (id: string) => {
  try {
    const response = await projectTeamRepository.deleteProjectTeam(id);
    return response.data;
  } catch (error) {
    console.error(`Error deleting project team with ID ${id}:`, error);
    throw error;
  }
};

export const getProjectTeamIdByUserId = async (userId: string) => {
  try {
    const response = await projectTeamRepository.getProjectTeamIdByUserId(userId);
    return response.data;
  } catch (error) {
    console.error(`Error fetching project team ID for user ID ${userId}:`, error);
    throw error;
  }
};

export const getProjectsfromProjectTeam = async () => {
  try {
    const response = await projectTeamRepository.getProjectsfromProjectTeam();
    return response.data;
  } catch (error) {
    console.error('Error fetching projects from project team:', error);
    throw error;
  }
};