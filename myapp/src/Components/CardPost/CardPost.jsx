import React from 'react';
import {AiOutlineHeart} from 'react-icons/ai';
import {BsCalendarDate} from 'react-icons/bs';
import Swal from 'sweetalert2';

const CardPost = ({post}) => {    
    const onClickHandler = ()=>{
        Swal.fire({
            title: 'Likes',
            imageUrl:"https://getyourcompliments.com/icon.png",
            imageWidth: 200,
            imageHeight: 200,
            text: `Personas a las que le has gustado esta publicacion: ${post.likes[0].username}`, //no funciona todavía
        });
    }

    return (
        <div className="flex mb-12 bg-white shadow-lg rounded">
            <div className="w-2/4 relative rounded-l">
                <img src={post.image} className="rounded-l w-full" alt={post.description} />
                <div className="flex items-center absolute bottom-0 pl-3 w-full h-auto text-white font-bold bg-dark-700 bg-opacity-60">
                    <p>{post.description}</p>
                </div>
            </div>

            <div className="w-2/4 m-5 font-content flex flex-col gap-4">
                <div className="flex">
                    <h2 className="font text-2xl font-bold">{post.title}</h2>
                    <button>FavBTN</button>
                </div>
                <div className="text-dark-400 flex items-center gap-3"><BsCalendarDate /><span>{new Date(post.createdAt).toLocaleDateString()} - </span><span className="text-dark-400">{new Date(post.createdAt).toLocaleTimeString()}</span></div>
                <div className="flex gap-3">
                    <button className="w-5"><AiOutlineHeart /></button>
                    {post.likes.length > 0?  (<a href="#" className="text-blue-500 text-lg underline hover:text-blue-400" onClick={onClickHandler}> {post.likes.length} me gusta</a>) : (<p>Esta publicación aún no tiene likes</p>)} 
                </div>
                <div>
                    <p>Añadir comentario:</p>
                </div>
                <div className="h-11/12">
                    <p>Comentarios:</p>
                </div>
            </div>
        </div>
    );
}
 
export default CardPost;