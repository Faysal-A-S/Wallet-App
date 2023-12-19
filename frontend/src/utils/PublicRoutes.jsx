import useAuth from "./useAuth";
import { Navigate } from "react-router-dom";

const PublicRoutes = ({ children }) => {
  const isLoggedIn = useAuth();

  return !isLoggedIn ? children : <Navigate to={"/"} replace={true} />;
};

export default PublicRoutes;
