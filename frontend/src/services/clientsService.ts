import api from "../api/axios";

export const fetchClientsData = async () => {
  const response = await api.get("/api/clients");
  return response.data;
};
