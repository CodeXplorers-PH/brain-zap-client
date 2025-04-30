import { useEffect, useState } from 'react';
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';

const useUserSubscriptionType = () => {
  const { user } = useAuth();
  const [userType, setUserType] = useState('');
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await axiosSecure.get(`/userInfo`);
        setUserType(res?.data?.userInfo?.subscription);
      } catch (err) {
        console.error('Error fetching user info:', err);
      }
    };

    user && fetchUserInfo();
  }, [user]);

  return [userType || null];
};

export default useUserSubscriptionType;
