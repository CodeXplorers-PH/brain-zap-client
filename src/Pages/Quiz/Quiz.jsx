import Button from "@/components/ui/Button";
import { useState } from "react";

const Quiz = ({ questions }) => {
  const [selectedOptions, setSelectedOptions] = useState({});

  const handleOptionSelect = (questionIndex, option) => {
    setSelectedOptions({
      ...selectedOptions,
      [questionIndex]: option,
    });
  };

  const optionLabels = ["A.", "B.", "C.", "D."]; // Labels for options

  return (
    <div className="space-y-6 p-4 container mx-auto">
      {questions.length === 0 ? (
        <p className="text-center text-xl font-semibold">
          No questions available.
        </p>
      ) : (
        questions.map((q, index) => (
          <div
            key={index}
            className="bg-white/30 shadow-xl rounded-lg overflow-hidden p-6 hover:shadow-lg transition-shadow duration-300"
          >
            <h3 className="text-xl font-semibold  mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-900 via-purple-500 to-purple-800 ">
              {`Question ${index + 1}: ${q.question}`}{" "}
              {/* Question numbering */}
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {q.options.map((option, i) => (
                <button
                  key={i}
                  className={`p-4 rounded-md transition-colors duration-200 flex items-center border border-black/20 ${
                    selectedOptions[index] === option
                      ? "bg-purple-900/20 text-black border-purple-500"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                  onClick={() => handleOptionSelect(index, option)}
                >
                  <span className="mr-2 font-semibold">{optionLabels[i]}</span>
                  {option}
                </button>
              ))}
            </div>
          </div>
        ))
      )}
      <div className="w-full">
        <Button className={"w-full"}>Submit</Button>
      </div>
      <div></div>
    </div>
  );
};

export default Quiz;
