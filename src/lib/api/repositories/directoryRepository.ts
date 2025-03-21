import apiClient from "../../apiClient";
import directoryEndpoints from "../endpoints/directoryEndpoints";

interface DirectoryData {
  name: string;
  parentId?: string;
  // Add other fields as needed
}

export const getDirectories = () =>
  apiClient.get(directoryEndpoints.getDirectories);

export const getDirectoryById = (id: string) =>
  apiClient.get(directoryEndpoints.getDirectoryById(id));

export const createDirectory = (data: DirectoryData) =>
  apiClient.post(directoryEndpoints.createDirectory, data);

export const updateDirectory = (id: string, data: Partial<DirectoryData>) =>
  apiClient.put(directoryEndpoints.updateDirectory(id), data);

export const deleteDirectory = (id: string) =>
  apiClient.delete(directoryEndpoints.deleteDirectory(id));