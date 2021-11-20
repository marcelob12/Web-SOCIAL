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
        <div className="flex  justify-center">
          <main>
            <form 
              className=" flex flex-col bg-blue-500 gap-10 p-10"
              onSubmit = { onSubmitHandler }>
              <h1>Titulo</h1>
              <input 
                title='Username'
                type='text'
                placeholder='Ingrese su username'
                onChange={(e) => onChange(e, setUsername)}
                value={username}
                />
                
                <input 
                title='Password'
                type="password"
                placeholder="Ingrese su contraseña"
                onChange={(e) => onChange(e, setPassword)}
                value={password}
                />
              <button className="p-1 bg-blue-100">
                Ingresar
              </button>
              
            </form>
          </main>
        </div>
      );
};

export default Login;