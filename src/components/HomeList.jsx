import React from 'react';
import PropTypes from 'prop-types';
import Card from '../shared/Components/FormElements/Card';
import HomeItem from './HomeItem';
import CaptionBox from './CaptionBox';
import { useContext } from 'react';
import { ProfileContext } from '../shared/hooks/ProfileContext';
import StoryBar from './StoryBar';

const HomeList = ({ posts, className }) => {
  const {profile} = useContext(ProfileContext);

  if (!posts || posts.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>No posts found.</h2>
        </Card>
      </div>
    );
  }

  return (
    <div className={`${className}`.trim()}>
      <StoryBar/>
            <CaptionBox className=""
            profileImage={profile.avatar}
            />

      <ul>
        {posts.map((post) => {
          if (!post.userId) return null; 
          return (
            <HomeItem
              key={post._id}
              id={post._id}
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
    </div>
  );
};

HomeList.propTypes = {
  posts: PropTypes.array,
  className: PropTypes.string,
};

export default HomeList;
