import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getUserGroups, getUserGroupById, getUserGroupsWithContractorRole, createUserGroup, updateUserGroup, deleteUserGroup, getProjectManagerFromUserGroup } from '../api/services/userGroupService';

interface UserGroup {
  id: string;
  name: string;
  designation?: string;
  users?: any[];
}

interface UserGroupState {
  userGroups: UserGroup[];
  selectedUserGroup: UserGroup | null;
  loading: boolean;
  error: string | null;
  fetchUserGroups: () => Promise<void>;
  fetchUserGroupById: (id: string) => Promise<void>;
  fetchUserGroupsWithContractorRole: () => Promise<void>;
  fetchProjectManagerFromUserGroup: () => Promise<void>;
  createUserGroup: (data: Omit<UserGroup, 'id'>) => Promise<void>;
  updateUserGroup: (id: string, data: Partial<UserGroup>) => Promise<void>;
  deleteUserGroup: (id: string) => Promise<void>;
  setSelectedUserGroup: (userGroup: UserGroup | null) => void;
}

const useUserGroupStore = create<UserGroupState>()(
  persist(
    (set) => ({
      userGroups: [],
      selectedUserGroup: null,
      loading: false,
      error: null,

      fetchUserGroups: async () => {
        set({ loading: true, error: null });
        try {
          const data = await getUserGroups();
          set({ userGroups: data.data, loading: false });
        } catch (error) {
          set({ error: 'Failed to fetch user groups', loading: false });
        }
      },

      fetchUserGroupById: async (id) => {
        set({ loading: true, error: null });
        try {
          const data = await getUserGroupById(id);
          set({ selectedUserGroup: data.data, loading: false });
        } catch (error) {
          set({ error: 'Failed to fetch user group', loading: false });
        }
      },

      fetchUserGroupsWithContractorRole: async () => {
        set({ loading: true, error: null });
        try {
          const data = await getUserGroupsWithContractorRole();
          set({ userGroups: data.data, loading: false });
        } catch (error) {
          set({ error: 'Failed to fetch contractor user groups', loading: false });
        }
      },

      fetchProjectManagerFromUserGroup: async () => {
        set({ loading: true, error: null });
        try {
          const data = await getProjectManagerFromUserGroup();
          set({ userGroups: data.data, loading: false });
        } catch (error) {
          set({ error: 'Failed to fetch project manager from user group', loading: false });
        }
      },

      createUserGroup: async (userGroupData) => {
        set({ loading: true, error: null });
        try {
          const data = await createUserGroup(userGroupData);
          set((state) => ({
            userGroups: [...state.userGroups, data.data],
            loading: false
          }));
        } catch (error) {
          set({ error: 'Failed to create user group', loading: false });
        }
      },

      updateUserGroup: async (id, userGroupData) => {
        set({ loading: true, error: null });
        try {
          const data = await updateUserGroup(id, userGroupData);
          set((state) => ({
            userGroups: state.userGroups.map(ug => ug.id === id ? { ...ug, ...data.data } : ug),
            selectedUserGroup: state.selectedUserGroup?.id === id ? { ...state.selectedUserGroup, ...data.data } : state.selectedUserGroup,
            loading: false
          }));
        } catch (error) {
          set({ error: 'Failed to update user group', loading: false });
        }
      },

      deleteUserGroup: async (id) => {
        set({ loading: true, error: null });
        try {
          await deleteUserGroup(id);
          set((state) => ({
            userGroups: state.userGroups.filter(ug => ug.id !== id),
            selectedUserGroup: state.selectedUserGroup?.id === id ? null : state.selectedUserGroup,
            loading: false
          }));
        } catch (error) {
          set({ error: 'Failed to delete user group', loading: false });
        }
      },

      setSelectedUserGroup: (userGroup) => {
        set({ selectedUserGroup: userGroup });
      }
    }),
    {
      name: 'user-group-storage',
      partialize: (state) => ({
        userGroups: state.userGroups,
        selectedUserGroup: state.selectedUserGroup
      })
    }
  )
);

export default useUserGroupStore;