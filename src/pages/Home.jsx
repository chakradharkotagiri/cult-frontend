import React, { useEffect, useState } from "react";
import HomeList from "../components/HomeList";
import Users from "./Users";
import ProfHome from "../components/ProfHome";
import axios from "axios";
import { API_URL } from "../config";

const stickyColumnClasses =
  "sticky top-nav self-start max-h-[calc(100dvh-theme(spacing.nav))] overflow-y-auto scrollbar-hide py-4";

/**
 * The grid below is the only thing that positions the three columns: their
 * widths and gaps are all defined here. Components placed inside it should
 * fill the space they are given (w-full) and never set their own outer width,
 * margins or absolute position, or the columns drift apart again.
 *
 *   below lg  feed only
 *   lg        feed + suggestions
 *   xl and up profile + feed + suggestions, with equal side columns
 */
const Home = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/posts`);
        setPosts(res.data.posts);
      } catch (err) {
        console.error("Failed to fetch posts:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="min-h-[calc(100dvh-theme(spacing.nav))] bg-[#1A1A1A]">
      <div className="page-container grid grid-cols-[minmax(0,672px)] justify-center gap-6 lg:grid-cols-[minmax(0,672px)_300px] xl:grid-cols-[300px_minmax(0,1fr)_300px]">
        <aside className={`hidden xl:block ${stickyColumnClasses}`}>
          <ProfHome />
        </aside>

        <main className="min-w-0">
          <HomeList posts={posts} isLoading={isLoading} />
        </main>

        <aside className={`hidden lg:block ${stickyColumnClasses}`}>
          <Users />
        </aside>
      </div>
    </div>
  );
};

export default Home;
