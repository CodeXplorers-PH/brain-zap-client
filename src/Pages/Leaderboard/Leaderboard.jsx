import useAuth from "@/hooks/useAuth";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useEffect, useState } from "react";

const Leaderboard = () => {
  const [score, setScore] = useState([]);
  const user = useAuth();
  const axiosPublic = useAxiosPublic();
  useEffect(() => {
    axiosPublic.get(`/userBoard/${user?.email}`).then((res) => {
      console.log("User info", res.data);
    });
  }, []);
  return <div className="h-screen"></div>;
};

export default Leaderboard;
