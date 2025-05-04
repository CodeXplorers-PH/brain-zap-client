import { useEffect } from 'react';
import { useAuthContext } from '@/hooks/useAuthContext';
import Banner from '../StartQuiz/Sections/Banner';
import PersonalizedQuizSection from '../QuizPersonalized/PersonalizedQuiz';
import QuizCategories from '../StartQuiz/Sections/QuizCategories';

const StartQuiz = () => {
  const { user, userType, loading } = useAuthContext();

  useEffect(() => {
    window.scrollTo(0, 0);
    localStorage.removeItem('quiz_questions');
    document.title = 'Start Quiz | BrainZap';
  }, [user]);

  // Determine if user has a Pro or Elite subscription

  if (loading) {
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
    <>
      <div className="bg-gray-900 min-h-screen">
        <Banner />
        <div className="relative">
          {/* Personalized Quiz Section with Loading Overlay */}
          <PersonalizedQuizSection hasSubscription={userType} />
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm rounded-xl">
              <div className="flex items-center justify-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
              </div>
            </div>
          )}
        </div>
        <QuizCategories />
      </div>
    </>
  );
};

export default StartQuiz;
