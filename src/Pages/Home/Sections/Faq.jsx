import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Shield, Rocket, Star, Trophy, BadgeCheck, Zap } from "lucide-react";
import { motion } from "framer-motion";

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
    <section className="relative py-28 px-4 bg-transparent">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gray-800/70 border border-gray-700 backdrop-blur-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-purple-500 mr-2 animate-pulse"></span>
            <span className="text-sm font-medium text-gray-300">
              Got Questions?
            </span>
          </div>
          <h2 className="text-5xl font-bold text-white mb-6 tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400">
              BrainZap FAQs
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Everything you need to know about BrainZap’s quizzes, plans, and how to excel.
          </p>
        </div>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-6">
            <motion.div variants={item}>
              <AccordionItem
                value="item-1"
                className="group relative overflow-hidden rounded-xl border border-gray-800 backdrop-blur-sm hover:border-purple-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 bg-gray-800/30"
              >
                <div className="absolute -left-24 -bottom-24 w-48 h-48 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 opacity-10 rounded-full blur-xl transition-all duration-500 group-hover:opacity-20 group-hover:scale-125"></div>
                <AccordionTrigger className="px-8 py-6 text-xl text-white transition-colors hover:text-purple-300 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span>What can I do with BrainZap’s Free plan?</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-gray-400 space-y-5 px-8 pb-6">
                  <div className="flex items-start space-x-3">
                    <BadgeCheck className="text-green-500 mt-1 flex-shrink-0" />
                    <p>
                      <span className="font-bold text-green-400">Explore Quizzes</span> – Take AI-generated quizzes in 7+ categories like Programming, Science, and Math with MCQ or True/False formats.
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Star className="text-blue-500 mt-1 flex-shrink-0" />
                    <p>
                      <span className="font-bold text-blue-400">Track Progress</span> – Monitor your quiz scores, streaks, and achievements in your profile dashboard.
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Trophy className="text-yellow-500 mt-1 flex-shrink-0" />
                    <p>
                      <span className="font-bold text-yellow-400">Read Blogs</span> – Learn from community insights and blog posts shared by Pro and Elite users.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </motion.div>
            <motion.div variants={item}>
              <AccordionItem
                value="item-2"
                className="group relative overflow-hidden rounded-xl border border-gray-800 backdrop-blur-sm hover:border-blue-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 bg-gray-800/30"
              >
                <div className="absolute -right-24 -top-24 w-48 h-48 bg-gradient-to-br from-cyan-500 via-blue-500 to-indigo-500 opacity-10 rounded-full blur-xl transition-all duration-500 group-hover:opacity-20 group-hover:scale-125"></div>
                <AccordionTrigger className="px-8 py-6 text-xl text-white transition-colors hover:text-blue-300 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span>What’s exclusive to Pro and Elite plans?</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-gray-400 space-y-5 px-8 pb-6">
                  <div className="flex items-start space-x-3">
                    <Zap className="text-purple-500 mt-1 flex-shrink-0" />
                    <p>
                      <span className="font-bold text-purple-400">Pro Plan</span> – Get AI-powered feedback on quiz performance, share results on social media, and write blogs with our Rich Text Editor.
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Rocket className="text-blue-500 mt-1 flex-shrink-0"/>
                    <p>
                      <span className="font-bold text-blue-400">Elite Plan</span> – All Pro features, plus create custom quizzes on any topic, with adjustable question counts and difficulty levels.
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Star className="text-green-500 mt-1 flex-shrink-0" />
                    <p>
                      <span className="font-bold text-green-400">Both Plans</span> – Unlock advanced analytics and priority access to new quiz categories.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </motion.div>
            <motion.div variants={item}>
              <AccordionItem
                value="item-3"
                className="group relative overflow-hidden rounded-xl border border-gray-800 backdrop-blur-sm hover:border-teal-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/10 bg-gray-800/30"
              >
                <div className="absolute -left-24 -top-24 w-48 h-48 bg-gradient-to-br from-green-400 via-emerald-500 to-teal-500 opacity-10 rounded-full blur-xl transition-all duration-500 group-hover:opacity-20 group-hover:scale-125"></div>
                <AccordionTrigger className="px-8 py-6 text-xl text-white transition-colors hover:text-teal-300 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span>How do I compete on BrainZap?</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-gray-400 space-y-5 px-8 pb-6">
                  <div className="flex items-start space-x-3">
                    <Trophy className="text-yellow-500 mt-1 flex-shrink-0" />
                    <p>
                      <span className="font-bold text-yellow-400">Earn Points</span> – Gain points by completing quizzes, with bonuses for accuracy and speed.
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <BadgeCheck className="text-green-500 mt-1 flex-shrink-0" />
                    <p>
                      <span className="font-bold text-green-400">Climb Leaderboards</span> – Track your rank globally or within categories and showcase your expertise.
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Star className="text-blue-500 mt-1 flex-shrink-0" />
                    <p>
                      <span className="font-bold text-blue-400">Unlock Achievements</span> – Hit milestones like quiz streaks or category mastery to earn badges.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </motion.div>
            <motion.div variants={item}>
              <AccordionItem
                value="item-4"
                className="group relative overflow-hidden rounded-xl border border-gray-800 backdrop-blur-sm hover:border-amber-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/10 bg-gray-800/30"
              >
                <div className="absolute -right-24 -bottom-24 w-48 h-48 bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 opacity-10 rounded-full blur-xl transition-all duration-500 group-hover:opacity-20 group-hover:scale-125"></div>
                <AccordionTrigger className="px-8 py-6 text-xl text-white transition-colors hover:text-amber-300 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span>Can I share my knowledge on BrainZap?</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-gray-400 space-y-5 px-8 pb-6">
                  <div className="flex items-start space-x-3">
                    <Rocket className="text-blue-500 mt-1 flex-shrink-0" />
                    <p>
                      <span className="font-bold text-blue-400">Write Blogs</span> – Pro and Elite users can create and share blog posts using our Rich Text Editor to inspire others.
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Zap className="text-purple-500 mt-1 flex-shrink-0" />
                    <p>
                      <span className="font-bold text-purple-400">Share Results</span> – Pro and Elite users can post quiz scores on social media to highlight their expertise.
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Star className="text-green-500 mt-1 flex-shrink-0" />
                    <p>
                      <span className="font-bold text-green-400">Community Learning</span> – Free users can read blogs and engage with posts to learn from the community.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </motion.div>
            <motion.div variants={item}>
              <AccordionItem
                value="item-5"
                className="group relative overflow-hidden rounded-xl border border-gray-800 backdrop-blur-sm hover:border-pink-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/10 bg-gray-800/30"
              >
                <div className="absolute -left-24 -top-24 w-48 h-48 bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 opacity-10 rounded-full blur-xl transition-all duration-500 group-hover:opacity-20 group-hover:scale-125"></div>
                <AccordionTrigger className="px-8 py-6 text-xl text-white transition-colors hover:text-pink-300 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span>How do I get started with BrainZap?</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-gray-400 space-y-5 px-8 pb-6">
                  <div className="flex items-start space-x-3">
                    <Shield className="text-green-500 mt-1 flex-shrink-0" />
                    <p>
                      <span className="font-bold text-green-400">Sign Up</span> – Create a free account in seconds to access quizzes and track your progress.
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Rocket className="text-blue-500 mt-1 flex-shrink-0" />
                    <p>
                      <span className="font-bold text-blue-400">Take a Quiz</span> – Choose from 7+ categories or explore featured quizzes to start learning.
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Star className="text-yellow-500 mt-1 flex-shrink-0" />
                    <p>
                      <span className="font-bold text-yellow-400">Upgrade Anytime</span> – Unlock Pro or Elite plans for custom quizzes, AI feedback, and more.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default Faq;