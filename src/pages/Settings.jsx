import React from "react";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear login flag from localStorage
    localStorage.removeItem("isLoggedIn");
    
    // Navigate back to login page
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-[#1A1A1A] text-white">
      <div className="bg-[#2B2B2B] p-8 rounded-xl shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-6">Settings</h2>
        
        {/* Other settings options can go here */}

        <button
          onClick={handleLogout}
          className="mt-4 px-6 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white font-semibold"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Settings;
