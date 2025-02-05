import React, { useEffect, useState } from "react";
import { fetchProfileData } from "../services/profileService";

const ProfilePage: React.FC = () => {
  const [data, setData] = useState<string>("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetchProfileData();
        setData(response.data);
      } catch (error) {
        console.error("Failed to fetch profile data:", error);
      }
    };

    loadData();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <p>{data}</p>
    </div>
  );
};

export default ProfilePage;
