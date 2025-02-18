import React, { useEffect, useState } from "react";
import { fetchClientsData, Client } from "../../services/clientsService";
import { Link } from "react-router-dom";

const ClientsPage: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchClientsData();
        setClients(data);
      } catch (error) {
        console.error("Failed to fetch clients data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return <div>Loading clients...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Clients</h1>
        <Link
          to="create"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Create Client
        </Link>
      </div>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {clients.map((client) => (
          <div key={client.id} className="p-4 border rounded shadow-sm">
            <div className="space-y-2">
              <div>
                <span className="font-medium text-gray-600">First Name: </span>
                <span>{client.firstName}</span>
              </div>
              <div>
                <span className="font-medium text-gray-600">Last Name: </span>
                <span>{client.lastName}</span>
              </div>
              <div>
                <span className="font-medium text-gray-600">Email: </span>
                <span>{client.email}</span>
              </div>
              <div>
                <span className="font-medium text-gray-600">Phone: </span>
                <span>{client.phone}</span>
              </div>
            </div>
          </div>
        ))}
      </div>{" "}
    </div>
  );
};

export default ClientsPage;
