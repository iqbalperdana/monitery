import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { createInvoice } from "../../services/invoicesService";
import { fetchItemsData, Item } from "../../services/itemsService";
import { fetchClientsData, Client } from "../../services/clientsService";
import { formatNumberToCurrencyString } from "../../utils/stringUtil";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  invoiceNumber: yup.string().required("Invoice number is required"),
  clientId: yup.number().required("Client name is required"),
  invoiceDate: yup.date().required("Invoice date is required"),
  dueDate: yup
    .date()
    .min(yup.ref("invoiceDate"), "Due date can't be before invoice date")
    .required("Due date is required"),
  invoiceItems: yup
    .array()
    .of(
      yup.object().shape({
        itemId: yup.number().required("Item selection is required"),
        quantity: yup
          .number()
          .min(1, "Quantity must be at least 1")
          .required("Quantity is required"),
      })
    )
    .min(1, "At least one item is required"),
  notes: yup.string().optional(),
});

const CreateInvoicePage: React.FC = () => {
  const navigate = useNavigate();
  const [availableItems, setAvailableItems] = useState<Item[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [validationErrors, setValidationErrors] = useState<any>({});
  const [totalAmount, setTotalAmount] = useState(0);

  const [formData, setFormData] = useState({
    invoiceNumber: "",
    invoiceDate: "",
    dueDate: "",
    invoiceItems: [{ itemId: 0, quantity: 1 }],
    clientId: 0,
    notes: "",
  });

  useEffect(() => {
    const loadItems = async () => {
      try {
        const items = await fetchItemsData();
        setAvailableItems(items);

        const clients = await fetchClientsData();
        setClients(clients);
      } catch (error) {
        console.error("Failed to fetch items:", error);
      }
    };
    loadItems();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await validationSchema.validate(formData, { abortEarly: false });

      // Transform data to include item details
      const submissionData = {
        ...formData,
        total: totalAmount,
        invoiceItems: formData.invoiceItems
          .filter((item) => item.itemId !== 0) // Remove items with no selection
          .map((item) => {
            const selectedItem = availableItems.find(
              (i) => i.id === item.itemId
            );
            return {
              itemId: item.itemId,
              quantity: item.quantity,
              price: selectedItem?.price || 0,
              name: selectedItem?.name || "",
              description: selectedItem?.description || "",
              image_url: selectedItem?.image_url || "",
            };
          }),
      };

      await createInvoice(submissionData);
      navigate("/invoices");
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const errors = {};
        error.inner.forEach((err) => {
          errors[err.path] = err.message;
        });
        setValidationErrors(errors);
      }
      console.error("Failed to create invoice:", error);
    }
  };

  const addItem = () => {
    setFormData({
      ...formData,
      invoiceItems: [...formData.invoiceItems, { itemId: 0, quantity: 1 }],
    });
  };

  const removeItem = (index: number) => {
    setFormData((prevState) => ({
      ...prevState,
      invoiceItems: prevState.invoiceItems.filter((_, i) => i !== index),
    }));
  };

  useEffect(() => {
    recalculateTotalAmount();
  }, [formData.invoiceItems]);

  const recalculateTotalAmount = () => {
    let total = 0;
    formData.invoiceItems.forEach((item) => {
      const selectedItemPrice = availableItems.find(
        (i) => i.id === item.itemId
      )?.price;
      total += (selectedItemPrice || 0) * item.quantity;
    });
    setTotalAmount(total);
  };
  // Get available items for selection (exclude already selected items)
  const getAvailableItems = (index: number) => {
    const selectedItemIds = formData.invoiceItems
      .map((item, i) => (i === index ? null : item.itemId)) // Exclude current item
      .filter((id) => id !== null && id !== 0); // Filter out null and unselected items

    return availableItems
      .filter((item) => !selectedItemIds.includes(item.id))
      .map((item) => ({
        value: item.id,
        label: `${item.name} - ${formatNumberToCurrencyString(item.price)}`,
      }));
  };

  // Get client options for react-select
  const clientOptions = clients.map((client) => ({
    value: client.id,
    label: `${client.firstName} ${client.lastName}`,
  }));

  return (
    <div>
      <div className="flex justify-between items-center mb-4 mt-2">
        <h1 className="text-3xl font-semibold dark:text-white text-gray-900">
          Create New Invoice
        </h1>
      </div>
      <div className="bg-white dark:bg-[#202435] shadow-lg p-8 rounded-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Two-column layout for small attributes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Invoice Number */}
            <div>
              <label className="block text-sm font-medium mb-2 dark:text-gray-300 text-gray-700">
                Invoice Number
              </label>
              <input
                type="text"
                value={formData.invoiceNumber}
                onChange={(e) =>
                  setFormData({ ...formData, invoiceNumber: e.target.value })
                }
                className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white bg-white border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {validationErrors.invoiceNumber && (
                <p className="text-red-500 text-sm mt-1">
                  {validationErrors.invoiceNumber}
                </p>
              )}
            </div>

            {/* Client */}
            <div>
              <label className="block text-sm font-medium mb-2 dark:text-gray-300 text-gray-700">
                Client
              </label>
              <Select
                options={clientOptions}
                value={
                  formData.clientId
                    ? clientOptions.find((c) => c.value === formData.clientId)
                    : null
                }
                onChange={(selectedOption) =>
                  setFormData({
                    ...formData,
                    clientId: selectedOption?.value || 0,
                  })
                }
                placeholder="Select a client"
                className="react-select-container"
                classNamePrefix="react-select"
              />
              {validationErrors.clientId && (
                <p className="text-red-500 text-sm mt-1">
                  {validationErrors.clientId}
                </p>
              )}
            </div>

            {/* Invoice Date */}
            <div>
              <label className="block text-sm font-medium mb-2 dark:text-gray-300 text-gray-700">
                Invoice Date
              </label>
              <input
                type="date"
                value={formData.invoiceDate}
                onChange={(e) =>
                  setFormData({ ...formData, invoiceDate: e.target.value })
                }
                className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white bg-white border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {validationErrors.invoiceDate && (
                <p className="text-red-500 text-sm mt-1">
                  {validationErrors.invoiceDate}
                </p>
              )}
            </div>

            {/* Due Date */}
            <div>
              <label className="block text-sm font-medium mb-2 dark:text-gray-300 text-gray-700">
                Due Date
              </label>
              <input
                type="date"
                value={formData.dueDate}
                onChange={(e) =>
                  setFormData({ ...formData, dueDate: e.target.value })
                }
                className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white bg-white border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {validationErrors.dueDate && (
                <p className="text-red-500 text-sm mt-1">
                  {validationErrors.dueDate}
                </p>
              )}
            </div>
          </div>

          {/* Items Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4 dark:text-white text-gray-900">
              Items
            </h3>
            <div>
              <table className="w-full">
                <thead>
                  <tr className="dark:bg-gray-700 bg-gray-100">
                    <th className="px-4 py-2 text-left">#</th>
                    <th className="px-4 py-2 text-left w-100">Item Name</th>
                    <th className="px-4 py-2 text-left">Price</th>
                    <th className="px-4 py-2 text-center">Quantity</th>
                    <th className="px-4 py-2 text-right">Total Price</th>
                    <th className="px-4 py-2 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {formData.invoiceItems.map((item, index) => {
                    const selectedItem = availableItems.find(
                      (i) => i.id === item.itemId
                    );
                    const totalPrice =
                      (selectedItem?.price || 0) * item.quantity;

                    return (
                      <tr
                        key={index}
                        className="border-b dark:border-gray-600 hover:dark:bg-gray-700 hover:bg-gray-100"
                      >
                        <td className="px-4 py-2">{index + 1}</td>
                        <td className="px-4 py-2">
                          <Select
                            options={getAvailableItems(index)}
                            value={
                              item.itemId
                                ? {
                                    value: item.itemId,
                                    label: selectedItem?.name || "",
                                  }
                                : null
                            }
                            onChange={(selectedOption) => {
                              const newItems = [...formData.invoiceItems];
                              newItems[index].itemId =
                                selectedOption?.value || 0;
                              setFormData({
                                ...formData,
                                invoiceItems: newItems,
                              });
                              recalculateTotalAmount();
                            }}
                            placeholder="Select an item"
                            className="react-select-container"
                            classNamePrefix="react-select"
                          />
                        </td>
                        <td className="px-4 py-2">
                          {selectedItem
                            ? formatNumberToCurrencyString(selectedItem.price)
                            : "-"}
                        </td>
                        <td className="px-4 py-2 text-center">
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => {
                              const newItems = [...formData.invoiceItems];
                              newItems[index].quantity = Number(e.target.value);
                              setFormData({
                                ...formData,
                                invoiceItems: newItems,
                              });
                              recalculateTotalAmount();
                            }}
                            className="w-20 p-2 border rounded-lg dark:bg-gray-600 dark:border-gray-500 dark:text-white bg-white border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
                            min="1"
                          />
                        </td>
                        <td className="px-4 py-2 text-right">
                          {formatNumberToCurrencyString(totalPrice)}
                        </td>
                        <td className="px-4 py-2 text-right">
                          <button
                            type="button"
                            onClick={() => {
                              removeItem(index);
                            }}
                            className="p-2 text-red-500 hover:text-red-600 transition-all"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Add Item Button */}
            <button
              type="button"
              onClick={addItem}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all flex items-center space-x-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Add Item</span>
            </button>
          </div>

          {/* Total Amount */}
          <div className="mt-6 flex justify-end items-center space-x-4">
            <h3 className="text-xl font-semibold dark:text-white text-gray-900">
              Total Invoice:
            </h3>
            <p className="text-2xl font-bold dark:text-white text-gray-900">
              {formatNumberToCurrencyString(totalAmount)}
            </p>
          </div>

          {/* Invoice Notes */}
          <div>
            <label className="block text-sm font-medium mb-2 dark:text-gray-300 text-gray-700">
              Invoice Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
              className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white bg-white border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
              placeholder="Add any additional notes for the invoice..."
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 px-6 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all"
          >
            Create Invoice
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateInvoicePage;
