import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Quiz from '../Quiz/Quiz';
import axios from 'axios';

const QuizPage = () => {
  const { category } = useParams();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const localStorageKey = `quiz_${category}`;
    const storedQuiz = localStorage.getItem(localStorageKey);

    if (storedQuiz) {
      setQuestions(JSON.parse(storedQuiz));
      setLoading(false);
    } else {
      fetchQuestions();
    }

    async function fetchQuestions() {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `https://brain-zap-server.vercel.app/generate_quiz?topic=${category}&difficulty=medium`
        );
        const generatedQuiz = response.data;
        setQuestions(generatedQuiz);
        localStorage.setItem(localStorageKey, JSON.stringify(generatedQuiz));
      } catch (err) {
        console.error('Error fetching questions:', err);
        setError('Failed to load questions. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
  }, [category]);

  return (
    <div className="bg-gray-900 min-h-screen pt-32 pb-20 px-4">
      <h2 className="text-4xl md:text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-12">
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
