import { useEffect } from 'react';
import Banner from './Sections/Banner';
import QuizCategories from './Sections/QuizCategories';

const StartQuiz = () => {
  useEffect(() => {
    window.scrollTo(0, 0);

    localStorage.removeItem('quiz_questions');
  });
  return (
    <div className="bg-gray-900 min-h-screen">
      <Banner />
      <QuizCategories />
    </div>
  );
};

export default StartQuiz;
