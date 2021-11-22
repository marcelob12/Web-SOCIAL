import { useUserContext } from "../../Contexts/UserContext";
import { useNavigate } from "react-router-dom";
import React,{ useRef } from "react";
import axios from 'axios';
import Swal from 'sweetalert2';
import {HiOutlinePencilAlt} from 'react-icons/hi'
import {BiRename} from 'react-icons/bi';
import {BsFillImageFill} from 'react-icons/bs';
import {AiOutlineArrowLeft} from 'react-icons/ai'


const BASE_URL = "https://posts-pw2021.herokuapp.com/api/v1";


const CreatePost = () => {
  const navigate = useNavigate();
  const title = useRef(null);
  const description = useRef(null);
  const image = useRef(null);
  
  async function onSubmit(e)
  {
    e.preventDefault();
    const titleValue = title.current.value
    const descriptionValue = description.current.value
    const imageValue = image.current.value

    if (titleValue === "" || descriptionValue === "" || descriptionValue.lengh || imageValue === ""){
      Swal.fire({
        icon: 'error',
        title: 'ERROR',
        text: 'Por favor llenar todos los campos',
      })
    }
    
    //validacion para la descripcion del post sea mayor a 8 caracteres
    else if (descriptionValue.length < 8) {
      Swal.fire({
        icon: 'warning',
        title: 'ERROR',
        text: 'La descripcion del post debe ser mayor a 8 caracteres',
      })
    }
    
    try{
      const response = await axios.post(`${BASE_URL}/post/create`, {title: titleValue, description: descriptionValue, image: imageValue},
      {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'}}
      );  

      Swal.fire({
        icon: 'success',
        title: 'Creado',
        text: 'Post publicado con exito',
      })
     
      if (response.status === 200) {
        localStorage.getItem('token', response.data.token);
        navigate('/admin');
    }
    }
    catch(error){
      const{response} = error;
      if (response.status === 401) {
        Swal.fire({
          icon: 'error',
          title: 'ERROR',
          text: 'No estas autorizado',
        })
      }
      else if (response.status === 404) {
        Swal.fire({
          icon: 'error',
          title: 'ERROR',
          text: 'No se pudo crear el post',
        })
      }
    }

    title.current.value = "";
    description.current.value = "";
    image.current.value = "";
  }

    const auth = useUserContext();
   

    const onClickHandler = (e) =>{
        e.preventDefault();

        auth.logout();
        navigate("/login");
    }
    const onClickHandler2 = (e) =>{
      e.preventDefault();
      navigate("/ErrorPage");
  }
      
    return (
      <div className="bg-gray-900 ">

       <div className="flex ">
        <button  onClick= {onClickHandler}  className="flex px-2 py-2 mx-3 mt-6 text-white transform bg-gray-700 rounded-full hover:scale-105 hover:text-gray-900 hover:bg-white motion-reduce:transform-none "><span><AiOutlineArrowLeft className="inline "/></span> Volver </button>
        <button  onClick= {onClickHandler2}  className="items-end px-2 py-2 mx-3 mt-6 text-white transform bg-gray-700 rounded-full x-2 hover:scale-105 hover:text-gray-900 hover:bg-white motion-reduce:transform-none "> ver los posts </button>
       </div>
   
        

      <div className="flex flex-col items-center min-h-screen pt-20 bg-gray-900">
            <main className="p-2 rounded-md bg-gradient-to-r from-green-400 to-blue-500">

              <div className="w-full max-w-3xl p-1 bg-blue-100 rounded-md shadow-md md:p-10">
                
                <form  onSubmit={onSubmit} className="flex flex-col items-center justify-center gap-4">
                    <h2 className="mb-4 text-4xl font-black text-gray-800 font-monserrat">Crea un POST</h2>
                    
                    <div class="flex">
                    <span class="text-lg border border-2 rounded-l px-4 py-2 bg-gray-300"><BiRename /></span>
                    <input autocomplete="false"  className="w-full px-4 py-2 rounded-r focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"  type="text" placeholder="Título"
                    ref={title}/>
                   
                    </div>
                                        
                    <div class="flex">
                    <span class="text-lg border border-2 rounded-l px-4 py-2 bg-gray-300"><HiOutlinePencilAlt /></span>
                    <input autocomplete="false" className="w-full px-4 py-2 rounded-r focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent" type="text" placeholder="Descripción"
                    ref={description}/>
                                      
                    </div>

                    <div class="flex">
                    <span class="text-lg border border-2 rounded-l px-4 py-2 bg-gray-300"><BsFillImageFill /></span>
                    <input autocomplete="false" className="w-full px-4 py-2 rounded-r focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent" type="text" placeholder="Url de la imagen"
                    ref={image}/>
                    </div>
                    
                    <button className="w-full px-4 py-2 mt-6 text-xl text-white uppercase transition duration-300 ease-in-out border rounded bg-gradient-to-r from-green-400 to-blue-500 text-bold hover:text-black">
                        Publicar 
                    </button>
                </form>
              </div>
            </main>

    </div>
      </div>  
);
}



export default CreatePost;