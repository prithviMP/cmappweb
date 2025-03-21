const projectTeamsEndpoints = {
  getProjectTeams: "/project-teams?populate=*",
  getProjectTeamById: (id: string) => `/project-teams/${id}?populate=*`,
  createProjectTeam: "/project-teams",
  updateProjectTeam: (id: string) => `/project-teams/${id}`,
  deleteProjectTeam: (id: string) => `/project-teams/${id}`,
  getProjectTeamIdByUserId: (userId: string) =>
    `/project-teams?filters[users][id][$eq]=${userId}&populate[projects][populate]=*`,
  getProjectsfromProjectTeam: "/project-teams?populate[projects]=*&populate[users]=*"
};

export default projectTeamsEndpoints;