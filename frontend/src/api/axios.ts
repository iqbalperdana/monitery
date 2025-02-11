import axios from "axios";
import Cookies from "js-cookie";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const refreshAccessToken = async (): Promise<string> => {
  // const refreshToken = Cookies.get("Refresh");
  // console.log(refreshToken);
  // if (!refreshToken) {
  //   throw new Error("No refresh token found");
  // }

  const response = await axios(`${API_BASE_URL}/auth/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });

  if (response.status !== 200) {
    throw new Error("Failed to refresh access token");
  }

  const { accessToken } = response.data;
  localStorage.setItem("Authentication", accessToken); // Update the access token in localStorage

  return accessToken;
};

const getAccessToken = (): string | null => {
  return localStorage.getItem("Authentication");
};

api.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    config.withCredentials = true;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    // Check if the error is due to an expired token (e.g., 401 Unauthorized)
    if (error.response?.status === 401 && !originalRequest._retry) {
      console.log("Token expired, refreshing...");
      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshAccessToken();
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
