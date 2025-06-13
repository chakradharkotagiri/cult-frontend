import React,{useState} from 'react'
import Card from '../shared/Components/FormElements/Card';
import PostItem from "./PostItem";

const PostList = ({posts, layout = "horizontal"}) => {
 
    if(!posts || posts.length===0){
        return(
            <div className="center">
        <Card>
        <h2>No users found.</h2>
        </Card>
      </div>
        );
    }


      
  return (
    <div className='flex justify-center'>
        <ul className={`flex ${
            layout ==="vertical" ?"flex-col  gap-6" : "flex-wrap gap-4 justify-center"
        }`}>
            {posts.map((post)=>(
                <PostItem 
                key={post.id}
                id={post.id}
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

export default PostList
