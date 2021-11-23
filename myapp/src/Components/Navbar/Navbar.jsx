import React from 'react';
import useravatar from '../../Assets/img/user_avatar.png';
import { useUserContext } from '../../Contexts/UserContext';
import { AiOutlineStar, AiFillCaretDown } from "react-icons/ai";
import { MdPublic } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import {MdOutlineAddComment} from 'react-icons/md';


const Navbar = () => {
    const navigate = useNavigate();

    const hamburgerBtn =  ()=>{
        const divnav = document.querySelector('#divnav');
        const nav = document.querySelector('nav');
        
        if (nav.classList.contains('hidden')) {
            nav.classList.add('flex', 'flex-col', 'gap-2', 'mb-3', 'w-full');
            nav.classList.remove('hidden');
            divnav.classList.remove('gap-6', 'h-14');
            divnav.classList.add('flex-col', 'gap-4', 'pt-2')
        } else{
            nav.classList.remove('flex', 'flex-col', 'gap-2', 'mb-3', 'w-full');
            nav.classList.add('hidden');
            divnav.classList.add('gap-6', 'h-14');
            divnav.classList.remove('flex-col', 'gap-4', 'pt-2')
        }
    }

    const dropdown = {
        enter: () => {
            const dropContent = document.querySelector("#drop");
            dropContent.classList.add('flex', 'flex-col');
            dropContent.classList.remove('hidden');
        },
        leave: () =>{
            const dropContent = document.querySelector("#drop");
            dropContent.classList.add('hidden');
            dropContent.classList.remove('flex', 'flex-col');
        }
    }

    const auth = useUserContext();
    const onClickHandler = (e) =>{
        e.preventDefault();

        auth.logout();
        navigate("/login");
    }

    const addPost = (e) =>{
        e.preventDefault();
        navigate("/CreatePost");
    }
        
    return ( 
        <div className="relative pt-1 bg-gradient-to-r from-aqua to-skyD">
            <div id="divnav" className="static flex items-center justify-around text-white shadow-lg bg-dark-700 h-14">
                <h1 className="text-4xl font-heading lg:w-1/4 lg:text-center">Web social</h1>
                
                <div className="lg:hidden">
                    <button onClick={hamburgerBtn} className="flex items-center px-3 py-2 border rounded hover:text-white hover:border-white">
                        <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
                    </button>
                </div>

                <nav className="hidden h-full lg:w-3/5 lg:flex lg:justify-end font-content text-gray">
                <button  onClick={addPost} className="flex items-center justify-center h-12 gap-3 hover:bg-dark-400 hover:text-white lg:w-1/4 lg:h-auto"> <MdOutlineAddComment /> Crear un post</button>

                    <button className="flex items-center justify-center h-12 gap-3 hover:bg-dark-400 hover:text-white lg:w-1/4 lg:h-auto"> <MdPublic /> Publicaciones</button>
                    <button className="flex items-center justify-center h-12 gap-3 hover:bg-dark-400 hover:text-white lg:w-1/4 lg:h-auto"> <AiOutlineStar /> Favoritos</button>
                    <button className="flex items-center justify-center h-12 gap-3 hover:bg-dark-400 hover:text-white lg:w-1/4 lg:h-auto" onMouseEnter={dropdown.enter} onMouseLeave={dropdown.leave}> <img src={useravatar} className="w-8 h-8 rounded-full"/> Usuario <AiFillCaretDown /></button>
                </nav>

                <div id="drop" className="absolute items-center hidden w-64 py-2 bg-white rounded-lg shadow-xl top-14 right-2 font-content" onMouseEnter={dropdown.enter} onMouseLeave={dropdown.leave}>
                    <div className="flex justify-between gap-5 mx-6">
                        <img src={useravatar} className="w-1/4 rounded-full"/>
                        <div className="w-3/4">
                            
                        <h2 className="font-bold text-dark-700">{JSON.parse(localStorage.getItem("user")).username}</h2>
                        <h2 className="text-dark-700">{JSON.parse(localStorage.getItem("user")).role}</h2>
                        
                    </div>
                    </div>
                    <button className="w-11/12 px-4 py-2 mt-4 bg-red-500 rounded hover:bg-red-300 text-gray hover:text-white" onClick={onClickHandler}>Logout</button>
                </div>
            </div>
        </div>
    );
}
 
export default Navbar;