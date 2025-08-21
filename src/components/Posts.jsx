import React, { useContext } from "react";
import PostList from "./PostList";
import Spinner from "../shared/Components/FormElements/Spinner";
import { ProfileContext } from "../shared/hooks/ProfileContext";
import { useGetUserPostsQuery } from "../services/api"; // Import RTK Query hook

const Posts = () => {
  // Get the logged-in user's profile from context
  const { profile } = useContext(ProfileContext);

  /**
   * RTK QUERY HOOK - REPLACES ALL YOUR useEffect + useState LOGIC
   * 
   * OLD WAY (what you had):
   * - useEffect to fetch posts
   * - useState for userPosts, loading
   * - manual fetch() call
   * - manual error handling
   * 
   * NEW WAY (RTK Query):
   * - One hook call handles everything
   * - Automatic caching, loading states, error handling
   * - Background refetching when data becomes stale
   */
  const { 
    data: userPosts,    // This replaces your userPosts state
    isLoading: loading, // This replaces your loading state
    error,              // Built-in error handling
    refetch             // Function to manually refetch if needed
  } = useGetUserPostsQuery(
    // Pass the user ID as parameter (your backend expects userId, not username)
    profile?.id || profile?._id, 
    {
      // Only make API call if we have a profile with ID
      // This replaces your "if (!profile?.username)" check
      skip: !profile?.id && !profile?._id
    }
  );

  /**
   * LOADING STATE
   * Same as before - show spinner while loading
   */
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner />
      </div>
    );
  }

  /**
   * ERROR STATE (NEW)
   * RTK Query automatically handles errors
   */
  if (error) {
    return (
      <div className="flex justify-center items-center h-64 flex-col">
        <p className="text-red-500 mb-4">Error loading posts</p>
        <button 
          onClick={refetch}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Try Again
        </button>
      </div>
    );
  }

  /**
   * SUCCESS STATE
   * Pass the posts to PostList component (same as before)
   * userPosts will be undefined initially, so use empty array as fallback
   */
  return <PostList posts={userPosts || []} />;
};

export default Posts;
