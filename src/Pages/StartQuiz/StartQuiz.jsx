import { useEffect, useState } from "react";
import { useAuthContext } from "@/hooks/useAuthContext";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import Banner from "../StartQuiz/Sections/Banner";
import PersonalizedQuizSection from "../QuizPersonalized/PersonalizedQuiz";
import QuizCategories from "../StartQuiz/Sections/QuizCategories";

const StartQuiz = () => {
  const [userInfo, setUserInfo] = useState(null);
  const { user } = useAuthContext();
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    window.scrollTo(0, 0);
    localStorage.removeItem("quiz_questions");

    const fetchUserInfo = async () => {
      try {
        if (user?.email) {
          const res = await axiosPublic.get(`/userInfo/${user.email}`);
          setUserInfo(res.data);
        } else {
          setUserInfo(null);
        }
      } catch (err) {
        console.error("Error fetching user info:", err);
        setUserInfo(null);
      }
    };

    fetchUserInfo();
  }, [axiosPublic, user?.email]);

  // Determine if user has a Pro or Elite subscription
  const hasSubscription = userInfo?.subscription === "Pro" || userInfo?.subscription === "Elite";

  if (userInfo === null) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500 mb-4"></div>
          <p className="text-gray-300">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen">
      <Banner />
      <PersonalizedQuizSection hasSubscription={hasSubscription} />
      <QuizCategories />
    </div>
  );
};

export default StartQuiz;