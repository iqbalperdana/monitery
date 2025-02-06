import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Item,
  fetchItemsData,
  deactivateItem,
} from "../../services/itemsService";
import { formatNumberToCurrencyString } from "../../utils/stringUtil";

const ItemsPage: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      const data = await fetchItemsData();
      setItems(data);
    } catch (error) {
      console.error("Failed to fetch items:", error);
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
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Items</h1>
        <Link
          to="create"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Create Item
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="border p-4 rounded flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold">{item.name}</h3>
              <p>Price: {formatNumberToCurrencyString(item.price)}</p>
              <p>Status: {item.is_active ? "Active" : "Inactive"}</p>
            </div>
            {item.is_active && (
              <button
                onClick={() => handleDeactivate(item.id)}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Deactivate
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemsPage;
