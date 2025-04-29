import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { Shield, Rocket, Star, Users, BadgeCheck, Zap } from "lucide-react";

const Faq = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="relative bg-gray-900 py-28 px-4 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-900/20 rounded-full filter blur-3xl opacity-20 animate-pulse"
          style={{ animationDuration: "15s" }}
        ></div>
        <div
          className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-blue-900/20 rounded-full filter blur-3xl opacity-20 animate-pulse"
          style={{ animationDuration: "12s" }}
        ></div>
      </div>

      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] opacity-20"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gray-800/70 border border-gray-700 backdrop-blur-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-purple-500 mr-2 animate-pulse"></span>
            <span className="text-sm font-medium text-gray-300">FAQ</span>
          </div>

          <h2 className="text-5xl font-bold text-white mb-6 tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400">
              Frequently Asked Questions
            </span>
          </h2>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Get the insights you need to understand how BrainZap revolutionizes
            your learning experience with AI-powered quizzes.
          </p>
        </div>

        {/* Accordion Container */}
        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-6">
            <div variants={item}>
              <AccordionItem
                value="item-1"
                className="group relative overflow-hidden rounded-xl border border-gray-800 backdrop-blur-sm hover:border-purple-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 bg-gray-800/30"
              >
                {/* Background gradient */}
                <div className="absolute -left-24 -bottom-24 w-48 h-48 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 opacity-10 rounded-full blur-xl transition-all duration-500 group-hover:opacity-20 group-hover:scale-125"></div>

                <AccordionTrigger className="px-8 py-6 text-xl text-white transition-colors hover:text-purple-300 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span>How do I know I can trust BrainZap?</span>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="text-gray-400 space-y-5 px-8 pb-6">
                  <div className="flex items-start space-x-3">
                    <BadgeCheck className="text-green-500 mt-1 flex-shrink-0" />
                    <p>
                      <span className="font-bold text-green-400">
                        AI-Powered Precision
                      </span>{" "}
                      – Our cutting-edge AI analyzes verified sources to create
                      engaging, accurate quizzes that challenge and enlighten
                      you.
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Shield className="text-blue-500 mt-1 flex-shrink-0" />
                    <p>
                      <span className="font-bold text-blue-400">
                        Ironclad Privacy
                      </span>{" "}
                      – We take data protection seriously. Your personal
                      information is encrypted and never shared with third
                      parties.
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Zap className="text-yellow-500 mt-1 flex-shrink-0" />
                    <p>
                      <span className="font-bold text-yellow-400">
                        24/7 Support
                      </span>{" "}
                      – Our dedicated team is always ready to help, ensuring you
                      have the best possible experience with BrainZap.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </div>

            <div>
              <AccordionItem
                value="item-2"
                className="group relative overflow-hidden rounded-xl border border-gray-800 backdrop-blur-sm hover:border-blue-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 bg-gray-800/30"
              >
                {/* Background gradient */}
                <div className="absolute -right-24 -top-24 w-48 h-48 bg-gradient-to-br from-cyan-500 via-blue-500 to-indigo-500 opacity-10 rounded-full blur-xl transition-all duration-500 group-hover:opacity-20 group-hover:scale-125"></div>

                <AccordionTrigger className="px-8 py-6 text-xl text-white transition-colors hover:text-blue-300 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span>Who can use BrainZap?</span>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="text-gray-400 space-y-5 px-8 pb-6">
                  <div className="flex items-start space-x-3">
                    <Star className="text-blue-500 mt-1 flex-shrink-0" />
                    <p>
                      <span className="font-bold text-blue-400">
                        Lifelong Learners
                      </span>{" "}
                      – Perfect for students, professionals, and anyone
                      passionate about continuous learning and knowledge
                      expansion.
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Rocket className="text-green-500 mt-1 flex-shrink-0" />
                    <p>
                      <span className="font-bold text-green-400">
                        Skill Development
                      </span>{" "}
                      – Whether you're preparing for exams, want to explore new
                      topics, or simply enjoy challenging yourself, BrainZap is
                      for you.
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <BadgeCheck className="text-purple-500 mt-1 flex-shrink-0" />
                    <p>
                      <span className="font-bold text-purple-400">
                        No Barriers
                      </span>{" "}
                      – Our intuitive interface makes learning accessible to
                      everyone, regardless of age, background, or expertise
                      level.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </div>

            <div>
              <AccordionItem
                value="item-3"
                className="group relative overflow-hidden rounded-xl border border-gray-800 backdrop-blur-sm hover:border-teal-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/10 bg-gray-800/30"
              >
                {/* Background gradient */}
                <div className="absolute -left-24 -top-24 w-48 h-48 bg-gradient-to-br from-green-400 via-emerald-500 to-teal-500 opacity-10 rounded-full blur-xl transition-all duration-500 group-hover:opacity-20 group-hover:scale-125"></div>

                <AccordionTrigger className="px-8 py-6 text-xl text-white transition-colors hover:text-teal-300 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span>Do you offer a free trial?</span>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="text-gray-400 space-y-5 px-8 pb-6">
                  <div className="flex items-start space-x-3">
                    <Zap className="text-blue-500 mt-1 flex-shrink-0" />
                    <p>
                      <span className="font-bold text-blue-400">
                        Absolutely!
                      </span>{" "}
                      – We offer a generous free tier that lets you experience
                      the magic of AI-generated quizzes without any commitment.
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Star className="text-green-500 mt-1 flex-shrink-0" />
                    <p>
                      <span className="font-bold text-green-400">
                        No Credit Card Required
                      </span>{" "}
                      – Start exploring, learning, and challenging yourself
                      instantly with zero financial risk.
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <BadgeCheck className="text-yellow-500 mt-1 flex-shrink-0" />
                    <p>
                      <span className="font-bold text-yellow-400">
                        Upgrade Anytime
                      </span>{" "}
                      – When you're ready to unlock premium features, upgrading
                      is quick, easy, and packed with value.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </div>
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default Faq;
