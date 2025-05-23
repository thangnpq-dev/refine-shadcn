import { environment } from '@/environment/environment';
import apiClient from '../axios';

const TokenService = {
  // Validate token nhận được từ URL
  validateToken: async (token: string) => {
    try {
      // u0110u01b0u1eddng du1eabn API endpoint - chu1ec9nh su1eeda cu00f3 thu1ec3 cu1ea7n theo API cu1ee7a bu1ea1n
      const path = `api/${environment.apiVersion}/${environment.apiAuth}/validate-token`;
      console.log('Validating token with endpoint:', path);
      const response = await apiClient.post(path, { token });
      
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
