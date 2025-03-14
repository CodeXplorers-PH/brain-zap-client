import { Link } from "react-router-dom";
import LogoURI from "@/assets/logo.svg";
import { Navs } from "@/data/Header";
import Button from "../ui/Button";
import { Turn as Hamburger } from "hamburger-react";
import { useState } from "react";
import { ChevronRight } from "lucide-react";

const Header = () => {
  const [isOpen, setisOpen] = useState(false);

  return (
    <>
      {/* Header Section */}
      <header className="flex-section">
        <div className="wrapper py-5 gap-5 items-center justify-between">
          {/* Header Logo */}
          <Link to={`/`}>
            <img width={180} src={LogoURI} />
          </Link>
          <div className="flex items-center gap-14">
            {/* Header navs */}
            <nav
              className={`w-full hidden top-20 p-5 fixed lg:flex  justify-center left-0 lg:static lg:w-fit ${
                isOpen && "!flex"
              }`}
            >
              <ul className="flex text-center bg-white gap-7 w-full flex-col border p-5 py-10 rounded-md">
                {Navs &&
                  Navs.map((navlink, index) => (
                    <li key={`navlink-${index}`}>
                      <Link
                        className={`font-medium hover:text-text/80 transition-all text-text`}
                        to={navlink.path}
                      >
                        {navlink.pathName}
                      </Link>
                    </li>
                  ))}
                <div className="max-[520px]:hidden flex w-full justify-center">
                  <HeaderButton />
                </div>
              </ul>
            </nav>
            <div className="flex items-center gap-5">
              <div className="max-[520px]:hidden flex items-center gap-5">
                <HeaderButton />
              </div>
              <div
                className={`lg:hidden bg-white transition-all border rounded-md ${
                  isOpen && "!bg-huf-purple/20 !border-huf-purple/50"
                }`}
              >
                <Hamburger size={25} toggled={isOpen} toggle={setisOpen} />
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;

export const HeaderButton = () => {
  return (
    <>
      <Link to={`/pricing`}>
        <Button>
          Get Started{" "}
          <ChevronRight
            strokeWidth={1.5}
            className={`absolute opacity-0 transition-all group-hover:translate-x-14 ml-2 group-hover:opacity-100`}
          />
        </Button>
      </Link>
    </>
  );
};
