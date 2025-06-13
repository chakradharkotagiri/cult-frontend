// ProfileContext.jsx
import { createContext, useState } from 'react';

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const dummyProfile= [
    {
      Followers: "201",
      Following: "150",
      userName: "chakrik",
      name: "Chakradhar Kotagri",
      profileImage: "../../../myProfilePic.jpeg",
      id: "1",
      bio: "Hello ,I'm UI / UX designer.Open to the new Project",
    }
  ];

  const [profile, setProfile] = useState(dummyPosts);

  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};
