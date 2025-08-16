import { useEffect } from "react";
import "./index.css";

import Signup from "./shared/Components/authentication/Signup";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from "react-router-dom";

import UserFriends from "./pages/UserFriends";
import Login from "./shared/Components/authentication/Login";
import Profile from "./pages/Profile";
import Navlinks from "./shared/Components/Navigation/Navlinks";
import { NewPost } from "./pages/NewPost";
import Layout from "./shared/Components/Navigation/Layout";
import Users from "./pages/Users";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import { PostsProvider } from "./shared/hooks/PostsContext";
import { ProfileProvider } from "./shared/hooks/ProfileContext";
import RequireAuth from "./shared/Components/authentication/RequireAuth";
import EditProfileForm from "../src/components/EditProfileForm";
import { jwtDecode } from "jwt-decode";

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const decoded = jwtDecode(token);
      const expiry = decoded.exp * 1000;

      if (Date.now() >= expiry) {
        localStorage.clear();
        alert("Session expired. Please log in again.");
        navigate("/login");
      } else {
        const timeout = expiry - Date.now();
        const logoutTimer = setTimeout(() => {
          localStorage.clear();
          alert("Session expired. Please log in again.");
          navigate("/login");
        }, timeout);

        return () => clearTimeout(logoutTimer); // clear on unmount
      }
    } catch (err) {
      console.error("Token decode failed:", err);
      localStorage.clear();
      navigate("/login");
    }
  }, [location]);

  return (
    <ProfileProvider>
      <PostsProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              index
              element={
                <RequireAuth>
                  <Home />
                </RequireAuth>
              }
            />
            <Route
              path="settings"
              element={
                <RequireAuth>
                  <Settings />
                </RequireAuth>
              }
            />
            <Route
              path="profile"
              element={
                <RequireAuth>
                  <Profile />
                </RequireAuth>
              }
            />
            <Route path="login" element={<Login />} />
            <Route path="Signup" element={<Signup />} />
            <Route path="/profile/NewPost" element={<NewPost />} />
            <Route path="/profile/edit" element={<EditProfileForm />} />
          </Route>
        </Routes>
      </PostsProvider>
    </ProfileProvider>
  );
};

const WrappedApp = () => (
  <Router>
    <App />
  </Router>
);

export default WrappedApp;
