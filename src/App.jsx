import { useState } from "react";
import "./index.css";

import Signup from "./shared/Components/authentication/Signup";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import RequireAuth from "./shared/Components/authentication/requireAuth";

const App = () => {
  return (
    <ProfileProvider>
    <PostsProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={
            <RequireAuth>
            <Home />
            </RequireAuth>
            } />
            <Route path="settings" element={  <RequireAuth>
            <Settings />
            </RequireAuth>
            } />
            <Route path="profile" element={  <RequireAuth>
            <Profile />
            </RequireAuth>
            } />
            <Route path="login" element={<Login />} />
            <Route path="Signup" element={<Signup />} />
            <Route path="/profile/NewPost" element={<NewPost />} />
          </Route>
        </Routes>
      </Router>
    </PostsProvider>
    </ProfileProvider>
  );
};
export default App;
