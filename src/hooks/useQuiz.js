import { useLocation, useParams } from 'react-router-dom';
import useAxiosSecure from './useAxiosSecure';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';

const useQuiz = () => {
  const mountRef = useRef(true);
  const hasFetchedRef = useRef(false);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const axiosSecure = useAxiosSecure();
  const { category } = useParams();
  const { search } = useLocation();

  // Get Search Params
  const queryParams = new URLSearchParams(search);

  const difficulty = queryParams.get('difficulty');
  const quizzesNumber = Number(queryParams.get('quizzesNumber'));
  const quizzesType = queryParams.get('type');

  const localStorageKey = `quiz_questions`;

  // Fetch Quiz
  const fetchQuestions = async () => {
    const { data: generatedQuiz } = await axiosSecure.post('/graphql_s', {
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
    });

    return generatedQuiz?.data?.getQuizzes;
  };

  const { mutate } = useMutation({
    mutationFn: fetchQuestions,
    onSuccess: data => {
      if (mountRef.current) {
        setQuestions(data);
        localStorage.setItem(localStorageKey, JSON.stringify(data));
        setLoading(false);
      }
    },
    onError: err => {
      console.error('Error fetching questions: ', err);
      if (mountRef.current) {
        setError('Failed to load questions. Please try again later.');
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    mountRef.current = true;
    const storedQuiz = localStorage.getItem(localStorageKey);

    if (storedQuiz) {
      setQuestions(JSON.parse(storedQuiz));
      setLoading(false);
    } else if (!hasFetchedRef.current) {
      hasFetchedRef.current = true;
      setLoading(true);
      mutate();
    }

    return () => {
      mountRef.current = false;
    };
  }, []);

  return { questions, loading, error };
};

export default useQuiz;
