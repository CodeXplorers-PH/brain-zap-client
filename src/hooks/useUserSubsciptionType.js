import { useEffect, useState } from 'react';
import useAxiosSecure from './useAxiosSecure';

const useUserSubsciptionType = () => {
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

    fetchUserInfo();
  }, []);

  return [userType];
};

export default useUserSubsciptionType;
