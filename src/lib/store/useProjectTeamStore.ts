import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getProjectTeams, getProjectTeamById, createProjectTeam, updateProjectTeam, deleteProjectTeam, getProjectTeamIdByUserId, getProjectsfromProjectTeam } from '../api/services/projectTeamService';

interface ProjectTeam {
  id: string;
  name: string;
  projectId: string;
  members?: string[];
}

interface ProjectTeamState {
  projectTeams: ProjectTeam[];
  selectedProjectTeam: ProjectTeam | null;
  loading: boolean;
  error: string | null;
  fetchProjectTeams: () => Promise<void>;
  fetchProjectTeamById: (id: string) => Promise<void>;
  fetchProjectTeamIdByUserId: (userId: string) => Promise<void>;
  fetchProjectsFromProjectTeam: () => Promise<void>;
  createProjectTeam: (data: Omit<ProjectTeam, 'id'>) => Promise<void>;
  updateProjectTeam: (id: string, data: Partial<ProjectTeam>) => Promise<void>;
  deleteProjectTeam: (id: string) => Promise<void>;
  setSelectedProjectTeam: (projectTeam: ProjectTeam | null) => void;
}

const useProjectTeamStore = create<ProjectTeamState>()(
  persist(
    (set) => ({
      projectTeams: [],
      selectedProjectTeam: null,
      loading: false,
      error: null,

      fetchProjectTeams: async () => {
        set({ loading: true, error: null });
        try {
          const data = await getProjectTeams();
          set({ projectTeams: data.data, loading: false });
        } catch (error) {
          set({ error: 'Failed to fetch project teams', loading: false });
        }
      },

      fetchProjectTeamById: async (id) => {
        set({ loading: true, error: null });
        try {
          const data = await getProjectTeamById(id);
          set({ selectedProjectTeam: data.data, loading: false });
        } catch (error) {
          set({ error: 'Failed to fetch project team', loading: false });
        }
      },

      fetchProjectTeamIdByUserId: async (userId) => {
        set({ loading: true, error: null });
        try {
          const data = await getProjectTeamIdByUserId(userId);
          set({ projectTeams: data.data, loading: false });
        } catch (error) {
          set({ error: 'Failed to fetch project team by user ID', loading: false });
        }
      },

      fetchProjectsFromProjectTeam: async () => {
        set({ loading: true, error: null });
        try {
          const data = await getProjectsfromProjectTeam();
          set({ projectTeams: data.data, loading: false });
        } catch (error) {
          set({ error: 'Failed to fetch projects from project team', loading: false });
        }
      },

      createProjectTeam: async (projectTeamData) => {
        set({ loading: true, error: null });
        try {
          const data = await createProjectTeam(projectTeamData);
          set((state) => ({
            projectTeams: [...state.projectTeams, data.data],
            loading: false
          }));
        } catch (error) {
          set({ error: 'Failed to create project team', loading: false });
        }
      },

      updateProjectTeam: async (id, projectTeamData) => {
        set({ loading: true, error: null });
        try {
          const data = await updateProjectTeam(id, projectTeamData);
          set((state) => ({
            projectTeams: state.projectTeams.map(pt => pt.id === id ? { ...pt, ...data.data } : pt),
            selectedProjectTeam: state.selectedProjectTeam?.id === id ? { ...state.selectedProjectTeam, ...data.data } : state.selectedProjectTeam,
            loading: false
          }));
        } catch (error) {
          set({ error: 'Failed to update project team', loading: false });
        }
      },

      deleteProjectTeam: async (id) => {
        set({ loading: true, error: null });
        try {
          await deleteProjectTeam(id);
          set((state) => ({
            projectTeams: state.projectTeams.filter(pt => pt.id !== id),
            selectedProjectTeam: state.selectedProjectTeam?.id === id ? null : state.selectedProjectTeam,
            loading: false
          }));
        } catch (error) {
          set({ error: 'Failed to delete project team', loading: false });
        }
      },

      setSelectedProjectTeam: (projectTeam) => {
        set({ selectedProjectTeam: projectTeam });
      }
    }),
    {
      name: 'project-team-storage',
      partialize: (state) => ({
        projectTeams: state.projectTeams,
        selectedProjectTeam: state.selectedProjectTeam
      })
    }
  )
);

export default useProjectTeamStore;