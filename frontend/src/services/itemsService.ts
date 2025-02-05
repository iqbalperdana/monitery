import api from "../api/axios";

export interface Item {
  id: number;
  name: string;
  price: number;
  description: string;
  image_url: string;
  active: boolean;
}

export const fetchItemsData = async (): Promise<Item[]> => {
  const response = await api.get("/api/items");
  return response.data;
};

export const createItem = async (data: Omit<Item, "id" | "active">) => {
  const response = await api.post("/api/items", data);
  return response.data;
};

export const deactivateItem = async (id: number) => {
  const response = await api.put(`/api/items/${id}/deactivate`);
  return response.data;
};
