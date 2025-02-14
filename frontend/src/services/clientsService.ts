import api from "../api/axios";

export interface Client {
  id?: number;
  firstName: string;
  lastName: string;
  email?: string;
  phone: string;
}

export const fetchClientsData = async (): Promise<Client[]> => {
  const response = await api.get("/api/clients");
  sessionStorage.setItem("clients", JSON.stringify(response.data));
  return response.data;
};

export const createClient = async (clientData: Client): Promise<Client> => {
  const response = await api.post("/api/clients", clientData);
  return response.data;
};
