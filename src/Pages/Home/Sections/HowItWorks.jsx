import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";

const HowItWorks = () => {
  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto px-4 text-black">
        {/* Heading */}
        <SectionHeading
          heading="How BRAINZAP Works"
          subHeading="Our process is designed to be straightforward and effective.  Follow these simple steps to achieve your desired results."
        />

        <div className="flex justify-center mb-8">
          <Button className="mt-4">Get Started Now</Button>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="bg-green-200 p-6 rounded-lg shadow-md relative">
            <div className="absolute top-0 right-0 w-24 h-20 bg-gradient-to-br from-white to-transparent rounded-tr-lg rounded-bl-full opacity-60"></div>
            <h1 className="text-3xl font-semibold mb-4">Process 1</h1>
            <h3 className="text-xl font-semibold mb-2">
              LOGIN TO YOUR ACCOUNT
            </h3>
            <p className="mt-4">
              Start by logging in to your account to access all the features.
            </p>
          </div>

          <div className="bg-yellow-200 p-6 rounded-lg shadow-md relative">
            <div className="absolute top-0 right-0 w-24 h-20 bg-gradient-to-br from-white to-transparent rounded-tr-lg rounded-bl-full opacity-60"></div>
            <h1 className="text-3xl font-semibold mb-4">Process 2</h1>
            <h3 className="text-xl font-semibold mb-2">
              TAKE QUIZZES IN YOUR LANGUAGE
            </h3>
            <p className="mt-4">
              Choose quizzes based on your language preferences to assess your
              skills.
            </p>
          </div>

          <div className="bg-blue-200 p-6 rounded-lg shadow-md relative">
            <div className="absolute top-0 right-0 w-24 h-20 bg-gradient-to-br from-white to-transparent rounded-tr-lg rounded-bl-full opacity-60"></div>
            <h1 className="text-3xl font-semibold  mb-4">Process 3</h1>

            <h3 className="text-xl font-semibold mb-2">SEE YOUR GROWTH</h3>
            <p className=" mt-4">
              Track your progress and see how much you've improved over time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
