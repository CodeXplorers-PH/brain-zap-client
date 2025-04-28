import { AuthContext } from '@/provider/AuthProvider';
import React, { useContext, useState } from 'react';
import { FcGoogle } from "react-icons/fc";
import { ImGithub } from "react-icons/im";
import { useNavigate } from 'react-router-dom';

const SocialLogin = ({ onLoginError }) => {
    const navigate = useNavigate();
    const { signInWithGoogle, signInWithGithub } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState({
        google: false,
        github: false
    });
    const [error, setError] = useState('');

    const handleSocialSignIn = async (provider, method) => {
        setError('');
        setIsLoading(prev => ({ ...prev, [provider]: true }));
        
        try {
            const result = await method();
            console.log(result.user);
            console.log("User logged in")
            navigate("/start-quiz");
        } catch (error) {
            console.error(`${provider} sign-in error:`, error.message);
            setError(`Failed to sign in with ${provider}: ${error.message}`);
            
            // Call the error handler if provided
            if (onLoginError) {
                onLoginError(`Failed to sign in with ${provider}: ${error.message}`);
            }
        } finally {
            setIsLoading(prev => ({ ...prev, [provider]: false }));
        }
    };

    return (
        <div className="w-full grid gap-4">
            {error && (
                <div className="bg-red-900/40 border border-red-800 text-red-300 p-3 rounded-md text-sm mb-2">
                    {error}
                </div>
            )}
            
            <button
                onClick={() => handleSocialSignIn('google', signInWithGoogle)}
                type="button"
                disabled={isLoading.google || isLoading.github}
                className="inline-flex h-12 w-full items-center justify-center gap-3 rounded-md border border-gray-700 bg-gray-700/50 px-4 py-2 text-sm font-medium text-gray-100 shadow-md transition-all hover:bg-gray-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-1 focus:ring-offset-gray-800 disabled:opacity-70 transform hover:-translate-y-0.5 active:translate-y-0"
            >
                {isLoading.google ? (
                    <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-gray-400 border-t-white"></span>
                ) : (
                    <FcGoogle className="text-xl" />
                )}
                <span>Continue with Google</span>
            </button>

            <button
                onClick={() => handleSocialSignIn('github', signInWithGithub)}
                type="button"
                disabled={isLoading.google || isLoading.github}
                className="inline-flex h-12 w-full items-center justify-center gap-3 rounded-md border border-gray-700 bg-gray-700/50 px-4 py-2 text-sm font-medium text-gray-100 shadow-md transition-all hover:bg-gray-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-1 focus:ring-offset-gray-800 disabled:opacity-70 transform hover:-translate-y-0.5 active:translate-y-0"
            >
                {isLoading.github ? (
                    <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-gray-400 border-t-white"></span>
                ) : (
                    <ImGithub className="text-xl text-white" />
                )}
                <span>Continue with GitHub</span>
            </button>

            <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-700"></span>
                </div>
                <div className="relative flex justify-center">
                    <span className="bg-gray-800 px-4 text-xs text-gray-400">Or continue with</span>
                </div>
            </div>
        </div>
    );
};

export default SocialLogin;