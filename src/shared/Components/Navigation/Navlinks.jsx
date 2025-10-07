import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import HomeIcon from "../../../assets/svg/home-icon";
import SettingsIcon from "../../../assets/svg/settings-icon";
import { useDebounce } from "../../hooks/debounce-hook";
import ProfileIcon from "../../../assets/svg/profile-icon";
import { API_URL } from "../../../config";
import { useContext } from "react";
import { ProfileContext } from "../../hooks/ProfileContext";

const Navlinks = () => {
  const { profile } = useContext(ProfileContext);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation("");
  const [searchText, setSearchText] = useState("");
  const [searchData, setSearchData] = useState([]);
  const debouncedSearchText = useDebounce(searchText, 300);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, [location]);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear login flag from localStorage
    localStorage.removeItem("isLoggedIn");

    // Navigate back to login page
    navigate("/login");
  };
  useEffect(() => {
    const searchReccomendations = async () => {
      if (debouncedSearchText.trim() !== "") {
        const res = await fetch(
          `${API_URL}/api/search?query=${debouncedSearchText}`
        );
        const data = await res.json();
        console.log(data);
        setSearchData(data);
      } else {
        setSearchData([]);
      }
    };
    searchReccomendations();
  }, [debouncedSearchText]);

  const getNavLinkClass = (isActive) =>
    isActive ? "text-amber-400 underline" : "text-white hover:text-green-300";

  if (
    !isLoggedIn ||
    location.pathname === "/login" ||
    location.pathname === "/signup"
  )
    return null;

  return (
    <div className="flex bg-[#1A1A1A] justify-between px-4 pt-8">
      <div>
        <div className="relative">
          {/* //search functionality // */}
          <div className="">
            <input
              className="bg-[#282828]  mb-5 flex items-center  text-xl caret-white text-white pl-4 outline-none rounded-t-lg "
              value={searchText}
              placeholder="Seach User"
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
            ></input>
          </div>

          <div className="absolute top-full -mt-px left-0 right-0 z-50 text-white text-xl bg-[#282828] rounded-b-lg shadow-lg max-h-60 overflow-y-auto">
            {searchData.map((user, index) => {
              return (
                <a
                  href={`/profile/${user.username}`}
                  key={index}
                  className="block py-3 px-3 hover:bg-[#3A3A3A] transition-colors border-b border-gray-600 last:border-b-0"
                >
                  <span>{user.username}</span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
      <div>
        <ul className="font-avenir  flex flex-1 text-2xl">
          {isLoggedIn && (
            <>
              <li></li>
              <li className="mx-8 text-green-300 text-6xl">
                <NavLink
                  to="/"
                  className={({ isActive }) => getNavLinkClass(isActive)}
                >
                  <HomeIcon />
                </NavLink>
              </li>
              <li className="mx-8">
                <NavLink
                  to="/profile"
                  className={({ isActive }) => getNavLinkClass(isActive)}
                >
                  <ProfileIcon className="w-[15px] h-[20px]" />
                </NavLink>
              </li>
              <li className="mx-8">
                <NavLink
                  to="/settings"
                  className={({ isActive }) => getNavLinkClass(isActive)}
                >
                  <SettingsIcon />
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
      <div>
        <img src={profile.avatar} className="h-8 w-8 object-cover rounded-md" />
      </div>
    </div>
  );
};

export default Navlinks;
