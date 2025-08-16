import { createContext, useState, useEffect } from 'react';

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(() => {
    const stored = localStorage.getItem('profile');
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    if (profile) {
      localStorage.setItem('profile', JSON.stringify(profile));
    }
  }, [profile]);

  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};
