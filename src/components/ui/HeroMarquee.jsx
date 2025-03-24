import Marquee from "react-fast-marquee";
import I1 from "@/assets/marquee/1.svg";
import I2 from "@/assets/marquee/2.svg";
import I3 from "@/assets/marquee/3.svg";
import I4 from "@/assets/marquee/4.svg";
import I5 from "@/assets/marquee/5.svg";
import I6 from "@/assets/marquee/6.svg";
import I7 from "@/assets/marquee/7.svg";
import I8 from "@/assets/marquee/8.svg";
import I9 from "@/assets/marquee/9.svg";
import I10 from "@/assets/marquee/10.svg";
import I12 from "@/assets/marquee/12.svg";
import I13 from "@/assets/marquee/13.svg";
import I14 from "@/assets/marquee/14.svg";
import I15 from "@/assets/marquee/15.svg";

const HeroMarquee = () => {
  return (
    <div className="wrapper py-40 flex-col">
      <Marquee
        direction="left"
        className="p-5 border rounded-xl border-huf-purple/20 bg-white/35"
      >
        {HeroMarqueeData.map((img, index) => (
          <img
            key={index}
            src={img}
            width={130}
            alt={`Marquee ${index + 1}`}
            className="mx-5 invert-100 max-h-10 hover:opacity-100 cursor-pointer transition-all"
          />
        ))}
      </Marquee>
    </div>
  );
};

export default HeroMarquee;

export const HeroMarqueeData = [
  I1,
  I2,
  I3,
  I4,
  I5,
  I6,
  I7,
  I8,
  I9,
  I10,
  I12,
  I13,
  I14,
  I15,
];
