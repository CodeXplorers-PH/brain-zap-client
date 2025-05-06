import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Quiz from '../Quiz/Quiz';
import useQuiz from '@/hooks/useQuiz';

const QuizPage = () => {
  const { questions, loading, error } = useQuiz();
  const { category } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `${
      category.charAt(0).toUpperCase() + category.slice(1)
    } Quiz | BrainZap`;
  }, [category]);

  const handleQuizSubmit = (answers) => {
    // Optionally process answers here
    navigate(`/quiz/${category}/answer`);
  };

  return (
    <div className="bg-gray-900 min-h-screen pt-32 pb-20 px-4">

      {loading ? (
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-500 mb-6"></div>
          <p className="text-gray-300 text-2xl font-medium">Generating Questions...</p>
        </div>
      ) : error ? (
        <div className="text-center p-10 bg-gray-800/30 rounded-3xl border border-gray-700/30 backdrop-blur-sm">
          <p className="text-red-400 text-2xl mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl text-white font-semibold center hover:from-indigo-700 hover:to-blue-700 transition-all"
          >
            Retry
          </button>
        </div>
      ) : (
        <Quiz questions={questions} category={category} onSubmit={handleQuizSubmit} />
      )}
    </div>
  );
};

export default QuizPage;