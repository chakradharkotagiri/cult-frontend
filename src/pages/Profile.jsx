import React from "react";
import { useState } from "react";
import Posts from "../components/Posts";
import newPostIcon from "../assets/icons8-new-post-48.png"
import { NewPost } from "./NewPost";
import { useNavigate } from "react-router-dom";
import Card from "../shared/Components/FormElements/Card";

const Profile = (props) => {
  const navigate = useNavigate();
  const handleClick = () =>{
    navigate("/profile/NewPost")
  }

  const dummyUser = {
    id: "1",
    key: "1",
    userName: "johnny@123",
    Name: "John Dee",
    image:
      "https://i.pinimg.com/736x/f1/4e/d4/f14ed4d65b035cb0cdc23b010c4ebbb2.jpg",
    bio: "Passionate about web development and open-source.",
  };
  const dummyUser2 = {
    id: "2",
    key: "2",
    userName: "Lewisdon",
    Name: "Lewis Reddy",
    image:
      "https://i.pinimg.com/736x/cf/16/0f/cf160f1c90c44b562b63af35bfef62e1.jpg",
    bio: "Indian kid setted in the US",
  };

  const [userData, setUserData] = useState(dummyUser);

  return (
    <div className="bg-[#1A1A1A] font-times">
     
      <div className="flex justify-between">
        <img
          className="w-44 h-44 rounded-full object-cover mt-10 ml-36"
          src={userData.image}
          alt="profile pic"
        />

        {/*userDetails*/}
        <div className="mr-64 mt-10 font-barriecito text-[#9A9A9A] ">
          <h2 className="text-3xl mb-3 font-bold">{userData.userName}</h2>
          <p className="text-xl  mb-3">Name: {userData.Name}</p>
          <p className="text-xl mb-3">
            Bio: {userData.bio || "No bio available"}
          </p>
        </div>
      </div>
      {/*userPosts*/}
      <div className="">
      <div className="flex justify-center" >
        <h1 className="text-3xl font-bold mt- ml-24  mb-10">
          <Card className="bg-white">
          POSTS
          </Card>
        </h1>
        
        <button onClick={handleClick}>
          <img  className="ml-64 mb-14" src={newPostIcon}/>
          </button>

       </div>
        <Posts />
      </div>
    </div>
  );
};

export default Profile;
