import { useState, useEffect } from 'react';
import { FaCheckCircle, FaArrowRight, FaBolt } from 'react-icons/fa';

const optionLabels = ['A', 'B', 'C', 'D'];

const Quiz = ({
  questions,
  category,
  difficulty,
  onSubmit = (answers) => console.log("Quiz submitted:", answers)
}) => {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [activeQuestion, setActiveQuestion] = useState(0);

  const handleOptionSelect = (questionIndex, option) => {
    setSelectedOptions(prev => ({
      ...prev,
      [questionIndex]: option,
    }));

    // Auto-scroll to next unanswered question
    const nextUnanswered = questions.findIndex((_, idx) =>
      idx > questionIndex && !selectedOptions[idx]
    );

    if (nextUnanswered !== -1) {
      setTimeout(() => {
        setActiveQuestion(nextUnanswered);
        const nextElement = document.getElementById(`question-${nextUnanswered}`);
        if (nextElement) {
          nextElement.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
          // Slight scroll down adjustment
          window.scrollBy({ top: 350, behavior: 'smooth' });
        }
      }, 300);
    } else {
      // Scroll slightly down if no unanswered questions remain
      window.scrollBy({ top: 100, behavior: 'smooth' });
    }
  };

  const handleSubmit = () => {
    if (Object.keys(selectedOptions).length !== questions.length) {
      alert(`Please answer all ${questions.length} questions before submitting.`);
      return;
    }

    localStorage.setItem('userAnswers', JSON.stringify(selectedOptions));
    localStorage.removeItem(`history_posted`);

    onSubmit(selectedOptions);
  };

  const renderFormattedQuestion = question => {
    const parts = question.split('```');
    return (
      <>
        <p className="text-gray-100 whitespace-pre-wrap">{parts[0]}</p>
        {parts[1] && (
          <pre className="bg-gray-900/50 text-green-400 p-4 rounded-xl overflow-x-auto text-sm my-4 border border-gray-700/20 backdrop-blur-sm">
            <code>{parts[1].split('\n').slice(1).join('\n')}</code>
          </pre>
        )}
      </>
    );
  };

  const progress = (Object.keys(selectedOptions).length / questions.length) * 100;

  return (
    <div className="max-w-5xl mx-auto pb-24 px-4">
      {/* Header with progress (sticky, like QuizAnswer) */}
      <div className="bg-gray-900/70 backdrop-blur-sm p-6 rounded-3xl border border-gray-700/20 shadow-lg mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white flex items-center">
            <FaBolt className="mr-2 text-indigo-400" />
            {category ? category.charAt(0).toUpperCase() + category.slice(1) : 'Quiz'}
          </h2>
        </div>

        <div className="w-full bg-gray-800/50 rounded-full h-3 mb-2">
          <div
            className="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <div className="flex justify-between text-sm text-gray-400">
          <span>{Object.keys(selectedOptions).length}/{questions.length} answered</span>
          <span>{Math.round(progress)}% complete</span>
        </div>
      </div>

      {/* Question Navigation Sidebar (floating on larger screens) */}
      <div className="fixed top-32 right-4 z-20 hidden lg:block bg-gray-900/70 backdrop-blur-sm p-4 rounded-2xl border border-gray-700/20 shadow-xl">
        <div className="grid grid-cols-3 gap-2">
          {questions.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setActiveQuestion(index);
                document.getElementById(`question-${index}`).scrollIntoView({ behavior: 'smooth', block: 'center' });
              }}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200 ${selectedOptions[index]
                  ? 'bg-indigo-500/30 text-indigo-300 border-indigo-500/50'
                  : 'bg-gray-800/50 text-gray-400 border-gray-700/50'
                } ${activeQuestion === index ? 'ring-2 ring-indigo-400' : ''}`}
              aria-label={`Go to question ${index + 1}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Questions */}
      <div className="space-y-8">
        {questions.map((q, index) => (
          <div
            id={`question-${index}`}
            key={index}
            className={`rounded-3xl p-8 border backdrop-blur-sm transition-all duration-300 hover:scale-105 ${selectedOptions[index]
                ? 'border-indigo-500/30 bg-indigo-900/10'
                : 'border-gray-700/20 bg-gray-800/30'
              }`}
          >
            <h3 className="text-xl font-semibold text-white mb-6">
              <span className="text-indigo-400">Q{index + 1}:</span> {renderFormattedQuestion(q.question)}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {q.options.map((option, i) => (
                <button
                  key={i}
                  className={`p-5 rounded-2xl flex items-start border text-left transition-all duration-200 hover:shadow-md ${selectedOptions[index] === option
                      ? 'border-indigo-500 bg-indigo-900/30'
                      : 'border-gray-700/20 bg-gray-800/50 '
                    }`}
                  onClick={() => handleOptionSelect(index, option)}
                  aria-label={`Select option ${optionLabels[i]}`}
                >
                  <span className={`font-mono mr-4 mt-0.5 ${selectedOptions[index] === option ? 'text-indigo-400' : 'text-gray-400'
                    }`}>{optionLabels[i]}</span>
                  <span className="text-gray-200">{option}</span>
                  {selectedOptions[index] === option && (
                    <FaCheckCircle className="ml-2 text-indigo-400" />
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

{/* Floating Submit Button (styled like QuizAnswer, compact width, mobile responsive) */}
<div className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 w-full max-w-[90%] ${
        questions.length <= 5 ? 'sm:max-w-md' :
        questions.length <= 10 ? 'sm:max-w-lg' :
        questions.length <= 20 ? 'sm:max-w-2xl' : 'sm:max-w-3xl'
      } px-4`}>
        <div className="bg-gray-900/70 backdrop-blur-sm p-4 sm:p-6 rounded-3xl border border-gray-700/20 shadow-2xl">
          <div className="flex flex-col gap-2 items-center justify-center md:justify-between mb-4">
            <span className="text-xs sm:text-sm text-gray-400 hidden md:block">
              {Object.keys(selectedOptions).length === questions.length
                ? "All questions answered!"
                : `${questions.length - Object.keys(selectedOptions).length} questions remaining`}
            </span>
            <div className="flex flex-wrap gap-1">
              {questions.map((_, i) => (
                <div 
                  key={i} 
                  className={`w-6 sm:w-8 h-6 sm:h-8 rounded-full flex items-center justify-center border-2 ${
                    selectedOptions[i] 
                      ? 'border-indigo-500 bg-indigo-900/30' 
                      : 'border-gray-600 bg-gray-800/50'
                  }`}
                >
                  {selectedOptions[i] ? (
                    <FaCheckCircle className="text-indigo-400 text-xs sm:text-sm" />
                  ) : (
                    <span className="text-xs text-gray-400">{i+1}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          <button
            onClick={handleSubmit}
            className={`w-full py-3 sm:py-4 rounded-2xl font-semibold flex items-center justify-center transition-all duration-300 ${
              Object.keys(selectedOptions).length === questions.length
                ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg hover:shadow-indigo-500/30 hover:scale-105'
                : 'bg-gray-700/50 text-gray-400 cursor-not-allowed'
            }`}
            disabled={Object.keys(selectedOptions).length !== questions.length}
            aria-label="Submit quiz"
          >
            <span className="text-base sm:text-lg">Submit Quiz</span>
            <FaArrowRight className="ml-2 text-sm sm:text-base" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;