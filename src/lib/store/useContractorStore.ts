import { create } from 'zustand';
import { getContractors, getContractorById, createContractor, updateContractor, deleteContractor } from '../api/services/contractorService';

interface Contractor {
  id: string;
  name: string;
  type: string;
  email: string;
  status?: 'Active' | 'In-Active';
  joinDate?: string;
}

interface ContractorState {
  contractors: Contractor[];
  selectedContractor: Contractor | null;
  loading: boolean;
  error: string | null;
  fetchContractors: () => Promise<void>;
  fetchContractorById: (id: string) => Promise<void>;
  createContractor: (data: Omit<Contractor, 'id'>) => Promise<void>;
  updateContractor: (id: string, data: Partial<Contractor>) => Promise<void>;
  deleteContractor: (id: string) => Promise<void>;
  setSelectedContractor: (contractor: Contractor | null) => void;
}

const useContractorStore = create<ContractorState>((set) => ({
  contractors: [],
  selectedContractor: null,
  loading: false,
  error: null,

  fetchContractors: async () => {
    set({ loading: true, error: null });
    try {
      const data = await getContractors();
      //console.log("contractor",data.data)
      set({ contractors: data.data, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch contractors', loading: false });
    }
  },

  fetchContractorById: async (id) => {
    set({ loading: true, error: null });
    try {
      const data = await getContractorById(id);
      set({ selectedContractor: data.data, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch contractor', loading: false });
    }
  },

  createContractor: async (contractorData) => {
    set({ loading: true, error: null });
    try {
      const data = await createContractor(contractorData);
      set((state) => ({
        contractors: [...state.contractors, data.data],
        loading: false
      }));
    } catch (error) {
      set({ error: 'Failed to create contractor', loading: false });
    }
  },

  updateContractor: async (id, contractorData) => {
    set({ loading: true, error: null });
    try {
      const data = await updateContractor(id, contractorData);
      set((state) => ({
        contractors: state.contractors.map(c => c.id === id ? { ...c, ...data.data } : c),
        selectedContractor: state.selectedContractor?.id === id ? { ...state.selectedContractor, ...data.data } : state.selectedContractor,
        loading: false
      }));
    } catch (error) {
      set({ error: 'Failed to update contractor', loading: false });
    }
  },

  deleteContractor: async (id) => {
    set({ loading: true, error: null });
    try {
      await deleteContractor(id);
      set((state) => ({
        contractors: state.contractors.filter(c => c.id !== id),
        selectedContractor: state.selectedContractor?.id === id ? null : state.selectedContractor,
        loading: false
      }));
    } catch (error) {
      set({ error: 'Failed to delete contractor', loading: false });
    }
  },

  setSelectedContractor: (contractor) => {
    set({ selectedContractor: contractor });
  }
}));

export default useContractorStore;