import React from "react";
import UserFriends from "../pages/UserFriends";
import Card from "../shared/Components/FormElements/Card";

const FriendsList = (props) => {
  
  return (
    <div className="text-4xl text-black ">
      <Card className="my-6  text-black bg-[#1E1E1E] p-4 shadow-lg rounded-xl mx-5  ">
        <div className=" ">
          <div className="flex justify-around"> {/* left part*/}
            <img className="w-14 h-14 rounded-3xl" src={props.image} />
            <div className=" text-white text-2xl">{props.userName}</div>
          </div>
          <div className="ml-24"> {/* right part*/}


            <div className="flex justify-end align-baseline">
              <button className="bg-[#FFFD02] w-24 h-5 text-black   px-4 rounded-lg shadow-md transition text-sm duration-300">
                Add friend
              </button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default FriendsList;
