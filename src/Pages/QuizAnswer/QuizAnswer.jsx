import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const QuizAnswer = () => {
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [correctAnswers, setCorrectAnswers] = useState({});
  const [loading, setLoading] = useState(true); // Loading state
  const { category } = useParams(); // Get quiz category from URL

  useEffect(() => {
    const fetchResults = () => {
      const storedQuiz = localStorage.getItem(`quiz_${category}`);
      const storedAnswers = localStorage.getItem("userAnswers");

      console.log("Stored Quiz Data:", storedQuiz);
      console.log("Stored User Answers:", storedAnswers);

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
          <p className="text-center text-xl font-semibold">
            No questions available.
          </p>
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
                <div className="grid grid-cols-2 gap-4">
                  {q.options.map((option, i) => {
                    const isSelected = userSelected === option;
                    const isCorrectOption = correctAnswer === option;

                    return (
                      <div
                        key={i}
                        className={`p-4 rounded-md transition-colors duration-200 flex items-center border border-black/20 ${
                          isSelected
                            ? isCorrect
                              ? "border border-green-500 text-black"
                              : "border border-red-500 text-black"
                            : isCorrectOption
                            ? "border border-green-500 text-black"
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
      </div>
    </div>
  );
};

export default QuizAnswer;
