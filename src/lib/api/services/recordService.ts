import * as recordRepository from '../repositories/recordRepository';

export const getRecords = async () => {
  try {
    const response = await recordRepository.getRecords();
    return response.data;
  } catch (error) {
    console.error('Error fetching records:', error);
    throw error;
  }
};

export const getRecordById = async (id: string) => {
  try {
    const response = await recordRepository.getRecordById(id);
    return response.data;
  } catch (error) {
    console.error(`Error fetching record with ID ${id}:`, error);
    throw error;
  }
};

export const createRecord = async (data: Parameters<typeof recordRepository.createRecord>[0]) => {
  try {
    const response = await recordRepository.createRecord(data);
    return response.data;
  } catch (error) {
    console.error('Error creating record:', error);
    throw error;
  }
};

export const updateRecord = async (id: string, data: Parameters<typeof recordRepository.updateRecord>[1]) => {
  try {
    const response = await recordRepository.updateRecord(id, data);
    return response.data;
  } catch (error) {
    console.error(`Error updating record with ID ${id}:`, error);
    throw error;
  }
};

export const deleteRecord = async (id: string) => {
  try {
    const response = await recordRepository.deleteRecord(id);
    return response.data;
  } catch (error) {
    console.error(`Error deleting record with ID ${id}:`, error);
    throw error;
  }
};