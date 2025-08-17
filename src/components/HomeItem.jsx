import React from "react";
import Card from "../shared/Components/FormElements/Card";
import { Link } from "react-router-dom";
import LikeIcon from "../assets/svg/like-icon";
import CommentIcon from "../assets/svg/comment-icon";
import ShareIcon from "../assets/svg/share-icon"
import { useState, useEffect, useContext } from "react";
import { ProfileContext } from "../shared/hooks/ProfileContext";
import {API_URL} from "../config"
const HomeItem = (props) => {
  const [isLiked, setIsLiked] = useState(props.isLiked || false);
  const [likeCount, setLikeCount] = useState(props.likeCount || 0);

  const { profile } = useContext(ProfileContext);
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [isCommented, setIsCommented] = useState(props.isCommented || false);
  const [commentCount, setCommentCount] = useState(props.commentCount || 1);

  const [shareCount, setShareCount] = useState(props.commentCount || 0);

  const handleClick = () => {
    const img = document.createElement("img");
    img.src = props.image;
    img.style.position = "fixed";
    img.style.top = "0";
    img.style.left = "0";
    img.style.width = "100vw";
    img.style.height = "100vh";
    img.style.objectFit = "contain";
    img.style.background = "rgba(0,0,0,0.8)";
    img.style.zIndex = "9999";
    img.style.cursor = "pointer";

    // Close fullscreen when clicked
    img.onclick = () => document.body.removeChild(img);

    document.body.appendChild(img);
  };
  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const res = await fetch(`${API_URL}/api/posts/${props.id}`);
        const data = await res.json();
        const post = data.post;
  
        setLikes(post.likes.length);
        setLiked(post.likes.includes(profile.id));
      } catch (err) {
        console.error("Failed to fetch likes", err);
      }
    };
  
    fetchLikes();
  }, [props.id, profile.id]);
  
  const handleLike = async (e) => {
    e.preventDefault(); // prevent navigation from Link
    try {
      const res = await fetch(`${API_URL}/api/posts/like/${props.id}`, {
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
  const toggleLike = (e) => {
    e.preventDefault(); // Prevent Link navigation on icon click
    setIsLiked((prev) => !prev);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  return (
    <div className="flex justify-center   w-[575px] pl-10    p-5 m-10">
      <li className="w-full shadow-lg bg-[#282828]  rounded-3xl   text-white">
        <Card className="p-4 rounded-xl   overflow-hidden">
          <Link
            to={`/${props.id}/posts`}
            className="block pt-12 pb-24 px-10 hover:opacity-90"
          >
            <div className="flex">
              <img
                className="w-12 h-12 mx-5 rounded-full object-cover"
                src={props.profileImage}
                alt="Profile pic"
              />
              <div>
                <h2 className="text-sm font-bold mb-2">{props.userName}</h2>
                <p className="text-2xl text-gray-400">{props.name}</p>
              </div>
            </div>

            <div className="mt-5 mb-6 ml-8 text-left font-serif text-sm">
            {props.userName} : {props.caption}
            </div>
            <img
              className="w-[487px]  h-[302px] object-contain rounded-3x"
              src={props.image}
              onClick={handleClick}
              alt="Post"
            />
            <div className="flex">
            <div className="mt-4">
  <button onClick={handleLike}>
    <LikeIcon
      className={`w-6 h-6 mx-auto ${liked ? "text-red-500 fill-red-500" : "text-white fill-none"}`}
    />
  </button>
  <p className="text-sm mt-1 text-gray-300">{likes}</p>
</div>

              <div className="mt-4 ml-3">
                <button onClick={toggleLike}>
                  <CommentIcon
                    className={`w-6 h-6 mx-auto ${
                      isLiked
                        ? "text-red-500 fill-red-500"
                        : "text-white fill-none"
                    }`}
                  />
                </button>
                <p className="text-sm mt-1 text-gray-300">
                  {commentCount} 
                </p>
              </div>
              <div className="mt-4 ml-3">
                <button>
                  <ShareIcon/>
                </button>
                <p className="text-sm mt-1 text-gray-300">
                  {shareCount} 
                </p>
              </div>
            </div>
          </Link>
        </Card>
      </li>
    </div>
  );
};

export default HomeItem;
