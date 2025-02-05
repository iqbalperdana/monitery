import api from "../api/axios";

export const fetchProfileData = async () => {
  const response = await api.get("/api/users/me");
  return response.data;
};
