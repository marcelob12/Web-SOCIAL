import { Navigate } from "react-router-dom";
import { useUserContext } from "../../Contexts/UserContext";


const rolePages = {
    "admin": "/AdminMain",
    "user": "/UserMain"
}

const Redirect = () => {
    const {user} = useUserContext();

    if(!user) {
        return (<h1>Error</h1>);
    }

    return <Navigate replace to={rolePages[user.role] ?? "/"} />;
}

export default Redirect;