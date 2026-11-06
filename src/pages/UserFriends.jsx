import React from "react";
import Card from "../shared/Components/FormElements/Card";
import FriendsList from "../components/FriendsList";

const UserFriends = (props) => {
  return (
    <div className="w-full rounded-xl bg-[#282828]">
      <div className="text-lg text-white font-avenir p-5">
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
