import apiClient from '../axios';
import { UserStatus } from '@/common/enum/user-status.enum';
import { NUser } from '@/common/interfaces/user';

const BASE_URL = '/users';

const UserService = {
  // Lấy danh sách users với pagination và filtering
  getUsers: async (params: any) => {
    const response = await apiClient.get(BASE_URL, { params });
    return response.data;
  },

  // Lấy thông tin chi tiết của user
  getUser: async (id: string) => {
    const response = await apiClient.get(`${BASE_URL}/${id}`);
    return response.data;
  },

  // Tạo user mới
  createUser: async (userData: Partial<NUser.IUser>) => {
    const response = await apiClient.post(BASE_URL, userData);
    return response.data;
  },

  // Cập nhật thông tin user
  updateUser: async (id: string, userData: Partial<NUser.IUser>) => {
    const response = await apiClient.put(`${BASE_URL}/${id}`, userData);
    return response.data;
  },

  // Cập nhật trạng thái user (active/inactive)
  updateUserStatus: async (id: string, status: UserStatus) => {
    const response = await apiClient.patch(`${BASE_URL}/${id}/status`, { status });
    return response.data;
  },

  // Xóa user
  deleteUser: async (id: string) => {
    const response = await apiClient.delete(`${BASE_URL}/${id}`);
    return response.data;
  }
};

export default UserService;
