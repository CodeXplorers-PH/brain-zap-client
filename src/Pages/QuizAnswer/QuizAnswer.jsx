import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const QuizAnswer = () => {
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [correctAnswers, setCorrectAnswers] = useState({});
  const [loading, setLoading] = useState(true); // Loading state
  const { category } = useParams(); // Get quiz category from URL
  const [feedback, setFeedback] = useState(null); // Store AI feedback
  const [isFetchingFeedback, setIsFetchingFeedback] = useState(false); // Loading state for feedback

  const navigate = useNavigate();

  useEffect(() => {
    const fetchResults = () => {
      const storedQuiz = localStorage.getItem(`quiz_${category}`);
      const storedAnswers = localStorage.getItem("userAnswers");

      if (storedQuiz && storedAnswers) {
        try {
          const parsedQuiz = JSON.parse(storedQuiz);
          const parsedAnswers = JSON.parse(storedAnswers);

          setQuestions(parsedQuiz);
          setUserAnswers(parsedAnswers);

          // Extract correct answers
          const answers = {};
          parsedQuiz.forEach((q, index) => {
            answers[index] = q.answer;
          });
          setCorrectAnswers(answers);
        } catch (error) {
          console.error("Error parsing localStorage data:", error);
        }
      } else {
        console.warn("Quiz data or user answers not found in localStorage.");
      }

      setLoading(false);
    };

    const timer = setTimeout(fetchResults, 500);
    return () => clearTimeout(timer);
  }, [category]);

  const handleQuizAgain = () => {
    localStorage.clear(`quiz_${category}`);
    localStorage.clear("userAnswers");

    navigate("/start-quiz");
  };

  const handleGetFeedback = async () => {
    const storedQuiz = localStorage.getItem(`quiz_${category}`);
    const storedAnswers = localStorage.getItem("userAnswers");

    if (!storedQuiz || !storedAnswers) {
      alert("No quiz data found!");
      return;
    }

    const quizData = JSON.parse(storedQuiz);
    const userAnswers = JSON.parse(storedAnswers);

    const payload = {
      quizData,
      userAnswers,
    };

    setIsFetchingFeedback(true);

    try {
      const response = await fetch("http://localhost:5000/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      setFeedback(result);
    } catch (error) {
      console.error("Error fetching AI feedback:", error);
      alert("Failed to fetch feedback from AI.");
    } finally {
      setIsFetchingFeedback(false);
    }
  };

  const optionLabels = ["A.", "B.", "C.", "D."];

  return (
    <div className="bg-gradient-to-br from-huf-purple/40 to-sky-200/20 pt-40 pb-20">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-950 mb-10">
        Quiz Results & Correct Answers
      </h1>
      <div className="space-y-6 p-4 container mx-auto">
        {loading ? (
          <h1 className="text-center text-3xl font-bold text-gray-700">
            Loading results...
          </h1>
        ) : questions.length === 0 ? (
          <p className="text-center text-xl font-semibold">Nothing to Show</p>
        ) : (
          questions.map((q, index) => {
            const userSelected = userAnswers[index]; // User's answer
            const correctAnswer = correctAnswers[index]; // Correct answer

            const isCorrect = userSelected === correctAnswer;
            const isWrong = userSelected && userSelected !== correctAnswer;

            return (
              <div
                key={index}
                className="bg-white/30 shadow-xl rounded-lg overflow-hidden p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <h3 className="text-xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-900 via-purple-500 to-purple-800">
                  {`Question ${index + 1}: ${q.question}`}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {q.options.map((option, i) => {
                    const isSelected = userSelected === option;
                    const isCorrectOption = correctAnswer === option;

                    return (
                      <div
                        key={i}
                        className={`p-4 rounded-md transition-colors duration-200 flex items-center border border-black/20 ${
                          isSelected
                            ? isCorrect
                              ? "border border-green-500 "
                              : "border border-red-500 "
                            : isCorrectOption
                            ? "border border-green-500 "
                            : "bg-gray-100"
                        }`}
                      >
                        <span className="mr-2 font-semibold">
                          {optionLabels[i]}
                        </span>
                        {option}
                      </div>
                    );
                  })}
                </div>
                {isCorrect && (
                  <p className="mt-2 font-semibold text-green-600">
                    ✅ Correct Answer!
                  </p>
                )}
                {isWrong && (
                  <p className="mt-2 font-semibold text-red-600">
                    ❌ Incorrect! The correct answer is:{" "}
                    <span className="text-green-700 font-bold">
                      {correctAnswer}
                    </span>
                  </p>
                )}
              </div>
            );
          })
        )}

        <div className="flex flex-col md:flex-row gap-5">
          <button
            onClick={handleGetFeedback}
            disabled={isFetchingFeedback}
            className="w-full px-10 py-[7px] flex focus:ring-2 ring-offset-2 focus:ring-huf-purple justify-center group items-center gap-2 rounded-full bg-gradient-to-r hover:bg-purple-950 transition-all from-huf-purple via-huf-purple/70 to-huf-purple/80 border border-huf-purple text-white"
          >
            {isFetchingFeedback ? "Generating Feedback..." : "Feedback From AI"}
          </button>
          <button
            onClick={handleQuizAgain}
            className="w-full px-10 py-[7px] flex focus:ring-2 ring-offset-2 focus:ring-huf-purple justify-center group items-center gap-2 rounded-full bg-gradient-to-r hover:bg-purple-950 transition-all from-huf-purple via-huf-purple/70 to-huf-purple/80 border border-huf-purple text-white"
          >
            Quiz Again
          </button>
        </div>
        {feedback && (
          <div className="bg-purple-200/10 border border-purple-500 p-4 rounded-lg shadow-md mt-6">
            <h1 className="text-lg md:text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-950 mb-10">
              AI Feedback
            </h1>
            {/* Display Strengths */}
            <div>
              <h3 className="text-lg font-semibold text-purple-800">
                🌟 Strengths:
              </h3>
              <p className="text-gray-800">
                {feedback[0] && feedback[0].Strengths
                  ? feedback[0].Strengths
                  : "No feedback on strengths available."}
              </p>
            </div>

            {/* Display Weaknesses */}
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-purple-800">
                ⚠️ Weaknesses:
              </h3>
              <p className="text-gray-800">
                {feedback[1] && feedback[1].Weaknesses
                  ? feedback[1].Weaknesses
                  : "No feedback on weaknesses available."}
              </p>
            </div>

            {/* Display Recommendations */}
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-purple-800">
                📖 Recommendations:
              </h3>
              <p className="text-gray-800">
                {feedback[2] && feedback[2].Recommendations
                  ? feedback[2].Recommendations
                  : "No recommendations available."}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizAnswer;
