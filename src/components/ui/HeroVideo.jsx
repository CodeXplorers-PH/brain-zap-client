import { useEffect, useState } from "react";
import { AspectRatio } from "./aspect-ratio";
import { Skeleton } from "./skeleton";

const WistiaPlayer = () => {
  const [isVideoLoaded, setisVideoLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setisVideoLoaded(true);
    }, 2000);
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
        <span className="w-10/12 -mb-5 rounded-t-xl h-10 bg-huf-purple" />
        <AspectRatio
          className="bg-gradient-to-br from-slate-200 to-slate-300 border border-huf-purple/50 rounded-xl overflow-hidden"
          ratio={16 / 9}
        >
          <wistia-player
            className={` ${isVideoLoaded ? "block" : "hidden"}`}
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
