import React from "react";
import UserFriends from "../pages/UserFriends";
import Card from "../shared/Components/FormElements/Card";

const FriendsList = (props) => {
  
  return (
    <div className="font-avenir  text-black md:w-[105%]  2xl:w-[100%] ">
      <Card className="my-6  text-black bg-[#1E1E1E] h-28 p-4 shadow-lg rounded-xl mx-5  ">
        <div className=" ">
          <div className="flex "> {/* left part*/}
            <img className="w-14 h-14  mx-2 object-cover rounded-2xl" src={props.image} />
            <div className=" text-white mt-1 text-lg h-6 font-semibold">{props.userName}</div>
          </div>
          <div className="ml-24"> {/* right part*/}


            <div className="flex justify-end  ">
              <button className="bg-[#FFFD02]  h-5 text-black   px-4 rounded-lg shadow-md transition text-sm duration-300">
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
