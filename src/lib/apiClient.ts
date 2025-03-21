import axios from "axios";

const BASE_URL = "https://cmappapi.kivio.in/api";
const URL = "https://cmappapi.kivio.in";
const MEDIA_BASE_URL = "https://cmappapi.kivio.in";

// Create Axios instance
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add the Authorization token
apiClient.interceptors.request.use(
  (config) => {
    try {
      const token = localStorage.getItem("userToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Error fetching token:", error);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error setting up request:', error.message);
    }
    return Promise.reject(error);
  }
);

export { BASE_URL, MEDIA_BASE_URL, URL };
export default apiClient;