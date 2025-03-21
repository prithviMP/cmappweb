import * as taskRepository from '../repositories/taskRepository';

export const getTasks = async () => {
  try {
    const response = await taskRepository.getTasks();
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

export const getTaskById = async (id: string) => {
  try {
    const response = await taskRepository.getTaskById(id);
    return response.data;
  } catch (error) {
    console.error(`Error fetching task with ID ${id}:`, error);
    throw error;
  }
};

export const getTaskByUserId = async (userId: string) => {
  try {
    const response = await taskRepository.getTaskByUserId(userId);
    return response.data;
  } catch (error) {
    console.error(`Error fetching tasks for user ID ${userId}:`, error);
    throw error;
  }
};

export const createTask = async (data: Parameters<typeof taskRepository.createTask>[0]) => {
  try {
    const response = await taskRepository.createTask(data);
    return response.data;
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
};

export const updateTask = async (id: string, data: Parameters<typeof taskRepository.updateTask>[1]) => {
  try {
    const response = await taskRepository.updateTask(id, data);
    return response.data;
  } catch (error) {
    console.error(`Error updating task with ID ${id}:`, error);
    throw error;
  }
};

export const deleteTask = async (id: string) => {
  try {
    const response = await taskRepository.deleteTask(id);
    return response.data;
  } catch (error) {
    console.error(`Error deleting task with ID ${id}:`, error);
    throw error;
  }
};