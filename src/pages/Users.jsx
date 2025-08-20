import React, { useEffect, useState } from "react";
import UserFriends from "./UserFriends";
import FriendsList from "../components/FriendsList";
import { API_URL } from "../config";

const Users = ({ className, ...rest }) => {
  const [allUsers, setAllUsers] = useState([]);



  useEffect(() => {
    const otherUsers = async () => {
      const token = localStorage.getItem("token");

      const res = await fetch(`${API_URL}/api/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok){
        const data = await res.json();
        setAllUsers(data);
      }else {
        console.error('Failed to fetch users', res.status);
      }
    
    };

    otherUsers();
  }, []);

  return (
    <div className={`p-4 ${className}`} {...rest}>
      <UserFriends className="" suggested={allUsers} />
    </div>
  );
};

export default Users;
