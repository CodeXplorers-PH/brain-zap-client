import { useLocation, useParams } from 'react-router-dom';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';

const useQuiz = () => {
  const isMounted = useRef(true);

  const axiosSecure = useAxiosSecure();
  const { category } = useParams();
  const { search } = useLocation();

  // Get Search Params
  const queryParams = new URLSearchParams(search);
  const difficulty = queryParams.get('difficulty');
  const quizzesNumber = Number(queryParams.get('quizzesNumber'));
  const quizzesType = queryParams.get('type');

  const localStorageKey = `quiz_questions`;

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  // Fetch Quiz
  const fetchQuestions = async () => {
    const storedQuiz = localStorage.getItem(localStorageKey);
    if (storedQuiz) {
      return JSON.parse(storedQuiz);
    }

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

    const questions = generatedQuiz?.data?.getQuizzes;

    if (isMounted.current) {
      localStorage.setItem(localStorageKey, JSON.stringify(questions));
    }

    return questions;
  };

  // Query Fn
  const {
    data: questions = [],
    isLoading,
    isFetching,
    isError,
    error,
  } = useQuery({
    queryKey: ['quiz', category, difficulty, quizzesNumber, quizzesType],
    queryFn: fetchQuestions,
  });

  if (error) {
    console.log('Error to fetch Quizzes --> ', error);
  }

  return {
    questions,
    loading: isLoading || isFetching,
    error: isError ? 'Failed to load questions. Please try again later.' : null,
  };
};

export default useQuiz;
