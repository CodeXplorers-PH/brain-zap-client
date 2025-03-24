import Button, { ButtonLightClass } from "@/components/ui/Button";
import Heading from "@/components/ui/Heading";
import HeroMarquee from "@/components/ui/HeroMarquee";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <>
      <section
        className="flex-section flex-col items-center gap-0"
        style={{
          backgroundImage: "url('./AI-bg.webp')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="">
          <div className="wrapper z-20 relative justify-between gap-14 items-center flex-col lg:flex-row !max-w-[1240px] pb-20 lg:pb-10 pt-36 lg:pt-48">
            <div className="w-full text-center flex flex-col items-center lg:items-center space-y-4">
              <div className="flex flex-col items-center lg:items-start">
                <Heading
                  className={`z-10 relative bg-gradient-to-r from-pink-400 to-green-400 bg-clip-text text-transparent`}
                >
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
              <p className="lg:w-3/4 w-[90%]">
                Brain Zap is an AI-powered quiz platform that adapts to your
                learning style, delivering personalized challenges and smart
                insights to boost your knowledge and confidence.
              </p>
              <div className="flex gap-5 items-center flex-wrap justify-center">
                <Link to={`/quiz`}>
                  <Button
                    className={
                      "bg-gradient-to-r from-blue-500 to-teal-400 text-white font-bold rounded-lg text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
                    }
                  >
                    Try for free
                  </Button>
                </Link>
                <Link to={`/pricing`}>
                  <Button className={ButtonLightClass}>Pricing</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <HeroMarquee />
      </section>
    </>
  );
};

export default Hero;
