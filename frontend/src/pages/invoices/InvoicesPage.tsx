import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchInvoicesData } from "../../services/invoicesService";

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

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchInvoicesData();
        console.log(data);
        setInvoices(data);
      } catch (error) {
        console.error("Failed to fetch invoices data:", error);
      }
    };

    loadData();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Invoices</h1>
        <Link
          to="create"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Create Invoice
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Invoice ID
              </th>
              <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {invoices.map((invoice) => (
              <tr key={invoice.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {invoice.invoiceNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {invoice.invoiceDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{invoice.total}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {invoice.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvoicesPage;
