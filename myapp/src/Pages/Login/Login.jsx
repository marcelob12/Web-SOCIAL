import { useState, useEffect } from "react";
import { useUserContext } from "../../Contexts/UserContext";
import { useNavigate } from "react-router-dom";
import userlogin from "../../Assets/img/usuario.png";
import { HiOutlineLogin } from "react-icons/hi";
import Swal from "sweetalert2";

const Login = () => {
    // Recibimos la función login y el token guardadas en UserContext
    const navigate = useNavigate();
    const { login, token } = useUserContext();
    const [Username, setUsername] = useState("");
    const [Password, setPassword] = useState("");
    const [error, setError] = useState(false);

    // Se va guardando cada caracter que ingresamos al input
    const onChange = (e, save) => {
        save(e.target.value);
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const logged = await login(Username, Password);
        setError(!logged);
        
        if(error){
          Swal.fire({
            title: 'Usuario o contraseña no validos',
            icon: 'warning',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Volver'
          })
        }
        setUsername("");
        setPassword("");
    }
    
    useEffect(()=>{
        if(token){
            navigate("/redirect");
        }
    }, [token, navigate]);

    

    return (
      <div className="flex items-center justify-center min-h-screen bg-dark-700">
        <main>
          
          <div className="flex lg:flex-row gap-10 p-10 m-6  rounded-xl flex-col">
            <img className="pl-3 w-2/4" src={userlogin} alt="login-img"/>

            <form className="flex flex-col gap-10 p-10 m-2 bg-dark-400 w-11/12 rounded-3xl" onSubmit = { onSubmitHandler }>
                
                <h1 className="font-bold self-center font-content text-5xl text-aqua">Log in </h1>
                
                <input className="p-2 rounded hover:border-skyD focus:outline-skyBO "
                  title='Username'
                  type='text'
                  placeholder='Ingrese su username'
                  onChange={(e) => onChange(e, setUsername)}
                  value={Username}
                />
                  
                <input className="p-2 rounded hover:border-skyD focus:outline-skyBO "
                  title='Password'
                  type="password"
                  placeholder="Ingrese su contraseña"
                  onChange={(e) => onChange(e, setPassword)}
                  value={Password}
                />

                <div className="flex flex-row gap-5">
                  <HiOutlineLogin className="text-5xl text-skyL"/>
                  <button className="w-3/4 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-blue-700 hover:border-blue-500 rounded">
                  Ingresar
                  </button>
                </div>
                
            </form>

          </div>
        </main>
      </div>
    );
}

export default Login