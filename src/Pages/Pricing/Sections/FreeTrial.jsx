import React from 'react';

const FreeTrial = () => {
    return (
        <div className=''>
            <div className="max-w-6xl mx-auto px-4 py-16 ">
                <div className="relative overflow-hidden bg-gradient-to-r from-pink-400 via-orange-300 to-amber-300 rounded-3xl shadow-xl">

                    {/* Content */}
                    <div className="relative z-10 text-center px-6 py-16 md:py-20 md:px-20">
                        <h2 className="text-4xl md:text-5xl font-semibold text-gray-800 mb-6">
                            Start Your 30-Day Free Trial Today!
                        </h2>

                        <p className="text-lg md:text-xl lg:text-2xl text-gray-800 mb-6 max-w-3xl mx-auto">
                        Discover the power of AI-generated quizzes. Personalized learning, endless fun! Use code BrainZap for a FREE 30-day trial. No commitment, cancel anytime.
                        </p>

                        <button className="mt-8 bg-white text-purple-600 hover:bg-purple-50 transition-all duration-300 text-xl font-medium py-4 px-10 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                            Start Your Free Trial
                        </button>
                    </div>

                    {/* Decorative Shapes */}
                    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                        <div className="absolute -top-24 -left-24 w-48 h-48 bg-white opacity-10 rounded-full"></div>
                        <div className="absolute top-20 right-10 w-32 h-32 bg-white opacity-10 rounded-full"></div>
                        <div className="absolute bottom-10 left-1/2 w-24 h-24 bg-white opacity-10 rounded-full"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FreeTrial;