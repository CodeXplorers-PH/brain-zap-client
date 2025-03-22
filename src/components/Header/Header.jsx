import { Link, NavLink } from "react-router-dom"; // Link and NavLink are used for navigation between pages in a React Router application.
import LogoURI from "@/assets/logo.svg"; // Importing the website's logo.
import { Navs } from "@/data/Header"; // Importing navigation links data.
import Button from "../ui/Button"; // Importing a custom Button component.
import { Turn as Hamburger } from "hamburger-react"; // Importing a hamburger menu component for mobile navigation.
import { useState } from "react"; // Importing React's useState hook to manage component state.
import { ChevronRight, X } from "lucide-react"; // Importing icons for navigation and close button.
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion"; // Importing animation utilities from Framer Motion.

const Header = () => {
  const { scrollY } = useScroll();
  const [isHidden, setIsHidden] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsHidden(latest > scrollY.getPrevious()); // If scrolling down, hide the header; otherwise, show it.
  });

  return (
    <>
      {/* Animated header that hides when scrolling down */}
      <motion.header
        initial={{ y: 0 }} // Initial position at the top
        animate={{ y: isHidden ? "-100%" : "0%" }} // Moves up when isHidden is true
        transition={{ duration: 0 }} // Instant transition
        className="fixed top-0 left-0 flex justify-center w-full backdrop-blur-3xl z-[99999] transition-all"
      >
        <div className="wrapper py-3 gap-5 items-center justify-between">
          {/* Logo Section */}
          <Link to={`/`}>
            <img width={180} src={LogoURI} />
          </Link>

          {/* Navigation and Menu */}
          <div className="flex items-center gap-14">
            {/* Desktop Navigation */}
            <nav className="w-full hidden top-20 p-5 fixed lg:flex justify-center left-0 lg:static lg:w-fit">
              <motion.ul className="flex justify-center text-center gap-5 bg-huf-purple/10 border-huf-purple/30 overflow-hidden lg:gap-7 w-full flex-col border p-5 py-10 rounded-xl lg:border-none lg:flex-row lg:p-0 lg:bg-transparent">
                {/* Looping through the Navs array to render navigation links */}
                {Navs &&
                  Navs.map((navlink, index) => (
                    <li key={`navlink-${index}`}>
                      <Link
                        className="font-medium hover:text-text/80 transition-all text-text"
                        to={navlink.path}
                      >
                        {navlink.pathName}
                      </Link>
                    </li>
                  ))}

                {/* Displaying the button inside the mobile menu */}
                <div className="min-[520px]:hidden flex w-full justify-center">
                  <HeaderButton />
                </div>
              </motion.ul>
            </nav>

            {/* Right side of the header containing the menu button */}
            <div className="flex items-center gap-5">
              {/* Displaying the "Get Started" button on larger screens */}
              <div className="max-[520px]:hidden flex items-center gap-5">
                <HeaderButton />
              </div>

              {/* Mobile Menu Button */}
              <div
                className={`lg:hidden bg-white/50 transition-all border rounded-md ${
                  isOpen && "!bg-huf-purple/20 !border-huf-purple/50"
                }`}
              >
                <Hamburger size={25} toggled={isOpen} toggle={setIsOpen} />
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Navigation Menu - Only visible when isOpen is true */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            onClick={() => setIsOpen(false)} // Clicking outside the menu closes it
            initial={{ translateX: "-100%" }} // Initially hidden off-screen
            animate={{ translateX: 0 }} // Slides in when opened
            exit={{ translateX: "-100%" }} // Slides out when closed
            transition={{ type: "tween", ease: "easeInOut", duration: 0.4 }}
            className="fixed flex w-full lg:!hidden bg-black/30 cursor-pointer h-screen z-[999999999999999999999999]"
          >
            {/* Sidebar Content */}
            <div
              onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside
              className="cursor-default w-full min-[300px]:w-[300px] bg-white h-screen"
            >
              {/* Sidebar Header */}
              <div className="flex items-center w-full p-5 justify-between">
                <Link to={`/`} className="w-fit">
                  <img width={140} src={LogoURI} />
                </Link>

                {/* Close Button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="hover:rotate-45 transition-all"
                >
                  <X
                    size={30}
                    strokeWidth={1}
                    className="bg-huf-purple/20 border border-huf-purple/20 p-1 rounded-md"
                  />
                </button>
              </div>

              {/* Sidebar Navigation Links */}
              <div className="w-full flex flex-col gap-10 py-5 overflow-y-scroll [&::-webkit-scrollbar]:w-0">
                <ul className="w-full">
                  {/* Looping through the Navs array to render sidebar navigation links */}
                  {Navs.map((navlink, index) => (
                    <li key={`navlink-sidebar-${index}`} className="w-full">
                      <NavLink
                        to={navlink.path}
                        className={({ isActive }) =>
                          `flex transition-all w-full py-2 border-y border-transparent text-sm text-text font-medium hover:bg-huf-purple/20 px-5 ${
                            isActive && "bg-huf-purple/20 !border-huf-purple/20"
                          }`
                        }
                      >
                        {navlink.pathName}
                      </NavLink>
                    </li>
                  ))}
                </ul>

                {/* Sidebar Button */}
                <div className="px-5">
                  <HeaderButton className="w-full rounded-md" />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;

// Header Button Component
export const HeaderButton = ({ className }) => {
  return (
    <>
      <Link to={`/login`}>
        <Button className={className || ""}>
          Get Started{" "}
          <ChevronRight
            strokeWidth={1.5}
            className="absolute opacity-0 transition-all group-hover:translate-x-14 ml-2 group-hover:opacity-100"
          />
        </Button>
      </Link>
    </>
  );
};
