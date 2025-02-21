import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Item,
  fetchItemsData,
  deactivateItem,
} from "../../services/itemsService";
import DataTable from "../../components/DataTables";
import { formatNumberToCurrencyString } from "../../utils/stringUtil";
const ItemsPage: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [pending, setPending] = useState(true);

  const columns = [
    {
      header: "Item name",
      accessor: "name",
      formatter: (value: number) => <Link to={`${value}`}>{value}</Link>,
    },
    {
      header: "Price",
      accessor: "price",
      formatter: (value: number) => formatNumberToCurrencyString(value),
    },
    {
      header: "Description",
      accessor: "description",
    },
  ];

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      const data = await fetchItemsData();
      setItems(data);
      setPending(false);
    } catch (error) {
      console.error("Failed to fetch items:", error);
      setPending(false);
    }
  };

  const handleDeactivate = async (id: number) => {
    try {
      await deactivateItem(id);
      loadItems();
    } catch (error) {
      console.error("Failed to deactivate item:", error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4 mt-2">
        <h1 className="text-3xl font-semibold">Items</h1>
        <Link
          to="create"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Create Item
        </Link>
      </div>
      <div className="bg-white dark:bg-[#202435] shadow-lg p-10 rounded-sm">
        {pending ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <DataTable columns={columns} data={items} />
        )}
      </div>
    </div>
  );
};

export default ItemsPage;
