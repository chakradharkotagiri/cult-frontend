import { createContext } from "react";


interface AuthContext {
    isLoggedIn: string; //to store JWT Token (use !!isLoggedIn)
    loggedInUserData: {
        followersCount: number;
        followingCount: number;
        userName:string;
        firstName:string;
        lastName:string;
        profileImage:string;
        id:string;
        bio:string;
    },
    
}


const authContext = {
  loggedInUserData:
    {
      Followers: "201",
      Following: "150",
      userName: "chakrik",
      firstName: "Chakradhar ",
      LastName: "Kotagiri",
      profileImage: "../../../myProfilePic.jpeg",
      id: "1",
      bio: "Hello ,I'm UI / UX designer.Open to the new Project",
    },
};

export const ProfileContext = createContext(authContext);
