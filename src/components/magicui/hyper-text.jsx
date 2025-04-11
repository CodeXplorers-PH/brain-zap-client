"use client";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const DEFAULT_CHARACTER_SET = Object.freeze("ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""));

const getRandomInt = (max) => Math.floor(Math.random() * max);

export function HyperText({
  children,
  className,
  duration = 0.8, // Less than half a second
  delay = 0.4,
  as: Component = "div",
  startOnView = false,
  animateOnHover = false,
  characterSet = DEFAULT_CHARACTER_SET,
  ...props
}) {
  const MotionComponent =  motion.create(Component);
  const [displayText, setDisplayText] = useState(() => children.split(""));
  const [isAnimating, setIsAnimating] = useState(false);
  const elementRef = useRef(null);

  const handleAnimationTrigger = () => {
    if (animateOnHover && !isAnimating) {
      setIsAnimating(true);
    }
  };

  // Start animation on view or after delay
  useEffect(() => {
    if (!startOnView) {
      const startTimeout = setTimeout(() => {
        setIsAnimating(true);
      }, delay);
      return () => clearTimeout(startTimeout);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsAnimating(true);
          }, delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "-30% 0px -30% 0px" }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [delay, startOnView]);

  // Scramble effect logic
  useEffect(() => {
    if (!isAnimating) return;

    let currentIndex = 0;
    const intervalDuration = (duration * 1000) / children.length;

    const interval = setInterval(() => {
      setDisplayText((currentText) =>
        currentText.map((letter, index) =>
          letter === " "
            ? " "
            : index <= currentIndex
            ? children[index]
            : characterSet[getRandomInt(characterSet.length)]
        )
      );

      currentIndex++;

      if (currentIndex >= children.length) {
        clearInterval(interval);
        setIsAnimating(false);
      }
    }, intervalDuration);

    return () => clearInterval(interval);
  }, [children, duration, isAnimating, characterSet]);

  return (
    <MotionComponent
      ref={elementRef}
      className={cn("", className)}
      onMouseEnter={handleAnimationTrigger}
      {...props}
    >
      <AnimatePresence>
        {displayText.map((letter, index) => (
          <motion.span key={index}>{letter.toUpperCase()}</motion.span>
        ))}
      </AnimatePresence>
    </MotionComponent>
  );
}
