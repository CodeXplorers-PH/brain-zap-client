import React from "react";
import { Link } from "react-router-dom";
import { Github, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-neutral text-white py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
          {/* Brand */}
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold tracking-tight">BrainZap</h2>
            <p className="text-gray-400 mt-2 text-sm max-w-xs">
              Empowering innovation through intelligent solutions.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex space-x-8">
            {['About', 'Pricing', 'Blog', 'Contact'].map((link) => (
              <Link 
                key={link} 
                to={`/${link.toLowerCase()}`} 
                className="text-gray-300 hover:text-white transition-colors text-sm"
              >
                {link}
              </Link>
            ))}
          </div>

          {/* Social Links */}
          <div className="flex space-x-4">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Github size={20} />
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Twitter size={20} />
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Linkedin size={20} />
            </a>
          </div>
        </div>

        {/* Separator */}
        <div className="border-t border-gray-800 my-8"></div>

        {/* Copyright */}
        <div className="text-center text-gray-500 text-xs">
          © {new Date().getFullYear()} BrainZap. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;