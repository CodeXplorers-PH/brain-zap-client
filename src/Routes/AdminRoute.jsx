import { Navigate, useLocation } from 'react-router-dom';
import Loader from '../components/Loader/Loader';
import useAuth from '../hooks/useAuth';

const AdminRoute = ({ children }) => {
  const { user, loading, isAdmin } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Loader></Loader>;
  }

  if (user && isAdmin) {
    return children;
  }

  return <Navigate to={'/'} state={{ from: location }} replace></Navigate>;
};

export default AdminRoute;
