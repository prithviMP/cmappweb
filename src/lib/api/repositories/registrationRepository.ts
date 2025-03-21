import apiClient from "../../apiClient";
import registrationEndpoints from "../endpoints/registrationEndpoints";

interface RegistrationData {
  userId: string;
  status?: 'pending' | 'approved' | 'rejected';
  // Add other fields as needed
}

export const getRegistrations = () =>
  apiClient.get(registrationEndpoints.getRegistrations);

export const getRegistrationById = (id: string) =>
  apiClient.get(registrationEndpoints.getRegistrationById(id));

export const createRegistration = (data: RegistrationData) =>
  apiClient.post(registrationEndpoints.createRegistration, data);

export const updateRegistration = (id: string, data: Partial<RegistrationData>) =>
  apiClient.put(registrationEndpoints.updateRegistration(id), data);

export const deleteRegistration = (id: string) =>
  apiClient.delete(registrationEndpoints.deleteRegistration(id));