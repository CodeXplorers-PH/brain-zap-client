const Button = ({ variant, className, children, ...props }) => {
  return (
    <>
      <button className="px-8 py-[7px] rounded-full bg-gradient-to-r hover:bg-purple-950 transition-all from-huf-purple via-huf-purple/70 to-huf-purple/80 border border-huf-purple text-white">
        {children}
      </button>
    </>
  );
};

export default Button;
