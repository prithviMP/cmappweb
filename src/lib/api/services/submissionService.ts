import * as submissionRepository from '../repositories/submissionRepository';

export const getSubmissions = async () => {
  try {
    const response = await submissionRepository.getSubmissions();
    return response.data;
  } catch (error) {
    console.error('Error fetching submissions:', error);
    throw error;
  }
};

export const getSubmissionById = async (id: string) => {
  try {
    const response = await submissionRepository.getSubmissionById(id);
    return response.data;
  } catch (error) {
    console.error(`Error fetching submission with ID ${id}:`, error);
    throw error;
  }
};

export const getSubmissionByUserId = async (userId: string) => {
  try {
    const response = await submissionRepository.getSubmissionByUserId(userId);
    return response.data;
  } catch (error) {
    console.error(`Error fetching submissions for user ID ${userId}:`, error);
    throw error;
  }
};

export const createSubmission = async (data: Parameters<typeof submissionRepository.createSubmission>[0]) => {
  try {
    const response = await submissionRepository.createSubmission(data);
    return response.data;
  } catch (error) {
    console.error('Error creating submission:', error);
    throw error;
  }
};

export const updateSubmission = async (id: string, data: Parameters<typeof submissionRepository.updateSubmission>[1]) => {
  try {
    const response = await submissionRepository.updateSubmission(id, data);
    return response.data;
  } catch (error) {
    console.error(`Error updating submission with ID ${id}:`, error);
    throw error;
  }
};

export const deleteSubmission = async (id: string) => {
  try {
    const response = await submissionRepository.deleteSubmission(id);
    return response.data;
  } catch (error) {
    console.error(`Error deleting submission with ID ${id}:`, error);
    throw error;
  }
};