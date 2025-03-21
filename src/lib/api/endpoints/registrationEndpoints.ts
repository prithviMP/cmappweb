const registrationEndpoints = {
  getRegistrations: "/registrations?populate=*",
  getRegistrationById: (id: string) => `/registrations/${id}?populate=*`,
  createRegistration: "/registrations",
  updateRegistration: (id: string) => `/registrations/${id}`,
  deleteRegistration: (id: string) => `/registrations/${id}`,
};

export default registrationEndpoints;