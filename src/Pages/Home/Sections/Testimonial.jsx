import React from "react";
import { Quote, Star, UserCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const testimonialData = [
  {
    id: 1,
    name: "Emily Rodriguez",
    age: 28,
    location: "San Francisco, CA",
    image:
      "https://static.vecteezy.com/system/resources/thumbnails/048/747/985/small_2x/a-young-woman-with-long-brown-hair-is-wearing-a-black-blazer-and-white-shirt-looking-directly-at-the-camera-photo.jpg",
    feedback:
      "BrainZap has completely transformed my learning experience. The AI-powered quizzes adapt perfectly to my skill level, making studying efficient and engaging. I've seen remarkable improvements in my knowledge retention and confidence.",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chang",
    age: 35,
    location: "New York, NY",
    image:
      "https://images.unsplash.com/photo-1544168190-79c17527004f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpbmVzZSUyMG1hbnxlbnwwfHwwfHx8MA%3D%3D",
    feedback:
      "As a professional constantly looking to upskill, BrainZap has been a game-changer. The personalized learning paths and detailed feedback help me focus on areas that need improvement. It's like having a personal AI tutor 24/7.",
    rating: 4.5,
  },
  {
    id: 3,
    name: "Sarah Thompson",
    age: 22,
    location: "Austin, TX",
    image:
      "https://img.freepik.com/free-photo/confident-young-businesswoman-standing-with-her-arm-crossed-against-gray-backdrop_23-2148029501.jpg",
    feedback:
      "I was struggling with consistent learning until I found BrainZap. The platform's intelligent assessment and engaging ai generated quiz format make learning feel less like a chore and more like an exciting challenge. Highly recommended!",
    rating: 5,
  },
];

const StarRating = ({ rating }) => {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          className={`w-5 h-5 ${
            index < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"
          }`}
          fill={index < Math.floor(rating) ? "#fbbf24" : "none"}
        />
      ))}
      <span className="ml-2 text-sm text-gray-500">({rating})</span>
    </div>
  );
};

const TestimonialCard = ({ testimonial }) => {
  const { name, image, location, age, feedback, rating } = testimonial;

  return (
    <div className="relative bg-violet-900/20 rounded-2xl p-8 overflow-hidden group cursor-pointer">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-700/10 to-neutral-900/10 opacity-75 group-hover:opacity-90 transition-opacity"></div>
      {/* Quote Icon */}
      <div className="absolute top-4 right-4 opacity-20 group-hover:scale-125 transition-transform duration-300">
        <Quote className="w-16 h-16 text-violet-500/50" />
      </div>

      {/* Testimonial Content */}
      <div className="relative z-10 space-y-6">
        <p className="text-neutral-200 leading-relaxed mb-6">
          {feedback.slice(0, 250)}
        </p>

        {/* Rating */}
        <div className="mb-6">
          <StarRating rating={rating} />
        </div>

        {/* User Profile */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-full overflow-hidden border-3 border-neutral-600">
              <img src={image} alt="" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <h4 className="text-xl font-bold text-white">{name}</h4>
              <span className="text-neutral-400 text-sm">({age})</span>
            </div>
            <p className="text-neutral-400 text-sm">{location}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Testimonial = () => {
  return (
    <section className="bg-gray-900 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            <span className="font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              What Our Users Say
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-400 max-w-3xl mx-auto"
          >
            Discover how BrainZap is revolutionizing learning through
            personalized, AI-powered experiences. Our users share their
            transformative journeys.
          </motion.p>
          <p className="text-neutral-content/80 max-w-2xl mx-auto"></p>
        </div>

        {/* Testimonial Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonialData.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
