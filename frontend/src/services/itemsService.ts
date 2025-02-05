import api from "../api/axios";

export const fetchItemsData = async () => {
  const response = await api.get("/api/items");
  return response.data;
};
