import useAuth from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) {
    return <h1>Loading</h1>;
  }

  if (user) {
    return children;
  }

  return <Navigate to={"/login"}  />;
};

export default PrivateRoute;
