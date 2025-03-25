const Button = ({ variant, className, children, ...props }) => {
  return (
    <>
      <button
        className={`px-10 py-[7px] flex focus:ring-2 ring-offset-2 focus:ring-huf-purple justify-center group items-center gap-2 rounded-full bg-gradient-to-r hover:bg-purple-950 transition-all from-huf-purple via-huf-purple/70 to-huf-purple/80 border border-huf-purple text-white ${
          className || ''
        }`}
      >
        {children}
      </button>
    </>
  );
};

export default Button;

export const ButtonLightClass =
  'font-semibold hover:!bg-gray-300 focus:!ring-gray-300 !text-gray-700 !from-gray-300 !border-gray-300 via-white !to-gray-300/50 !rounded-md transition-all duration-300 hover:scale-105 hover:shadow-lg';

export const ButtonYellowClass =
  'font-semibold hover:!bg-yellow focus:!ring-yellow !text-gray-700 !from-yellow !border-yellow via-yellow/30 !to-yellow/50';
