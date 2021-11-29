import React,{useState, useEffect, useRef} from 'react';
import {AiFillHeart, AiFillStar} from 'react-icons/ai';
import {BsCalendarDate,BsPencilSquare} from 'react-icons/bs';
import {BiHide} from  'react-icons/bi'
import Swal from 'sweetalert2';
import Comment from '../Comment/Comment'
import axios from 'axios'
import { useNavigate } from "react-router-dom";


const CardPost = ({post, favs}) => {
    const navigate = useNavigate();
    const [Like, setLike] = useState(null);
    const [Hide, setHide] = useState(null);
    const [Fav, setFav] = useState(null);
    const [likeNumber, setLikeNumber] = useState(post.likes.length);
    const [comments, setComments] = useState(post.comments)
    const user = JSON.parse(localStorage.getItem('user')).username;
    const description = useRef(null);
     
   
    useEffect(() => {
        post.likes.forEach(l=> {
            if(l.username === user){
                setLike(true);
            }else{
                setLike(false);
            }
        });

        
        favs.forEach((f)=>{
            if(f === post._id){
                setFav(true);
            }
        });
    
    }, []);
    
    
    const onClickHandler = ()=>{
        Swal.fire({
            title: 'Likes',
            imageUrl:"https://getyourcompliments.com/icon.png",
            imageWidth:150,
            imageHeight:150,
            text: `Personas a las que le has gustado esta publicacion: ${post.likes.map(like => like.username).join(' || ')}`, 
        });
    }

    const onClickLike = async ()=>{
        try {
            const response = await fetch("https://posts-pw2021.herokuapp.com/api/v1/post/like/"+ post._id, {
                method: "PATCH",
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem('token')
                }
            });
                        
            if(Like){
                setLike(false);
                setLikeNumber(likeNumber-1);

            }else{
                setLike(true);
                setLikeNumber(likeNumber+1);
            }      

        } catch (error) {
            console.error(error)
        }
    }
    
    useEffect(() => {        
        const btn = document.querySelector(`[data-id="${post._id}"]`);
        
        if(Like) {
            btn.classList.add("text-red-500");            
        } else{
            btn.classList.remove("text-red-500");
        }

    }, [Like])

    const onclickHide = async ()=>{
        try {
            const response = await fetch("https://posts-pw2021.herokuapp.com/api/v1/post/toggle/"+ post._id, {
                    method: "PATCH",
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem('token')
                    }    
                });    

                const btn = document.querySelector(`[data-hide="${post._id}"]`);
                if(Hide){
                    setHide(false);
                    btn.classList.remove("text-red-500");            

                    
                    
                    
                }else{
                    setHide(true);
                    btn.classList.add("text-red-500");            

                }     
            }        
    catch (error) {
        console.error(error)  
    }    
    }
