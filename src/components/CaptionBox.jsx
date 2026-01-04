import React from "react";

const CaptionBox = ({ className, profileImage }) => {
  return (
    <div
      className={`${className} h-24 w-[80%] bg-[#282828] flex items-center rounded-xl mb-5  shadow-lg mx-auto p-4`}
    >
      <div className="mx-2">
        <img className="h-9 w-9 object-cover rounded-lg" src={profileImage} />
      </div>
      <div className="w-full">
        <input placeholder="Tell your friends about your thoughts.." className="bg-[#1A1A1A] text-sm  caret-white outline-none font-Inter p-3 text-white/20 rounded-md h-9 w-full  "/>
      </div>
    </div>
  );
};

export default CaptionBox;
