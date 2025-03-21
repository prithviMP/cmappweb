const userEndpoints = {
  getUsers: "/users?populate=*",
  getProjectUserById: (id: string) => `/users/${id}?populate[project][populate]=*`,
  createUser: "/auth/local/register",
  updateUser: (id: string) => `/users/${id}`,
  deleteUser: (id: string) => `/users/${id}`,
};

export default userEndpoints;