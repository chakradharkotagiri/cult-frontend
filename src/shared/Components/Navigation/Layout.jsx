import React from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navlinks from "./Navlinks";

const Layout = () => {
  return (
    <div>
      <Navlinks />
      <ToastContainer />
      <div>
      <Outlet /> 
        {/* //Learn what this means */}
      </div>
    </div>
  );
};

export default Layout;
