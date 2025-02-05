import React, { useEffect, useState } from "react";
import { fetchClientsData } from "../services/clientsService";

const ClientsPage: React.FC = () => {
  const [data, setData] = useState<string>("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetchClientsData();
        setData(response.data);
      } catch (error) {
        console.error("Failed to fetch clients data:", error);
      }
    };

    loadData();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Clients</h1>
      <p>{data}</p>
    </div>
  );
};

export default ClientsPage;
