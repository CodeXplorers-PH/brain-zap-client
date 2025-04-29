import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";

const useUserSubsciptionType = () => {
  const { user } = useAuth();
  const [userType, setUserType] = useState("");
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    if (!user?.email) return;

    const fetchUserInfo = async () => {
      try {
        const res = await axiosPublic.get(`/userInfo/${user.email}`);
        setUserType(res?.data?.userInfo?.subscription);
      } catch (err) {
        console.error("Error fetching user info:", err);
      }
    };

    fetchUserInfo();
  }, [axiosPublic, user]);

  return [userType];
};

export default useUserSubsciptionType;
