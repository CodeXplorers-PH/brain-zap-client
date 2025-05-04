import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const getHistory = async () => {
    if (!user) {
      return [];
    }

    const { data } = await axiosSecure.get(`/quiz_history`);
    return data || [];
  };

  const { data: history = [] } = useQuery({
    queryKey: ['history', user],
    queryFn: getHistory,
  });

  return history;
};

export default useHistory;
