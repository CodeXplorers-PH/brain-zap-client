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
  return (
    <section className="bg-gray-900 text-neutral-content py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Hero Heading */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 font-extrabold mb-4">
              Frequently Asked Questions
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-400 max-w-3xl mx-auto"
          >
            Get the insights you need to understand how BrainZap revolutionizes
            your learning experience with AI-powered quizzes.
          </motion.p>
          <p className="text-neutral-content/80 max-w-2xl mx-auto"></p>
        </div>

        {/* Accordion Container */}
        <div className="max-w-4xl mx-auto">
          <Accordion
            type="single"
            collapsible
            className="space-y-6 bg-neutral-focus rounded-2xl p-6 lg:p-10"
          >
            <AccordionItem
              value="item-1"
              className="border-b border-neutral-600 pb-4"
            >
              <AccordionTrigger className="text-xl text-neutral-content transition-colors flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Shield className="" />
                  <span>How do I know I can trust BrainZap?</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-neutral-content/80 space-y-4 pt-4">
                <div className="flex items-start space-x-3">
                  <BadgeCheck className="text-green-500 mt-1 flex-shrink-0" />
                  <p>
                    <span className="font-bold text-green-400">
                      AI-Powered Precision
                    </span>{" "}
                    – Our cutting-edge AI analyzes verified sources to create
                    engaging, accurate quizzes that challenge and enlighten you.
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

            <AccordionItem
              value="item-2"
              className="border-b border-neutral-600 pb-4"
            >
              <AccordionTrigger className="text-xl text-neutral-content transition-colors flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Users className="" />
                  <span>Who can use BrainZap?</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-neutral-content/80 space-y-4 pt-4">
                <div className="flex items-start space-x-3">
                  <Star className="text-blue-500 mt-1 flex-shrink-0" />
                  <p>
                    <span className="font-bold text-blue-400">
                      Lifelong Learners
                    </span>{" "}
                    – Perfect for students, professionals, and anyone passionate
                    about continuous learning and knowledge expansion.
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
                    everyone, regardless of age, background, or expertise level.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-3"
              className="border-b border-neutral-600 pb-4"
            >
              <AccordionTrigger className="text-xl text-neutral-content transition-colors flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Rocket className="" />
                  <span>Do you offer a free trial?</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-neutral-content/80 space-y-4 pt-4">
                <div className="flex items-start space-x-3">
                  <Zap className="text-blue-500 mt-1 flex-shrink-0" />
                  <p>
                    <span className="font-bold text-blue-400">Absolutely!</span>{" "}
                    – We offer a generous free tier that lets you experience the
                    magic of AI-generated quizzes without any commitment.
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
                    – When you're ready to unlock premium features, upgrading is
                    quick, easy, and packed with value.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default Faq;
