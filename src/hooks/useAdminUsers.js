import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';

const useAdminUsers = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const fetchAdminUsers = async () => {
    if (!user) {
      return [];
    }

    const { data } = await axiosSecure.get('/allUsers/information');
    return data?.users || [];
  };

  const {
    data: users = [],
    isLoading: loading,
    refetch,
  } = useQuery({
    queryKey: ['adminUsers'],
    queryFn: fetchAdminUsers,
  });

  return { users, loading, refetch };
};

export default useAdminUsers;
