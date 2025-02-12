import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { fetchInvoicesData } from "../../services/invoicesService";
import { formatNumberToCurrencyString } from "../../utils/stringUtil";

interface InvoiceInterface {
  id: number;
  invoiceNumber: string;
  clientName: string;
  invoiceDate: string;
  dueDate: string;
  total: number;
  status: string;
  items: {
    id: number;
    name: string;
    quantity: number;
    price: number;
  }[];
}

const InvoicesPage: React.FC = () => {
  const [invoices, setInvoices] = useState<InvoiceInterface[]>([]);
  const [pending, setPending] = useState(true);

  const columns = [
    {
      name: "Invoice ID",
      selector: (row: InvoiceInterface) => row.invoiceNumber,
      sortable: true,
    },
    {
      name: "Client",
      selector: (row: InvoiceInterface) => row.clientName,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row: InvoiceInterface) => row.invoiceDate,
      sortable: true,
    },
    {
      name: "Due Date",
      selector: (row: InvoiceInterface) => row.dueDate,
      sortable: true,
    },
    {
      name: "Amount",
      selector: (row: InvoiceInterface) => row.total,
      sortable: true,
      format: (row: InvoiceInterface) =>
        formatNumberToCurrencyString(row.total),
    },
    {
      name: "Status",
      selector: (row: InvoiceInterface) => row.status,
      sortable: true,
      cell: (row: InvoiceInterface) => (
        <span
          className={`px-2 py-1 rounded-full text-sm ${
            row.status === "Paid"
              ? "bg-green-100 text-green-800"
              : row.status === "Pending"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {row.status}
        </span>
      ),
    },
  ];

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchInvoicesData();
        setInvoices(data);
        setPending(false);
      } catch (error) {
        console.error("Failed to fetch invoices data:", error);
        setPending(false);
      }
    };

    loadData();
  }, []);

  const customStyles = {
    rows: {
      style: {
        minHeight: "60px",
      },
    },
    headCells: {
      style: {
        paddingLeft: "8px",
        paddingRight: "8px",
        backgroundColor: "#F3F4F6",
        fontWeight: "bold",
      },
    },
    cells: {
      style: {
        paddingLeft: "8px",
        paddingRight: "8px",
      },
    },
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4 mt-2">
        <h1 className="text-2xl font-medium">Invoices</h1>
        <Link
          to="create"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Create Invoice
        </Link>
      </div>
      <div className="bg-white dark:bg-[#202435] shadow-lg p-10 rounded-sm">
        <DataTable
          columns={columns}
          data={invoices}
          pagination
          paginationPerPage={10}
          paginationRowsPerPageOptions={[10, 20, 30, 50]}
          progressPending={pending}
          customStyles={customStyles}
          striped
          highlightOnHover
          pointerOnHover
        />
      </div>
    </div>
  );
};

export default InvoicesPage;
