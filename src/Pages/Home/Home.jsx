import React, { useEffect, useState } from "react";
import Hero from "./Sections/Hero";
import Features from "./Sections/Features";
import GetStarted from "./Sections/GetStarted";
import Faq from "./Sections/Faq";
import Testimonial from "./Sections/Testimonial";
import HowItWorks from "./Sections/HowItWorks";
import CTA from "./Sections/CTA";
import EidModal from "@/components/EidModal/EidModal";
import EidDecoration from "@/components/EidDecoration/EidDecoration";

const Home = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Smooth mouse tracking for subtle parallax
  useEffect(() => {
    let rafId;
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 1.5;
      const y = (clientY / window.innerHeight - 0.5) * 1.5;
      rafId = requestAnimationFrame(() => {
        setMousePos({ x, y });
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Scroll and title management
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Home | BrainZap";
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-gray-900 overflow-hidden">
      {/* Unified Background with Subtle Parallax */}
      <div className="absolute inset-0 z-0 perspective-1000">
        {/* Main Gradient Overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-tr from-purple-900/20 via-blue-900/20 to-cyan-900/20 opacity-50 animate-gradientShift"
          style={{
            transform: `translate3d(${mousePos.x * 5}px, ${mousePos.y * 5}px, 0px)`,
            transition: "transform 0.4s ease-out",
          }}
        ></div>

        {/* Decorative Blurred Circles */}
        <div
          className="absolute top-0 left-0 w-96 h-96 bg-purple-500 rounded-full opacity-20 blur-3xl -ml-48 -mt-48"
          style={{
            transform: `translate3d(${mousePos.x * 10}px, ${mousePos.y * 10}px, 20px)`,
            transition: "transform 0.4s ease-out",
          }}
        ></div>
        <div
          className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full opacity-20 blur-3xl -mr-48 -mb-48"
          style={{
            transform: `translate3d(${mousePos.x * -10}px, ${mousePos.y * -10}px, 20px)`,
            transition: "transform 0.4s ease-out",
          }}
        ></div>

        {/* Subtle Floating Particles */}
        {[...Array(4)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full opacity-50"
            style={{
              top: `${20 + i * 20}%`,
              left: `${15 + i * 25}%`,
              transform: `translate3d(${mousePos.x * (i + 5)}px, ${mousePos.y * (i + 5)}px, 30px)`,
              transition: "transform 0.4s ease-out",
              animation: `floatParticle ${3 + i}s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`,
            }}
          ></div>
        ))}

        {/* Hero Section Enhanced Background */}
        <div
          className="absolute top-0 left-0 w-full h-[100vh] bg-gradient-to-b from-purple-600/10 to-blue-600/10 animate-pulseGlow"
          style={{
            transform: `translate3d(0, 0, 10px)`,
            clipPath: "polygon(0 0, 100% 0, 100% 85%, 0 100%)",
          }}
        >
          {/* Micro Sparkles */}
          {[...Array(6)].map((_, i) => (
            <div
              key={`sparkle-${i}`}
              className="absolute w-1 h-1 bg-white rounded-full opacity-70"
              style={{
                top: `${10 + i * 15}%`,
                left: `${10 + i * 15}%`,
                animation: `sparkle ${2 + i * 0.5}s ease-in-out infinite`,
                animationDelay: `${i * 0.3}s`,
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Page Content */}
      <div className="relative z-10">
        {/* <EidDecoration /> */}
        {/* <EidModal /> */}
        <Hero />
        <Features />
        <GetStarted />
        <Faq />
        <Testimonial />
        <HowItWorks />
        <CTA />
      </div>

      {/* Global Styles for Background and Animations */}
      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }

        /* Gradient Shift Animation */
        @keyframes gradientShift {
          0% {
            background-position: 0% 0%;
          }
          50% {
            background-position: 100% 100%;
          }
          100% {
            background-position: 0% 0%;
          }
        }
        .animate-gradientShift {
          background-size: 200% 200%;
          animation: gradientShift 20s ease infinite;
        }

        /* Pulse Glow for Hero */
        @keyframes pulseGlow {
          0%, 100% {
            opacity: 0.5;
          }
          50% {
            opacity: 0.8;
          }
        }
        .animate-pulseGlow {
          animation: pulseGlow 8s ease-in-out infinite;
        }

        /* Floating Particle Animation */
        @keyframes floatParticle {
          0%, 100% {
            transform: translateY(0);
            opacity: 0.5;
          }
          50% {
            transform: translateY(-20px);
            opacity: 0.8;
          }
        }

        /* Sparkle Animation */
        @keyframes sparkle {
          0%, 100% {
            opacity: 0.3;
            transform: scale(0.5);
          }
          50% {
            opacity: 0.7;
            transform: scale(1.2);
          }
        }

        /* Mobile Optimizations */
        @media (max-width: 768px) {
          /* Disable parallax for performance */
          [style*="translate3d"] {
            transform: none !important;
          }
          .animate-gradientShift,
          .animate-pulseGlow,
          .animate-floatParticle,
          .animate-sparkle {
            animation: none !important;
          }
          /* Reduce blur for better mobile rendering */
          .blur-3xl {
            filter: blur(40px);
          }
        }
      `}</style>
    </div>
  );
};

export default Home;