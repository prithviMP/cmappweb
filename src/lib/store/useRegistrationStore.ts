import { create } from 'zustand';
import { getRegistrations } from '../api/services/registrationService';

interface RegistrationResponse {
  data: {
    data: Array<{
      id: number;
      attributes: {
        username: string;
        status: 'pending' | 'approved' | 'rejected';
        createdAt: string;
        sub_contractor?: {
          data: {
            attributes: {
              name: string;
            };
          } | null;
        };
        documents: {
          data: Array<{
            attributes: {
              name: string;
              size: number;
              url: string;
              formats?: {
                thumbnail?: { url: string };
                small?: { url: string };
                medium?: { url: string };
                large?: { url: string };
              };
            };
          }>;
        };
      };
    }>;
  };
}

interface RegistrationState {
  registrations: RegistrationResponse['data']['data'];
  loading: boolean;
  error: string | null;
  fetchRegistrations: () => Promise<void>;
}

const useRegistrationStore = create<RegistrationState>((set) => ({
  registrations: [],
  loading: false,
  error: null,
  fetchRegistrations: async () => {
    set({ loading: true, error: null });
    try {
      console.log('Fetching registrations...');
      const response = await getRegistrations();
      console.log('Registrations API response:', response);
      
      if (response?.data) {
        console.log('Setting registrations:', response.data);
        set({ registrations: response.data, loading: false });
      } else {
        console.log('No registrations data found in response');
        set({ registrations: [], loading: false });
      }
    } catch (error) {
      console.error('Error fetching registrations:', error);
      set({ 
        registrations: [],
        error: 'Failed to fetch registrations', 
        loading: false 
      });
    }
  }
}));

export default useRegistrationStore;