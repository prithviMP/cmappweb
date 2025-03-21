import * as projectRepository from '../repositories/projectRepository';
import type { ProjectResponse } from '../../types/project';

export const getProjects = async () => {
  try {
    const response = await projectRepository.getProjects();
    return {
      data: response.data as ProjectResponse,
      success: true
    };
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
};

export const getProjectById = async (id: string) => {
  try {
    const response = await projectRepository.getProjectById(id);
    return response.data;
  } catch (error) {
    console.error(`Error fetching project with ID ${id}:`, error);
    throw error;
  }
};

export const createProject = async (data: Parameters<typeof projectRepository.createProject>[0]) => {
  try {
    const response = await projectRepository.createProject(data);
    return response.data;
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
};

export const updateProject = async (id: string, data: Parameters<typeof projectRepository.updateProject>[1]) => {
  try {
    const response = await projectRepository.updateProject(id, data);
    return response.data;
  } catch (error) {
    console.error(`Error updating project with ID ${id}:`, error);
    throw error;
  }
};

export const deleteProject = async (id: string) => {
  try {
    const response = await projectRepository.deleteProject(id);
    return response.data;
  } catch (error) {
    console.error(`Error deleting project with ID ${id}:`, error);
    throw error;
  }
};