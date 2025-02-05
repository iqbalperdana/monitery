import React from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "../services/authService";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut();
    navigate("/login"); // Redirect to sign-in page after signing out
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-100">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Dashboard
        </h2>
        <p className="text-center text-gray-600">Welcome to your dashboard!</p>
        <button
          onClick={handleSignOut}
          className="w-full mt-6 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
