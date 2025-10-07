import React, { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { API_URL } from "../config";

const StoryBar = () => {
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    const otherUsers = async () => {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/api/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        setAllUsers(data);
      } else {
        toast.error(`Failed to fetch users. Status: ${res.status}`, {
          theme: "dark",
          position: "bottom-right",
          autoClose: 3000,
        });
      }
    };

    otherUsers();
  }, []);
  return (
    <div className="flex overflow-x-auto scrollbar-hide gap-9 w-[80%] mx-auto p-4">
    {allUsers.map((user) => (
      <div
        key={user.id}
        className="flex-shrink-0 w-16 h-16 rounded-lg border-2 border-yellow-400 p-1"
      >
        <img
          src={user.avatar}
          alt={user.username || "user"}
          className="w-full h-full rounded-lg object-cover"
        />
      </div
    ))}
  </div>
  
  );
  
};

export default StoryBar;
