import apiClient from '../axios';

const AuthService = {
  // Đăng nhập
  login: async (credentials: { username: string; password: string }) => {
    const response = await apiClient.post('/auth/login', credentials);
    return response.data;
  },

  // Đăng ký
  register: async (userData: any) => {
    const response = await apiClient.post('/auth/register', userData);
    return response.data;
  },

  // Đăng xuất
  logout: async () => {
    const response = await apiClient.post('/auth/logout');
    // Xóa token từ localStorage
    localStorage.removeItem('auth');
    return response.data;
  },

  // Lấy thông tin người dùng hiện tại
  getCurrentUser: async () => {
    const response = await apiClient.get('/auth/me');
    return response.data;
  },

  // Yêu cầu đặt lại mật khẩu
  requestPasswordReset: async (email: string) => {
    const response = await apiClient.post('/auth/forgot-password', { email });
    return response.data;
  },

  // Đặt lại mật khẩu
  resetPassword: async (token: string, newPassword: string) => {
    const response = await apiClient.post('/auth/reset-password', {
      token,
      newPassword,
    });
    return response.data;
  },
};

export default AuthService;
