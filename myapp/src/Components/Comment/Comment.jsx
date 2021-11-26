import React from 'react'

const Comment = ({comment, post}) => {
    return ( 
        <div className="flex gap-3 mb-4">
            <div className="flex items-center justify-center rounded-full bg-gradient-to-r from-skyD to-aqua w-12">
                <div className="flex items-center justify-center  rounded-full bg-white w-5/6 h-5/6">
                    <h3 className="font-bold">{comment.user.username.split("_")[0]}</h3>
                </div>
            </div>
            <div className="bg-gray-300 rounded-md w-full pl-2">
                <p className="font-bold">{comment.user.username}</p>
                <p>{comment.description}</p>
            </div>
        </div>
    );
}
 
export default Comment;