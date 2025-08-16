import React from "react";
import { useNavigate } from "react-router-dom";
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
  { label: "Logout", icon: LogoutIcon },
];

const SettingsPanel = ({ selected }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");

    navigate("/login");
  };
  let content;

  switch (selected) {
    case "Account":
      content = (
        <div>
          <div className="flex h-[100px] rounded-lg bg-[#212121] items-center ">
                <div className=" pl-16 ">
                    <ProfileIcon />{" "}
                </div>
                <div className="pl-10  text-3xl"> Account </div>
          </div>

          <button className="w-full p-8 text-2xl text-left hover:bg-gray-700">
                Edit Profile Information
                <div className="text-sm pt-7">
                     Change your name, profile picture, or bio.
                </div>
          </button>
         <div className="p-2 pt-0 pl-9 text-2xl">
                ________________________________________________________________
          </div>
          <button className="w-full p-8 text-2xl text-left hover:bg-gray-700">
            Email Address
            <div className="text-sm pt-7">
                Update your registered email
            </div>
          </button>
          
          <div className="p-2 pt-0 pl-9 text-2xl">
            ________________________________________________________________
          </div>
          <button className=" w-full p-8 text-2xl text-left hover:bg-gray-700">
            Phone Number
            <div className="text-sm pt-7">
                Add or modify your contact number
            </div>
          </button>
          
          <div className="p-2 pt-0 pl-9 text-2xl">
            ________________________________________________________________
          </div>
          <button className="w-full p-8 text-2xl text-left hover:bg-gray-700">
            UserName Settings
            <div className="text-sm pt-7">
              Change your display or login username
            </div>
          </button>
          
          <div className="p-2 pt-0 pl-9 text-2xl">
            ________________________________________________________________
          </div>
        </div>
      );
      break;
    case "Change Password":
      content = (
        <div>
          <div className="flex h-[100px] rounded-lg bg-[#212121] items-center ">
            <div className=" pl-16 ">
              <KeyIcon />{" "}
            </div>
            <div className="pl-10  text-3xl"> Change Password </div>
          </div>
          <button className="w-full p-8 text-2xl text-left hover:bg-gray-700">
            Change Current Password
            <div className="text-sm pt-7">
              Update your current password to keep your account secure. Make
              sure to choose a strong and memorable password.
            </div>
          </button>
          <div className="p-2 pl-9 text-2xl">
            ________________________________________________________________
          </div>
        </div>
      );
      break;
    case "Privacy and Security":
      content = (
        <div>
          {" "}
          <div className="flex h-[100px] rounded-lg bg-[#212121] items-center ">
                <div className=" pl-16 ">
                    <ShieldIcon />{" "}
                </div>
                <div className="pl-10  text-3xl"> Privacy and Security </div>
          </div>
          <button className="w-full p-8 text-2xl text-left hover:bg-gray-700">
          Login Activity
          <div  className="text-sm pt-7">
            View recent login history and locations.
          </div>
          </button>
          <div className="p-2 pl-9 text-2xl">
            ________________________________________________________________
          </div>
          <button className="w-full p-8 text-2xl text-left hover:bg-gray-700">
          Two-Factor Authentication(2FA)
          <div  className="text-sm pt-7">
            Enable/Disable extra login security.
          </div>
          </button>
          <div className="p-2 pl-9 text-2xl">
            ________________________________________________________________
          </div>
        </div>
      );
      break;
    case "Others":
      content = (
        <div>
          {" "}
          <div className="flex h-[100px] rounded-lg bg-[#212121] items-center ">
            <div className=" pl-16 ">
              <WrenchIcon />{" "}
            </div>
            <div className="pl-10  text-3xl"> Others</div>
          </div>
          <button className="w-full p-8 text-2xl text-left hover:bg-gray-700">
          Language Preferences
          <div  className="text-sm pt-7">
            Select preferred language
          </div>
          </button>
          <div className="p-2 pl-9 text-2xl">
            ________________________________________________________________
          </div>
          <button className="w-full p-8 text-2xl text-left hover:bg-gray-700">
            Beta Features
          <div  className="text-sm pt-7">
            Opt-in for experimental features (if any)
          </div>
          </button>
          <div className="p-2 pl-9 text-2xl">
            ________________________________________________________________
          </div>
        </div>
      );
      break;
    case "Logout":
      content = (
        <div className=" top-4 right-4">
          {" "}
          <div className="flex h-[100px] rounded-lg bg-[#212121] items-center ">
            <div className=" pl-16 ">
              <LogoutIcon />{" "}
            </div>
            <div className="pl-10  text-3xl"> Logout</div>
          </div>
          <button
            onClick={handleLogout}
            className="px-6 py-2 m-10 bg-red-600 hover:bg-red-700 rounded-lg text-white font-semibold"
          >
            Logout
          </button>
        </div>
      );
      break;
    default:
      content = <div>Choose a setting from the left menu</div>;
  }

  return (
    <div className="bg-[#1C1C1C] h-[700px] w-[900px] mt-16 rounded-lg ml-16 overflow-hidden">
    <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-[#1C1C1C]">
  {content}
</div>

  </div>
  );
};

export default SettingsPanel;
