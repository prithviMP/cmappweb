import apiClient from "../../apiClient";
import taskEndpoints from "../endpoints/taskEndpoints";

interface TaskData {
  title: string;
  description?: string;
  status?: string;
  dueDate?: string;
  // Add other fields as needed
}

export const getTasks = () =>
  apiClient.get(taskEndpoints.getTasks);

export const getTaskById = (id: string) =>
  apiClient.get(taskEndpoints.getTaskById(id));

export const getTaskByUserId = (userId: string) => 
  apiClient.get(taskEndpoints.getTaskByUserId(userId));

export const createTask = (data: TaskData) =>
  apiClient.post(taskEndpoints.createTask, data);

export const updateTask = (id: string, data: Partial<TaskData>) =>
  apiClient.put(taskEndpoints.updateTask(id), data);

export const deleteTask = (id: string) =>
  apiClient.delete(taskEndpoints.deleteTask(id));