import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaSignInAlt } from "react-icons/fa";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import useAuth from "@/hooks/useAuth";

const QuizAnswer = () => {
  const { user } = useAuth();
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [correctAnswers, setCorrectAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const { category } = useParams();
  const [feedback, setFeedback] = useState(null);
  const [isFetchingFeedback, setIsFetchingFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const optionLabels = ["A.", "B.", "C.", "D."];

  useEffect(() => {
    const fetchResults = () => {
      const storedQuiz = localStorage.getItem("quiz_questions");
      const storedAnswers = localStorage.getItem("userAnswers");
      const hasPosted = localStorage.getItem("history_posted");

      if (storedQuiz && storedAnswers) {
        try {
          const parsedQuiz = JSON.parse(storedQuiz);
          const parsedAnswers = JSON.parse(storedAnswers);

          setQuestions(parsedQuiz);
          setUserAnswers(parsedAnswers);

          let correctCount = 0;
          const answers = {};
          parsedQuiz.forEach((q, index) => {
            answers[index] = q.answer;
            if (parsedAnswers[index] === q.answer) {
              correctCount++;
            }
          });

          const finalScore = Math.round(
            (correctCount / parsedQuiz.length) * 100
          );

          setCorrectAnswers(answers);
          setScore(finalScore);
          setShowScore(true);

          // Post History if not posted yet
          if (user && !hasPosted) {
            axiosPublic
              .post("/quiz_history", {
                email: user?.email,
                date: new Date(),
                category: category,
                score: finalScore,
              })
              .then((res) => {
                console.log("History saved:", res.data);
                localStorage.setItem("history_posted", "true");
              })
              .catch((err) => {
                console.log("Error saving history:", err);
              });
          }
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
  }, [axiosPublic, category, user]);

  useEffect(() => {
    const hasPosted = localStorage.getItem(`history_posted`);

    if (user && score && questions.length > 0 && !hasPosted) {
      axiosPublic
        .post("/quiz_history", {
          email: user?.email,
          date: new Date(),
          category: category,
          score: score,
        })
        .then((res) => {
          console.log("History saved:", res.data);
          localStorage.setItem(`history_posted`, "true");
        })
        .catch((err) => {
          console.log("Error saving history:", err);
        });
    }
  }, [user, score, category, questions]);

  const handleQuizAgain = () => {
    localStorage.removeItem(`quiz_${category}`);
    localStorage.setItem("userAnswers", false);
    localStorage.removeItem(`history_posted`);
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
    const userAnswersto = JSON.parse(storedAnswers);

    setIsFetchingFeedback(true);

    try {
      const { data: result } = axiosPublic.post("/quiz_feedback", {
        quizData,
        userAnswers,
      });

      setFeedback(result);
    } catch (error) {
      console.error("Error fetching AI feedback:", error);
      alert("Failed to fetch feedback from AI.");
    } finally {
      setIsFetchingFeedback(false);
    }

    if (loading) {
      <div className="bg-gray-900 min-h-screen pt-40 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mb-4"></div>
          <p className="text-gray-400 text-xl">Loading your results...</p>
        </div>
      </div>;
    }

    if (questions.length === 0) {
      <div className="bg-gray-900 min-h-screen pt-40 flex items-center justify-center">
        <div className="text-center p-8 bg-gray-800/50 rounded-xl border border-gray-700">
          <h2 className="text-2xl font-bold text-gray-300 mb-4">
            No Results Found
          </h2>
          <p className="text-gray-400 mb-6">
            It seems there's nothing to show here.
          </p>
          <button
            onClick={handleQuizAgain}
            className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg text-white hover:from-purple-700 hover:to-blue-700 transition-colors"
          >
            Take a Quiz
          </button>
        </div>
      </div>;
    }

    return (
      <div className="bg-gray-900 min-h-screen pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Score Banner */}
          {showScore && (
            <div
              className={`mb-10 p-6 rounded-xl border ${
                score >= 70
                  ? "border-green-500/30 bg-green-900/10"
                  : score >= 40
                  ? "border-yellow-500/30 bg-yellow-900/10"
                  : "border-red-500/30 bg-red-900/10"
              } text-center`}
            >
              <h2 className="text-2xl font-bold text-white mb-2">
                Your Score:{" "}
                <span
                  className={
                    score >= 70
                      ? "text-green-400"
                      : score >= 40
                      ? "text-yellow-400"
                      : "text-red-400"
                  }
                >
                  {score}%
                </span>
              </h2>
              <p className="text-gray-300">
                {score >= 70
                  ? "Excellent work!"
                  : score >= 40
                  ? "Good effort!"
                  : "Keep practicing!"}{" "}
                You answered{" "}
                {
                  Object.values(userAnswers).filter(
                    (ans, i) => ans === correctAnswers[i]
                  ).length
                }{" "}
                out of {questions.length} questions correctly.
              </p>
            </div>
          )}

          {/* Questions List */}
          <div className="space-y-6">
            {questions.map((q, index) => {
              const userSelected = userAnswers[index];
              const correctAnswer = correctAnswers[index];
              const isCorrect = userSelected === correctAnswer;
              const isWrong = userSelected && userSelected !== correctAnswer;

              return (
                <div
                  key={index}
                  className={`rounded-xl p-6 border ${
                    isCorrect
                      ? "border-green-500/30 bg-green-900/10"
                      : isWrong
                      ? "border-red-500/30 bg-red-900/10"
                      : "border-gray-700 bg-gray-800/50"
                  }`}
                >
                  <h3 className="text-xl font-semibold text-white mb-4">
                    <span className="text-purple-400">Q{index + 1}:</span>{" "}
                    {q.question}
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {q.options.map((option, i) => {
                      const isSelected = userSelected === option;
                      const isCorrectOption = correctAnswer === option;

                      return (
                        <div
                          key={i}
                          className={`p-4 rounded-lg flex items-start border ${
                            isSelected && isCorrect
                              ? "border-green-500 bg-green-900/30"
                              : isSelected && isWrong
                              ? "border-red-500 bg-red-900/30"
                              : isCorrectOption
                              ? "border-green-500 bg-green-900/30"
                              : "border-gray-700 bg-gray-800"
                          }`}
                        >
                          <span
                            className={`font-mono mr-3 mt-0.5 ${
                              isCorrectOption
                                ? "text-green-400"
                                : "text-gray-400"
                            }`}
                          >
                            {optionLabels[i]}
                          </span>
                          <span className="text-gray-200">{option}</span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-4">
                    {isCorrect ? (
                      <p className="text-green-400 flex items-center">
                        <span className="mr-2">✓</span> Correct answer!
                      </p>
                    ) : isWrong ? (
                      <p className="text-red-400">
                        <span className="mr-2">✗</span> The correct answer was:{" "}
                        <span className="text-green-400 font-medium">
                          {correctAnswer}
                        </span>
                      </p>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-10">
            <button
              onClick={handleGetFeedback}
              disabled={isFetchingFeedback}
              className={`flex-1 py-4 rounded-xl font-bold transition-all ${
                isFetchingFeedback
                  ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700"
              }`}
            >
              {isFetchingFeedback ? (
                <span className="flex items-center justify-center">
                  <span className="animate-spin mr-2">🌀</span> Generating
                  Feedback...
                </span>
              ) : (
                "Get AI Feedback"
              )}
            </button>
            <button
              onClick={handleQuizAgain}
              className="flex-1 py-4 bg-gray-800 border border-gray-700 rounded-xl text-white font-bold hover:bg-gray-700 transition-all"
            >
              Try Another Quiz
            </button>
          </div>

          {/* AI Feedback Section */}
          {feedback && (
            <div className="mt-10 bg-gray-800/50 border border-gray-700 rounded-xl p-6 backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-6">
                AI Feedback
              </h3>

              <div className="space-y-6">
                <div className="p-4 bg-green-900/10 border border-green-500/30 rounded-lg">
                  <h4 className="flex items-center text-lg font-semibold text-green-400 mb-2">
                    <span className="mr-2">🌟</span> Strengths
                  </h4>
                  <p className="text-gray-300">
                    {feedback[0]?.Strengths ||
                      "No specific strengths were identified."}
                  </p>
                </div>

                <div className="p-4 bg-red-900/10 border border-red-500/30 rounded-lg">
                  <h4 className="flex items-center text-lg font-semibold text-red-400 mb-2">
                    <span className="mr-2">⚠️</span> Weaknesses
                  </h4>
                  <p className="text-gray-300">
                    {feedback[1]?.Weaknesses ||
                      "No significant weaknesses were found."}
                  </p>
                </div>

                <div className="p-4 bg-blue-900/10 border border-blue-500/30 rounded-lg">
                  <h4 className="flex items-center text-lg font-semibold text-blue-400 mb-2">
                    <span className="mr-2">📚</span> Recommendations
                  </h4>
                  <p className="text-gray-300">
                    {feedback[2]?.Recommendations ||
                      "No specific recommendations available."}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* If not logged in */}
          {!user && (
            <div className="mt-16 bg-gray-800/40 border border-gray-700 backdrop-blur-lg rounded-2xl shadow-lg p-8 text-center">
              <h2 className="text-2xl font-bold text-white mb-2">
                You're not logged in
              </h2>
              <p className="text-sm text-gray-400 mb-6">
                Sign in to save your progress and get personalized
                recommendations.
              </p>
              <button
                onClick={() => navigate("/login")}
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-xl transition-all"
              >
                <FaSignInAlt className="inline-block mr-2" />
                Log In
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };
};
export default QuizAnswer;
