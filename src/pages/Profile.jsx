import React, { useContext } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Posts from "../components/Posts";
import NewPostIcon from "../assets/svg/newpost-icon";
import Card from "../shared/Components/FormElements/Card";
import Spinner from "../shared/Components/FormElements/Spinner";
import { ProfileContext } from "../shared/hooks/ProfileContext";
import { useGetUserByIdQuery } from "../services/api";
import { DEFAULT_AVATAR } from "../config";

const Profile = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const { profile } = useContext(ProfileContext);

  const ownId = profile?.id || profile?._id;
  const isOwnProfile = !userId || userId === ownId;

  // currentData, unlike data, never shows the previous user during a switch.
  const { currentData: otherUser, isError } = useGetUserByIdQuery(userId, {
    skip: isOwnProfile,
  });

  if (!profile) return null;
  if (userId && userId === ownId) return <Navigate to="/profile" replace />;

  const user = isOwnProfile ? profile : otherUser;

  if (isError) {
    return (
      <div className="bg-[#1A1A1A] text-center text-[#9A9A9A] font-times min-h-screen pt-24">
        <h2 className="text-2xl font-bold">This profile isn&apos;t available</h2>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="bg-[#1A1A1A] flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  const handleClick = () => {
    navigate("/profile/NewPost");
  };

  return (
    <div className="bg-[#1A1A1A] text-center font-times min-h-screen">
      <div className="flex justify-between">
        <img
          className="w-44 h-44 rounded-full object-cover mt-10 ml-36"
          src={user.avatar || DEFAULT_AVATAR}
          alt="profile pic"
        />

        <div className="mr-64 mt-10 text-[#9A9A9A]">
          <h2 className="text-3xl mb-3 font-bold">{user.username}</h2>
          <p className="text-xl justify-center mb-3">
            {user.firstName} {user.lastName}
          </p>
          <p className="text-xl mb-3">{user.bio || "No bio available"}</p>
        </div>
      </div>

      <div>
        <div className="flex flex-col items-center ">
          <h1 className="text-xl  font-bold ">
            <Card className="bg-[#282828] rounded mb-10  text-white">POSTS</Card>
          </h1>
          {isOwnProfile && (
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
          )}
        </div>

        <Posts userId={isOwnProfile ? ownId : userId} />
      </div>
    </div>
  );
};

export default Profile;
