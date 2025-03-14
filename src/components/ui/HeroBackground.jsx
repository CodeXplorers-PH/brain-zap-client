import Marquee from "react-fast-marquee";

export const HeroBackground = () => {
  return (
    <>
      <div className="w-full  z-0 left-0 flex items-center overflow-hidden absolute">
        <Marquee direction="right" className="w-full h-[880px]">
          <div>
            <Cloud className="z-50 -translate-y-24" width={400} />
            <div>
              <Cloud className="-ml-80" width={400} />
            </div>
          </div>
          <div className="ml-[300px]">
            <Cloud className="-translate-y-10" width={400} />
            <div>
              <Cloud className="translate-x-48" width={300} />
            </div>
          </div>
          <div className="ml-[600px]">
            <Cloud className=" -translate-x-20 -translate-y-10" width={300} />
            <div>
              <Cloud width={500} />
            </div>
          </div>
        </Marquee>
      </div>
    </>
  );
};

export const Cloud = ({ className, ...props }) => {
  return (
    <>
      <svg
        {...props}
        className={`${className || ""} opacity-70`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 411 251"
        fill="none"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M324.185 250.537C324.185 250.503 324.212 250.476 324.245 250.474C372.579 247.972 411 207.989 411 159.033C411 108.463 370.005 67.4679 319.435 67.4679C313.913 67.4679 308.698 64.6577 305.814 59.949C283.791 23.9913 244.14 0 198.885 0C136.49 0 84.7475 45.6056 75.1721 105.301C74.858 107.259 73.1394 108.694 71.1562 108.694C31.9698 108.694 0.202972 140.461 0.202972 179.647C0.202972 218.833 31.9698 250.6 71.1562 250.6C71.962 250.6 72.7647 250.587 73.5641 250.56C73.5754 250.56 73.5848 250.569 73.5848 250.58C73.5848 250.591 73.5938 250.6 73.6048 250.6H198.885H324.122C324.157 250.6 324.185 250.572 324.185 250.537Z"
          fill="url(#paint0_linear_133_6675)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_133_6675"
            x1="133.745"
            y1="24.9809"
            x2="182.227"
            y2="313.237"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="white" />
            <stop offset={1} stopColor="#FCFBF7" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </>
  );
};
