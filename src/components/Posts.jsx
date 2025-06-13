import React,{createContext, useState} from 'react'
import PostList from './PostList';



const Posts = () => {
    const dummyPosts = [
        {
            userId:"2",
          id: "1",
          caption: "My New Bike",
          image: "https://i.pinimg.com/736x/a2/a9/4b/a2a94b8b4216d2db1e5134f5f1275740.jpg",
        },
        { 
            userId:"2",
            id:"2",
            caption: "New cozy Setup ",
            image:'https://i.pinimg.com/736x/6b/b5/f5/6bb5f539e6031ff44c6bb803a6feb13a.jpg'
        },
        {
          userId:"2",
          id: "3",
          caption: "My new JEEP WRANGLER",
          image: "https://i.pinimg.com/736x/f9/92/71/f9927119d7aa95d8c46d95658667b8b3.jpg",
        },
      ];
      const [userPosts, setUserPosts] = useState(dummyPosts);

      
  return (
    <div>
      <PostList posts={userPosts}  />
    </div>
  )
}

export default Posts
