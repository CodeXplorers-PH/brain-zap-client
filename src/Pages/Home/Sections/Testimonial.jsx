import React, { useState } from "react";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";

const testimonialData = [
  {
    id: 1,
    name: "Emma Patel",
    age: 27,
    location: "San Francisco, CA",
    feedback:
      "BrainZap’s quizzes make learning fun and effective. I’ve mastered coding concepts faster by competing on leaderboards and tracking my progress!",
    rating: 5,
    avatarColor: "from-violet-400 to-fuchsia-500",
    initials: "EP",
  },
  {
    id: 2,
    name: "Liam Nguyen",
    age: 34,
    location: "New York, NY",
    feedback:
      "As a Pro user, the AI feedback on my quizzes helps me focus on weak areas. Sharing my scores on social media boosts my professional profile!",
    rating: 4.5,
    avatarColor: "from-blue-400 to-indigo-500",
    initials: "LN",
  },
  {
    id: 3,
    name: "Sophie Carter",
    age: 23,
    location: "Austin, TX",
    feedback:
      "BrainZap’s Free plan let me explore Science and Math quizzes with ease. The streak system keeps me motivated to learn daily!",
    rating: 5,
    avatarColor: "from-emerald-400 to-teal-500",
    initials: "SC",
  },
  {
    id: 4,
    name: "James Brooks",
    age: 30,
    location: "Chicago, IL",
    feedback:
      "Elite’s custom quiz feature is a game-changer. I create tailored quizzes for my team, making training sessions engaging and productive.",
    rating: 4.5,
    avatarColor: "from-amber-400 to-orange-500",
    initials: "JB",
  },
  {
    id: 5,
    name: "Ava Kim",
    age: 25,
    location: "Seattle, WA",
    feedback:
      "Writing blogs as a Pro user lets me share my insights with the BrainZap community. It’s rewarding to inspire other learners!",
    rating: 5,
    avatarColor: "from-pink-400 to-rose-500",
    initials: "AK",
  },
  {
    id: 6,
    name: "Diego Alvarez",
    age: 32,
    location: "Miami, FL",
    feedback:
      "The leaderboard and achievement badges push me to excel. BrainZap turns learning into an exciting challenge I look forward to daily.",
    rating: 4.5,
    avatarColor: "from-cyan-400 to-blue-500",
    initials: "DA",
  },
];

const StarRating = ({ rating }) => {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          className={`w-4 h-4 ${
            index < Math.floor(rating) ? "text-amber-400" : "text-gray-600"
          }`}
          fill={index < Math.floor(rating) ? "#fbbf24" : "none"}
          strokeWidth={1.5}
        />
      ))}
    </div>
  );
};

const TestimonialCard = ({ testimonial }) => {
  const { name, age, location, feedback, rating, avatarColor, initials } =
    testimonial;

  return (
    <div className="backdrop-blur-lg bg-white/5 rounded-2xl p-6 border border-white/10 h-full flex flex-col justify-between transition-all duration-300 hover:border-white/20 hover:bg-white/10">
      <Quote className="w-6 h-6 text-white/10 mb-4" />
      <p className="text-white/90 leading-relaxed text-sm mb-4">"{feedback}"</p>
      <div className="mt-auto">
        <StarRating rating={rating} />
        <div className="flex items-center space-x-3 mt-4">
          <div
            className={`w-10 h-10 rounded-full bg-gradient-to-br ${avatarColor} flex items-center justify-center text-white font-medium`}
          >
            {initials}
          </div>
          <div>
            <h4 className="text-white font-medium text-sm">{name}</h4>
            <p className="text-white/60 text-xs">{location}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Testimonials = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const cardsPerPage = 3;
  const totalPages = Math.ceil(testimonialData.length / cardsPerPage);

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const visibleTestimonials = testimonialData.slice(
    currentPage * cardsPerPage,
    (currentPage + 1) * cardsPerPage
  );

  return (
    <section className="relative py-20 px-6 bg-transparent">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gray-800/70 border border-gray-700 backdrop-blur-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-violet-500 mr-2 animate-pulse"></span>
            <span className="text-sm font-medium text-gray-300">
              Testimonials
            </span>
          </div>
          <h2 className="text-5xl font-bold text-white mb-6 tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400">
              Why Learners Love BrainZap
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Hear from our community of learners who are mastering skills, competing globally, and sharing their expertise with BrainZap’s AI-powered platform.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {visibleTestimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
        <div className="flex justify-center items-center gap-4 mt-10">
          <button
            onClick={prevPage}
            className="p-2 rounded-full border border-white/10 backdrop-blur-lg bg-white/5 text-white hover:bg-white/10 transition-all"
            aria-label="Previous testimonials"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex gap-2">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentPage
                    ? "bg-gradient-to-r from-violet-400 to-fuchsia-500 w-6"
                    : "bg-white/20"
                }`}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
          </div>
          <button
            onClick={nextPage}
            className="p-2 rounded-full border border-white/10 backdrop-blur-lg bg-white/5 text-white hover:bg-white/10 transition-all"
            aria-label="Next testimonials"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;