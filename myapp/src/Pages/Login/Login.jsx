import { useState } from "react";
import { useUserContext } from "../../Contexts/UserContext";

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const { login, token } = useUserContext();

    const onChange = (e, save) => {
        save(e.target.value);
      };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const logged = await login(username, password);
        setError(!logged);
        setUsername("");
        setPassword("");
      };

      if (token) {
        alert("Usuario Logeado")
      }

    return (
        <div className="flex  justify-center items-center min-h-screen">
          <main>
            <form 
              className=" flex flex-col bg-gray gap-10 p-10 w-96"
              onSubmit = { onSubmitHandler }>
              <h1>Titulo</h1>
              <input 
                className="p-2 rounded"
                title='Username'
                type='text'
                placeholder='Ingrese su username'
                onChange={(e) => onChange(e, setUsername)}
                value={username}
                />
                
                <input 
                className="p-2"
                title='Password'
                type="password"
                placeholder="Ingrese su contraseña"
                onChange={(e) => onChange(e, setPassword)}
                value={password}
                />
              <button className="p-1 text-white bg-skyD rounded-md">
                Ingresar
              </button>
              
            </form>
          </main>
        </div>
      );
};

export default Login;