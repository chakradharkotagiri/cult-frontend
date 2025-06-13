import React from 'react';
import Card from '../shared/Components/FormElements/Card';
import { Link } from 'react-router-dom';

const HomeItem = (props) => {
  const handleClick = () => {
    const img = document.createElement('img');
    img.src = props.image;
    img.style.position = 'fixed';
    img.style.top = '0';
    img.style.left = '0';
    img.style.width = '100vw';
    img.style.height = '100vh';
    img.style.objectFit = 'contain';
    img.style.background = 'rgba(0,0,0,0.8)';
    img.style.zIndex = '9999';
    img.style.cursor = 'pointer';

    // Close fullscreen when clicked
    img.onclick = () => document.body.removeChild(img);

    document.body.appendChild(img);
  };

  return (
    <div className="flex justify-center   w-[575px] ml-20   p-5 m-10">
      <li className="w-full shadow-lg bg-[#282828]  rounded-3xl   text-white">
        <Card className="p-4 rounded-xl   overflow-hidden">
          <Link to={`/${props.id}/posts`} className="block pt-12 pb-24 px-10 hover:opacity-90">
              <div className='flex'>
                <img
                  className="w-16 h-16 mb-12 m-5 rounded-xl object-cover "
                  src={props.profileImage}
                  alt="Profilepic"
                />
                <div>
                  <h2 className="text-2xl font-bold mb-2">{props.userName}</h2>
                  <p className="text-sm text-gray-400">{props.name}</p>
                </div>
              </div>
            
             <div className="mt-2 mb-6 text-left font-serif text-sm">
              {props.caption}
            </div>
            <img
              className="w-[487px]  h-[302px] object-cover rounded-3x"
              src={props.image}
              onClick={handleClick}
              alt="Post"
            />
           
          </Link>
        </Card>
      </li>
    </div>
  );
};

export default HomeItem;
