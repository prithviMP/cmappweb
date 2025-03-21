import * as contractorRepository from '../repositories/contractorRepository';

export const getContractors = async () => {
  try {
    const response = await contractorRepository.getContractors();
    return response.data;
  } catch (error) {
    console.error('Error fetching contractors:', error);
    throw error;
  }
};

export const getContractorById = async (id: string) => {
  try {
    const response = await contractorRepository.getContractorById(id);
    return response.data;
  } catch (error) {
    console.error(`Error fetching contractor with id ${id}:`, error);
    throw error;
  }
};

export const createContractor = async (data: any) => {
  try {
    const response = await contractorRepository.createContractor(data);
    return response.data;
  } catch (error) {
    console.error('Error creating contractor:', error);
    throw error;
  }
};

export const updateContractor = async (id: string, data: any) => {
  try {
    const response = await contractorRepository.updateContractor(id, data);
    return response.data;
  } catch (error) {
    console.error(`Error updating contractor with id ${id}:`, error);
    throw error;
  }
};

export const deleteContractor = async (id: string) => {
  try {
    const response = await contractorRepository.deleteContractor(id);
    return response.data;
  } catch (error) {
    console.error(`Error deleting contractor with id ${id}:`, error);
    throw error;
  }
};