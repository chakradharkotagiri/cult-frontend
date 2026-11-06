import React, { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { API_URL } from "../config";

const SKELETON_STORY_COUNT = 6;

const StoryBar = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const otherUsers = async () => {
      const token = localStorage.getItem("token");
      try {
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
      } catch (err) {
        console.error("Failed to fetch users", err);
      } finally {
        setIsLoading(false);
      }
    };

    otherUsers();
  }, []);
  return (
    <div className="flex overflow-x-auto scrollbar-hide gap-4 w-full py-4">
    {isLoading &&
      Array.from({ length: SKELETON_STORY_COUNT }, (_, index) => (
        <div key={index} className="skeleton flex-shrink-0 w-16 h-16 rounded-lg" />
      ))}
    {allUsers.map((user) => (
      <div
        key={user._id}
        className="flex-shrink-0 w-16 h-16 rounded-lg border-2 border-yellow-400 p-1"
      >
        <img
          src={user.avatar}
          alt={user.username || "user"}
          className="w-full h-full rounded-lg object-cover"
        />
      </div>
    ))}
  </div>
  
  );
  
};

export default StoryBar;
