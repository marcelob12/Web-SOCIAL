import React, {useState, useEffect} from 'react';
import CardPost from '../../Components/CardPost/CardPost';
import Navbar from '../../Components/Navbar/Navbar';
import Swal from 'sweetalert2';
import {AiOutlineArrowLeft} from 'react-icons/ai'
import {AiOutlineArrowRight} from 'react-icons/ai'



const CardContainer = () => {
  const token = localStorage.getItem("token");
  const [post, setPost] = useState([]);
  const [postMore , setPostMore] = useState(0);
  
  
  
  useEffect(() => {
    const fetchPosts = async () =>{
      try {
        const response = await fetch(`https://posts-pw2021.herokuapp.com/api/v1/post/all?limit=20&page=${postMore}`, {
          "method": "GET",
          "headers":{
            "Authorization": `Bearer ${token}`
          }
        });
  
        if(response.ok){
          const data = await response.json();
          setPost(data.data);
        }
  
        
      } catch (error) {
        console.error(error);
      }
    };
    
    fetchPosts();
  }, [postMore]);
  

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
    
  
  
  console.log(postMore);
  
  
//Falta estilo de los botones para + y - posts
  return (
    <div className="min-h-screen bg-dark-400">
      <Navbar />
      <div className="flex justify-center">
        <div className="w-11/12 mt-11">
          <div className="mb-5">
             <button onClick={()=>{setPostMore(postMore - 1)}} className="px-4 py-1 mx-3 text-white transform bg-dark-700 x-2 hover:scale-105 hover:text-dark-700 hover:bg-white motion-reduce:transform-none rounded-2xl "><AiOutlineArrowLeft className="inline "/> Regresar Posts </button> 
             <button onClick={()=>{setPostMore(postMore + 1)}} className="px-4 py-1 mx-3 text-white transform bg-dark-700 x-2 hover:scale-105 hover:text-dark-700 hover:bg-white motion-reduce:transform-none rounded-2xl "><AiOutlineArrowRight className="inline "/> Siguientes Posts </button>  
          </div>

          {
            post.length > 0?
              post.map((p)=>{
                return(
                  <CardPost
                    post={p}
                    key={p._id}
                  />
                )
              })
              :
              null
          }
        
        <button onClick={()=>{setPostMore(postMore - 1)}} className="px-4 py-1 mx-3 text-white transform bg-dark-700 x-2 hover:scale-105 hover:text-dark-700 hover:bg-white motion-reduce:transform-none rounded-2xl "><AiOutlineArrowLeft className="inline "/> Regresar Posts </button> 
        <button onClick={()=>{setPostMore(postMore + 1)}} className="px-4 py-1 mx-3 text-white transform bg-dark-700 x-2 hover:scale-105 hover:text-dark-700 hover:bg-white motion-reduce:transform-none rounded-2xl "><AiOutlineArrowRight className="inline "/> Siguientes Posts </button>
        </div>
      </div>
      <div className="relative pt-1 bg-gradient-to-r from-aqua to-skyD"></div>
    </div>
  );
}

export default CardContainer;