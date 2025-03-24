const Heading = ({ className, children }) => {
  return (
    <>
      <h2
        className={`font-secondary text-5xl sm:text-6xl text-text font-bold ${
          className || ""
        }`}
      >
        {children}
      </h2>
    </>
  );
};

export default Heading;
