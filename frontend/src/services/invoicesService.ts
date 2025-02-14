import api from "../api/axios";
import { CreateInvoiceDto } from "../types/invoice.types";
import { fetchClientsData, Client } from "./clientsService";

export interface InvoiceInterface {
  id: number;
  invoiceNumber: string;
  clientName: string;
  invoiceDate: string;
  dueDate: string;
  total: number;
  status: string;
  notes: string;
  publicUrl: string;
  clientId: number;
  items: {
    id: number;
    name: string;
    quantity: number;
    price: number;
  }[];
}

export const fetchInvoicesData = async () => {
  try {
    const response = await api.get("/api/invoices");
    const invoicesWithClientData = await updateInvoicesWithClientData(
      response.data
    );
    return invoicesWithClientData;
  } catch (error) {
    console.error("Failed to fetch invoices data:", error);
    return [];
  }
};

export const createInvoice = async (invoiceData: CreateInvoiceDto) => {
  const response = await api.post("/api/invoices", invoiceData);
  return response.data;
};

export const fetchInvoiceById = async (id: string) => {
  const response = await api.get(`/api/invoices/${id}`);
  return response.data;
};

export const fetchInvoiceByNumber = async (invoiceNumber: string) => {
  const response = await api.get(`/api/invoices?number=${invoiceNumber}`);
  return response.data;
};

async function updateInvoicesWithClientData(
  invoices: InvoiceInterface[]
): Promise<InvoiceInterface[]> {
  let clients: Client[];
  const storedClients = sessionStorage.getItem("clients");
  if (!storedClients) {
    clients = await fetchClientsData();
  } else {
    clients = JSON.parse(storedClients);
  }

  const invoiceWithClientData = invoices.map((invoice) => {
    const client = clients.find((client) => client.id === invoice.clientId);
    return {
      ...invoice,
      clientName: client
        ? `${client.firstName + " " + client.lastName}`
        : "Unknown Client",
    };
  });
  return invoiceWithClientData;
}
