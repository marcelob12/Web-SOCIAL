import React, {useState, useEffect} from 'react';
import CardPost from '../../Components/CardPost/CardPost';
import Navbar from '../../Components/Navbar/Navbar';
import {AiOutlineArrowLeft} from 'react-icons/ai';
import {AiOutlineArrowRight} from 'react-icons/ai';
import {BsPencilSquare} from 'react-icons/bs';

import Swal from 'sweetalert2';

const MyPosts = () => {
   
    const token = localStorage.getItem("token");
    const [post, setPost] = useState([]);
    const [favs, setFavs] = useState([]);
    const [postMore , setPostMore] = useState(0);
    const [PageLimit, setPageLimit] = useState(1);

    
    useEffect(() => {
        const fetchPosts = async () =>{
          try {
            const response = await fetch(`https://posts-pw2021.herokuapp.com/api/v1/post/owned?limit=15&page=${postMore}`, {
              "method": "GET",
              "headers":{
                "Authorization": `Bearer ${token}`
              }
            });
            
            
            if(response.ok){
              const data = await response.json();
              setPost(data.data);
              setPageLimit(data.pages);
            }
      
            
          } catch (error) {
            console.error(error);
          }
        };
        
            
        const fetchFavorites = async () =>{
          try {
              const responseFav = await fetch("https://posts-pw2021.herokuapp.com/api/v1/post/fav", {
                  method: "GET",
                  headers: {
                      "Authorization": "Bearer " + localStorage.getItem('token') 
                  }
              });
              
              if(responseFav.ok){
                  const dataFav = await responseFav.json();
                  setFavs(dataFav.favorites);
              }
              
          } catch (error) {
              console.error(error);
          }
        }
      
      
        fetchPosts();
        fetchFavorites();
    
      }, [postMore]);

      if(postMore == PageLimit ){
        Swal.fire({
          title: 'Has llegado al final de los post',
          icon: 'warning',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Volver'
        }).then((result) => {
          if (result.isConfirmed) {
            setPostMore(postMore - 1)
          }
        })
      } 
      console.log(postMore, PageLimit);

      if(postMore < 0){
        Swal.fire({
          title: 'Parece que no hay posts por mostrar',
          icon: 'warning',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Volver'
        }).then((result) => {
          if (result.isConfirmed) {
            setPostMore(postMore + 1)
          }
        })
      }


    return ( 
    
    <div className="min-h-screen bg-dark-400">
      <Navbar />

      <div className="flex justify-center">
        <div className="w-11/12 mt-11">
          <div className="flex flex-col gap-3 mb-5 lg:gap-0 lg:flex-row lg:justify-between">
             <button onClick={()=>{setPostMore(postMore - 1)}} className="flex items-center justify-center px-4 py-1 mx-3 text-white transform bg-dark-700 x-2 hover:scale-105 hover:text-dark-700 hover:bg-white motion-reduce:transform-none rounded-2xl "><AiOutlineArrowLeft className="inline "/> <div>Página anterior</div> </button> 
             <button onClick={()=>{setPostMore(postMore + 1)}} className="flex items-center justify-center px-4 py-1 mx-3 text-white transform bg-dark-700 x-2 hover:scale-105 hover:text-dark-700 hover:bg-white motion-reduce:transform-none rounded-2xl "> <div>Página siguiente</div> <AiOutlineArrowRight className="inline "/> </button>  
          </div>

          {
            post.length > 0?
              post.map((p)=>{
                return(
                  <CardPost
                    post={p}
                    key={p._id}
                    favs={favs}
                  />
                )
              })
              :
              null
          }
        
          <div className="flex flex-col gap-3 mb-10 lg:gap-0 lg:flex-row lg:justify-between">
             <button onClick={()=>{setPostMore(postMore - 1)}} className="flex items-center justify-center px-4 py-1 mx-3 text-white transform bg-dark-700 x-2 hover:scale-105 hover:text-dark-700 hover:bg-white motion-reduce:transform-none rounded-2xl "><AiOutlineArrowLeft className="inline "/> <div>Página anterior</div> </button> 
             <button onClick={()=>{setPostMore(postMore + 1)}} className="flex items-center justify-center px-4 py-1 mx-3 text-white transform bg-dark-700 x-2 hover:scale-105 hover:text-dark-700 hover:bg-white motion-reduce:transform-none rounded-2xl "> <div>Página siguiente</div> <AiOutlineArrowRight className="inline "/> </button>  
          </div>

        </div>
      </div>

      <div className="relative pt-1 bg-gradient-to-r from-aqua to-skyD"></div>
    </div>
        );
}
 
export default MyPosts;