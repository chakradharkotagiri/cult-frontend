import React from 'react';
import PropTypes from 'prop-types';
import Card from '../shared/Components/FormElements/Card';
import HomeItem from './HomeItem';
import CaptionBox from './CaptionBox';
import { useContext } from 'react';
import { ProfileContext } from '../shared/hooks/ProfileContext';
import StoryBar from './StoryBar';
import PostSkeleton from './PostSkeleton';

const SKELETON_POST_COUNT = 3;

const HomeList = ({ posts, isLoading, className }) => {
  const {profile} = useContext(ProfileContext);

  const renderPosts = () => {
    if (isLoading) {
      return (
        <div role="status" aria-label="Loading posts">
          {Array.from({ length: SKELETON_POST_COUNT }, (_, index) => (
            <PostSkeleton key={index} />
          ))}
        </div>
      );
    }

    if (!posts || posts.length === 0) {
      return (
        <div className="center">
          <Card>
            <h2 className="text-[#9A9A9A]">No posts found.</h2>
          </Card>
        </div>
      );
    }

    return (
      <ul>
        {posts.map((post) => {
          if (!post.userId) return null; 
          return (
            <HomeItem
              key={post._id}
              id={post._id}
              authorId={post.userId._id}
              className={className}
              image={post.imageUrl}
              caption={post.caption}
              userName={post.userId.username}
              name={`${post.userId.firstName} ${post.userId.lastName}`}
              profileImage={post.userId.avatar}
            />
          );
        })}
      </ul>
    );
  };

  return (
    <div className={`${className || ""}`.trim()}>
      <StoryBar/>
      <CaptionBox className="" profileImage={profile.avatar} />
      {renderPosts()}
    </div>
  );
};

HomeList.propTypes = {
  posts: PropTypes.array,
  isLoading: PropTypes.bool,
  className: PropTypes.string,
};

export default HomeList;
