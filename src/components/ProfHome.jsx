import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ProfileContext } from "../shared/hooks/ProfileContext";
import PropTypes from "prop-types";
import ProfileBackIcon from "../assets/svg/profileback-icon";
import { DEFAULT_AVATAR } from "../config";

const ProfHome = ({ className }) => {
  const navigate = useNavigate();
  const { profile } = useContext(ProfileContext);

  const user = profile;

  const toProfile = () => {
    navigate("/profile");
  };

  if (!user) return null;

  return (
    <div className={`w-full text-white font-Inter ${className || ""}`}>
      <ProfileBackIcon className="-mt-[5.3%] block h-auto w-full" />

      <div className="relative -mt-[52%] rounded-xl bg-[#282828] px-5 pb-6">
        <div className="grid grid-cols-[1fr_auto_1fr] items-start gap-2">
          <div className="pt-3 text-center">
            <div>{user.followers ?? 0}</div>
            <div className="text-sm text-gray-500">Followers</div>
          </div>
          <img
            src={user.avatar || DEFAULT_AVATAR}
            className="-mt-16 h-32 w-32 rounded-lg border-[10px] border-[#1A1A1A] bg-[#1A1A1A] object-cover"
            alt="Profile"
          />
          <div className="pt-3 text-center">
            <div>{user.following ?? 0}</div>
            <div className="text-sm text-gray-500">Following</div>
          </div>
        </div>

        <div className="pt-5 text-center text-xl font-semibold">
          {user.firstName} {user.lastName}
        </div>
        <div className="pt-2 text-center font-light text-[#626161]">
          @{user.username}
        </div>
        <div className="pt-4 text-center">{user.bio || "No bio yet"}</div>
        <button
          onClick={toProfile}
          className="mt-5 h-[42px] w-full rounded-2xl bg-gradient-to-b from-[#282828] to-[#4e4d4d] text-sm"
        >
          My Profile
        </button>
      </div>
    </div>
  );
};
ProfHome.propTypes = {
  className: PropTypes.string,
};

export default ProfHome;
