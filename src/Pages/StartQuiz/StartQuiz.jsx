import Banner from "./Sections/Banner";
import QuizCategories from "./Sections/QuizCategories";

const StartQuiz = () => {
    return (
        <div className="bg-gradient-to-br from-huf-purple/40 to-sky-200/20">
            <Banner />
            <QuizCategories />
        </div>
    );
};

export default StartQuiz;