// Axios configuration for API requests

import axios from 'axios';
import { getApiUrl } from '@/app/_refine/actions';

const apiClient = axios.create({
  baseURL: getApiUrl(),
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add a request interceptor for authentication
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth');
    if (token) {
      config.headers.Authorization = `Bearer ${JSON.parse(token).token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;
    
    // Handle specific status codes
    if (response && response.status === 401) {
      // Unauthorized - clear auth and redirect to login
      localStorage.removeItem('auth');
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;
