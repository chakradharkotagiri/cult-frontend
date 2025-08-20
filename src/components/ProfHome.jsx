import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ProfileContext } from "../shared/hooks/ProfileContext";
import PropTypes from 'prop-types';
import ProfileBackIcon from "../assets/svg/profileback-icon";

const ProfHome = ({className}) => {
  const navigate = useNavigate();
  const { profile } = useContext(ProfileContext);
  console.log("Profile context value:", profile);

  const user = profile;

  const toProfile = () => {
    navigate("/profile");
  };

  if (!user) return null;

  return (
    <div className={` bg-[#1A1A1A] text-white  rounded-lg lg:w-[500px] shadow-lg ${className || ''}`}>      <ProfileBackIcon />
      <img
        src={user.avatar || "/default-profile.png"}
        className="w-40 h-40 border-[10px] border-[#1A1A1A] object-contain rounded-lg -translate-y-96 translate-x-[170px] z-10 relative bg-[#1A1A1A] p-1"
        alt="Profile"
      />

      <div className="bg-[#282828] h-96 w-[400px] rounded-3xl overflow-hidden z-0 translate-x-12 -translate-y-[450px]">
        <div className="flex">
          <div className="ml-12 mt-3">{user.followers}</div>
          <div className="ml-60 mt-3">{user.following}</div>
        </div>
        <div className="flex">
          <div className="text-gray-500 pl-8">Followers</div>
          <div className="text-gray-500 ml-[200px]">Following</div>
        </div>
        <div className="text-center pt-14 text-2xl">
          {user.firstName} {user.lastName}
        </div>
        <div className="text-center pt-3 text-[#939393] font-light">
          @{user.username}
        </div>
        <div className="pt-5 text-center">{user.bio || "No bio yet"}</div>
        <div className="flex justify-center pt-8">
          <button
            onClick={toProfile}
            className="w-[246px] h-[42px] text-sm rounded-2xl bg-gradient-to-b from-[#282828] to-[#4e4d4d]"
          >
            My Profile
          </button>
        </div>
      </div>
    </div>
  );
};
ProfHome.propTypes = {
  className: PropTypes.string,
};

export default ProfHome;
