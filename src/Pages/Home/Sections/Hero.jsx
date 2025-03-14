import Button, { ButtonLightClass } from "@/components/ui/Button";
import Heading from "@/components/ui/Heading";
import { HeroBackground } from "@/components/ui/HeroBackground";
import P from "@/components/ui/P";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <>
      <section className="flex-section bg-huf-purple/20">
        <HeroBackground />
        <div className="wrapper z-20 justify-between gap-10  !max-w-[1240px] py-60">
          <div className="w-full text-center md:text-start flex flex-col items-center md:items-start md:w-6/12 space-y-8">
            <div className="flex flex-col items-center md:items-start">
              <Heading className={`z-10 relative`}>
                Brain Zap AI Powered Quiz Platform
              </Heading>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 361.44000000000005 27"
                width={350}
                className="-mt-5 z-0 max-[400px]:hidden"
                fill="none"
                preserveAspectRatio="none"
                __cpp={1}
              >
                <path
                  d="M8 8C135.54 27 316.26 16 343.368 8"
                  stroke="#FFE079"
                  strokeOpacity="0.5"
                  strokeWidth={15}
                  strokeLinecap="round"
                  __cpp={1}
                />
              </svg>
            </div>
            <P>
              Riley is the only all-in-one baby tracker that learns your
              family's unique rhythm to give you confidence and physician-backed
              guidance when it matters most.
            </P>
            <div className="flex gap-5 items-center">
              <Link to={`/login`}>
                <Button>Try for free</Button>
              </Link>
              <Link to={`/pricing`}>
                <Button className={ButtonLightClass}>Pricing</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
