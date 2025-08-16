import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Posts from "../components/Posts";
import NewPostIcon from "../assets/svg/newpost-icon";
import Card from "../shared/Components/FormElements/Card";
import { ProfileContext } from "../shared/hooks/ProfileContext";

const Profile = () => {
  const navigate = useNavigate();
  const { profile } = useContext(ProfileContext);

  if (!profile) return null;

  const handleClick = () => {
    navigate("/profile/NewPost");
  };

  return (
    <div className="bg-[#1A1A1A] font-times min-h-screen">
      <div className="flex justify-between">
        <img
          className="w-44 h-44 rounded-full object-cover mt-10 ml-36"
          src={profile.avatar || "/default-profile.png"}
          alt="profile pic"
        />

        <div className="mr-64 mt-10 text-[#9A9A9A]">
          <h2 className="text-3xl mb-3 font-bold">{profile.username}</h2>
          <p className="text-xl mb-3">
            Name: {profile.firstName} {profile.lastName}
          </p>
          <p className="text-xl mb-3">
            Bio: {profile.bio || "No bio available"}
          </p>
        </div>
      </div>

      <div>
        <div className="flex justify-center">
          <h1 className="text-3xl font-bold ml-24 mb-10">
            <Card className="bg-white">POSTS</Card>
          </h1>

          <button onClick={handleClick}>
            <NewPostIcon className="ml-60 mb-10" />
          </button>

          <button
            onClick={() => navigate("/profile/edit")}
            className="bg-[#333333] text-white px-4 py-2 ml-60 mb-10 mt-4 rounded hover:bg-[#444]"
          >
            Edit Profile
          </button>
        </div>

        <Posts />
      </div>
    </div>
  );
};

export default Profile;
