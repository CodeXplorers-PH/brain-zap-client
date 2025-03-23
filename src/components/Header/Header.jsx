import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { LogOut, User } from "lucide-react";
import { AuthContext } from "@/provider/AuthProvider";

const Header = () => {
  const { user, logOut } = useContext(AuthContext);

  // Nav items
  const Navs = [
    { path: "/", pathName: "Home" },
    { path: "/features", pathName: "Features" },
    { path: "/start-quiz", pathName: "Start Quiz" },
    { path: "/pricing", pathName: "Pricing" },
    { path: "/faqs", pathName: "FAQs" },
    { path: "/blog", pathName: "Blog" },
    { path: "/contact", pathName: "Contact" },
  ];

  return (
    <div className="fixed top-5 left-0 right-0 z-50 flex justify-center px-4">
      <div className="navbar bg-base-100/60 backdrop-blur-md rounded-full shadow-lg max-w-6xl w-full px-6">
        {/* Logo Section */}
        <div className="navbar-start">
          <Link to="/" className="font-bold text-xl text-primary">
            BrainZap
          </Link>
        </div>

        {/* Desktop Navigation - Center */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal">
            {Navs.map((navlink, index) => (
              <li key={`navlink-${index}`}>
                <Link
                  to={navlink.path}
                  className="font-medium mx-1 relative overflow-hidden group"
                >
                  {navlink.pathName}
                  {/* Underline animation */}
                  <span className="absolute left-0 bottom-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Auth Section and Mobile Menu - End */}
        <div className="navbar-end">
          {/* Mobile menu hamburger - navigation only */}
          <div className="dropdown dropdown-end lg:hidden mr-2">
            <div tabIndex={0} role="button" className="btn btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {Navs.map((navlink, index) => (
                <li key={`navlink-dropdown-${index}`}>
                  <Link to={navlink.path}>{navlink.pathName}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* User Profile or Get Started button - always visible */}
          {user ? (
            // User Profile Dropdown
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  {user.photoURL ? (
                    <img alt="User avatar" src={user.photoURL} />
                  ) : (
                    <div className="bg-primary text-primary-content flex items-center justify-center h-full">
                      {user.displayName
                        ? user.displayName.charAt(0).toUpperCase()
                        : user.email.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
              </div>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
              >
                <li className="font-medium text-sm opacity-70 px-4 py-1 non-interactive">
                  {user.displayName || user.email}
                </li>
                <li>
                  <Link to="/profile" className="py-2">
                    <User size={16} />
                    Profile
                  </Link>
                </li>
                <li>
                  <button onClick={logOut} className="py-2">
                    <LogOut size={16} />
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            // Get Started Button - leads to login
            <Link to="/login">
              <button className="btn btn-primary rounded-full px-6">
                Get Started
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
