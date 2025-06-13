import React from "react";
import Card from "../shared/Components/FormElements/Card";
import FriendsList from "../components/FriendsList";

const UserFriends = (props) => {

  return (
    <div className=" bg-[#282828] h-max  justify-around w-[400px] rounded-3xl  m-4 ">
      <div className="text-4xl text-white font-times justify-around p-5">
        Add New
        <ul className=" ">
          {props.suggested.map((friend) => (
            <FriendsList
            id={friend.id}
            key={friend.key}
            userName={friend.userName}
            Name={friend.Name}
            image={friend.image}

            />
          ))}
        </ul>
      </div>
          <div className="text-4xl text-white font-times justify-around p-5">Recent Activity</div>
    </div>
  );
};

export default UserFriends;
