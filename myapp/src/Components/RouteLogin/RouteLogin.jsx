import { useUserContext } from './../../Contexts/UserContext';
import { Navigate } from 'react-router-dom';

const RouteLogin = ({role, children }) => {
  const { token, user } = useUserContext();
  console.log(token);
  if(!token) {
    console.log("BUM");
    return <Navigate replace to="/login"/>;
  }
  if(!user || user.role !== role) return <Navigate replace to="/ErrorPage"/>;

  return children;
}
export default RouteLogin;