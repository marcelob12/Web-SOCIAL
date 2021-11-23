import React from 'react';
import {AiOutlineHeart} from 'react-icons/ai'

const CardPost = ({post}) => {
    return ( 
        <div className="flex mb-12 bg-white">
            <div className="w-2/4">
                <img src={post.image} className="w-full" alt={post.description} />
            </div>

            <div className="w-2/4 m-5 font-content flex flex-col">
                <div className="flex">
                    <h2 className="font text-2xl font-bold">{post.title}</h2>
                    <button></button>
                </div>
                <div className="text-gray"><span>{new Date(post.createdAt).toLocaleDateString()} - </span><span className="text-gray">{new Date(post.createdAt).toLocaleTimeString()}</span></div>
                <button className="rounded bg-gray "><AiOutlineHeart/></button>
            </div>
        </div>
    );
}
 
export default CardPost;