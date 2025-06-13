import React from "react";
import PropTypes from "prop-types";

import ProfileIcon from "../assets/svg/profile-icon";
import ProfileBackIcon from "../assets/svg/profileback-icon";

const ProfHome = ({ profileData }) => {
  return (
    <div className="mr-10  bg-[#1A1A1A] text-white p-4 rounded-lg lg:w-[500px] shadow-lg`">

      <ProfileBackIcon className=" " />
      <img
        src={profileData.profileImage}
        className="w-40 h-40  border-[10px] border-[#1A1A1A] rounded-lg  -translate-y-96 translate-x-[170px] z-10 relative"
      />

      <div className="bg-[#282828] h-96 w-[400px] rounded-3xl overflow-y-hidden overflow-hidden z-0 translate-x-12 -translate-y-[450px]">
        <div className="flex">
          <div className="ml-12 mt-3"> {profileData.Followers} </div>
          <div className="ml-60 mt-3"> {profileData.Following} </div>
        </div>
        <div className="flex">
        <div className="text-gray-500 pl-8"> Followers</div>
        <div className="text-gray-500 ml-[200px]  "> Following</div>
        </div>
        <div className="text-center pt-14 text-2xl"> {profileData.name} </div>
        <div className="text-center pt-3 text-[#939393] font-light">
          {" "}
          @{profileData.userName}{" "}
        </div>
        <div className="pt-5 text-center"> {profileData.bio} </div>
        <div className="flex justify-center pt-8 ">
          <button className="w-[246px] h-[42px] text-sm rounded-2xl bg-gradient-to-b from-[#282828] to-[#4e4d4d]">
            My Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfHome;
