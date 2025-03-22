import React, { useContext, useState } from 'react';
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from '@/provider/AuthProvider';

const SocialLogin = ({ onLoginSuccess, onLoginError }) => {
    const { googleSignIn } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);

    const handleGoogleSignIn = () => {
        setIsLoading(true);
        googleSignIn()
            .then(result => {
                const user = result.user;
                if (onLoginSuccess) onLoginSuccess(user);
            })
            .catch(error => {
                if (onLoginError) onLoginError("Failed to sign in with Google. Please try again.");
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <div className="w-full grid gap-3">
            <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-900 shadow-sm transition-all hover:bg-slate-50 hover:shadow focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-1 disabled:opacity-70"
            >
                {isLoading ? (
                    <span className="h-4 w-4 border-2 border-slate-500 border-t-transparent rounded-full animate-spin"></span>
                ) : (
                    <FcGoogle className="text-xl" />
                )}
                <span>Continue with Google</span>
            </button>
            <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-slate-200"></span>
                </div>
                <div className="relative flex justify-center">
                    <span className="bg-white px-4 text-xs text-slate-500">Or continue with</span>
                </div>
            </div>

            {/* You can add more social login options here */}
        </div>

    );
};

export default SocialLogin;