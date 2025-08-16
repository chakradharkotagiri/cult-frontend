import React, { useEffect, useState } from "react";
import HomeList from "../components/HomeList";
import Users from "./Users";
import ProfHome from "../components/ProfHome";
import { useContext } from "react";
import { ProfileContext } from "../shared/hooks/ProfileContext";
import axios from "axios";
import {API_URL} from "../config"

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
    <div className="min-h-screen flex justify-between bg-[#1A1A1A]">
      <div className="hidden md:w-[25%] md:block">
        <ProfHome profileData={profile} />
      </div>
      <HomeList posts={posts} />
      <div className="">
        <Users className="rounded-xl" />
      </div>
    </div>
  );
};

export default Home;
