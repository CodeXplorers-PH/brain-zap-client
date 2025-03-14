const Button = ({ variant, className, children, ...props }) => {
  return (
    <>
      <button
        className={`px-10 py-[7px] flex focus:ring-2 ring-offset-2 focus:ring-huf-purple justify-center group items-center gap-2 rounded-full bg-gradient-to-r hover:bg-purple-950 transition-all from-huf-purple via-huf-purple/70 to-huf-purple/80 border border-huf-purple text-white ${
          className || ""
        }`}
      >
        {children}
      </button>
    </>
  );
};

export default Button;
