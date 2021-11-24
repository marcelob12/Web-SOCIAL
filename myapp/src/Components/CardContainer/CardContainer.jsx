import React, {useState, useEffect} from 'react';
import CardPost from '../../Components/CardPost/CardPost';
import Navbar from '../../Components/Navbar/Navbar';
import Swal from 'sweetalert2';

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
          <div>
            
        <button className="flex" onClick={()=>{setPostMore(postMore - 1)}}> ver menos post </button> 
        <button className="flex" onClick={()=>{setPostMore(postMore + 1)}}> ver mas post </button>
            
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
        
      <button className="flex" onClick={()=>{setPostMore(postMore - 1)}}> ver menos post </button>
      <button className="flex" onClick={()=>{setPostMore(postMore + 1)}}> ver mas post </button>
        </div>
      </div>
    </div>
  );
}

export default CardContainer;