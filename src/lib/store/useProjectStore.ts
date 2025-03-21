import { create } from 'zustand';
import { getProjects, getProjectById, createProject, updateProject, deleteProject } from '../api/services/projectService';
import type { Project, ProjectResponse } from '../types/project';

interface ProjectState {
  projects: Project[];
  selectedProject: Project | null;
  loading: boolean;
  error: string | null;
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
  fetchProjects: () => Promise<void>;
  fetchProjectById: (id: string) => Promise<void>;
  createProject: (data: Omit<Project['attributes'], 'id' | 'createdAt' | 'updatedAt' | 'publishedAt'>) => Promise<void>;
  updateProject: (id: string, data: Partial<Project['attributes']>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  setSelectedProject: (project: Project | null) => void;
}

const useProjectStore = create<ProjectState>((set) => ({
  projects: [],
  selectedProject: null,
  loading: false,
  error: null,
  pagination: {
    page: 1,
    pageSize: 100,
    pageCount: 1,
    total: 0
  },

  fetchProjects: async () => {
    set({ loading: true, error: null });
    try {
      const response = await getProjects();
      const projectResponse = response.data;
      set({ 
        projects: projectResponse.data,
        pagination: projectResponse.meta.pagination,
        loading: false 
      });
    } catch (error) {
      console.error('Project fetch error:', error);
      set({ error: error instanceof Error ? error.message : 'Failed to fetch projects', loading: false });
    }
  },

  fetchProjectById: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await getProjectById(id);
      const project = response.data as Project;
      set({ selectedProject: project, loading: false });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to fetch project', loading: false });
    }
  },

  createProject: async (projectData) => {
    set({ loading: true, error: null });
    try {
      const response = await createProject(projectData);
      const newProject = response.data as Project;
      set((state) => ({
        projects: [...state.projects, newProject],
        loading: false
      }));
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to create project', loading: false });
    }
  },

  updateProject: async (id, projectData) => {
    set({ loading: true, error: null });
    try {
      const response = await updateProject(id, projectData);
      const updatedProject = response.data as Project;
      set((state) => ({
        projects: state.projects.map(p => p.id === Number(id) ? updatedProject : p),
        selectedProject: state.selectedProject?.id === Number(id) ? updatedProject : state.selectedProject,
        loading: false
      }));
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to update project', loading: false });
    }
  },

  deleteProject: async (id) => {
    set({ loading: true, error: null });
    try {
      await deleteProject(id);
      set((state) => ({
        projects: state.projects.filter(p => p.id !== Number(id)),
        selectedProject: state.selectedProject?.id === Number(id) ? null : state.selectedProject,
        loading: false
      }));
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to delete project', loading: false });
    }
  },

  setSelectedProject: (project) => {
    set({ selectedProject: project });
  }
}));

export default useProjectStore;