import * as subContractorRepository from '../repositories/subContractorRepository';

export const getSubContractors = async () => {
  try {
    const response = await subContractorRepository.getSubContractors();
    return response.data;
  } catch (error) {
    console.error('Error fetching sub-contractors:', error);
    throw error;
  }
};

export const getSubContractorById = async (id: string) => {
  try {
    const response = await subContractorRepository.getSubContractorById(id);
    return response.data;
  } catch (error) {
    console.error(`Error fetching sub-contractor with ID ${id}:`, error);
    throw error;
  }
};

export const createSubContractor = async (data: Parameters<typeof subContractorRepository.createSubContractor>[0]) => {
  try {
    const response = await subContractorRepository.createSubContractor(data);
    return response.data;
  } catch (error) {
    console.error('Error creating sub-contractor:', error);
    throw error;
  }
};

export const updateSubContractor = async (id: string, data: Parameters<typeof subContractorRepository.updateSubContractor>[1]) => {
  try {
    const response = await subContractorRepository.updateSubContractor(id, data);
    return response.data;
  } catch (error) {
    console.error(`Error updating sub-contractor with ID ${id}:`, error);
    throw error;
  }
};

export const deleteSubContractor = async (id: string) => {
  try {
    const response = await subContractorRepository.deleteSubContractor(id);
    return response.data;
  } catch (error) {
    console.error(`Error deleting sub-contractor with ID ${id}:`, error);
    throw error;
  }
};