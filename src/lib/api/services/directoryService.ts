import * as directoryRepository from '../repositories/directoryRepository';

export const getDirectories = async () => {
  try {
    const response = await directoryRepository.getDirectories();
    return response.data;
  } catch (error) {
    console.error('Error fetching directories:', error);
    throw error;
  }
};

export const getDirectoryById = async (id: string) => {
  try {
    const response = await directoryRepository.getDirectoryById(id);
    return response.data;
  } catch (error) {
    console.error(`Error fetching directory with ID ${id}:`, error);
    throw error;
  }
};

export const createDirectory = async (data: Parameters<typeof directoryRepository.createDirectory>[0]) => {
  try {
    const response = await directoryRepository.createDirectory(data);
    return response.data;
  } catch (error) {
    console.error('Error creating directory:', error);
    throw error;
  }
};

export const updateDirectory = async (id: string, data: Parameters<typeof directoryRepository.updateDirectory>[1]) => {
  try {
    const response = await directoryRepository.updateDirectory(id, data);
    return response.data;
  } catch (error) {
    console.error(`Error updating directory with ID ${id}:`, error);
    throw error;
  }
};

export const deleteDirectory = async (id: string) => {
  try {
    const response = await directoryRepository.deleteDirectory(id);
    return response.data;
  } catch (error) {
    console.error(`Error deleting directory with ID ${id}:`, error);
    throw error;
  }
};