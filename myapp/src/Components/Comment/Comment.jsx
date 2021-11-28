import React from 'react'

const Comment = ({comment, post}) => {
    return ( 
        <div className="flex gap-3 mb-4">
            <div className="flex items-center justify-center w-12 rounded-full bg-gradient-to-r from-skyD to-aqua">
                <div className="flex items-center justify-center w-5/6 bg-white rounded-full h-5/6">
                   <h3 className="font-bold">{comment.user.username.split("_")[0]}</h3>
                </div>
            </div>
            <div className="w-full pl-2 bg-gray-300 rounded-md">
                <p className="font-bold">{comment.user.username}</p>
                <p>{comment.description}</p>
            </div>
        </div>
    );
}
 
export default Comment;