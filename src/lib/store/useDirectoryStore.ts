import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getDirectories, getDirectoryById, createDirectory, updateDirectory, deleteDirectory } from '../api/services/directoryService';

interface Directory {
  id: string;
  name: string;
  parentId?: string;
  records?: any[];
}

interface DirectoryState {
  directories: Directory[];
  selectedDirectory: Directory | null;
  loading: boolean;
  error: string | null;
  fetchDirectories: () => Promise<void>;
  fetchDirectoryById: (id: string) => Promise<void>;
  createDirectory: (data: Omit<Directory, 'id'>) => Promise<void>;
  updateDirectory: (id: string, data: Partial<Directory>) => Promise<void>;
  deleteDirectory: (id: string) => Promise<void>;
  setSelectedDirectory: (directory: Directory | null) => void;
}

const useDirectoryStore = create<DirectoryState>()(
  persist(
    (set) => ({
      directories: [],
      selectedDirectory: null,
      loading: false,
      error: null,

      fetchDirectories: async () => {
        set({ loading: true, error: null });
        try {
          const data = await getDirectories();
          set({ directories: data.data, loading: false });
        } catch (error) {
          set({ error: 'Failed to fetch directories', loading: false });
        }
      },

      fetchDirectoryById: async (id) => {
        set({ loading: true, error: null });
        try {
          const data = await getDirectoryById(id);
          set({ selectedDirectory: data.data, loading: false });
        } catch (error) {
          set({ error: 'Failed to fetch directory', loading: false });
        }
      },

      createDirectory: async (directoryData) => {
        set({ loading: true, error: null });
        try {
          const data = await createDirectory(directoryData);
          set((state) => ({
            directories: [...state.directories, data.data],
            loading: false
          }));
        } catch (error) {
          set({ error: 'Failed to create directory', loading: false });
        }
      },

      updateDirectory: async (id, directoryData) => {
        set({ loading: true, error: null });
        try {
          const data = await updateDirectory(id, directoryData);
          set((state) => ({
            directories: state.directories.map(d => d.id === id ? { ...d, ...data.data } : d),
            selectedDirectory: state.selectedDirectory?.id === id ? { ...state.selectedDirectory, ...data.data } : state.selectedDirectory,
            loading: false
          }));
        } catch (error) {
          set({ error: 'Failed to update directory', loading: false });
        }
      },

      deleteDirectory: async (id) => {
        set({ loading: true, error: null });
        try {
          await deleteDirectory(id);
          set((state) => ({
            directories: state.directories.filter(d => d.id !== id),
            selectedDirectory: state.selectedDirectory?.id === id ? null : state.selectedDirectory,
            loading: false
          }));
        } catch (error) {
          set({ error: 'Failed to delete directory', loading: false });
        }
      },

      setSelectedDirectory: (directory) => {
        set({ selectedDirectory: directory });
      }
    }),
    {
      name: 'directory-storage',
      partialize: (state) => ({
        directories: state.directories,
        selectedDirectory: state.selectedDirectory
      })
    }
  )
);

export default useDirectoryStore;