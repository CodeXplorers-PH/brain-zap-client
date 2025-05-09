import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FaSignInAlt, FaPrint, FaFacebookF, FaLinkedinIn, FaWhatsapp, FaLink, FaShareAlt } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useStreak from "@/hooks/useStreak";
import { useAuthContext } from "@/hooks/useAuthContext";
import BrainZapLoader from "@/components/BrainZapLoader/BrainZapLoader";

const QuizAnswer = () => {
  const { user } = useAuth();
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [correctAnswers, setCorrectAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState(null);
  const [isFetchingFeedback, setIsFetchingFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const { userType } = useAuthContext();
  const [freeUser, setFreeUser] = useState("");

  const { refetch } = useStreak();
  const { category } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const optionLabels = ["A.", "B.", "C.", "D."];
  const printContentRef = useRef(null);
  const shareableLink = window.location.href;

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Quiz Answer | BrainZap";
  }, []);

  useEffect(() => {
    const fetchResults = () => {
      const storedQuiz = localStorage.getItem("quiz_questions");
      const storedAnswers = localStorage.getItem("userAnswers");

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

          const finalScore = Math.round((correctCount / parsedQuiz.length) * 100);

          setCorrectAnswers(answers);
          setScore(finalScore);
          setShowScore(true);
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
  }, [category, user]);

  useEffect(() => {
    if (linkCopied) {
      const timer = setTimeout(() => setLinkCopied(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [linkCopied]);

  useEffect(() => {
    const hasPosted = localStorage.getItem("history_posted");
    const storedQuiz = localStorage.getItem("quiz_questions");
    const storedAnswers = localStorage.getItem("userAnswers");

    if (user && questions.length > 0 && !hasPosted) {
      axiosSecure
        .post("/quiz_history", {
          date: new Date(),
          category: category,
          score: score,
          questions: JSON.parse(storedQuiz),
          answers: JSON.parse(storedAnswers),
        })
        .then(() => {
          localStorage.setItem("history_posted", "true");
          refetch();
        })
        .catch((err) => {
          console.log("Error saving history:", err);
        });

      axiosSecure
        .put("/update_user_level", {
          score,
          difficulty: state?.difficulty || "medium",
        })
        .catch((err) => console.log("Level Update Error --> ", err.message));
    }
  }, [category, questions, score, state, user, axiosSecure, refetch]);

  const handleQuizAgain = () => {
    localStorage.removeItem("quiz_questions");
    localStorage.removeItem("userAnswers");
    localStorage.removeItem("history_posted");
    navigate("/start-quiz");
  };

  const handleGetFeedback = async () => {
    if (!userType || userType === null) {
      setFreeUser("Free");
      return;
    }

    const storedQuiz = localStorage.getItem("quiz_questions");
    const storedAnswers = localStorage.getItem("userAnswers");

    if (!storedQuiz || !storedAnswers) {
      alert("No quiz data found!");
      return;
    }

    let quizData, parsedAnswers;
    try {
      quizData = JSON.parse(storedQuiz);
      parsedAnswers = JSON.parse(storedAnswers);
    } catch (error) {
      console.error("Error parsing localStorage data for feedback:", error);
      alert("Invalid quiz data. Please try taking the quiz again.");
      return;
    }

    if (!Array.isArray(quizData) || !quizData.every(q => q.question && q.options && q.answer)) {
      console.error("Invalid quizData format:", quizData);
      alert("Quiz data is malformed. Please try again.");
      return;
    }
    if (!parsedAnswers || typeof parsedAnswers !== "object") {
      console.error("Invalid userAnswers format:", parsedAnswers);
      alert("User answers are malformed. Please try again.");
      return;
    }

    console.log("Sending feedback request:", { quizData, userAnswers: parsedAnswers });

    setIsFetchingFeedback(true);

    try {
      const { data: result } = await axiosSecure.post("/quiz_feedback", {
        quizData,
        userAnswers: parsedAnswers,
      });

      console.log("Feedback response:", result);

      let normalizedFeedback;
      if (Array.isArray(result)) {
        normalizedFeedback = result;
      } else if (typeof result === "object" && result !== null) {
        normalizedFeedback = [
          { Strengths: result.strengths || "No specific strengths identified." },
          { Weaknesses: result.weaknesses || "No significant weaknesses found." },
          { Recommendations: result.recommendations || "No specific recommendations available." },
        ];
      } else {
        console.warn("Unexpected feedback format:", result);
        normalizedFeedback = [
          { Strengths: "No specific strengths identified." },
          { Weaknesses: "No significant weaknesses found." },
          { Recommendations: "No specific recommendations available." },
        ];
      }

      setFeedback(normalizedFeedback);
    } catch (error) {
      console.error("Error fetching AI feedback:", error.response?.data || error.message);
      alert("Failed to fetch AI feedback. Please try again later.");
    } finally {
      setIsFetchingFeedback(false);
    }
  };

  const handlePrintResult = () => {
    if (!userType || userType === null) {
      setFreeUser("Free");
      return;
    }

    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      alert("Please allow pop-ups to print your results.");
      return;
    }

    const currentDate = new Date().toLocaleDateString();
    const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>BrainZap Quiz Results - ${category}</title>
          <style>
            body { font-family: 'Inter', sans-serif; padding: 40px; color: #1f2937; line-height: 1.6; }
            .header { text-align: center; margin-bottom: 30px; border-bottom: 3px solid #4f46e5; }
            .score-banner { text-align: center; padding: 20px; margin-bottom: 30px; border-radius: 12px; border: 2px solid ${
              score >= 70 ? "#10b981" : score >= 40 ? "#f59e0b" : "#ef4444"
            }; background: ${
              score >= 70 ? "#ecfdf5" : score >= 40 ? "#fefce8" : "#fef2f2"
            }; }
            .score-text { font-size: 32px; font-weight: 800; color: ${
              score >= 70 ? "#10b981" : score >= 40 ? "#f59e0b" : "#ef4444"
            }; }
            .question-container { margin-bottom: 30px; padding: 20px; border-radius: 12px; background: #ffffff; border: 1px solid #e5e7eb; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
            .question { font-weight: 700; font-size: 18px; margin-bottom: 15px; }
            .options { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
            .option { padding: 12px; border-radius: 8px; border: 1px solid #d1d5db; background: #f9fafb; }
            .selected-correct { background: #d1fae5; border-color: #10b981; font-weight: 500; }
            .selected-wrong { background: #fee2e2; border-color: #ef4444; font-weight: 500; }
            .correct-option { background: #d1fae5; border-color: #10b981; font-weight: 500; }
            .feedback-container { margin-top: 40px; border: 1px solid #e5e7eb; border-radius: 12px; padding: 20px; background: #ffffff; }
            .feedback-section { margin-bottom: 20px; padding: 15px; border-radius: 8px; }
            .strengths { background: #ecfdf5; border: 1px solid #10b981; }
            .weaknesses { background: #fef2f2; border: 1px solid #ef4444; }
            .recommendations { background: #eff6ff; border: 1px solid #3b82f6; }
            .footer { text-align: center; margin-top: 40px; font-size: 14px; color: #6b7280; }
            @media print { body { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; } }
          </style>
        </head>
        <body>
          <div class="header">
            <h1 style="font-size: 36px; font-weight: 800;">BrainZap Quiz Results</h1>
            <p style="font-size: 18px;">Category: ${category || "General Knowledge"}</p>
            <p style="font-size: 16px;">Date: ${currentDate}</p>
            ${user ? `<p style="font-size: 16px;">User: ${user.displayName}</p>` : ""}
          </div>
          <div class="score-banner">
            <h2 class="score-text">Your Score: ${score}%</h2>
            <p style="font-size: 16px;">
              ${
                score >= 70
                  ? "Outstanding performance!"
                  : score >= 40
                  ? "Solid effort!"
                  : "Keep practicing!"
              } 
              You answered ${
                Object.values(userAnswers).filter(
                  (ans, i) => ans === correctAnswers[i]
                ).length
              } 
              out of ${questions.length} questions correctly.
            </p>
          </div>
          <div class="questions-list">
            ${questions
              .map((q, index) => {
                const userSelected = userAnswers[index];
                const correctAnswer = correctAnswers[index];
                const isCorrect = userSelected === correctAnswer;
                const isWrong = userSelected && userSelected !== correctAnswer;

                return `
                <div class="question-container">
                  <div class="question">
                    <span style="color: #4f46e5;">Q${index + 1}:</span> ${q.question}
                  </div>
                  <div class="options">
                    ${q.options
                      .map((option, i) => {
                        const isSelected = userSelected === option;
                        const isCorrectOption = correctAnswer === option;

                        let className = "option";
                        if (isSelected && isCorrect)
                          className += " selected-correct";
                        else if (isSelected && isWrong)
                          className += " selected-wrong";
                        else if (isCorrectOption)
                          className += " correct-option";

                        return `
                        <div class="${className}">
                          <span style="font-weight: 600;">${optionLabels[i]}</span> ${option}
                          ${isSelected && isCorrect ? " ✓" : ""}
                          ${isSelected && isWrong ? " ✗" : ""}
                          ${
                            !isSelected && isCorrectOption
                              ? " (Correct Answer)"
                              : ""
                          }
                        </div>
                      `;
                      })
                      .join("")}
                  </div>
                </div>
              `;
              })
              .join("")}
          </div>
          ${
            feedback
              ? `
            <div class="feedback-container">
              <h2 style="font-size: 24px; font-weight: 700;">AI-Powered Feedback</h2>
              <div class="feedback-section strengths">
                <h3 style="font-size: 18px; color: #10b981;">🌟 Strengths</h3>
                <p>${feedback[0]?.Strengths || "No specific strengths identified."}</p>
              </div>
              <div class="feedback-section weaknesses">
                <h3 style="font-size: 18px; color: #ef4444;">⚠️ Areas for Improvement</h3>
                <p>${feedback[1]?.Weaknesses || "No significant weaknesses found."}</p>
              </div>
              <div class="feedback-section recommendations">
                <h3 style="font-size: 18px; color: #3b82f6;">📚 Recommendations</h3>
                <p>${feedback[2]?.Recommendations || "No specific recommendations available."}</p>
              </div>
            </div>
          `
              : ""
          }
          <div class="footer">
            <p>Generated by BrainZap</p>
          </div>
        </body>
      </html>
    `;

    printWindow.document.open();
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.onload = function () {
      printWindow.print();
    };
  };

  const handleShareSocial = (platform) => {
    const shareText = `I scored ${score}% on the ${category} quiz! Can you beat my score?`;
    const url = encodeURIComponent(shareableLink);
    let shareUrl = "";
    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${encodeURIComponent(shareText)}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${url}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}&summary=${encodeURIComponent(shareText)}`;
        break;
      case "whatsapp":
        shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + " " + shareableLink)}`;
        break;
      default:
        break;
    }
    if (shareUrl) {
      window.open(shareUrl, "_blank", "width=600,height=400,noopener,noreferrer");
    }
    setTimeout(() => setShowShareModal(false), 500);
  };

  const copyToClipboard = () => {
    const textToCopy = `I scored ${score}% on the ${category} quiz! Try it yourself: ${shareableLink}`;
    navigator.clipboard.writeText(textToCopy).then(() => setLinkCopied(true));
  };

  if (loading) {
    return (
      <div className="bg-gray-900 min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center justify-center h-96 space-y-5">
          <BrainZapLoader />
          <p className="text-gray-300 text-2xl font-medium">Loading your results...</p>
        </div>
      </div>
    );
  }

  if (!questions.length) {
    return (
      <div className="bg-gray-900 min-h-screen pt-40 flex items-center justify-center">
        <div className="text-center p-10 bg-gray-800/30 rounded-3xl border border-gray-700/20 backdrop-blur-sm">
          <h2 className="text-3xl font-bold text-white mb-6">No Results Found</h2>
          <p className="text-gray-300 mb-8 text-lg">It seems there's nothing to show here.</p>
          <button
            onClick={handleQuizAgain}
            className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl text-white font-semibold hover:from-indigo-600 hover:to-purple-600 transition-all"
          >
            Take a Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-5xl mx-auto" ref={printContentRef}>
        {/* Score Banner */}
        {showScore && (
          <div
            className={`mb-12 p-8 rounded-3xl border backdrop-blur-sm relative ${
              score >= 70
                ? "border-teal-500/30 bg-teal-900/10"
                : score >= 40
                ? "border-amber-500/30 bg-amber-900/10"
                : "border-red-500/30 bg-red-900/10"
            }`}
          >
            <button
              onClick={() => setShowShareModal(true)}
              className="absolute top-6 right-6 bg-gray-800/50 p-3 rounded-full hover:bg-gray-700/50 transition-all no-print"
              aria-label="Share results"
            >
              <FaShareAlt className="text-white w-5 h-5" />
            </button>
            <h2 className="text-4xl font-bold text-white mb-4 text-center">
              Your Score: <span className={
                score >= 70 ? "text-teal-400" : score >= 40 ? "text-amber-400" : "text-red-400"
              }>{score}%</span>
            </h2>
            <p className="text-gray-300 text-lg text-center">
              {score >= 70 ? "Outstanding performance!" : score >= 40 ? "Solid effort!" : "Keep practicing!"}
              {" "}You answered{" "}
              {Object.values(userAnswers).filter((ans, i) => ans === correctAnswers[i]).length}
              {" "}out of {questions.length} questions correctly.
            </p>
          </div>
        )}

        {/* Questions List */}
        <div className="space-y-8">
          {questions.map((q, index) => {
            const userSelected = userAnswers[index];
            const correctAnswer = correctAnswers[index];
            const isCorrect = userSelected === correctAnswer;
            const isWrong = userSelected && userSelected !== correctAnswer;

            return (
              <div
                key={index}
                className={`rounded-3xl p-8 border backdrop-blur-sm transition-all duration-300 hover:scale-105 ${
                  isCorrect
                    ? "border-teal-500/30 bg-teal-900/10"
                    : isWrong
                    ? "border-red-500/30 bg-red-900/10"
                    : "border-gray-700/30 bg-gray-800/30"
                }`}
              >
                <h3 className="text-xl font-semibold text-white mb-6">
                  <span className="text-indigo-400">Q{index + 1}:</span> {q.question}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {q.options.map((option, i) => {
                    const isSelected = userSelected === option;
                    const isCorrectOption = correctAnswer === option;

                    return (
                      <div
                        key={i}
                        className={`p-5 rounded-2xl flex items-start border transition-all duration-200 ${
                          isSelected && isCorrect
                            ? "border-teal-500 bg-teal-900/30"
                            : isSelected && isWrong
                            ? "border-red-500 bg-red-900/30"
                            : isCorrectOption
                            ? "border-teal-500 bg-teal-900/30"
                            : "border-gray-700/30 bg-gray-800/50"
                        }`}
                      >
                        <span className={`font-mono mr-4 mt-0.5 ${
                          isCorrectOption ? "text-teal-400" : "text-gray-400"
                        }`}>{optionLabels[i]}</span>
                        <span className="text-gray-200">{option}</span>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-6">
                  {isCorrect ? (
                    <p className="text-teal-400 flex items-center text-lg">
                      <span className="mr-3">✓</span> Correct answer!
                    </p>
                  ) : isWrong ? (
                    <p className="text-red-400 text-lg">
                      <span className="mr-3">✗</span> The correct answer was:{" "}
                      <span className="text-teal-400 font-medium">{correctAnswer}</span>
                    </p>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-12 no-print">
          <button
            onClick={handleGetFeedback}
            disabled={isFetchingFeedback}
            className={`flex-1 py-4 rounded-2xl text-white font-bold transition-all duration-300 ${
              isFetchingFeedback
                ? "bg-gray-700/50 text-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
            }`}
          >
            {isFetchingFeedback ? (
              <span className="flex items-center justify-center">
                <span className="animate-spin mr-3">🌀</span> Generating Feedback...
              </span>
            ) : (
              "Get AI Feedback"
            )}
          </button>
          <button
            onClick={handlePrintResult}
            className="flex-1 py-4 rounded-2xl text-white font-bold transition-all duration-300 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
          >
            <FaPrint className="inline-block mr-2" />
            Print Result
          </button>
          <button
            onClick={handleQuizAgain}
            className="flex-1 py-4 bg-gray-800/50 border border-gray-700/30 rounded-2xl text-white font-bold hover:bg-gray-700/50 transition-all duration-300"
          >
            Try Another Quiz
          </button>
        </div>

        {/* AI Feedback Section */}
        {feedback && (
          <div className="mt-12 bg-gray-800/30 border border-gray-700/20 rounded-3xl p-8 backdrop-blur-sm">
            <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mb-8">
              AI-Powered Feedback
            </h3>
            <div className="space-y-6">
              <div className="p-6 bg-teal-900/10 border border-teal-500/30 rounded-2xl transition-all duration-300 hover:scale-105">
                <h4 className="flex items-center text-xl font-semibold text-teal-400 mb-3">
                  <span className="mr-3">🌟</span> Strengths
                </h4>
                <p className="text-gray-300 text-lg">
                  {feedback[0]?.Strengths || "No specific strengths identified."}
                </p>
              </div>
              <div className="p-6 bg-red-900/10 border border-red-500/30 rounded-2xl transition-all duration-300 hover:scale-105">
                <h4 className="flex items-center text-xl font-semibold text-red-400 mb-3">
                  <span className="mr-3">⚠️</span> Areas for Improvement
                </h4>
                <p className="text-gray-300 text-lg">
                  {feedback[1]?.Weaknesses || "No significant weaknesses found."}
                </p>
              </div>
              <div className="p-6 bg-indigo-900/10 border border-indigo-500/30 rounded-2xl transition-all duration-300 hover:scale-105">
                <h4 className="flex items-center text-xl font-semibold text-indigo-400 mb-3">
                  <span className="mr-3">📚</span> Recommendations
                </h4>
                <p className="text-gray-300 text-lg">
                  {feedback[2]?.Recommendations || "No specific recommendations available."}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Free User Prompt */}
        {freeUser === "Free" && (
          <div className="mt-16 bg-gray-900/90 backdrop-blur-md p-8 rounded-3xl border border-indigo-600/40 shadow-2xl text-center">
            <div className="mb-6 text-indigo-400 relative">
              <div className="absolute inset-0 bg-indigo-600/20 blur-lg rounded-full"></div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-12 h-12 mx-auto relative"
              >
                <path
                  fillRule="evenodd"
                  d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Unlock Premium Features</h3>
            <p className="text-gray-300 text-lg mb-6">
              Upgrade to Pro or Elite to access AI Feedback, Print Results, and more premium tools.
            </p>
            <button
              onClick={() => navigate("/pricing")}
              className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl text-white font-semibold hover:from-indigo-600 hover:to-purple-600 transition-all"
            >
              Upgrade Now
            </button>
          </div>
        )}

        {/* Not Logged In Prompt */}
        {!user && (
          <div className="mt-16 bg-gray-800/30 border border-gray-700/20 backdrop-blur-lg rounded-3xl shadow-2xl p-8 text-center no-print">
            <h2 className="text-3xl font-bold text-white mb-4">You're Not Logged In</h2>
            <p className="text-gray-300 text-lg mb-6">
              Sign in to save your progress and unlock personalized recommendations.
            </p>
            <button
              onClick={() => navigate("/login")}
              className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl text-white font-semibold hover:from-indigo-600 hover:to-purple-600 transition-all"
            >
              <FaSignInAlt className="inline-block mr-2" />
              Log In
            </button>
          </div>
        )}
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-gray-800/90 rounded-3xl border border-gray-700/20 p-8 w-full max-w-md backdrop-blur-sm transform transition-all duration-300 scale-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-white">Share Your Results</h3>
              <button
                onClick={() => setShowShareModal(false)}
                className="text-gray-400 hover:text-white text-xl"
              >
                ✕
              </button>
            </div>
            <div className="mb-6 p-6 border border-gray-700/20 rounded-2xl bg-gray-900/50">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-500">
                  <span className="text-white font-bold text-lg">{score}%</span>
                </div>
                <div>
                  <p className="text-gray-300 text-sm">Quiz Results</p>
                  <p className="text-white font-semibold">{category || "General Knowledge"}</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm">
                I scored {score}% on the {category} quiz! Can you beat my score?
              </p>
            </div>
            <div className="grid grid-cols-4 gap-4 mb-6">
              <button
                onClick={() => handleShareSocial("facebook")}
                className="flex flex-col items-center justify-center p-4 rounded-2xl bg-blue-600 hover:bg-blue-700 transition-all"
              >
                <FaFacebookF className="text-white text-xl mb-1" />
                <span className="text-white text-xs">Facebook</span>
              </button>
              <button
                onClick={() => handleShareSocial("twitter")}
                className="flex flex-col items-center justify-center p-4 rounded-2xl bg-gray-900 hover:bg-black transition-all"
              >
                <FaXTwitter className="text-white text-xl mb-1" />
                <span className="text-white text-xs">Twitter</span>
              </button>
              <button
                onClick={() => handleShareSocial("linkedin")}
                className="flex flex-col items-center justify-center p-4 rounded-2xl bg-blue-500 hover:bg-blue-600 transition-all"
              >
                <FaLinkedinIn className="text-white text-xl mb-1" />
                <span className="text-white text-xs">LinkedIn</span>
              </button>
              <button
                onClick={() => handleShareSocial("whatsapp")}
                className="flex flex-col items-center justify-center p-4 rounded-2xl bg-green-600 hover:bg-green-700 transition-all"
              >
                <FaWhatsapp className="text-white text-xl mb-1" />
                <span className="text-white text-xs">WhatsApp</span>
              </button>
            </div>
            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 bg-gray-900/50 border border-gray-700/20 rounded-2xl px-4 py-3 text-gray-400 text-sm truncate">
                {shareableLink}
              </div>
              <button
                onClick={copyToClipboard}
                className="bg-gray-700/50 hover:bg-gray-600/50 text-white px-4 py-3 rounded-2xl transition-all"
              >
                {linkCopied ? "Copied!" : <FaLink />}
              </button>
            </div>
            <button
              onClick={() => setShowShareModal(false)}
              className="w-full py-3 bg-gray-700/50 hover:bg-gray-600/50 text-white font-semibold rounded-2xl transition-all"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <style jsx="true" global="true">{`
        @media print {
          nav, footer, header, .no-print {
            display: none !important;
          }
          body {
            background-color: white !important;
            color: black !important;
          }
          .bg-gray-900 {
            background-color: white !important;
          }
          * {
            color: black !important;
            text-shadow: none !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
      `}</style>
    </div>
  );
};

export default QuizAnswer;