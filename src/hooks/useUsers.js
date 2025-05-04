import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';

const useUsers = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const getUsers = async () => {
    if (!user) {
      return [];
    }

    const { data } = await axiosSecure.get('/users');
    return data || [];
  };

  const { data: users = [] } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });

  return users;
};

export default useUsers;
