import { motion } from "framer-motion";
import lanternImage from "../../assets/img/EidDecoration.png";
import moonImage from "../../assets/img/moon.png";


const EidDecoration = () => {
  return (
    <div className="top-0 absolute w-full h-40 flex justify-between px-10 overflow-hidden pointer-events-none">
      {/* Hanging Lanterns */}
      <motion.img
        src={lanternImage}
        alt="Eid Lantern"
        className="h-24 absolute left-5 z-50 hidden lg:flex"
        initial={{ y: -50, rotate: -5 }}
        animate={{ y: [0, 10, 0], rotate: [0, 5, -5, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
      />
      <motion.img
        src={lanternImage}
        alt="Eid Lantern"
        className="h-24 absolute right-5 z-50 hidden lg:flex"
        initial={{ y: -50, rotate: -5 }}
        animate={{ y: [0, 10, 0], rotate: [0, 5, -5, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
      />

      {/* Twinkling Moon */}
      {[0, 1, 2, 3, 4].map((index) => (
        <motion.img
          key={index}
          src={moonImage}
          alt="Star"
          className="h-6 absolute z-50"
          initial={{ opacity: 0.5 }}
          animate={{ opacity: [0.5, 10, 0.5] }}
          transition={{
            repeat: Infinity,
            duration: Math.random() * 3 + 2,
            ease: "easeInOut",
          }}
          style={{
            left: `${index * 20 + 10}%`,
            top: `${Math.random() * 20}px`,
          }}
        />
      ))}
    </div>
  );
};

export default EidDecoration;
