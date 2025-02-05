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
