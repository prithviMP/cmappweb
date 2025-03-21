const recordEndpoints = {
  getRecords: "/records?populate=*",
  getRecordById: (id: string) => `/records/${id}`,
  createRecord: "/records",
  updateRecord: (id: string) => `/records/${id}`,
  deleteRecord: (id: string) => `/records/${id}`,
};

export default recordEndpoints;