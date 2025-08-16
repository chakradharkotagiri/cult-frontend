import React, { createContext, useState } from "react";

// Create Context
export const PostsContext = createContext();

// Create Provider Component
export const PostsProvider = ({ children }) => {
  const dummyPosts = [
    {
      userId: "2",
      userName: "vivduhan",
      name: "Vivaan Duhan",
      profileImage:
        "https://i.pinimg.com/736x/cf/16/0f/cf160f1c90c44b562b63af35bfef62e1.jpg",
      id: "1",
      caption: "My New Bike",
      image:
        "https://i.pinimg.com/736x/a2/a9/4b/a2a94b8b4216d2db1e5134f5f1275740.jpg",
    },
    {
      userId: "2",
      userName: "sheevang",
      name: "Shivang Verma",
      profileImage:
      "https://i.pinimg.com/736x/bf/99/24/bf992493edd6ef4fef60fed89a203a22.jpg",
      id: "2",
      caption: "New cozy Setup ",
      image:
        "https://i.pinimg.com/736x/6b/b5/f5/6bb5f539e6031ff44c6bb803a6feb13a.jpg",
    },
    {
      userId: "2",
      userName: "jajugagan",
      name: "Gagan Jaju",

      id: "3",
      caption: "My new JEEP WRANGLER",
      image:
        "https://i.pinimg.com/736x/f9/92/71/f9927119d7aa95d8c46d95658667b8b3.jpg",
    },
  ];

  const [userPosts, setUserPosts] = useState(dummyPosts);

  return (
    <PostsContext.Provider value={{ userPosts, setUserPosts }}>
      {children}
    </PostsContext.Provider>
  );
};
