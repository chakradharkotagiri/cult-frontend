import React from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import SettingsPanel from "../components/SettingsPanel";
import {useState} from 'react';

const Settings = () => {
  const [selectedSection, setSelectedSection] = useState("Account");
 

  return (
    <>
      <div className="bg-[#1A1A1A] h-screen flex text-white relative">
        <Sidebar setSection={setSelectedSection} selected={selectedSection} />
        <SettingsPanel selected={selectedSection}/>
       
      </div>
    </>
  );
};

export default Settings;
