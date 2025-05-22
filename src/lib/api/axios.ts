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
    // Đọc token từ localStorage
    const auth = localStorage.getItem('auth');
    if (auth) {
      try {
        const { token } = JSON.parse(auth);
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (error) {
        console.error('Error parsing auth token:', error);
        // Nếu có lỗi khi parse token, xóa token khỏi localStorage
        localStorage.removeItem('auth');
      }
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
      
      // Sử dụng Next.js router thay vì window.location nếu đang ở client side
      if (typeof window !== 'undefined') {
        // Tránh vòng lặp chuyển hướng nếu đang ở trang login
        if (!window.location.pathname.includes('/login')) {
          window.location.href = '/login';
        }
      }
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;
