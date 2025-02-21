import React, { useEffect, useState } from "react";
import { fetchClientsData, Client } from "../../services/clientsService";
import { Link } from "react-router-dom";
import DataTable from "../../components/DataTables";

const ClientsPage: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [pending, setPending] = useState(true);

  const columns = [
    {
      header: "First Name",
      accessor: "firstName",
    },
    {
      header: "Last Name",
      accessor: "lastName",
    },
    {
      header: "Email",
      accessor: "email",
    },
    {
      header: "Phone",
      accessor: "phone",
    },
  ];

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchClientsData();
        setClients(data);
      } catch (error) {
        console.error("Failed to fetch clients data:", error);
      } finally {
        setPending(false);
      }
    };

    loadData();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-4 mt-2">
        <h1 className="text-3xl font-semibold">Clients</h1>
        <Link
          to="create"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Create Client
        </Link>
      </div>
      <div className="bg-white dark:bg-[#202435] shadow-lg p-10 rounded-sm">
        {pending ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <DataTable columns={columns} data={clients} />
        )}
      </div>
    </div>
  );
};

export default ClientsPage;
