import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

const Error = () => {
  return (
    <>
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center px-4 text-center">
        {/* Animated 404 text */}
        <div className="relative mb-8">
          <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
            404
          </h1>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-600 opacity-20 blur-2xl rounded-full"></div>
        </div>

        {/* Message */}
        <h2 className="text-3xl font-bold text-white mb-4">Page Not Found</h2>
        <p className="text-gray-400 max-w-md mb-8">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Back button */}
        <Link
          to="/"
          className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
        >
          <FiArrowLeft className="mr-2" />
          Return to Home
        </Link>

        {/* Optional: Small decorative elements */}
        <div className="absolute bottom-8 text-gray-500 text-sm">
          BrainZap AI © {new Date().getFullYear()}
        </div>
      </div>
    </>
  );
};

export default Error;
