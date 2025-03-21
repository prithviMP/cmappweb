import apiClient from "../../apiClient";
import recordEndpoints from "../endpoints/recordEndpoints";

interface RecordData {
  title: string;
  description?: string;
  // Add other fields as needed
}

export const getRecords = () =>
  apiClient.get(recordEndpoints.getRecords);

export const getRecordById = (id: string) =>
  apiClient.get(recordEndpoints.getRecordById(id));

export const createRecord = (data: RecordData) =>
  apiClient.post(recordEndpoints.createRecord, data);

export const updateRecord = (id: string, data: Partial<RecordData>) =>
  apiClient.put(recordEndpoints.updateRecord(id), data);

export const deleteRecord = (id: string) =>
  apiClient.delete(recordEndpoints.deleteRecord(id));