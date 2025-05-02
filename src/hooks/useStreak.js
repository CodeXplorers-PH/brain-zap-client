import { useEffect, useState } from 'react';
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';
import { useLocation } from 'react-router-dom';

const useStreak = () => {
  const { user } = useAuth();
  const [streak, setStreak] = useState(0);
  const axiosSecure = useAxiosSecure();
  const { pathname } = useLocation();

  useEffect(() => {
    user?.email && localStorage.getItem('access_token')
      ? setStreak(getStreak())
      : setStreak(0);
  }, [user]);

  useEffect(() => {
    if (pathname.includes('quiz') && pathname.includes('answer') && user) {
      setStreak(getStreak());
    }
  }, [pathname]);

  const getStreak = async () => {
    if (!user?.email) {
      return 0;
    }

    const { data: userQuizzesDate } = await axiosSecure.get(
      '/quizzes_streak_date'
    );

    const today = new Date();
    const todayStr = today.toLocaleDateString('en-CA');

    const formatDateLocal = dateStr => {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-CA');
    };

    const quizDaysSet = new Set(
      userQuizzesDate.map(({ date }) => formatDateLocal(date))
    );

    if (!quizDaysSet.has(todayStr)) {
      return 0;
    }

    let streakCount = 1;

    for (let i = 1; ; i++) {
      const prevDate = new Date();
      prevDate.setDate(today.getDate() - i);
      const prevStr = prevDate.toLocaleDateString('en-CA');

      if (quizDaysSet.has(prevStr)) {
        streakCount++;
      } else {
        break;
      }
    }

    return streakCount;
  };

  return streak;
};

export default useStreak;
