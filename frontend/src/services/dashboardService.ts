import api from "../api/axios";

export const fetchDashboardData = async () => {
  const response = await api.get("/api/invoices");
  return response.data;
};
