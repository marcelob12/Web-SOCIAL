import { useState, useEffect } from "react";
import { useUserContext } from "../../Contexts/UserContext";
import { useNavigate } from "react-router-dom";
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
          <form 
            className="flex flex-col gap-10 p-10 bg-gray w-96"
            onSubmit = { onSubmitHandler }>
            <h1>Logeate</h1>
            <input 
              className="p-2 rounded"
              title='Username'
              type='text'
              placeholder='Ingrese su username'
              onChange={(e) => onChange(e, setUsername)}
              value={Username}
              />
              
              <input 
              className="p-2"
              title='Password'
              type="password"
              placeholder="Ingrese su contraseña"
              onChange={(e) => onChange(e, setPassword)}
              value={Password}
              />
            <button className="p-1 text-white rounded-md bg-skyD">
              Ingresar
            </button>
            
          </form>
        </main>
    </div>
    );
}

export default Login