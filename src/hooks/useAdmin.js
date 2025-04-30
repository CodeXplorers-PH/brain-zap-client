import { useEffect, useState } from 'react';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useAdmin = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [isAdmin, setIsAdmin] = useState(false);
  const [isAdminLoading, setIsAdminLoading] = useState(true);

  useEffect(() => {
    if (!loading && user?.email) {
      setIsAdminLoading(true);
      axiosSecure
        .get(`/user/admin`)
        .then(res => {
          setIsAdmin(res.data?.admin);
        })
        .catch(err => {
          console.error('Failed to fetch admin status:', err);
          setIsAdmin(false);
        })
        .finally(() => {
          setIsAdminLoading(false);
        });
    }
  }, [user, loading]);

  return [isAdmin, isAdminLoading];
};

export default useAdmin;
