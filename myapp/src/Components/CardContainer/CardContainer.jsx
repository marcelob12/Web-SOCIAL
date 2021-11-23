import React, {useState, useEffect} from 'react';
import CardPost from '../../Components/CardPost/CardPost';
import Navbar from '../../Components/Navbar/Navbar';

const CardContainer = () => {
  const token = localStorage.getItem("token");
  const [post, setPost] = useState([]);


  useEffect(() => {
    const fetchPosts = async () =>{
      try {
        const response = await fetch("https://posts-pw2021.herokuapp.com/api/v1/post/all?limit=30&page=0", {
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
  }, []);
  

  return (
    <div className="min-h-screen bg-dark-400">
      <Navbar />
      <div className="flex justify-center">
        <div className="w-11/12 mt-11">

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
        
        </div>
      </div>
      
    </div>
  );
}

export default CardContainer;