/*     useEffect(() => {
        const btn = document.querySelector(`[data-hiden="${post._id}"]`);
        
        if(Hide) {
            btn.classList.add("text-yellow-700");
        } else{
            btn.classList.remove("text-yellow-700");
        }
        
    }, [Hide]) */


    


    async function onSubmit(e) {
        e.preventDefault();
        
        const descriptionValue = description.current.value

        if(descriptionValue.length<8){
            Swal.fire({
                icon: 'error',
                title: 'ERROR',
                text: 'Comentario debe tener al menos 8 caracteres',
            })

            description.current.value="";
        } else{
            try{
                await axios.patch(`https://posts-pw2021.herokuapp.com/api/v1/post/comment/${post._id}`,
                    {description: descriptionValue},
                    {headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json'}}
                );

                const com = {
                    description: descriptionValue,
                    user:{
                        username: user
                    },
                    _id: post._id
                }
                
                setComments([...comments, com]);
                description.current.value="";
            
            } catch(error){
                // const {response} = error;
                console.log(error);        
            }  
        }

    }



    //FAVORITES
    const onClickFav = async () =>{
        try {
            const response = await fetch("https://posts-pw2021.herokuapp.com/api/v1/post/fav/" + post._id , {
                method: "PATCH",
                headers: {
                    "Authorization": "Bearer "+ localStorage.getItem('token')
                }
            });
            
            const info = await response.json();
            
            console.log(info);

            if(Fav){
                setFav(false);
            }else{
                setFav(true);
            }            
            
        } catch (error) {
            console.error(error);
        }
        
    }
    
    useEffect(() => {
        const btn = document.querySelector(`[data-fid="${post._id}"]`);
        
        if(Fav) {
            btn.classList.add("text-yellow-700");
        } else{
            btn.classList.remove("text-yellow-700");
        }
        
    }, [Fav])
    

    const onClickUpdate = (e) =>{
        e.preventDefault();
        navigate("/UpdatePost");
        localStorage.setItem('post', JSON.stringify(post._id));
        localStorage.setItem('title', JSON.stringify(post.title));
        localStorage.setItem('description', JSON.stringify(post.description));
        localStorage.setItem('image', JSON.stringify(post.image));

    }

    return (
        <div className="flex flex-col mb-12 bg-white rounded shadow-lg lg:flex-row lg:h-98">
            
            <div className="relative flex flex-col items-center justify-center bg-gray-300 rounded-l lg:w-2/4">
                <img loading="lazy" src={post.image} className="w-full rounded-l lg:w-auto lg:h-full" alt={post.title}/>
                <div className="bottom-0 hidden w-full h-auto py-2 pl-3 font-bold text-white lg:absolute lg:flex lg:flex-col lg:justify-center bg-dark-700 bg-opacity-70 max-h-28">
                    <div className="overflow-y-auto">
                        <p>{post.user.username}</p>
                        <p className="font-light">{post.description}</p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-4 m-5 lg:w-2/4 font-content">
                <div className="flex gap-2">
                    <h2 className="text-2xl font-bold font">{post.title}</h2>
                    <button data-fid={post._id} onClick={onClickFav} className="w-5 text-xl text-gray-500"><AiFillStar className="hover:text-yellow-700"/> </button>
                    
                    {
                        JSON.parse(localStorage.getItem("user")).username === post.user.username ? 
                            <button className="flex items-center justify-center h-12 gap-3 hover:text-aqua lg:w-1/7 lg:h-auto" onClick={onClickUpdate} > <BsPencilSquare /></button>        
                                    
                        :
                            <button className="hidden"> <BsPencilSquare /></button>
                    }
                    
                    {
                        JSON.parse(localStorage.getItem("user")).username === post.user.username ? 
                            <button data-hiden={post._id} className="flex items-center justify-center h-12 gap-3 hover:text-red-500 lg:w-1/7 lg:h-auto" onClick={onclickHide}> <BiHide className="w-5 h-5"/></button>        
                                    
                        :
                            <button className="hidden"> <BiHide /></button>
                    }
                </div>

                <div className="flex items-center gap-3 text-dark-400">
                    <BsCalendarDate />
                    <span>{new Date(post.createdAt).toLocaleDateString()} - </span>
                    <span className="text-dark-400">{new Date(post.createdAt).toLocaleTimeString()}</span>
                </div>
                
                <div className="w-full h-auto overflow-y-auto lg:hidden max-h-16">
                    <p className="font-light">
                        <span className="font-bold"> {post.user.username} - &nbsp; </span>
                        {post.description}
                    </p>
                </div>
                
                <div className="flex gap-3 text-gray-500">
                    <button data-id={post._id} className="w-5 text-xl " onClick={onClickLike}><AiFillHeart className=" hover:text-red-500"/> </button>
                    {
                        (<a id="btnBUM" href="#" className="text-lg text-blue-500 underline hover:text-blue-400" onClick={onClickHandler}> {likeNumber} me gusta</a>)   
                    } 
                </div>
                
                <form onSubmit={onSubmit}>
                    <p>Añadir comentario:</p>
                    <input 
                        className="w-full h-16 p-1 bg-gray-300 rounded-md resize-none focus:outline-none" 
                        placeholder="Escribe tu comentario... " type="text" 
                        ref={description}
                    />
                </form >
                
                <p>Comentarios:</p>
                <div id="comments" className="overflow-y-auto max-h-60">
                    {comments.length > 0?
                        comments.map(c=>{                  
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