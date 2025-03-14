import { Link } from "react-router-dom";
import LogoURI from "@/assets/logo.svg";
import { Navs } from "@/data/Header";
import Button from "../ui/Button";

const Header = () => {
  return (
    <>
      {/* Header Section */}
      <header className="flex-section">
        <div className="wrapper py-6 justify-between">
          {/* Header Logo */}
          <Link to={`/`}>
            <img width={130} src={LogoURI} />
          </Link>
          <div className="flex items-center gap-14">
            {/* Header navs */}
            <nav
              className={`w-full fixed flex justify-center left-0 md:static md:w-fit`}
            >
              <ul className="flex bg-white gap-7">
                {Navs &&
                  Navs.map((navlink, index) => (
                    <>
                      <li key={`navlink-${index}`}>
                        <Link
                          className={`font-medium hover:text-text/80 transition-all text-text`}
                          to={navlink.path}
                        >
                          {navlink.pathName}
                        </Link>
                      </li>
                    </>
                  ))}
              </ul>
            </nav>
            <div className="flex items-center gap-5">
              <Link className="text-text font-semibold">Sign In</Link>
              <Link>
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
