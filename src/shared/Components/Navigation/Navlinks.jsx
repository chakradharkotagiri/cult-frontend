import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import HomeIcon from "../../../assets/svg/home-icon";
import SettingsIcon from "../../../assets/svg/settings-icon";
import {useDebounce} from "../../hooks/debounce-hook"
import ProfileIcon from "../../../assets/svg/profile-icon";
import {API_URL} from "../../../config"

const Navlinks = () => {
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
        const data =await res.json();
        console.log(data)
        setSearchData(data);
      }else{
          setSearchData([]);
      }
    };
    searchReccomendations();
  }, [debouncedSearchText]);

  const getNavLinkClass = (isActive) =>
    isActive ? "text-amber-400 underline" : "text-white hover:text-green-300";

  return (
    <div className="flex bg-[#1A1A1A] justify-center pt-8">
      <ul className="font-times flex text-2xl">
        {isLoggedIn && (
          <>
            <li>
              {/* //search functionality // */}
              <input
                className="bg-[#282828] caret-white text-white pl-4 outline-none rounded-t-lg "
                value={searchText}
                placeholder="Seach User"
                onChange={(e) => {
                  setSearchText(e.target.value);
                }}
              ></input>
              <div className="text-white text-xl  pl-3 bg-[#282828] ">
                {searchData.map((username, index) => {
                  return (
                    <a
                      href={`/profile/${username}`}
                      key={index}
                      className="block py-3 rounded-b-lg"
                     
                    >
                      {username}
                    </a>
                  );
                })}
                
              </div>
            </li>
            <li>
              {/* <button className=" bg-[#282828] rounded-lg ml-5 text-md text-gray-500 w-20">
                Submit
              </button> */}
            </li>
            <li className="mx-12 text-green-300 text-6xl">
              <NavLink
                to="/"
                className={({ isActive }) => getNavLinkClass(isActive)}
              >
                <HomeIcon />
              </NavLink>
            </li>
            <li className="mx-12">
              <NavLink
                to="/profile"
                className={({ isActive }) => getNavLinkClass(isActive)}
              >
                <ProfileIcon className="w-[20px] h-[20px]" />
              </NavLink>
            </li>
            <li className="mx-16">
              <NavLink
                to="/settings"
                className={({ isActive }) => getNavLinkClass(isActive)}
              >
                <SettingsIcon />
              </NavLink>
            </li>
          </>
        )}
        {!isLoggedIn && (
          <>
            <li className="mx-16">
              <NavLink
                to="/login"
                className={({ isActive }) => getNavLinkClass(isActive)}
              >
                Login
              </NavLink>
            </li>
            <li className="mx-16">
              <NavLink
                to="/signup"
                className={({ isActive }) => getNavLinkClass(isActive)}
              >
                Signup
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Navlinks;
