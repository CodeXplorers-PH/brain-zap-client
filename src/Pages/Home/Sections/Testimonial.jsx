import React, { useState } from "react";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";

const testimonialData = [
  {
    id: 1,
    name: "Emily Rodriguez",
    age: 28,
    location: "San Francisco, CA",
    feedback:
      "BrainZap has completely transformed my learning experience. The AI-powered quizzes adapt perfectly to my skill level, making studying efficient and engaging.",
    rating: 5,
    avatarColor: "from-violet-400 to-fuchsia-500",
    initials: "ER"
  },
  {
    id: 2,
    name: "Michael Chang",
    age: 35,
    location: "New York, NY",
    feedback:
      "As a professional constantly looking to upskill, BrainZap has been a game-changer. The personalized learning paths help me focus on areas that need improvement.",
    rating: 4.5,
    avatarColor: "from-blue-400 to-indigo-500",
    initials: "MC"
  },
  {
    id: 3,
    name: "Sarah Thompson",
    age: 22,
    location: "Austin, TX",
    feedback:
      "I was struggling with consistent learning until I found BrainZap. The platform's intelligent assessment makes learning feel like an exciting challenge.",
    rating: 5,
    avatarColor: "from-emerald-400 to-teal-500",
    initials: "ST"
  },
  {
    id: 4,
    name: "David Wilson",
    age: 31,
    location: "Chicago, IL",
    feedback:
      "The spaced repetition system in BrainZap has significantly improved my memory retention. I'm now much more confident in my knowledge base for work meetings.",
    rating: 4.5,
    avatarColor: "from-amber-400 to-orange-500",
    initials: "DW"
  },
  {
    id: 5,
    name: "Jennifer Lee",
    age: 26,
    location: "Seattle, WA",
    feedback:
      "BrainZap's algorithm knows exactly when I need to review information. It's like it understands my learning patterns better than I do. Absolutely worth every penny.",
    rating: 5,
    avatarColor: "from-pink-400 to-rose-500",
    initials: "JL"
  },
  {
    id: 6,
    name: "Carlos Mendez",
    age: 33,
    location: "Miami, FL",
    feedback:
      "Learning complex topics has never been easier. BrainZap breaks down information into digestible chunks and reinforces them at exactly the right intervals.",
    rating: 4.5,
    avatarColor: "from-cyan-400 to-blue-500",
    initials: "CM"
  }
];

const StarRating = ({ rating }) => {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          className={`w-4 h-4 ${index < Math.floor(rating) ? "text-amber-400" : "text-gray-600"
            }`}
          fill={index < Math.floor(rating) ? "#fbbf24" : "none"}
          strokeWidth={1.5}
        />
      ))}
    </div>
  );
};

const TestimonialCard = ({ testimonial }) => {
  const { name, age, location, feedback, rating, avatarColor, initials } = testimonial;

  return (
    <div className="backdrop-blur-lg bg-white/5 rounded-2xl p-6 border border-white/10 h-full flex flex-col justify-between transition-all duration-300 hover:border-white/20 hover:bg-white/10">
      {/* Quote Icon */}
      <Quote className="w-6 h-6 text-white/10 mb-4" />

      {/* Testimonial Content */}
      <p className="text-white/90 leading-relaxed text-sm mb-4">
        "{feedback}"
      </p>

      <div className="mt-auto">
        {/* Rating */}
        <StarRating rating={rating} />

        {/* User Profile */}
        <div className="flex items-center space-x-3 mt-4">
          <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${avatarColor} flex items-center justify-center text-white font-medium`}>
            {initials}
          </div>

          <div>
            <h4 className="text-white font-medium text-sm">{name}</h4>
            <p className="text-white/60 text-xs">
              {location}
            </p>
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
    <section className="bg-gray-900 py-20 px-6 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-violet-600/10 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-blue-600/10 blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gray-800/70 border border-gray-700 backdrop-blur-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-violet-500 mr-2 animate-pulse"></span>
            <span className="text-sm font-medium text-gray-300">Testimonials</span>
          </div>

          <h2 className="text-5xl font-bold text-white mb-6 tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400">
              What Our Users Say
            </span>
          </h2>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Discover how BrainZap is revolutionizing learning through personalized,
            AI-powered experiences that adapt to your unique journey.
          </p>
        </div>

        {/* Testimonial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {visibleTestimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
            />
          ))}
        </div>

        {/* Navigation Controls */}
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
                className={`w-2 h-2 rounded-full transition-all ${index === currentPage
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