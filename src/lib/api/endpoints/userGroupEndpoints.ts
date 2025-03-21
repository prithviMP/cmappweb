const userGroupEndpoints = {
  getUserGroups: "user-groups?populate=*",
  getUserGroupsWithContractorRole: "user-groups?populate=*&filters[designation][Name][$eq]=Contractor",
  getUserGroupById: (id: string) => `/user-groups/${id}?populate=*`,
  createUserGroup: "/user-groups",
  updateUserGroup: (id: string) => `/user-groups/${id}`,
  deleteUserGroup: (id: string) => `/user-groups/${id}`,
  getProjectManagerfromUserGroup: "/user-groups?populate=users",
};

export default userGroupEndpoints;