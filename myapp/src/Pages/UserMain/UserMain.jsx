import React from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../Contexts/UserContext";


const ErrorPage = () => {  
    const navigate = useNavigate();
    const auth = useUserContext();
    const onClickHandler = (e) =>{
        e.preventDefault();
    
        auth.logout();
        navigate("/login");
    }


    return (
        <button  onClick= {onClickHandler}  className="flex px-2 py-2 mx-3 mt-6 text-white transform bg-gray-700 rounded-full hover:scale-105 hover:text-gray-900 hover:bg-white motion-reduce:transform-none "> Volver </button>

    );
    
}   

export default ErrorPage;