import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContextProvider";

const PrivateRoute = () => {
  const { checkAuth } = useAuth();

  return checkAuth() ? <Outlet /> : <Navigate to="/user" />;
};

export default PrivateRoute;
