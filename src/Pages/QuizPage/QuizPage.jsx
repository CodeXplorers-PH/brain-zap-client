import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Quiz from '../Quiz/Quiz';
import useQuiz from '@/hooks/useQuiz';

const QuizPage = () => {
  const { questions, loading, error } = useQuiz();
  const { category } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `${
      category.charAt(0).toUpperCase() + category.slice(1)
    } Quiz | BrainZap`;
  }, [category]);

  return (
    <div className="bg-gray-900 min-h-screen pt-32 pb-20 px-4">
      <h2 className="text-4xl md:text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-12 capitalize">
        {category} Quiz
      </h2>

      {loading ? (
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mb-4"></div>
          <p className="text-gray-400 text-xl">Generating Questions...</p>
        </div>
      ) : error ? (
        <div className="text-center">
          <p className="text-red-400 text-xl mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-gray-800 rounded-lg text-white hover:bg-gray-700 transition-colors"
          >
            Retry
          </button>
        </div>
      ) : (
        <Quiz questions={questions} />
      )}
    </div>
  );
};

export default QuizPage;
