import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Quiz from "../Quiz/Quiz";
import axios from "axios";

const QuizPage = () => {
  const { category } = useParams(); // Get category from URL
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const localStorageKey = `quiz_${category}`; // Unique key per category

    // Check local storage
    const storedQuiz = localStorage.getItem(localStorageKey);

    // If Questions Already Have in Local Storage Fetch Them
    if (storedQuiz) {
      setQuestions(JSON.parse(storedQuiz)); // Load from local storage
      setLoading(false);
    } else {
      fetchQuestions();
    }

    async function fetchQuestions() {
      setLoading(true);
      const endpoint = `http://localhost:5000/generate_quiz?topic=${category}&difficulty=medium`;
      try {
        const response = await axios.get(endpoint);
        const generatedQuiz = response.data;

        setQuestions(generatedQuiz);
        localStorage.setItem(localStorageKey, JSON.stringify(generatedQuiz)); // Save to local storage
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setLoading(false);
      }
    }
  }, [category]);

  return (
    <div className="pt-38 pb-10 bg-gradient-to-br from-huf-purple/40 to-sky-200/20">
      <h2 className="uppercase text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-800 text-center mb-10">
        Quiz on {category}
      </h2>
      {loading ? (
        <h3 className="text-center text-2xl text-gray-500">
          Generating Questions...
        </h3>
      ) : (
        <Quiz questions={questions} />
      )}
    </div>
  );
};

export default QuizPage;
