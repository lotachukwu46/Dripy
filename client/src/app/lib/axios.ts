import { useAuthStore } from "@/app/store/authStore";
import axios from "axios";

const baseURL =
  process.env.NEXT_PUBLIC_API_URL ||
  (process.env.NODE_ENV === "development"
    ? "http://localhost:5000/api"
    : "/api");

const api = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
  withCredentials: true, // send cookies automatically
});

// Response interceptor for refresh
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const authStore = useAuthStore.getState();

    if (error.response?.status === 401) {
      try {
        const res = await axios.post(`${baseURL}/auth/refresh-token`, {}, { withCredentials: true });

        // Retry original request with new access token
        error.config.headers["Authorization"] = `Bearer ${res.data.accessToken}`;
        return axios(error.config);
      } catch {
        // If refresh fails, logout
        authStore.logout();
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
