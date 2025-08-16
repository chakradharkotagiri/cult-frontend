import React, { useEffect, useState, useContext } from "react";
import PostList from "./PostList";
import Spinner from "../shared/Components/FormElements/Spinner"
import { ProfileContext } from "../shared/hooks/ProfileContext";

const Posts = () => {
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ loading state
  const { profile } = useContext(ProfileContext);

  useEffect(() => {
    const fetchUserPosts = async () => {
      if (!profile?.username) {
        console.log("No profile username yet");
        return;
      }
  
      try {
        const res = await fetch(`http://localhost:5002/api/posts/username/${profile.username}`);
        const data = await res.json();
  
        if (res.ok) {
          console.log("Fetched posts:", data.posts);
          if(data.posts == 0) console.log("NO posts to show ");
          setUserPosts(data.posts);
        } else {
          console.error(data.error);
        }
      } catch (err) {
        console.error("Error fetching posts:", err);
      }finally {
        setLoading(false); // ✅ Always stop loading spinner after fetch attempt
      }
    };
  
    fetchUserPosts();
  }, [profile]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner />
      </div>
    );
  }
  
  

  return <PostList posts={userPosts} />;
};

export default Posts;
