import { create } from 'zustand';
import { getTasks, getTaskById, getTaskByUserId, createTask, updateTask, deleteTask } from '../api/services/taskService';

interface Task {
  id: string;
  title: string;
  description?: string;
  status?: 'To Do' | 'In Progress' | 'In Review' | 'Completed';
  priority?: 'Low' | 'Medium' | 'High';
  dueDate?: string;
  assignees?: string[];
}

interface TaskState {
  tasks: Task[];
  selectedTask: Task | null;
  loading: boolean;
  error: string | null;
  fetchTasks: () => Promise<void>;
  fetchTaskById: (id: string) => Promise<void>;
  fetchTasksByUserId: (userId: string) => Promise<void>;
  createTask: (data: Omit<Task, 'id'>) => Promise<void>;
  updateTask: (id: string, data: Partial<Task>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  setSelectedTask: (task: Task | null) => void;
}

const useTaskStore = create<TaskState>((set) => ({
  tasks: [],
  selectedTask: null,
  loading: false,
  error: null,

  fetchTasks: async () => {
    set({ loading: true, error: null });
    try {
      const data = await getTasks();
      set({ tasks: data.data, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch tasks', loading: false });
    }
  },

  fetchTaskById: async (id) => {
    set({ loading: true, error: null });
    try {
      const data = await getTaskById(id);
      set({ selectedTask: data.data, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch task', loading: false });
    }
  },

  fetchTasksByUserId: async (userId) => {
    set({ loading: true, error: null });
    try {
      const data = await getTaskByUserId(userId);
      set({ tasks: data.data, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch user tasks', loading: false });
    }
  },

  createTask: async (taskData) => {
    set({ loading: true, error: null });
    try {
      const data = await createTask(taskData);
      set((state) => ({
        tasks: [...state.tasks, data.data],
        loading: false
      }));
    } catch (error) {
      set({ error: 'Failed to create task', loading: false });
    }
  },

  updateTask: async (id, taskData) => {
    set({ loading: true, error: null });
    try {
      const data = await updateTask(id, taskData);
      set((state) => ({
        tasks: state.tasks.map(t => t.id === id ? { ...t, ...data.data } : t),
        selectedTask: state.selectedTask?.id === id ? { ...state.selectedTask, ...data.data } : state.selectedTask,
        loading: false
      }));
    } catch (error) {
      set({ error: 'Failed to update task', loading: false });
    }
  },

  deleteTask: async (id) => {
    set({ loading: true, error: null });
    try {
      await deleteTask(id);
      set((state) => ({
        tasks: state.tasks.filter(t => t.id !== id),
        selectedTask: state.selectedTask?.id === id ? null : state.selectedTask,
        loading: false
      }));
    } catch (error) {
      set({ error: 'Failed to delete task', loading: false });
    }
  },

  setSelectedTask: (task) => {
    set({ selectedTask: task });
  }
}));

export default useTaskStore;