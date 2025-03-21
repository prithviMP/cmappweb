const subContractorEndpoints = {
  getSubContractors: "/sub-contractors?populate[contractors][populate]=*",
  getSubContractorById: (id: string) => `/sub-contractors/${id}`,
  createSubContractor: "/sub-contractors",
  updateSubContractor: (id: string) => `/sub-contractors/${id}`,
  deleteSubContractor: (id: string) => `/sub-contractors/${id}`,
};

export default subContractorEndpoints;