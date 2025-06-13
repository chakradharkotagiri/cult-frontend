import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import HomeIcon from "../../../assets/svg/home-icon";
import SettingsIcon from "../../../assets/svg/settings-icon";
import ProfileIcon from "../../../assets/svg/profile-icon";

const Navlinks = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {

    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, [location]);

  const getNavLinkClass = (isActive) =>
    isActive ? "text-amber-400 underline" : "text-white hover:text-green-300";

  return (
    <div className="flex bg-[#1A1A1A] justify-center pt-8">
      <ul className="font-times flex text-2xl">
        {isLoggedIn && (
          <>
            <li className="mx-12 text-green-300 text-6xl">
              <NavLink to="/" className={({ isActive }) => getNavLinkClass(isActive)}>
                <HomeIcon />
              </NavLink>
            </li>
            <li className="mx-12">
              <NavLink to="/profile" className={({ isActive }) => getNavLinkClass(isActive)}>
                <ProfileIcon />
              </NavLink>
            </li>
            <li className="mx-16">
              <NavLink to="/settings" className={({ isActive }) => getNavLinkClass(isActive)}>
                <SettingsIcon />
              </NavLink>
            </li>
          </>
        )}
        {!isLoggedIn && (
          <li className="mx-16">
            <NavLink to="/login" className={({ isActive }) => getNavLinkClass(isActive)}>
              Login
            </NavLink>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Navlinks;
