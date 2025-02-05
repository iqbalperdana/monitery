import React, { useEffect, useState } from "react";
import { fetchItemsData } from "../services/itemsService";

const ItemsPage: React.FC = () => {
  const [data, setData] = useState<string>("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetchItemsData();
        setData(response.data);
      } catch (error) {
        console.error("Failed to fetch items data:", error);
      }
    };

    loadData();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Items</h1>
      <p>{data}</p>
    </div>
  );
};

export default ItemsPage;
