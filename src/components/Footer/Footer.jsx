import React from "react";
import LogoURI from "@/assets/logo.svg"; // Importing the website's logo.
import Button from "../ui/Button"; // Importing a custom Button component.
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer
      style={{ backgroundColor: "rgb(46 42 66)" }}
      className="py-10 sm:pt-16 lg:pt-24"
    >
      <div className="px-4 mx-auto sm:px-10 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-y-12 gap-x-8 xl:gap-x-12">
          <div className="col-span-2 md:col-span-4 xl:pr-8">
            <Link to={"/"}>
              <img className="w-auto h-9" src={LogoURI} alt="Logo" />
            </Link>

            <h6 className="text-base leading-relaxed mt-6 text-white">
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do
              amet sint. Velit officia consequat duis enim velit mollit.
            </h6>

            <Button className="mt-3">Get Started</Button>
          </div>

          <div className="lg:col-span-2">
            <h5 className="text-base font-semibold text-white">Company</h5>

            <ul className="mt-6 space-y-5">
              <li>
                <Link
                  to="/about"
                  className="flex text-sm text-white transition-all duration-200 hover:text-purple-400"
                >
                  About{" "}
                </Link>
              </li>

              <li>
                <Link
                  to="/pricing"
                  className="flex text-sm text-white transition-all duration-200 hover:text-purple-400  "
                >
                  {" "}
                  Pricing{" "}
                </Link>
              </li>

              <li>
                <Link
                  to="/blog"
                  className="flex text-sm text-white transition-all duration-200 hover:text-purple-400  "
                >
                  {" "}
                  Blog{" "}
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  className="flex text-sm text-white transition-all duration-200 hover:text-purple-400  "
                >
                  {" "}
                  Contact{" "}
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h5 className="text-base font-semibold text-white">Help</h5>

            <ul className="mt-6 space-y-4">
              <li>
                <Link
                  to=""
                  className="flex text-sm text-white transition-all duration-200 hover:text-purple-400  "
                >
                  {" "}
                  Customer Support{" "}
                </Link>
              </li>

              <li>
                <Link
                  to=""
                  className="flex text-sm text-white transition-all duration-200 hover:text-purple-400  "
                >
                  {" "}
                  Delivery Details{" "}
                </Link>
              </li>

              <li>
                <Link
                  to=""
                  className="flex text-sm text-white transition-all duration-200 hover:text-purple-400  "
                >
                  {" "}
                  Terms & Conditions{" "}
                </Link>
              </li>

              <li>
                <Link
                  to=""
                  className="flex text-sm text-white transition-all duration-200 hover:text-purple-400  "
                >
                  {" "}
                  Privacy Policy{" "}
                </Link>
              </li>
            </ul>
          </div>

          <div className="px-2 md:px-0 lg:col-span-4 col-span-2 flex flex-col items-center space-y-6 text-center">
            <h4 className="text-xl sm:text-2xl font-semibold text-white">
              Get tips and resources with our free newsletter.
            </h4>

            <div className="flex flex-wrap sm:flex-nowrap items-center bg-white md:rounded-full rounded-xl p-1 shadow-md w-full max-w-lg">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow px-4 py-2 text-gray-600 focus:outline-none bg-transparent w-full"
              />
              <button className="flex items-center justify-center px-5 py-2 text-sm font-medium text-gray-700 border rounded-full hover:bg-gray-100 w-full sm:w-auto">
                Subscribe
                <span className="ml-2">➤</span>
              </button>
            </div>
          </div>
        </div>

        <hr className="mt-16 mb-10 border-gray-200" />

        <div className="sm:flex sm:items-center sm:justify-between">
          <h6 className="text-sm text-white text-center w-full">
            © Copyright {new Date().getFullYear()}, All Rights Reserved by{" "}
            <Link to={"/"}>
              <img className="w-20 h-9 inline" src={LogoURI} alt="Logo" />
            </Link>
          </h6>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
