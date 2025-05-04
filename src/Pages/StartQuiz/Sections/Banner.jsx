import { useAuthContext } from '@/hooks/useAuthContext';

const Banner = () => {
  const { user } = useAuthContext();
  const displayName = user?.displayName || 'Scholar';

  return (
    <>
      <div className="pt-40 pb-12 text-center px-4 relative overflow-hidden">
        {/* Subtle Background Gradient */}
        <div className="absolute inset-0 opacity-90"></div>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-purple-500 rounded-full opacity-10 blur-3xl -ml-32 -mt-32"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-500 rounded-full opacity-10 blur-3xl -mr-32 -mb-32"></div>

        <div className="relative z-10">
          <h1 className="mb-3 text-4xl md:text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
            Welcome, {displayName}!
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
            Ready to test your knowledge?
          </p>
        </div>
      </div>
    </>
  );
};

export default Banner;
