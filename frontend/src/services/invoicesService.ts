import api from "../api/axios";

export const fetchInvoicesData = async () => {
  const response = await api.get("/api/invoices");
  return response.data;
};
