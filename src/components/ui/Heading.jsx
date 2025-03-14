const Heading = ({ className, children }) => {
  return (
    <>
      <h2
        className={`font-secondary text-5xl sm:text-6xl text-text font-medium ${
          className || ""
        }`}
      >
        {children}
      </h2>
    </>
  );
};

export default Heading;
