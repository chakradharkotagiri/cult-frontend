import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import HomeIcon from "../../../assets/svg/home-icon";
import SettingsIcon from "../../../assets/svg/settings-icon";
import { useDebounce } from "../../hooks/debounce-hook";
import ProfileIcon from "../../../assets/svg/profile-icon";
import { API_URL, DEFAULT_AVATAR } from "../../../config";
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
    // Set on cleanup so a slow response can't overwrite a newer search.
    let isStale = false;

    const searchReccomendations = async () => {
      if (debouncedSearchText.trim() === "") {
        setSearchData([]);
        return;
      }

      try {
        const res = await fetch(
          `${API_URL}/api/search?query=${encodeURIComponent(debouncedSearchText)}`
        );
        const data = await res.json();
        if (!isStale) setSearchData(res.ok ? data : []);
      } catch (err) {
        console.error("Search failed", err);
        if (!isStale) setSearchData([]);
      }
    };

    searchReccomendations();
    return () => {
      isStale = true;
    };
  }, [debouncedSearchText]);

  const clearSearch = () => {
    setSearchText("");
    setSearchData([]);
  };

  const getNavLinkClass = (isActive) =>
    isActive ? "text-amber-400 underline" : "text-white hover:text-green-300";

  if (
    !isLoggedIn ||
    location.pathname === "/login" ||
    location.pathname === "/signup"
  )
    return null;

  return (
    <div className="sticky top-0 z-40 bg-[#1A1A1A]">
      <div className="page-container grid h-nav grid-cols-[1fr_auto_1fr] items-center gap-2">
        <div className="relative min-w-0 max-w-56">
          {/* //search functionality // */}
          <div className="">
            <input
              className="bg-[#282828] w-full text-xl caret-white text-white pl-4 outline-none rounded-t-lg"
              value={searchText}
              placeholder="Seach User"
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
            ></input>
          </div>

          <div className="absolute top-full left-0 right-0 z-50 text-white text-xl bg-[#282828] rounded-b-lg shadow-lg max-h-60 overflow-y-auto">
            {searchData.map((user) => {
              return (
                <Link
                  to={`/profile/${user._id}`}
                  key={user._id}
                  onClick={clearSearch}
                  className="flex items-center gap-3 py-3 px-3 hover:bg-[#3A3A3A] transition-colors border-b border-gray-600 last:border-b-0"
                >
                  <img
                    src={user.avatar || DEFAULT_AVATAR}
                    alt=""
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span>{user.username}</span>
                </Link>
              );
            })}
          </div>
        </div>
        <ul className="font-avenir flex text-2xl">
          {isLoggedIn && (
            <>
              <li></li>
              <li className="mx-3 md:mx-8 text-green-300 text-6xl">
                <NavLink
                  to="/"
                  className={({ isActive }) => getNavLinkClass(isActive)}
                >
                  <HomeIcon />
                </NavLink>
              </li>
              <li className="mx-3 md:mx-8">
                <NavLink
                  to="/profile"
                  className={({ isActive }) => getNavLinkClass(isActive)}
                >
                  <ProfileIcon className="w-[15px] h-[20px]" />
                </NavLink>
              </li>
              <li className="mx-3 md:mx-8">
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
        <Link
          to="/profile"
          aria-label="My profile"
          className="justify-self-end hover:opacity-80"
        >
          <img
            src={profile?.avatar || DEFAULT_AVATAR}
            alt=""
            className="h-8 w-8 object-cover rounded-md"
          />
        </Link>
      </div>
    </div>
  );
};

export default Navlinks;
