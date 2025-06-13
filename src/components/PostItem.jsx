import React from "react";
import Card from "../shared/Components/FormElements/Card";
import { Link } from "react-router-dom";

const PostItem = (props) => {
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
  return (
    <div className="flex">
      
      <li className="">
        <Card className="bg-white">
          <Link to={`/${props.id}/posts`}>
            <img className="w-96 h-[500px]" src={props.image} onClick={handleClick} alt="Post Image" />
            <div className="">Caption:{props.caption}</div>
          </Link>
        </Card>
      </li>
    </div>
  );
};

export default PostItem;
