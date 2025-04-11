import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const optionLabels = ["A.", "B.", "C.", "D."];

const Quiz = ({ questions }) => {
  const [selectedOptions, setSelectedOptions] = useState({});
  const { category } = useParams();
  const navigate = useNavigate();
  const handleOptionSelect = (questionIndex, option) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [questionIndex]: option,
    }));
  };

  const handleSubmit = () => {
    if (Object.keys(selectedOptions).length !== questions.length) {
      alert(
        `Please answer all ${questions.length} questions before submitting.`
      );
      return;
    }

    localStorage.setItem("userAnswers", JSON.stringify(selectedOptions));
    localStorage.removeItem(`history_posted`);
    navigate(`/quiz/${category}/answer`);
  };

  // 🧠 Helper to render question + code
  const renderFormattedQuestion = (question) => {
    const parts = question.split("```");

    return (
      <>
        <p className="text-white whitespace-pre-wrap">{parts[0]}</p>
        {parts[1] && (
          <pre className="bg-gray-900 text-green-400 p-4 rounded-md overflow-x-auto text-sm my-2">
            <code>{parts[1].split("\n").slice(1).join("\n")}</code>
          </pre>
        )}
      </>
    );
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {questions.map((q, index) => (
        <div
          key={index}
          className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all"
        >
          <h3 className="text-xl font-semibold text-white mb-4">
            <span className="text-purple-400">Q{index + 1}:</span>
            <div className="mt-2 space-y-2">
              {renderFormattedQuestion(q.question)}
            </div>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {q.options.map((option, i) => (
              <button
                key={i}
                className={`p-4 text-left rounded-lg transition-all flex items-start border ${
                  selectedOptions[index] === option
                    ? "border-purple-500 bg-purple-900/30"
                    : "border-gray-700 bg-gray-800 hover:bg-gray-700"
                }`}
                onClick={() => handleOptionSelect(index, option)}
              >
                <span className="font-mono text-purple-400 mr-3 mt-0.5">
                  {optionLabels[i]}
                </span>
                <span className="text-gray-200">{option}</span>
              </button>
            ))}
          </div>
        </div>
      ))}

      <div className="sticky bottom-6 bg-gray-900/80 backdrop-blur-md p-4 rounded-xl border border-gray-700 shadow-xl">
        <button
          onClick={handleSubmit}
          className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-white font-bold hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl"
          disabled={Object.keys(selectedOptions).length !== questions.length}
        >
          {Object.keys(selectedOptions).length === questions.length
            ? "Submit Answers"
            : `Answered ${Object.keys(selectedOptions).length}/${
                questions.length
              } questions`}
        </button>
      </div>
    </div>
  );
};

export default Quiz;
