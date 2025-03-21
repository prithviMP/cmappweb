const submissionEndpoints = {
  getSubmissions: "submissions?populate[task][populate]=*&populate[proofOfWork]=*&populate[submitted_by]=*populate=*",
  getSubmissionsByUserId: (userId: string) => `/submissions?filters[submitted_by][id][$eq]=${userId}&populate[task][populate]=*&populate=*`,
  getSubmissionById: (id: string) => `/submissions/${id}?populate=*`,
  createSubmission: "/submissions",
  updateSubmission: (id: string) => `/submissions/${id}`,
  deleteSubmission: (id: string) => `/submissions/${id}`,
};

export default submissionEndpoints;