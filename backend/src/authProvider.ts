import { AuthProvider } from "react-admin";
import axios from "axios";
import logo from './img/Brown_and_Beige_Flat_Illustrative_Tea_Products_Logo-removebg-preview.png';
const API_URL = "http://localhost:8080/api";

export const authProvider: AuthProvider = {
  login: async ({ username, password }) => {
    try {
      // Gửi yêu cầu đăng nhập để lấy JWT token
      const response = await axios.post(`${API_URL}/login`, {
        email: username,
        password,
      });

      const token = response.data["jwt-token"];
      localStorage.setItem("jwt-token", token);
      localStorage.setItem("username", username);

      // Lấy thông tin người dùng để lưu cartId và avatar (logo)
      const userResponse = await axios.get(`${API_URL}/public/users/email/${username}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const user = userResponse.data;
      localStorage.setItem("cartId", user.cart?.cartId || "");
      localStorage.setItem("avatar", user.avatar || `${logo}`); // thêm logo (avatar)

      return Promise.resolve();
    } catch (error) {
      return Promise.reject(new Error("Sai tài khoản hoặc mật khẩu. Vui lòng thử lại."));
    }
  },

  logout: () => {
    localStorage.removeItem("jwt-token");
    localStorage.removeItem("username");
    localStorage.removeItem("cartId");
    localStorage.removeItem("avatar");
    return Promise.resolve();
  },

  checkError: ({ status }) => {
    if (status === 401 || status === 403) {
      localStorage.removeItem("jwt-token");
      localStorage.removeItem("username");
      localStorage.removeItem("cartId");
      localStorage.removeItem("avatar");
      return Promise.reject();
    }
    return Promise.resolve();
  },

  checkAuth: () => {
    return localStorage.getItem("jwt-token") ? Promise.resolve() : Promise.reject();
  },

  getPermissions: () => {
    // Có thể mở rộng để phân quyền theo role từ backend
    return Promise.resolve();
  },

  getIdentity: async () => {
    const username = localStorage.getItem("username");
    const avatar = localStorage.getItem("avatar");

    if (!username) return Promise.reject();

    return Promise.resolve({
      id: username,
      fullName: username,
      avatar, // logo hoặc hình đại diện
    });
  },
};
