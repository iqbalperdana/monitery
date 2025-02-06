import api from "../api/axios";

export interface Client {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export const fetchClientsData = async (): Promise<Client[]> => {
  const response = await api.get("/api/clients");
  return response.data;
};

export const createClient = async (clientData: Client): Promise<Client> => {
  const response = await api.post("/api/clients", clientData);
  return response.data;
};
