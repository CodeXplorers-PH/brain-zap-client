import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Quiz from '../Quiz/Quiz';
import useAxiosSecure from '@/hooks/useAxiosSecure';

const QuizPage = () => {
  const { category } = useParams();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const axiosSecure = useAxiosSecure();

  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);

  const difficulty = queryParams.get('difficulty');
  const quizzesNumber = Number(queryParams.get('quizzesNumber'));
  const quizzesType = queryParams.get('type');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    let abortController = new AbortController();

    const localStorageKey = `quiz_questions`;
    const storedQuiz = localStorage.getItem(localStorageKey);

    if (storedQuiz) {
      setQuestions(JSON.parse(storedQuiz));
      setLoading(false);
    } else {
      fetchQuestions(abortController.signal);
    }

    async function fetchQuestions(signal) {
      setLoading(true);
      setError(null);
      try {
        const { data: generatedQuiz } = await axiosSecure.post(
          `/secure_graphql`,
          {
            query: `
            query GetQuizzes($topic: String!, $difficulty: String!, $quizzesNumber: Int!, $type: String!) {
              getQuizzes(topic: $topic, difficulty: $difficulty, quizzesNumber: $quizzesNumber, type: $type) {
                question
                options
                answer
              }
            }
    `,
            variables: {
              topic: category,
              difficulty: difficulty,
              quizzesNumber: Number(quizzesNumber),
              type: quizzesType || 'mc',
            },
          }
        );

        if (!signal.aborted) {
          setQuestions(generatedQuiz?.data?.getQuizzes);
          localStorage.setItem(
            localStorageKey,
            JSON.stringify(generatedQuiz?.data?.getQuizzes)
          );
        }
      } catch (err) {
        console.error('Error fetching questions:', err);
        setError('Failed to load questions. Please try again later.');
      } finally {
        if (!signal.aborted) {
          setLoading(false);
        }
      }
    }

    return () => {
      abortController.abort();
    };
  }, [category, difficulty, quizzesNumber]);

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
