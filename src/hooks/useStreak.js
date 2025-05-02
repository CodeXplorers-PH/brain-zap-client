import { useEffect, useState } from 'react';
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';

const useStreak = () => {
  const { user } = useAuth();
  const [streak, setStreak] = useState(0);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    (async () => {
      if (!user?.email) {
        setStreak(0);
        return;
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
        setStreak(0);
        return;
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

      setStreak(streakCount);
    })();
  }, [user]);

  return streak;
};

export default useStreak;
