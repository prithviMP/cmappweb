import apiClient from "../../apiClient";
import submissionEndpoints from "../endpoints/submissionEndpoints";

interface SubmissionData {
  taskId: string;
  submittedById: string;
  proofOfWork?: any;
  // Add other fields as needed
}

export const getSubmissions = () =>
  apiClient.get(submissionEndpoints.getSubmissions);

export const getSubmissionById = (id: string) =>
  apiClient.get(submissionEndpoints.getSubmissionById(id));

export const getSubmissionByUserId = (userId: string) =>
  apiClient.get(submissionEndpoints.getSubmissionsByUserId(userId));

export const createSubmission = (data: SubmissionData) =>
  apiClient.post(submissionEndpoints.createSubmission, data);

export const updateSubmission = (id: string, data: Partial<SubmissionData>) =>
  apiClient.put(submissionEndpoints.updateSubmission(id), data);

export const deleteSubmission = (id: string) =>
  apiClient.delete(submissionEndpoints.deleteSubmission(id));