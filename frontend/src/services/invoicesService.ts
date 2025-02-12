import api from "../api/axios";
import { CreateInvoiceDto } from "../types/invoice.types";

export const fetchInvoicesData = async () => {
  const response = await api.get("/api/invoices");
  return response.data;
};

export const createInvoice = async (invoiceData: CreateInvoiceDto) => {
  const response = await api.post("/api/invoices", invoiceData);
  return response.data;
};

export const fetchInvoiceById = async (id: string) => {
  const response = await api.get(`/api/invoices/${id}`);
  return response.data;
};
