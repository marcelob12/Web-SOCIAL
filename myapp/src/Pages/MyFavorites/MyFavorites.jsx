import React, {useState, useEffect} from 'react'
import Navbar from '../../Components/Navbar/Navbar';
import CardPost from '../../Components/CardPost/CardPost';
import Swal from 'sweetalert2';


const MyFavorites = () => {
    const token = localStorage.getItem("token");
    const [post, setPost] = useState([]);
    const [fav, setFav] = useState([])
    const [postMore , setPostMore] = useState(0);


    // if(postMore < 0){
    //     Swal.fire({
    //       title: 'Parece que no hay posts por mostrar',
    //       icon: 'warning',
    //       confirmButtonColor: '#3085d6',
    //       confirmButtonText: 'Volver'
    //     }).then((result) => {
    //       if (result.isConfirmed) {
    //         setPostMore(postMore + 1)
    //       }
    //     })
    // }

    useEffect(() => {
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
                    setFav(dataFav.favorites)
                }

            } catch (error) {
                console.error(error);
            }
        }
        

        fetchFavorites();

    }, [])


    useEffect(() => {
        const fetchPosts = async (id)=>{
            try {
                const response = await fetch(`https://posts-pw2021.herokuapp.com/api/v1/post/one/${id}`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
                
                if (response.ok) {
                    const onePost = await response.json();
                    return onePost;
                }
                
            } catch (error) {
                console.error(error);
            }
   
        }

        const result = fav.map(f =>{
            return fetchPosts(f);
        });

        const getFavPosts = async () =>{  
            const favPosts = await Promise.all(result);
            setPost(favPosts);
        }

        getFavPosts();
    }, [fav])


    return ( 
        <div className="min-h-screen bg-dark-400">
      
            <Navbar />
            
            <div className="flex justify-center">
                <div className="w-11/12 mt-11">
                    {/* <div className="flex flex-col gap-3 lg:gap-0 lg:flex-row lg:justify-between mb-5">
                        <button onClick={()=>{setPostMore(postMore - 1)}} className="flex justify-center items-center px-4 py-1 mx-3 text-white transform bg-dark-700 x-2 hover:scale-105 hover:text-dark-700 hover:bg-white motion-reduce:transform-none rounded-2xl "><AiOutlineArrowLeft className="inline "/> <div>Página anterior</div> </button> 
                        <button onClick={()=>{setPostMore(postMore + 1)}} className="flex justify-center items-center px-4 py-1 mx-3 text-white transform bg-dark-700 x-2 hover:scale-105 hover:text-dark-700 hover:bg-white motion-reduce:transform-none rounded-2xl "> <div>Página siguiente</div> <AiOutlineArrowRight className="inline "/> </button>  
                    </div> */}
        
                    {
                        post.map((p)=>{
                            let arrayFavs = [];
                            arrayFavs.push(p._id);
                            
                            if(p){
                                return(
                                    <CardPost
                                        post={p}
                                        key={p._id}
                                        favs={arrayFavs}
                                    />
                                )
                            } else{
                                return(
                                    <h1>No hay posts</h1>
                                )
                            }
                        })    
                    }
                
                    {/* <div className="flex flex-col gap-3 lg:gap-0 lg:flex-row lg:justify-between mb-10">
                        <button onClick={()=>{setPostMore(postMore - 1)}} className="flex justify-center items-center px-4 py-1 mx-3 text-white transform bg-dark-700 x-2 hover:scale-105 hover:text-dark-700 hover:bg-white motion-reduce:transform-none rounded-2xl "><AiOutlineArrowLeft className="inline "/> <div>Página anterior</div> </button> 
                        <button onClick={()=>{setPostMore(postMore + 1)}} className="flex justify-center items-center px-4 py-1 mx-3 text-white transform bg-dark-700 x-2 hover:scale-105 hover:text-dark-700 hover:bg-white motion-reduce:transform-none rounded-2xl "> <div>Página siguiente</div> <AiOutlineArrowRight className="inline "/> </button>  
                    </div> */}
        
                </div>
            </div>
    
            <div className="relative pt-1 bg-gradient-to-r from-aqua to-skyD"></div>
        </div>

    );
}
 
export default MyFavorites;