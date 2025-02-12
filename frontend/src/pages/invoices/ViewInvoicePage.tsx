import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchInvoiceById } from "../../services/invoicesService";
import { formatNumberToCurrencyString } from "../../utils/stringUtil";

const ViewInvoicePage: React.FC = () => {
  const { id } = useParams();
  const [invoice, setInvoice] = useState<any>(null);

  useEffect(() => {
    const loadInvoice = async () => {
      console.log("Fetching invoice with ID:", id);
      const data = await fetchInvoiceById(id);
      setInvoice(data);
    };
    loadInvoice();
  }, [id]);

  if (!invoice) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-3 mt-2">
        <h1 className="text-2xl font-medium">View Invoice</h1>
      </div>
      <div className="bg-white dark:bg-[#202435] shadow-lg p-10 rounded-sm shadow">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              Invoice #{invoice.invoiceNumber}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Created: {new Date(invoice.invoiceDate).toLocaleDateString()}
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Due: {new Date(invoice.dueDate).toLocaleDateString()}
            </p>
          </div>
          <div className="text-right">
            <p className="text-lg font-semibold mb-2">
              Total: {formatNumberToCurrencyString(invoice.total)}
            </p>
            <span
              className={`px-3 py-1 rounded-full text-sm ${
                invoice.status === "PAID"
                  ? "bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100"
                  : "bg-yellow-100 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-100"
              }`}
            >
              {invoice.status}
            </span>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Client Information</h2>
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded">
            <p className="font-medium">
              {invoice.client?.firstName} {invoice.client?.lastName}
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              {invoice.client?.email}
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              {invoice.client?.phone}
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Items</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-2 text-left">Item</th>
                  <th className="px-4 py-2 text-right">Quantity</th>
                  <th className="px-4 py-2 text-right">Price</th>
                  <th className="px-4 py-2 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                {invoice.invoiceItems.map((item, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {item.description}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">{item.quantity}</td>
                    <td className="px-4 py-3 text-right">
                      {formatNumberToCurrencyString(item.price)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {formatNumberToCurrencyString(item.price * item.quantity)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-gray-50 dark:bg-gray-700 font-semibold">
                <tr>
                  <td colSpan={3} className="px-4 py-3 text-right">
                    Total
                  </td>
                  <td className="px-4 py-3 text-right">
                    {formatNumberToCurrencyString(invoice.total)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewInvoicePage;
