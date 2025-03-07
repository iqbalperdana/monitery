import React, { useEffect, useState } from "react";
import { fetchDashboardData } from "../services/dashboardService";

const DashboardPage: React.FC = () => {
  const [data, setData] = useState<string>("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetchDashboardData();
        setData(response.data);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      }
    };

    loadData();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p>{data}</p>
    </div>
  );
};

export default DashboardPage;
