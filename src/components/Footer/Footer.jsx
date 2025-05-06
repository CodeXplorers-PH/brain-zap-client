import React from "react";
import { Link } from "react-router-dom";  // React router
import { FaXTwitter } from "react-icons/fa6";
// twitter logo
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa"; // facebook logo, instagram logo, gitHub logo and linkedin logo

const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Branding */}
          <div className="text-center md:text-left">
            <Link
              to="/"
              className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400"
            >
              BrainZap
            </Link>
            <p className="text-gray-400 mt-2 text-sm">
            Master Anything, One Quiz at a Time.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-6">
            {["Profile", "Pricing", "Blogs", "Contact"].map((link) => (
              <Link
                key={link}
                to={`/${link.toLowerCase()}`}
                className="text-gray-400 hover:text-white transition-colors text-sm font-medium"
              >
                {link}
              </Link>
            ))}
          </div>

          {/* Socials */}
          <div className="flex gap-4">
            <a
              href="https://github.com/orgs/CodeXplorers-PH/repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-lg"
              aria-label="GitHub"
            >
              <FaGithub size={18} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-lg"
              aria-label="Twitter"
            >
              <FaXTwitter size={18} />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-lg"
              aria-label="LinkedIn"
            >
              <FaInstagram size={18} />
            </a>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-lg"
              aria-label="LinkedIn"
            >
              <FaFacebook size={18} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-lg"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={18} />
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8" />

        {/* Copyright */}
        <div className="text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} BrainZap. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
