import * as userGroupRepository from '../repositories/userGroupRepository';

export const getUserGroups = async () => {
  try {
    const response = await userGroupRepository.getUserGroups();
    return response.data;
  } catch (error) {
    console.error('Error fetching user groups:', error);
    throw error;
  }
};

export const getUserGroupsWithContractorRole = async () => {
  try {
    const response = await userGroupRepository.getUserGroupsWithContractorRole();
    return response.data;
  } catch (error) {
    console.error('Error fetching contractor user groups:', error);
    throw error;
  }
};

export const getUserGroupById = async (id: string) => {
  try {
    const response = await userGroupRepository.getUserGroupById(id);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user group with ID ${id}:`, error);
    throw error;
  }
};

export const createUserGroup = async (data: Parameters<typeof userGroupRepository.createUserGroup>[0]) => {
  try {
    const response = await userGroupRepository.createUserGroup(data);
    return response.data;
  } catch (error) {
    console.error('Error creating user group:', error);
    throw error;
  }
};

export const updateUserGroup = async (id: string, data: Parameters<typeof userGroupRepository.updateUserGroup>[1]) => {
  try {
    const response = await userGroupRepository.updateUserGroup(id, data);
    return response.data;
  } catch (error) {
    console.error(`Error updating user group with ID ${id}:`, error);
    throw error;
  }
};

export const deleteUserGroup = async (id: string) => {
  try {
    const response = await userGroupRepository.deleteUserGroup(id);
    return response.data;
  } catch (error) {
    console.error(`Error deleting user group with ID ${id}:`, error);
    throw error;
  }
};

export const getProjectManagerFromUserGroup = async () => {
  try {
    const response = await userGroupRepository.getProjectManagerFromUserGroup();
    return response.data;
  } catch (error) {
    console.error('Error fetching project manager from user group:', error);
    throw error;
  }
};