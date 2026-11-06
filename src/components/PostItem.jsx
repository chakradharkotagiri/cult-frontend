import React, { useState, useEffect, useContext } from "react";
import Card from "../shared/Components/FormElements/Card";
import { ProfileContext } from "../shared/hooks/ProfileContext";
import { FaHeart } from "react-icons/fa"; // for like icon
import {API_URL} from "../config"
import ImageLightbox from "./ImageLightbox";
const PostItem = ({ id, image, caption }) => {
  const { profile } = useContext(ProfileContext);
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const res = await fetch(`${API_URL}/api/posts/${id}`);
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
      const res = await fetch(`${API_URL}/api/posts/like/${id}`, {
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
          onClick={() => setIsViewerOpen(true)}
        />
        <div className="text-white mt-2">Caption: {caption}</div>
        <div className="flex items-center gap-2 mt-2 text-white cursor-pointer" onClick={handleLike}>
          <FaHeart color={liked ? "red" : "white"} /> {likes}
        </div>
      </Card>
      {isViewerOpen && (
        <ImageLightbox
          src={image}
          alt={caption || "Post"}
          onClose={() => setIsViewerOpen(false)}
        />
      )}
    </li>
  );
};

export default PostItem;
