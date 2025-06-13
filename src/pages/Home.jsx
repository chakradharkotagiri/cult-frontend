import React, { useContext, useState } from "react";
import Posts from "../components/Posts";
import PostList from "../components/PostList";
import { PostsContext, PostsProvider } from "../shared/hooks/PostsContext";
import  {ProfileContext}  from "../shared/hooks/ProfileContext";
import HomeList from "../components/HomeList";
import Users from "./Users";

import ProfHome from "../components/ProfHome";

const Home = () => {
  const { userPosts } = useContext(PostsContext);
  const {profile} = useContext(ProfileContext);

  const [userId, setUserId] = useState(1);

  return (
    <div className="min-h-screen flex justify-normal bg-[#1A1A1A] ">
      <div className="hidden md:w-[25%] md:block ">
        <ProfHome profileData={profile[0]}/>
      </div>
      <HomeList posts={userPosts} className='' />
      <div className="">
      <Users className=" rounded-xl" />
      </div>
      
    </div>
  );
};

export default Home;
