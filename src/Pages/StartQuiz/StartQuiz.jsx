import Banner from "./Sections/Banner";
import QuizCategories from "./Sections/QuizCategories";

const StartQuiz = () => {
  return (
    <div className="bg-gray-900 min-h-screen">
      <Banner />
      <QuizCategories />
    </div>
  );
};

export default StartQuiz;
