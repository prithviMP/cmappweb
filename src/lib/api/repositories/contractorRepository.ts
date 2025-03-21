import apiClient from "../../apiClient";
import contractorEndpoints from "../endpoints/contractorEndpoints";

interface ContractorData {
  // Add your contractor data interface here
  name: string;
  type: string;
  email: string;
  // Add other fields as needed
}

export const getContractors = () =>
  apiClient.get(contractorEndpoints.getContractors);

export const getContractorById = (id: string) =>
  apiClient.get(contractorEndpoints.getContractorById(id));

export const createContractor = (data: ContractorData) =>
  apiClient.post(contractorEndpoints.createContractor, data);

export const updateContractor = (id: string, data: Partial<ContractorData>) =>
  apiClient.put(contractorEndpoints.updateContractor(id), data);

export const deleteContractor = (id: string) =>
  apiClient.delete(contractorEndpoints.deleteContractor(id));