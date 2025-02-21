import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "../../components/DataTables";
import {
  fetchInvoicesData,
  InvoiceInterface,
} from "../../services/invoicesService";
import { formatDateString } from "../../utils/dateUtil";
import { formatNumberToCurrencyString } from "../../utils/stringUtil";

const InvoicesPage: React.FC = () => {
  const [invoices, setInvoices] = useState<InvoiceInterface[]>([]);
  const [pending, setPending] = useState(true);

  const columns = [
    {
      header: "Invoice Number",
      accessor: "invoiceNumber",
      formatter: (value: number) => <Link to={`${value}`}>{value}</Link>,
    },
    {
      header: "Client",
      accessor: "clientName",
    },
    {
      header: "Date",
      accessor: "invoiceDate",
      formatter: (value: string) => formatDateString(value),
    },
    {
      header: "Due Date",
      accessor: "dueDate",
      formatter: (value: string) => formatDateString(value),
    },
    {
      header: "Amount",
      accessor: "total",
      formatter: (value: number) => formatNumberToCurrencyString(value),
    },
    {
      header: "Status",
      accessor: "status",
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

  return (
    <div>
      <div className="flex justify-between items-center mb-4 mt-2">
        <h1 className="text-3xl font-semibold">Invoices</h1>
        <Link
          to="create"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Create Invoice
        </Link>
      </div>
      <div className="bg-white dark:bg-[#202435] shadow-lg p-10 rounded-sm">
        {pending ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <DataTable columns={columns} data={invoices} />
        )}
      </div>
    </div>
  );
};
export default InvoicesPage;
