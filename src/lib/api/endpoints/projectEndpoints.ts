const projectEndpoints = {
  getProjects: "/projects?populate[documents]=*",
  getProjectById: (id: string) => `/projects/${id}?populate[documents]=*&populate[tasks][populate][standard_task][submissions][populate][proofOfWork]=*`,
  createProject: "/projects",
  updateProject: (id: string) => `/projects/${id}`,
  deleteProject: (id: string) => `/projects/${id}`,
};

export default projectEndpoints;