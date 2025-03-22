import { AuthContext } from '@/provider/AuthProvider';
import React, { useContext } from 'react';
import { FcGoogle } from "react-icons/fc";
import { ImGithub } from "react-icons/im";
import { Navigate, useNavigate } from 'react-router-dom';

const SocialLogin = () => {
    const navigate = useNavigate();
    const { signInWithGoogle } = useContext(AuthContext);

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(result => {
                console.log(result.user);
                navigate('/')
            })
            .catch(error => console.log(error.message))
    }

    return (
        <div className="w-full grid gap-3">
            <button
                onClick={handleGoogleSignIn}
                type="button"
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-900 shadow-sm transition-all hover:bg-slate-50 hover:shadow focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-1 disabled:opacity-70"
            >
                <FcGoogle className="text-xl" />
                <span>Continue with Google</span>
            </button>

            <button
                type="button"
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-900 shadow-sm transition-all hover:bg-slate-50 hover:shadow focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-1 disabled:opacity-70"
            >
                <ImGithub className="text-xl" />
                <span>Continue with GitHub</span>
            </button>

            <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-slate-200"></span>
                </div>
                <div className="relative flex justify-center">
                    <span className="bg-white px-4 text-xs text-slate-500">Or continue with</span>
                </div>
            </div>
        </div>

    );
};

export default SocialLogin;