import React, { useState, useEffect, useContext } from "react";
import Card from "../shared/Components/FormElements/Card";
import { ProfileContext } from "../shared/hooks/ProfileContext";
import { FaHeart } from "react-icons/fa"; // for like icon

const PostItem = ({ id, image, caption }) => {
  const { profile } = useContext(ProfileContext);
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const res = await fetch(`http://localhost:5002/api/posts/${id}`);
        const data = await res.json();
        const post = data.post;
    
        setLikes(post.likes.length);
        setLiked(post.likes.includes(profile.id));
      } catch (err) {
        console.error("Failed to fetch likes", err);
      }
    };
    

    fetchLikes();
  }, [id, profile.id]);

  const handleLike = async () => {
    try {
      const res = await fetch(`http://localhost:5002/api/posts/like/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await res.json();
      setLikes(data.likes);
      setLiked(data.liked);
    } catch (err) {
      console.error("Like failed", err);
    }
  };

  return (
    <li>
      <Card className="bg-[#212121]">
        <img
          className="w-96 h-[500px]"
          src={image}
          alt="Post"
          onClick={() => {
            const img = document.createElement("img");
            img.src = image;
            img.style = "position:fixed;top:0;left:0;width:100vw;height:100vh;object-fit:contain;background:rgba(0,0,0,0.8);z-index:9999;cursor:pointer";
            img.onclick = () => document.body.removeChild(img);
            document.body.appendChild(img);
          }}
        />
        <div className="text-white mt-2">Caption: {caption}</div>
        <div className="flex items-center gap-2 mt-2 text-white cursor-pointer" onClick={handleLike}>
          <FaHeart color={liked ? "red" : "white"} /> {likes}
        </div>
      </Card>
    </li>
  );
};

export default PostItem;
