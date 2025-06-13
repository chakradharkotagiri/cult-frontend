import React from 'react'
import Card from '../shared/Components/FormElements/Card';
import PostItem from './PostItem';
import HomeItem from './HomeItem';

const HomeList = ({posts}) => {
    if(!posts || posts.length===0){
        return(
            <div className="center">
        <Card>
        <h2>No posts found.</h2>
        </Card>
      </div>
        );
    }


      
  return (
    <div className='flex justify-center   ml-10'>
        <ul className="">
            {posts.map((post)=>(
                <HomeItem 
                key={post.id}
                id={post.id}
                userName={post.userName}
                name={post.name}
                profileImage={post.profileImage}
                image={
                    post.image
                }
                caption={post.caption}

                />
            ))}
        </ul>
      
    </div>
  )
}

export default HomeList
