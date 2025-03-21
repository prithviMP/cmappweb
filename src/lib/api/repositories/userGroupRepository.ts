import apiClient from "../../apiClient";
import userGroupEndpoints from "../endpoints/userGroupEndpoints";

interface UserGroupData {
  name: string;
  designation?: string;
  // Add other fields as needed
}

export const getUserGroups = () =>
  apiClient.get(userGroupEndpoints.getUserGroups);

export const getUserGroupsWithContractorRole = () =>
  apiClient.get(userGroupEndpoints.getUserGroupsWithContractorRole);

export const getUserGroupById = (id: string) =>
  apiClient.get(userGroupEndpoints.getUserGroupById(id));

export const createUserGroup = (data: UserGroupData) =>
  apiClient.post(userGroupEndpoints.createUserGroup, data);

export const updateUserGroup = (id: string, data: Partial<UserGroupData>) =>
  apiClient.put(userGroupEndpoints.updateUserGroup(id), data);

export const deleteUserGroup = (id: string) =>
  apiClient.delete(userGroupEndpoints.deleteUserGroup(id));

export const getProjectManagerFromUserGroup = () =>
  apiClient.get(userGroupEndpoints.getProjectManagerfromUserGroup);