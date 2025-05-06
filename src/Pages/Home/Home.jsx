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

  // Smooth mouse tracking for parallax
  useEffect(() => {
    let rafId;
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 2.5; // Increased range for more effect
      const y = (clientY / window.innerHeight - 0.5) * 2.5;
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
    <div className="relative min-h-screen bg-gradient-to-b from-gray-950 via-black to-gray-950 overflow-hidden">
      {/* Unified Background with 3D Parallax */}
      <div className="absolute inset-0 z-0 perspective-1500">
        {/* Holographic Shimmer Overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-tr from-cyan-900/5 via-transparent to-cyan-900/5 opacity-30 animate-shimmer"
          style={{
            transform: `translate3d(${mousePos.x * 8}px, ${mousePos.y * 8}px, 0px)`,
            transition: "transform 0.3s ease-out",
          }}
        ></div>

        {/* Dynamic Data Stream */}
        {[...Array(5)].map((_, i) => (
          <div
            key={`stream-${i}`}
            className="absolute w-px h-full bg-gradient-to-b from-violet-500/30 via-cyan-500/30 to-transparent animate-dataFlow"
            style={{
              left: `${10 + i * 20}%`,
              transform: `translate3d(${mousePos.x * 15}px, ${mousePos.y * 10}px, -50px)`,
              transition: "transform 0.3s ease-out",
              clipPath: `polygon(0 ${i * 20}%, 100% ${i * 20 + 10}%, 100% 100%, 0 100%)`,
            }}
          >
            {/* Branching Lines */}
            {i % 2 === 0 && (
              <div
                className="absolute w-px h-1/4 bg-gradient-to-b from-cyan-500/20 to-transparent"
                style={{
                  top: "25%",
                  left: "50%",
                  transform: `rotate(${i * 15 - 30}deg) translateX(-50%)`,
                  animation: "dataBranch 4s linear infinite",
                  animationDelay: `${i * 0.5}s`,
                }}
              ></div>
            )}
          </div>
        ))}

        {/* Pulsating Quiz Sphere */}
        <div
          className="absolute top-1/2 left-1/2 w-64 h-64 animate-rotateSphere animate-pulseSphere"
          style={{
            transform: `translate3d(${mousePos.x * 25}px, ${mousePos.y * 25}px, -80px)`,
            transition: "transform 0.3s ease-out",
          }}
        >
          {/* Sphere Surface with Icons */}
          <div
            className="absolute w-full h-full bg-gradient-to-br from-violet-600/15 to-cyan-600/15 border border-violet-500/40 rounded-full opacity-70"
          >
            <div className="absolute inset-1/4 flex items-center justify-center text-violet-400/60 text-2xl">?</div>
            <div className="absolute inset-1/2 flex items-center justify-center text-cyan-400/60 text-2xl">!</div>
            <div className="absolute inset-3/4 flex items-center justify-center text-yellow-400/60 text-2xl">★</div>
          </div>
        </div>

        {/* Simplified Node Network */}
        {[...Array(6)].map((_, i) => (
          <div
            key={`node-${i}`}
            className="absolute"
            style={{
              width: "4px",
              height: "4px",
              top: `${15 + i * 15}%`,
              left: i % 2 === 0 ? `${10 + i * 15}%` : `${75 - i * 15}%`,
              background: i % 2 === 0 ? "rgba(139, 92, 246, 0.9)" : "rgba(34, 211, 238, 0.9)",
              transform: `translate3d(${mousePos.x * (i % 3 + 12)}px, ${mousePos.y * (i % 3 + 12)}px, 40px)`,
              transition: "transform 0.3s ease-out",
              borderRadius: "50%",
              boxShadow: `0 0 10px ${
                i % 2 === 0 ? "rgba(139, 92, 246, 0.7)" : "rgba(34, 211, 238, 0.7)"
              }`,
            }}
          >
            {i < 5 && (
              <div
                className="absolute w-px h-px"
                style={{
                  top: "2px",
                  left: "2px",
                  width: `${Math.sqrt(
                    Math.pow((i % 2 === 0 ? 10 + (i + 1) * 15 : 75 - (i + 1) * 15) - (i % 2 === 0 ? 10 + i * 15 : 75 - i * 15), 2) +
                    Math.pow((15 + (i + 1) * 15) - (15 + i * 15), 2)
                  ) * 10}px`,
                  height: "1px",
                  background: "linear-gradient(to right, rgba(139, 92, 246, 0.5), rgba(34, 211, 238, 0.5))",
                  transform: `rotate(${
                    Math.atan2(
                      (15 + (i + 1) * 15) - (15 + i * 15),
                      (i % 2 === 0 ? 10 + (i + 1) * 15 : 75 - (i + 1) * 15) - (i % 2 === 0 ? 10 + i * 15 : 75 - i * 15)
                    ) * (180 / Math.PI)
                  }deg)`,
                  transformOrigin: "0 0",
                  animation: "pulseConnect 2.5s ease-in-out infinite",
                }}
              ></div>
            )}
          </div>
        ))}
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
        .perspective-1500 {
          perspective: 1500px;
        }

        /* Radial Gradient for Tailwind */
        .radial-gradient-circle {
          background: radial-gradient(circle at 50% 50%, currentColor, transparent 70%);
        }

        /* Holographic Shimmer Animation */
        @keyframes shimmer {
          0% {
            background-position: 0% 0%;
          }
          100% {
            background-position: 100% 100%;
          }
        }
        .animate-shimmer {
          background-size: 200% 200%;
          animation: shimmer 15s ease infinite;
        }

        /* Data Stream Animation */
        @keyframes dataFlow {
          0% {
            height: 0%;
            opacity: 0.3;
          }
          50% {
            height: 100%;
            opacity: 0.7;
          }
          100% {
            height: 0%;
            opacity: 0.3;
          }
        }

        /* Data Branch Animation */
        @keyframes dataBranch {
          0% {
            transform: rotate(-30deg) translateX(-50%);
            opacity: 0.2;
          }
          50% {
            transform: rotate(0deg) translateX(0);
            opacity: 0.5;
          }
          100% {
            transform: rotate(30deg) translateX(50%);
            opacity: 0.2;
          }
        }

        /* Sphere Rotation */
        @keyframes rotateSphere {
          0% {
            transform: translate3d(0, 0, -80px) rotateZ(0deg);
          }
          100% {
            transform: translate3d(0, 0, -80px) rotateZ(360deg);
          }
        }

        /* Sphere Pulse */
        @keyframes pulseSphere {
          0%, 100% {
            transform: scale(1);
            opacity: 0.7;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.9;
          }
        }

        /* Node Connection Pulse */
        @keyframes pulseConnect {
          0%, 100% {
            opacity: 0.5;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.1);
          }
        }

        /* Mobile Optimizations */
        @media (max-width: 768px) {
          /* Disable parallax and animations for performance */
          [style*="translate3d"] {
            transform: none !important;
          }
          .animate-shimmer, .animate-dataFlow, .animate-dataBranch, .animate-rotateSphere, .animate-pulseSphere, .animate-pulseConnect {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;