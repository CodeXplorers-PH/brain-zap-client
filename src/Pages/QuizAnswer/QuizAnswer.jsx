import { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  FaSignInAlt,
  FaPrint,
  FaFacebookF,
  FaLinkedinIn,
  FaWhatsapp,
  FaLink,
  FaShareAlt,
} from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import useAxiosPublic from '@/hooks/useAxiosPublic';
import useAuth from '@/hooks/useAuth';
import useAxiosSecure from '@/hooks/useAxiosSecure';

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

  const { category } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const optionLabels = ['A.', 'B.', 'C.', 'D.'];
  const printContentRef = useRef(null);
  const shareableLink = window.location.href;

  // Scroll to top view
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchResults = () => {
      const storedQuiz = localStorage.getItem('quiz_questions');
      const storedAnswers = localStorage.getItem('userAnswers');
      const hasPosted = localStorage.getItem('history_posted');

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
        } catch (error) {
          console.error('Error parsing localStorage data:', error);
        }
      } else {
        console.warn('Quiz data or user answers not found in localStorage.');
      }

      setLoading(false);
    };

    const timer = setTimeout(fetchResults, 500);
    return () => clearTimeout(timer);
  }, [category, user]);

  useEffect(() => {
    // Reset copy status after 3 seconds
    if (linkCopied) {
      const timer = setTimeout(() => {
        setLinkCopied(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [linkCopied]);

  useEffect(() => {
    const hasPosted = localStorage.getItem(`history_posted`);
    const storedQuiz = localStorage.getItem('quiz_questions');
    const storedAnswers = localStorage.getItem('userAnswers');

    if (user && questions.length > 0 && !hasPosted) {
      // Save History
      axiosPublic
        .post('/quiz_history', {
          email: user?.email,
          date: new Date(),
          category: category,
          score: score,
          questions: JSON.parse(storedQuiz),
          answers: JSON.parse(storedAnswers),
        })
        .then(res => {
          localStorage.setItem(`history_posted`, 'true');
        })
        .catch(err => {
          console.log('Error saving history:', err);
        });

      // Update User Level
      axiosSecure
        .put('/update_user_level', {
          score,
          difficulty: state.difficulty,
        })
        .catch(err => console.log('Level Update Error --> ', err.message));
    }
  }, [user, category, questions]);

  const handleQuizAgain = () => {
    localStorage.removeItem('quiz_questions');
    localStorage.removeItem('userAnswers');
    localStorage.removeItem('history_posted');
    navigate('/start-quiz');
  };
  

  const handleGetFeedback = async () => {
    const storedQuiz = localStorage.getItem('quiz_questions');
    const storedAnswers = localStorage.getItem('userAnswers');

    if (!storedQuiz || !storedAnswers) {
      alert('No quiz data found!');
      return;
    }

    const quizData = JSON.parse(storedQuiz);
    const parsedAnswers = JSON.parse(storedAnswers);

    setIsFetchingFeedback(true);

    try {
      const { data: result } = await axiosPublic.post('/quiz_feedback', {
        quizData,
        userAnswers: parsedAnswers,
      });

      setFeedback(result);
    } catch (error) {
      console.error('Error fetching AI feedback:', error);
      alert('Failed to fetch feedback from AI.');
    } finally {
      setIsFetchingFeedback(false);
    }
  };

  // Print function to handle printing the quiz results
  const handlePrintResult = () => {
    const printWindow = window.open("", "_blank");

    if (!printWindow) {
      alert("Please allow pop-ups to print your results.");
      return;
    }

    // Get formatted date for the print
    const currentDate = new Date().toLocaleDateString();

    // Generate the HTML content for printing
    const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>BrainZap Quiz Results - ${category}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 20px;
              color: #333;
            }
            .header {
              text-align: center;
              margin-bottom: 20px;
              padding-bottom: 10px;
              border-bottom: 2px solid #6366f1;
            }
            .score-banner {
              text-align: center;
              padding: 15px;
              margin-bottom: 20px;
              border-radius: 8px;
              border: 1px solid ${
                score >= 70 ? "#10b981" : score >= 40 ? "#f59e0b" : "#ef4444"
              };
              background-color: ${
                score >= 70 ? "#d1fae5" : score >= 40 ? "#fef3c7" : "#fee2e2"
              };
            }
            .score-text {
              font-size: 24px;
              font-weight: bold;
              color: ${
                score >= 70 ? "#10b981" : score >= 40 ? "#f59e0b" : "#ef4444"
              };
            }
            .question-container {
              margin-bottom: 25px;
              padding: 15px;
              border-radius: 8px;
              background-color: #f9fafb;
              border: 1px solid #e5e7eb;
            }
            .question {
              font-weight: bold;
              margin-bottom: 10px;
            }
            .options {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 10px;
            }
            .option {
              padding: 10px;
              border-radius: 5px;
              border: 1px solid #e5e7eb;
            }
            .selected-correct {
              background-color: #d1fae5;
              border-color: #10b981;
            }
            .selected-wrong {
              background-color: #fee2e2;
              border-color: #ef4444;
            }
            .correct-option {
              background-color: #d1fae5;
              border-color: #10b981;
            }
            .feedback-container {
              margin-top: 30px;
              border: 1px solid #e5e7eb;
              border-radius: 8px;
              padding: 15px;
            }
            .feedback-section {
              margin-bottom: 15px;
              padding: 10px;
              border-radius: 5px;
            }
            .strengths {
              background-color: #d1fae5;
              border: 1px solid #10b981;
            }
            .weaknesses {
              background-color: #fee2e2;
              border: 1px solid #ef4444;
            }
            .recommendations {
              background-color: #dbeafe;
              border: 1px solid #3b82f6;
            }
            .footer {
              text-align: center;
              margin-top: 30px;
              font-size: 12px;
              color: #6b7280;
            }
            @media print {
              body {
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
              }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>BrainZap Quiz Results</h1>
            <p>Category: ${category || "General Knowledge"}</p>
            <p>Date: ${currentDate}</p>
            ${user ? `<p>User: ${user.displayName}</p>` : ""}
          </div>
          
          <div class="score-banner">
            <h2 class="score-text">Your Score: ${score}%</h2>
            <p>
              ${
                score >= 70
                  ? "Excellent work!"
                  : score >= 40
                  ? "Good effort!"
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
                    <span>Q${index + 1}:</span> ${q.question}
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
                          <span>${optionLabels[i]}</span> ${option}
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
              <h2>AI Feedback</h2>
              
              <div class="feedback-section strengths">
                <h3>🌟 Strengths</h3>
                <p>${
                  feedback[0]?.Strengths ||
                  "No specific strengths were identified."
                }</p>
              </div>
              
              <div class="feedback-section weaknesses">
                <h3>⚠️ Weaknesses</h3>
                <p>${
                  feedback[1]?.Weaknesses ||
                  "No significant weaknesses were found."
                }</p>
              </div>
              
              <div class="feedback-section recommendations">
                <h3>📚 Recommendations</h3>
                <p>${
                  feedback[2]?.Recommendations ||
                  "No specific recommendations available."
                }</p>
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

    // Wait for content to load before printing
    printWindow.onload = function () {
      printWindow.print();
    };
  };

  // Social media sharing
  const handleShareSocial = (platform) => {
    const shareText = `I scored ${score}% on the ${category} quiz! Can you beat my score?`;
    const url = encodeURIComponent(shareableLink);

    let shareUrl = "";

    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${encodeURIComponent(
          shareText
        )}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          shareText
        )}&url=${url}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}&summary=${encodeURIComponent(
          shareText
        )}`;
        break;
      case "whatsapp":
        shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
          shareText + " " + shareableLink
        )}`;
        break;
      default:
        break;
    }

    if (shareUrl) {
      window.open(
        shareUrl,
        "_blank",
        "width=600,height=400,noopener,noreferrer"
      );
    }

    // Close modal after sharing
    setTimeout(() => setShowShareModal(false), 500);
  };

  const copyToClipboard = () => {
    const textToCopy = `I scored ${score}% on the ${category} quiz! Try it yourself: ${shareableLink}`;
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setLinkCopied(true);
      })
      .catch((err) => {
        console.error("Could not copy text: ", err);
      });
  };

  // Generate social share image
  const generateShareImage = () => {
    return `/api/social-share-image?score=${score}&category=${encodeURIComponent(
      category
    )}`;
  };

  if (loading) {
    return (
      <div className="bg-gray-900 min-h-screen pt-40 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mb-4"></div>
          <p className="text-gray-400 text-xl">Loading your results...</p>
        </div>
      </div>
    );
  }

  if (!questions.length) {
    return (
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
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-4xl mx-auto" ref={printContentRef}>
        {/* Score Banner with Share Button */}
        {showScore && (
          <div
            className={`mb-10 p-6 rounded-xl border ${
              score >= 70
                ? "border-green-500/30 bg-green-900/10"
                : score >= 40
                ? "border-yellow-500/30 bg-yellow-900/10"
                : "border-red-500/30 bg-red-900/10"
            } text-center relative`}
            id="shareableContent"
          >
            <button
              onClick={() => setShowShareModal(true)}
              className="absolute top-4 right-4 bg-gray-800/70 p-2 rounded-full hover:bg-gray-700/90 transition-all no-print"
              aria-label="Share results"
            >
              <FaShareAlt className="text-white" />
            </button>

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
                    ? 'border-green-500/30 bg-green-900/10'
                    : isWrong
                    ? 'border-red-500/30 bg-red-900/10'
                    : 'border-gray-700 bg-gray-800/50'
                }`}
              >
                <h3 className="text-xl font-semibold text-white mb-4">
                  <span className="text-purple-400">Q{index + 1}:</span>{' '}
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
                            ? 'border-green-500 bg-green-900/30'
                            : isSelected && isWrong
                            ? 'border-red-500 bg-red-900/30'
                            : isCorrectOption
                            ? 'border-green-500 bg-green-900/30'
                            : 'border-gray-700 bg-gray-800'
                        }`}
                      >
                        <span
                          className={`font-mono mr-3 mt-0.5 ${
                            isCorrectOption ? 'text-green-400' : 'text-gray-400'
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
                      <span className="mr-2">✗</span> The correct answer was:{' '}
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
        <div className="flex flex-col sm:flex-row gap-4 mt-10 no-print">
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
            onClick={handlePrintResult}
            className="flex-1 py-4 bg-gray-800 border border-gray-700 rounded-xl text-white font-bold hover:bg-gray-700 transition-all"
          >
            <FaPrint className="inline-block mr-2" />
            Print Result
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
                    'No specific strengths were identified.'}
                </p>
              </div>

              <div className="p-4 bg-red-900/10 border border-red-500/30 rounded-lg">
                <h4 className="flex items-center text-lg font-semibold text-red-400 mb-2">
                  <span className="mr-2">⚠️</span> Weaknesses
                </h4>
                <p className="text-gray-300">
                  {feedback[1]?.Weaknesses ||
                    'No significant weaknesses were found.'}
                </p>
              </div>

              <div className="p-4 bg-blue-900/10 border border-blue-500/30 rounded-lg">
                <h4 className="flex items-center text-lg font-semibold text-blue-400 mb-2">
                  <span className="mr-2">📚</span> Recommendations
                </h4>
                <p className="text-gray-300">
                  {feedback[2]?.Recommendations ||
                    'No specific recommendations available.'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* If not logged in */}
        {!user && (
          <div className="mt-16 bg-gray-800/40 border border-gray-700 backdrop-blur-lg rounded-2xl shadow-lg p-8 text-center no-print">
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

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">
                Share Your Results
              </h3>
              <button
                onClick={() => setShowShareModal(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Share Preview Card */}
            <div className="mb-6 p-4 border border-gray-700 rounded-lg bg-gray-900/50">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-r from-purple-600 to-blue-600">
                  <span className="text-white font-bold">{score}%</span>
                </div>
                <div>
                  <p className="text-gray-300 text-sm">Quiz Results</p>
                  <p className="text-white font-medium">
                    {category || "General Knowledge"}
                  </p>
                </div>
              </div>
              <p className="text-gray-300 text-sm mt-2">
                I scored {score}% on the {category} quiz! Can you beat my score?
              </p>
            </div>

            {/* Social Media Share Buttons */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              <button
                onClick={() => handleShareSocial("facebook")}
                className="flex flex-col items-center justify-center p-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                <FaFacebookF className="text-white text-xl mb-1" />
                <span className="text-white text-xs">Facebook</span>
              </button>

              <button
                onClick={() => handleShareSocial("twitter")}
                className="flex flex-col items-center justify-center p-3 rounded-lg bg-gray-900 hover:bg-black transition-colors"
              >
                <FaXTwitter className="text-white text-xl mb-1" />
                <span className="text-white text-xs">Twitter</span>
              </button>

              <button
                onClick={() => handleShareSocial("linkedin")}
                className="flex flex-col items-center justify-center p-3 rounded-lg bg-blue-500 hover:bg-blue-600 transition-colors"
              >
                <FaLinkedinIn className="text-white text-xl mb-1" />
                <span className="text-white text-xs">LinkedIn</span>
              </button>

              <button
                onClick={() => handleShareSocial("whatsapp")}
                className="flex flex-col items-center justify-center p-3 rounded-lg bg-green-600 hover:bg-green-700 transition-colors"
              >
                <FaWhatsapp className="text-white text-xl mb-1" />
                <span className="text-white text-xs">WhatsApp</span>
              </button>
            </div>

            {/* Copy Link */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex-1 bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-gray-400 text-sm truncate">
                {shareableLink}
              </div>
              <button
                onClick={copyToClipboard}
                className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded-lg transition-colors"
              >
                {linkCopied ? "Copied!" : <FaLink />}
              </button>
            </div>

            <button
              onClick={() => setShowShareModal(false)}
              className="w-full py-3 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Add print-specific styles */}
      <style jsx="true" global="true">{`
        @media print {
          nav,
          footer,
          header,
          .no-print {
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
