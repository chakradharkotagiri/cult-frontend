import React from "react";
import Card from "../shared/Components/FormElements/Card";
import FriendsList from "../components/FriendsList";

const UserFriends = (props) => {
  return (
    <div className="bg-[#282828] h-max w-full max-w[400px]  justify-around rounded-3xl">
      <div className="text-2xl text-white font-times justify-around p-5">
        Add New
        <ul className="">
          {Array.isArray(props.suggested) &&
            props.suggested.map((friend) => (
              <FriendsList
                id={friend._id}
                key={friend._id}
                userName={friend.username}
                image={friend.avatar}
              />
            ))}
        </ul>
      </div>
    </div>
  );
};

export default UserFriends;
