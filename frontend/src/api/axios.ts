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
  const refreshToken = Cookies.get("Refresh");
  console.log(refreshToken);
  if (!refreshToken) {
    throw new Error("No refresh token found");
  }

  const response = await axios(`${API_BASE_URL}/auth/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: `Refresh=${refreshToken}`,
    },
    data: {
      refreshToken,
    },
    withCredentials: true,
  });

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
    console.error("API Error:", error);
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
        // remove cookies and redirect to login
        localStorage.removeItem("Authentication");
        Cookies.remove("Refresh");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
