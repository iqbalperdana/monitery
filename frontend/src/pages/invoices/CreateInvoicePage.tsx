import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
          .filter((item) => {
            if (item.itemId == 0) {
              return false;
            }
            return true;
          })
          .map((item) => {
            const selectedItem = availableItems.find(
              (i) => i.id == item.itemId
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

    recalculateTotalAmount();

    // TODO: Remove selected item from available items
  };

  const recalculateTotalAmount = () => {
    let total = 0;
    formData.invoiceItems.forEach((item) => {
      const selectedItemPrice = availableItems.find(
        (i) => i.id == item.itemId
      )?.price;
      total += (selectedItemPrice || 0) * item.quantity;
    });

    setTotalAmount(total);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-3 mt-2">
        <h1 className="text-2xl font-medium">Create New Invoice</h1>
      </div>
      <div className="bg-white dark:bg-[#202435] shadow-lg p-10 rounded-sm">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col md:flex-row border-b border-gray-200 pb-4 mb-4">
            <div className="w-64 h-6 mt-3 text-gray-800 dark:text-white">
              Full Name
            </div>
            <div className="flex-1 flex flex-col md:flex-row">
              <div className="w-full flex-1 mx-2">
                <div className="my-2 p-1 bg-white flex border border-gray-200 rounded">
                  <input
                    placeholder="First Name"
                    className="p-1 px-2 appearance-none outline-none w-full text-gray-800 "
                  />{" "}
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-1 sm:gap-4">
            <div>
              <label
                htmlFor="first_name"
                className="block text-gray-700 dark:text-white mb-1"
              >
                First Name
              </label>
              <input
                type="text"
                id="first_name"
                className="w-full rounded-sm border border-gray-700/50 py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
              />
            </div>
            <div>
              <label
                htmlFor="last_name"
                className="block text-gray-700 dark:text-white mb-1"
              >
                Last Name
              </label>
              <input
                type="text"
                id="last_name"
                className="w-full rounded-sm border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
              />
            </div>
          </div>
          <div className="flex justify-between items-center mb-3 mt-2">
            <div>
              <label className="block mb-2">Invoice Number</label>
              <input
                type="text"
                value={formData.invoiceNumber}
                onChange={(e) =>
                  setFormData({ ...formData, invoiceNumber: e.target.value })
                }
                className="w-full p-2 border rounded"
              />
              {validationErrors.invoiceNumber && (
                <p className="text-red-500 text-sm">
                  {validationErrors.invoiceNumber}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-2">Client</label>
              <select
                value={formData.clientId}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    clientId: Number(e.target.value),
                  })
                }
                className="w-full p-2 border rounded"
              >
                <option value={0}>Select a client</option>
                {clients.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.firstName} {client.lastName}
                  </option>
                ))}
              </select>
              {validationErrors.clientId && (
                <p className="text-red-500 text-sm">
                  {validationErrors.clientId}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block mb-2">Invoice Date</label>
            <input
              type="date"
              value={formData.invoiceDate}
              onChange={(e) =>
                setFormData({ ...formData, invoiceDate: e.target.value })
              }
              className="w-full p-2 border rounded"
            />
            {validationErrors.invoiceDate && (
              <p className="text-red-500 text-sm">
                {validationErrors.invoiceDate}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-2">Due Date</label>
            <input
              type="date"
              value={formData.dueDate}
              onChange={(e) =>
                setFormData({ ...formData, dueDate: e.target.value })
              }
              className="w-full p-2 border rounded"
            />
            {validationErrors.dueDate && (
              <p className="text-red-500 text-sm">{validationErrors.dueDate}</p>
            )}
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Items</h3>
            {formData.invoiceItems.map((item, index) => (
              <div key={index} className="space-y-2 mb-4 p-4 border rounded">
                <select
                  value={item.itemId}
                  onChange={(e) => {
                    const newItems = [...formData.invoiceItems];
                    newItems[index].itemId = Number(e.target.value);
                    setFormData({ ...formData, invoiceItems: newItems });
                  }}
                  className="w-full p-2 border rounded"
                >
                  <option value={0}>Select an item</option>
                  {availableItems.map((availableItem) => (
                    <option key={availableItem.id} value={availableItem.id}>
                      {availableItem.name} -{" "}
                      {formatNumberToCurrencyString(availableItem.price)}
                    </option>
                  ))}
                </select>

                <input
                  type="number"
                  placeholder="Quantity"
                  value={item.quantity}
                  onChange={(e) => {
                    const newItems = [...formData.invoiceItems];
                    newItems[index].quantity = Number(e.target.value);
                    setFormData({ ...formData, invoiceItems: newItems });
                  }}
                  className="w-full p-2 border rounded"
                  min="1"
                />

                {validationErrors[`items[${index}]`] && (
                  <p className="text-red-500 text-sm">
                    {validationErrors[`items[${index}]`]}
                  </p>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addItem}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Add Item
            </button>
            <div className="mt-4">
              <h3 className="text-xl font-semibold mb-2">Total</h3>
              <p className="text-lg font-semibold">
                {formatNumberToCurrencyString(totalAmount)}
              </p>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Create Invoice
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateInvoicePage;
