const taskEndpoints = {
  getTasks: "/tasks?populate=*",
  getTaskById: (id: string) => `/tasks/${id}?populate=*`,
  getTaskByUserId: (userId: string) => `/tasks?filters[project_team_member][id][$eq]=${userId}&populate=*`,
  createTask: "/tasks",
  updateTask: (id: string) => `/tasks/${id}`,
  deleteTask: (id: string) => `/tasks/${id}`,
};

export default taskEndpoints;