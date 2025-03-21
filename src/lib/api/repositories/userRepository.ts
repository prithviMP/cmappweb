import apiClient from "../../apiClient";
import userEndpoints from "../endpoints/userEndpoints";

interface UserData {
  username: string;
  email: string;
  password?: string;
  // Add other fields as needed
}

export const getUsers = () => 
  apiClient.get(userEndpoints.getUsers);

export const getProjectUserById = (id: string) => 
  apiClient.get(userEndpoints.getProjectUserById(id));

export const createUser = (data: UserData) =>
  apiClient.post(userEndpoints.createUser, data);

export const updateUser = (id: string, data: Partial<UserData>) =>
  apiClient.put(userEndpoints.updateUser(id), data);

export const deleteUser = (id: string) =>
  apiClient.delete(userEndpoints.deleteUser(id));