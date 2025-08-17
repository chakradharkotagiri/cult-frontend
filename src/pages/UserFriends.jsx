import React from "react";
import Card from "../shared/Components/FormElements/Card";
import FriendsList from "../components/FriendsList";

const UserFriends = (props) => {


  return (
    <div className=" bg-[#282828] h-max  justify-around w-[450px] rounded-3xl  m-4 ">
      <div className="text-2xl text-white font-times justify-around p-5">
        Add New
        <ul className=" ">
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
      {/* <div className="text-2xl text-white font-times justify-around p-5">Recent Activity</div> */}
    </div>
  );
};

export default UserFriends;
