import * as registrationRepository from '../repositories/registrationRepository';

export const getRegistrations = async () => {
  try {
    const response = await registrationRepository.getRegistrations();
    return response.data;
  } catch (error) {
    console.error('Error fetching registrations:', error);
    throw error;
  }
};

export const getRegistrationById = async (id: string) => {
  try {
    const response = await registrationRepository.getRegistrationById(id);
    return response.data;
  } catch (error) {
    console.error(`Error fetching registration with ID ${id}:`, error);
    throw error;
  }
};

export const createRegistration = async (data: Parameters<typeof registrationRepository.createRegistration>[0]) => {
  try {
    const response = await registrationRepository.createRegistration(data);
    return response.data;
  } catch (error) {
    console.error('Error creating registration:', error);
    throw error;
  }
};

export const updateRegistration = async (id: string, data: Parameters<typeof registrationRepository.updateRegistration>[1]) => {
  try {
    const response = await registrationRepository.updateRegistration(id, data);
    return response.data;
  } catch (error) {
    console.error(`Error updating registration with ID ${id}:`, error);
    throw error;
  }
};

export const deleteRegistration = async (id: string) => {
  try {
    const response = await registrationRepository.deleteRegistration(id);
    return response.data;
  } catch (error) {
    console.error(`Error deleting registration with ID ${id}:`, error);
    throw error;
  }
};