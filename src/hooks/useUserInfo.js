import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useUserInfo = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const fetchUser = async () => {
    if (!user) {
      return null;
    }

    const { data } = await axiosSecure.get('/userInfo');

    return data.userInfo;
  };

  const { data: userInfo = null, refetch } = useQuery({
    queryKey: ['userInfo', user],
    queryFn: fetchUser,
  });

  return { userInfo, refetch };
};

export default useUserInfo;
