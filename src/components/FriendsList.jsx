import React from "react";
import UserFriends from "../pages/UserFriends";
import Card from "../shared/Components/FormElements/Card";

const FriendsList = (props) => {
  
  return (
    <div className="font-avenir  text-black md:w-[105%]  2xl:w-[100%] ">
      <Card className="my-6  text-black bg-[#1A1A1A]  bg-opacity-70 h-28 p-4 shadow-lg rounded-xl mx-5  ">
        <div className="w-full ">
          <div className="flex "> 
            <img className="w-12 h-12  mx-2  mb-3 object-cover rounded-2xl" src={props.image} />
            <div className=" text-white mt-1 text-lg h-6 font-semibold">{props.userName}</div>
          </div>
          <div className="mt-1 w-full">


            <div className="flex w-full font-avenir  items-center ">
              <div className="bg-[#1A1A1A] h-5 w-full px-4 p-1 flex items-center justify-between  rounded-lg">
              <button className="text-white text-sm ml-8 font-medium " >Remove</button>
              <button className="bg-[#FFFD02]  h-4 text-black font-medium  z-10 px-4 rounded-lg shadow-md transition text-xs duration-300">
                Add friend
              </button>
              </div>
              
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default FriendsList;
