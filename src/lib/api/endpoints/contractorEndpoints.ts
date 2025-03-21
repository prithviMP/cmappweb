const contractorEndpoints = {
  getContractors: "/contractors?populate=*",
  getContractorById: (id: string) => `/contractors/${id}`,
  createContractor: "/contractors",
  updateContractor: (id: string) => `/contractors/${id}`,
  deleteContractor: (id: string) => `/contractors/${id}`,
};

export default contractorEndpoints;