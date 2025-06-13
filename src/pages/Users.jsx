import React, { useEffect, useState } from "react";
import UserFriends from "./UserFriends";
import FriendsList from "../components/FriendsList";


const Users = ({className,...rest}) => {


  const dummyUsers = [{
    id: "2",
    key: "2",
    userName: "Lewisdon",
    Name: "Lewis Reddy",
    image:
      "https://i.pinimg.com/736x/cf/16/0f/cf160f1c90c44b562b63af35bfef62e1.jpg",
    bio: "Indian kid setted in the US",
  },{
    id: "1",
    key: "1",
    userName: "Johnny",
    Name: "John Dee",
    image:
      "https://i.pinimg.com/736x/f1/4e/d4/f14ed4d65b035cb0cdc23b010c4ebbb2.jpg",
    bio: "Passionate about web development and open-source.",
  }];


  

  return (
<div className={`${className}`}{...rest }>
  <UserFriends className="  " suggested={dummyUsers}/>
</div>
  );
};

export default Users;
