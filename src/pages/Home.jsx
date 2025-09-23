import React, { useEffect, useState } from "react";
import HomeList from "../components/HomeList";
import Users from "./Users";
import ProfHome from "../components/ProfHome";
import { useContext } from "react";
import { ProfileContext } from "../shared/hooks/ProfileContext";
import axios from "axios";
import { API_URL } from "../config";

const Home = () => {
  const { profile } = useContext(ProfileContext);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/posts`);
        setPosts(res.data.posts);
      } catch (err) {
        console.error("Failed to fetch posts:", err);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-[#1A1A1A] relative overflow-hidden">
      <div className="hidden md:block absolute  ml-0 left-0 top-0   h-full z-10">
        <ProfHome className="" profileData={profile} />
      </div>

      <div className="h-screen overflow-y-scroll relative scrollbar-hide mx-0 z-30 md:mx-[25%]">
        <HomeList className="" posts={posts} />
      </div>

      <div className="hidden md:block absolute right-0 top-0 mr-4 md:w-[27%] 2xl:w-1/4 h-full z-10">
        <Users className="" />
      </div>
    </div>
  );
};

export default Home;
