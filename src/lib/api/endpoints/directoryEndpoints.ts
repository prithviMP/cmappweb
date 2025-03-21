const directoryEndpoints = {
  getDirectories: "/directories?populate[records][populate]=*",
  getDirectoryById: (id: string) => `/directories/${id}`,
  createDirectory: "/directories",
  updateDirectory: (id: string) => `/directories/${id}`,
  deleteDirectory: (id: string) => `/directories/${id}`,
};

export default directoryEndpoints;