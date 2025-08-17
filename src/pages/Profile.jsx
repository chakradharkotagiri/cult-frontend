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
    <div className="bg-[#1A1A1A] text-center font-times min-h-screen">
      <div className="flex justify-between">
        <img
          className="w-44 h-44 rounded-full object-cover mt-10 ml-36"
          src={profile.avatar || "/default-profile.png"}
          alt="profile pic"
        />

        <div className="mr-64 mt-10 text-[#9A9A9A]">
          <h2 className="text-3xl mb-3 font-bold">{profile.username}</h2>
          <p className="text-xl justify-center mb-3">
            {profile.firstName} {profile.lastName}
          </p>
          <p className="text-xl mb-3">{profile.bio || "No bio available"}</p>
        </div>
      </div>

      <div>
        <div className="flex flex-col items-center ">
          <h1 className="text-xl  font-bold ">
            <Card className="bg-[#282828] rounded mb-10  text-white">POSTS</Card>
          </h1>
          <div className="flex justify-center gap-48">
            <button onClick={handleClick}>
              <NewPostIcon className=" mb-10 hover:bg-[#444]" />
            </button>

            <button
              onClick={() => navigate("/profile/edit")}
              className="bg-[#333333] text-white px-4 py-2  mb-10 mt-4 rounded hover:bg-[#444]"
            >
              Edit Profile
            </button>
          </div>
        </div>

        <Posts />
      </div>
    </div>
  );
};

export default Profile;
