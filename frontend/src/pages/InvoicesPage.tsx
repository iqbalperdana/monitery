import React, { useEffect, useState } from "react";
import { fetchInvoicesData } from "../services/invoicesService";

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
      <h1 className="text-2xl font-bold mb-4">Invoices</h1>
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
