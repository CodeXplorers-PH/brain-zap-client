import { useEffect } from "react";
import { AspectRatio } from "./aspect-ratio";

const WistiaPlayer = () => {
  useEffect(() => {
    const script1 = document.createElement("script");
    script1.src = "https://fast.wistia.com/player.js";
    script1.async = true;
    document.body.appendChild(script1);

    const script2 = document.createElement("script");
    script2.src = "https://fast.wistia.com/embed/5m715g3r16.js";
    script2.async = true;
    script2.type = "module";
    document.body.appendChild(script2);

    return () => {
      document.body.removeChild(script1);
      document.body.removeChild(script2);
    };
  }, []);

  return (
    <>
      <style>
        {`
          wistia-player[media-id='5m715g3r16']:not(:defined) {
            background: center / contain no-repeat url('https://fast.wistia.com/embed/medias/5m715g3r16/swatch');
            display: block;
            filter: blur(5px);
            padding-top: 56.25%;
          }
        `}
      </style>
      <div className="flex justify-center flex-col items-center">
        <svg
          className="translate-x-56 -mb-80 -translate-y-36 md:block hidden  animate-spin duration-[3s]"
          xmlns="http://www.w3.org/2000/svg"
          width={341}
          height={341}
          fill="none"
        >
          <g clipPath="url(#a)">
            <path
              fill="url(#b)"
              fillOpacity=".18"
              d="M309.807 170.5c0 76.937-62.37 139.307-139.307 139.307S31.193 247.437 31.193 170.5 93.563 31.193 170.5 31.193 309.807 93.563 309.807 170.5"
            />
            <path
              fill="url(#c)"
              fillOpacity=".18"
              d="M341 170.5c0 94.165-76.335 170.5-170.5 170.5S0 264.665 0 170.5 76.335 0 170.5 0 341 76.335 341 170.5"
            />
            <path
              fill="url(#d)"
              d="M274.615 170.5c0 57.501-46.614 104.115-104.115 104.115S66.386 228.001 66.386 170.5 112.999 66.386 170.5 66.386 274.615 112.999 274.615 170.5"
            />
          </g>
          <defs>
            <linearGradient
              id="b"
              x1="231.716"
              x2="120.004"
              y1="146.209"
              y2="270.257"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FFDF78" />
              <stop offset=".945" stopColor="#FDB154" />
            </linearGradient>
            <linearGradient
              id="c"
              x1="245.423"
              x2="108.697"
              y1="140.77"
              y2="292.595"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FFDF78" />
              <stop offset=".945" stopColor="#FDB154" />
            </linearGradient>
            <linearGradient
              id="d"
              x1="216.252"
              x2="132.761"
              y1="152.345"
              y2="245.056"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FFDF78" />
              <stop offset=".945" stopColor="#FDB154" />
            </linearGradient>
            <clipPath id="a">
              <path fill="#fff" d="M0 0h341v341H0z" />
            </clipPath>
          </defs>
        </svg>

        <span className="w-10/12 -mb-5 rounded-t-xl h-10 bg-huf-purple z-10" />
        <AspectRatio
          className="bg-gradient-to-br z-20 from-slate-200 to-slate-300 border border-huf-purple/50 rounded-xl overflow-hidden"
          ratio={16 / 9}
        >
          <wistia-player
            media-id="5m715g3r16"
            aspect="1.7777777777777777"
          ></wistia-player>
        </AspectRatio>
        <span className="w-10/12 -mt-5 rounded-b-xl h-10 bg-huf-purple" />
      </div>
    </>
  );
};

export default WistiaPlayer;
