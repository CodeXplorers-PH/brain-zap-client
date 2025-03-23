import React, { useState } from "react";
import logo from "../../assets/logo.svg";
import { NavLink } from "react-router-dom";
import { Navs } from "@/data/Header";
import ShinyText from "../ui/ShinyText/ShinyText";
import { ChevronRight, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="w-full sticky top-0 bg-background-1 z-20">
      <div className="w-full h-[200px] bg-gradient-to-t from-transparent via-brand-1/10 to-transparent absolute z-[-2]"></div>
      <motion.nav
        initial={{ paddingBottom: "16px" }}
        animate={{ paddingBottom: isOpen ? "380px" : "16px" }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="flex items-center justify-between gap-4 pt-6 w-4/5 mx-auto"
      >
        {/* Logo Section */}
        <div className="flex-shrink-0">
          <NavLink to="/" aria-label="Home" onClick={closeMenu}>
            <img src={logo} alt="Brain Zap Logo" className="w-40 h-auto" />
          </NavLink>
        </div>

        {/* Navigation and CTA Section */}
        <div className="items-center gap-8 hidden md:flex">
          {/* Navigation Links */}
          <ul className="flex items-center gap-8" role="navigation">
            {Navs?.map((nav, index) => (
              <li key={nav?.path || index}>
                <NavLink
                  to={nav?.path}
                  className={({ isActive }) =>
                    `text-xl transition-colors duration-300 hover:text-text-title text-text-subtitle ${
                      isActive ? "text-text-title" : "text-text-subtitle"
                    }`
                  }
                >
                  {nav?.pathName}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <div>
            <button
              className="border border-neutral-800/60 hover:border-neutral-700/60 hover:bg-neutral-800/10 duration-300 transition px-6 py-3 rounded-full flex items-center gap-2 group focus:outline-none focus:ring-2 focus:ring-text-title"
              aria-label="Get Started"
            >
              <ShinyText
                text="Get Started"
                className="text-text-subtitle text-xl"
                speed={3}
              />
              <ChevronRight className="text-text-subtitle transform transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          className="text-text-subtitle md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X size={40} /> : <Menu size={40} />}
        </button>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="md:hidden w-full absolute top-24 left-0"
          >
            <ul
              className="flex flex-col items-center gap-4 py-4"
              role="navigation"
            >
              {Navs?.map((nav, index) => (
                <li key={nav?.path || index}>
                  <NavLink
                    to={nav?.path}
                    className={({ isActive }) =>
                      `text-xl transition-colors duration-300 hover:text-text-title text-text-subtitle ${
                        isActive ? "text-text-title" : "text-text-subtitle"
                      }`
                    }
                    onClick={closeMenu}
                  >
                    {nav?.pathName}
                  </NavLink>
                </li>
              ))}
            </ul>
            <div className="flex justify-center py-4">
              <button
                className="border border-neutral-800/60 hover:border-neutral-700/60 hover:bg-neutral-800/10 duration-300 transition px-6 py-3 rounded-full flex items-center gap-2 group focus:outline-none focus:ring-2 focus:ring-text-title"
                aria-label="Get Started"
              >
                <ShinyText
                  text="Get Started"
                  className="text-text-subtitle text-xl"
                  speed={3}
                />
                <ChevronRight className="text-text-subtitle transform transition-transform duration-200 group-hover:translate-x-1" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Divider */}
      <div className="w-screen left-0 h-[1px] bg-neutral-800/60 absolute"></div>
    </header>
  );
};

export default Header;
