import apiClient from "../../apiClient";
import subContractorEndpoints from "../endpoints/subContractorEndpoints";

interface SubContractorData {
  name: string;
  contractorId: string;
  // Add other fields as needed
}

export const getSubContractors = () =>
  apiClient.get(subContractorEndpoints.getSubContractors);

export const getSubContractorById = (id: string) =>
  apiClient.get(subContractorEndpoints.getSubContractorById(id));

export const createSubContractor = (data: SubContractorData) =>
  apiClient.post(subContractorEndpoints.createSubContractor, data);

export const updateSubContractor = (id: string, data: Partial<SubContractorData>) =>
  apiClient.put(subContractorEndpoints.updateSubContractor(id), data);

export const deleteSubContractor = (id: string) =>
  apiClient.delete(subContractorEndpoints.deleteSubContractor(id));