import apiClient from '../axios';

const TokenService = {
  // Validate token nhận được từ URL
  validateToken: async (token: string) => {
    try {
      const response = await apiClient.post('/auth/validate-token', { token });
      
      if (response.data?.accessToken) {
        // Lưu token vào localStorage nếu hợp lệ
        localStorage.setItem('auth', JSON.stringify({
          token: response.data.accessToken,
          user: response.data.user || {}
        }));
        return { success: true, user: response.data.user };
      }
      
      return { success: false };
    } catch (error) {
      console.error('Token validation failed:', error);
      return { success: false, error };
    }
  },

  // Lấy token từ localStorage
  getToken: () => {
    const auth = localStorage.getItem('auth');
    if (auth) {
      try {
        const parsed = JSON.parse(auth);
        return parsed.token;
      } catch (e) {
        return null;
      }
    }
    return null;
  },

  // Lưu token và thông tin user
  saveToken: (accessToken: string, user: any) => {
    localStorage.setItem('auth', JSON.stringify({
      token: accessToken,
      user: user
    }));
  },

  // Xóa token
  removeToken: () => {
    localStorage.removeItem('auth');
  },

  // Kiểm tra xem user đã đăng nhập chưa
  isAuthenticated: () => {
    return !!TokenService.getToken();
  }
};

export default TokenService;
