import React from "react";
import { useState } from "react";
import ProfileIcon from "../assets/svg/profile-icon";
import KeyIcon from "../assets/svg/key-icon";
import ShieldIcon from "../assets/svg/shield-icon";
import WrenchIcon from "../assets/svg/wrench-icon";
import LogoutIcon from "../assets/svg/logout-icon";


const options = [
    { label: "Account", icon: ProfileIcon },
    { label: "Change Password", icon: KeyIcon },
    { label: "Privacy and Security", icon: ShieldIcon },
    { label: "Others", icon: WrenchIcon },
    { label: "Logout", icon: LogoutIcon }
  ];

const Sidebar = ({ setSection, selected, className, ...props }) => {


  return (
    <div
      className={`bg-[#212121] h-[700px] w-[400px] mt-16 rounded-lg ml-16 ${className}`}
      {...props}
    >
      {options.map((opt) => (
        <div
          key={opt.label}
          onClick={() => setSection(opt.label)}
          className={`flex items-center cursor-pointer px-4 mb-8 rounded-lg py-6 font-semibold hover:bg-gray-700 ${
            selected === opt.label ? "bg-yellow-400 text-black font-bold" : ""
          }`}
        >
          <opt.icon className="mr-4 ml-12" />
          <span>{opt.label}</span>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
