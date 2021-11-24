import React from 'react';
import {AiOutlineHeart} from 'react-icons/ai';
import {BsCalendarDate} from 'react-icons/bs';
import Swal from 'sweetalert2';
import Comment from '../Comment/Comment'

const CardPost = ({post}) => {    
    const onClickHandler = ()=>{
        Swal.fire({
            title: 'Likes',
            imageUrl:"https://getyourcompliments.com/icon.png",
            imageWidth: 200,
            imageHeight: 200,
            text: `Personas a las que le has gustado esta publicacion: ${post.likes.map(like => like.username).join(' || ')}`, //ya funciona ;)
        });
    }

    return (
        <div className="flex mb-12 bg-white rounded shadow-lg">
            <div className="relative w-2/4 rounded-l">
                <img src={post.image} className="w-full rounded-l" alt={post.description} />
                <div className="absolute bottom-0 flex flex-col justify-center w-full h-auto py-2 pl-3 font-bold text-white bg-dark-700 bg-opacity-60">
                    <p>{post.user.username}</p>
                    <p>{post.description}</p>
                </div>
            </div>

            <div className="flex flex-col w-2/4 gap-4 m-5 font-content">
                <div className="flex">
                    <h2 className="text-2xl font-bold font">{post.title}</h2>
                    {/* <button>FavBTN</button> */}
                </div>
                <div className="flex items-center gap-3 text-dark-400"><BsCalendarDate /><span>{new Date(post.createdAt).toLocaleDateString()} - </span><span className="text-dark-400">{new Date(post.createdAt).toLocaleTimeString()}</span></div>
                <div className="flex gap-3">
                    <button className="w-5"><AiOutlineHeart /></button>
                    {post.likes.length > 0?  (<a href="#" className="text-lg text-blue-500 underline hover:text-blue-400" onClick={onClickHandler}> {post.likes.length} me gusta</a>) : (<p>Esta publicación aún no tiene likes</p>)} 
                </div>
                <div>
                    <p>Añadir comentario:</p>
                    <textarea className="w-full h-16 p-1 bg-gray-300 rounded-md resize-none focus:outline-none" placeholder="Escribe tu comentario..."></textarea>
                </div>
                <div className="h-11/12">
                    <p>Comentarios:</p>
                    {post.comments.length > 0?
                        post.comments.map(c=>{                     
                            return(
                                <Comment 
                                    comment={c}
                                    key={c._id}
                                />
                            )
                        })
                    :
                        <p className="text-red-500">Esta publicación no tiene comentarios...</p>
                    }
                </div>
            </div>
        </div>
    );
}
 
export default CardPost;