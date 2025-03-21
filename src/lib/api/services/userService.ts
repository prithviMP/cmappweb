import * as userRepository from '../repositories/userRepository';
import type { AxiosError } from 'axios';

export const getUsers = async () => {
  try {
    const response = await userRepository.getUsers();
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const getProjectUserById = async (id: string) => {
  try {
    const response = await userRepository.getProjectUserById(id);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user with ID ${id}:`, error);
    throw error;
  }
};

export const createUser = async (data: Parameters<typeof userRepository.createUser>[0]) => {
  try {
    const response = await userRepository.createUser(data);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const updateUser = async (id: string, data: Parameters<typeof userRepository.updateUser>[1]) => {
  try {
    const response = await userRepository.updateUser(id, data);
    return response.data;
  } catch (error) {
    console.error(`Error updating user with ID ${id}:`, error);
    throw error;
  }
};

export const deleteUser = async (id: string) => {
  try {
    const response = await userRepository.deleteUser(id);
    return response.data;
  } catch (error) {
    console.error(`Error deleting user with ID ${id}:`, error);
    throw error;
  }
};