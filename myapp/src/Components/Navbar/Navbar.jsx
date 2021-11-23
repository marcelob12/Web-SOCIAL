import React from 'react';
import useravatar from '../../Assets/img/user_avatar.png';
import { useUserContext } from '../../Contexts/UserContext';
import { AiOutlineStar, AiFillCaretDown } from "react-icons/ai";
import { MdPublic } from "react-icons/md";
import { useNavigate } from "react-router-dom";


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
        
    return ( 
        <div className="bg-gradient-to-r from-aqua to-skyD pt-1 relative">
            <div id="divnav" className="flex items-center justify-around bg-dark-700 text-white h-14 shadow-lg static">
                <h1 className="font-heading text-4xl lg:w-1/4 lg:text-center">Web social</h1>
                
                <div className="lg:hidden">
                    <button onClick={hamburgerBtn} className="flex items-center px-3 py-2 border rounded hover:text-white hover:border-white">
                        <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
                    </button>
                </div>

                <nav className="hidden h-full lg:w-3/5 lg:flex lg:justify-end font-content text-gray">
                    <button className="hover:bg-dark-400 hover:text-white flex items-center justify-center lg:w-1/4 gap-3 h-12 lg:h-auto"> <MdPublic /> Publicaciones</button>
                    <button className="hover:bg-dark-400 hover:text-white flex items-center justify-center lg:w-1/4 gap-3 h-12 lg:h-auto"> <AiOutlineStar /> Favoritos</button>
                    <button className="hover:bg-dark-400 hover:text-white flex items-center justify-center lg:w-1/4 gap-3 h-12 lg:h-auto" onMouseEnter={dropdown.enter} onMouseLeave={dropdown.leave}> <img src={useravatar} className="h-8 w-8 rounded-full"/> Usuario <AiFillCaretDown /></button>
                </nav>

                <div id="drop" className=" hidden items-center bg-white rounded-lg py-2 w-64 shadow-xl absolute top-14 right-2 font-content" onMouseEnter={dropdown.enter} onMouseLeave={dropdown.leave}>
                    <div className="flex justify-between mx-6 gap-5">
                        <img src={useravatar} className="rounded-full w-1/4"/>
                        <div className="w-3/4">
                            <h2 className="text-dark-700 font-bold">{JSON.parse(localStorage.getItem("user")).username}</h2>
                            <h2 className="text-dark-700">{JSON.parse(localStorage.getItem("user")).role}</h2>
                        </div>
                    </div>
                    <button className="bg-red-500 hover:bg-red-300 px-4 py-2 mt-4 text-gray hover:text-white w-11/12 rounded" onClick={onClickHandler}>Logout</button>
                </div>
            </div>
        </div>
    );
}
 
export default Navbar;