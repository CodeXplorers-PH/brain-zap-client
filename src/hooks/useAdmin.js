import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";

const useAdmin = () => {
  const { user, loading } = useAuth();
  const axiosPublic = useAxiosPublic();

  const [isAdmin, setIsAdmin] = useState(false);
  const [isAdminLoading, setIsAdminLoading] = useState(true);

  useEffect(() => {
    if (!loading && user?.email) {
      setIsAdminLoading(true);
      axiosPublic
        .get(`/user/admin/${user?.email}`)
        .then((res) => {
          setIsAdmin(res.data?.admin);
        })
        .catch((err) => {
          console.error("Failed to fetch admin status:", err);
          setIsAdmin(false);
        })
        .finally(() => {
          setIsAdminLoading(false);
        });
    }
  }, [user, loading, axiosPublic]);

  return [isAdmin, isAdminLoading];
};

export default useAdmin;
