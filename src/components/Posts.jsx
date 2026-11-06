import React from "react";
import PropTypes from "prop-types";
import PostList from "./PostList";
import Spinner from "../shared/Components/FormElements/Spinner";
import { useGetUserPostsQuery } from "../services/api"; // Import RTK Query hook

const Posts = ({ userId }) => {
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
    userId,
    {
      // Only make API call if we have a user ID
      skip: !userId
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

Posts.propTypes = {
  userId: PropTypes.string,
};

export default Posts;
