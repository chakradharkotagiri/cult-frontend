import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ProfileContext } from "../shared/hooks/ProfileContext";
import PropTypes from "prop-types";
import ProfileBackIcon from "../assets/svg/profileback-icon";

const ProfHome = ({ className }) => {
  const navigate = useNavigate();
  const { profile } = useContext(ProfileContext);

  const user = profile;

  const toProfile = () => {
    navigate("/profile");
  };

  if (!user) return null;

  return (
    <div
      className={` bg-[#1A1A1A] text-white font-avenir  rounded-lg md:w-[425px] 2xl:w-[500px]  shadow-lg ${
        className || ""
      }`}
    >
      <div className="">
        <ProfileBackIcon className="w-full h-full block" />
      </div>
      <div className="">
        <img
          src={user.avatar || "/default-profile.png"}
          className="w-40 h-40 border-[10px] border-[#1A1A1A] object-contain rounded-lg  -translate-y-[200%] translate-x-[82%] 2xl:translate-x-[100%] z-10 relative bg-[#1A1A1A] p-1"
          alt="Profile"
        />
        {/* user Info box  */}
        <div className="bg-[#282828] ml-5 h-80 w-[90%]  rounded-xl overflow-hidden z-0  -translate-y-[125%]">
          <div className="flex">
            <div className="ml-12 mt-3">{user.followers}</div>
            <div className="md:ml-64 2xl:ml-[73%] mt-3">0</div>
          </div>
          <div className="flex">
            <div className="text-gray-500 pl-5">Followers</div>
            <div className="text-gray-500 md:ml-[50%] 2xl:ml-[60%]">Following</div>
          </div>
          <div className="text-center pt-8 font-semibold text-xl">
            {user.firstName} {user.lastName}
          </div>
          <div className="text-center pt-3 text-[#626161] font-light">
            @{user.username}
          </div>
          <div className="pt-5 text-center">{user.bio || "No bio yet"}</div>
          <div className="flex justify-center pt-4">
            <button
              onClick={toProfile}
              className="w-[246px] h-[42px] text-sm rounded-2xl bg-gradient-to-b from-[#282828] to-[#4e4d4d]"
            >
              My Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
ProfHome.propTypes = {
  className: PropTypes.string,
};

export default ProfHome;
