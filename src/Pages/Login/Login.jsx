import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { AuthContext } from '@/provider/AuthProvider';

const Login = () => {

    const { userLogin, setUser } = useContext(AuthContext)

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log({ email, password });
        userLogin(email, password)
            .then(result => {
                const user = result.user;
                setUser(user);
            })
            .catch((error) => {
                alert(error.message);
            });
    };


    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="flex py-40 flex-col items-center justify-center bg-slate-50 px-4">
            <div className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-6 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Welcome back</h1>
                    <p className="mt-2 text-sm text-slate-600">
                        Login with Google account
                    </p>
                </div>

                <div className="grid gap-4">
                    <button className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-900 shadow-sm transition-colors hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-1">
                        <FcGoogle />
                        <span>Login with Google</span>
                    </button>
                </div>

                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-slate-200"></span>
                    </div>
                    <div className="relative flex justify-center">
                        <span className="bg-white px-4 text-xs text-slate-500">Or continue with</span>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="grid gap-4">
                    <div className="grid gap-2">
                        <label htmlFor="email" className="text-sm font-medium text-slate-700">
                            Email
                        </label>
                        <input
                            name="email"
                            type="email"
                            placeholder="m@example.com"
                            className="h-10 w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-1"
                        />
                    </div>

                    <div className="grid gap-2">
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="text-sm font-medium text-slate-700">
                                Password
                            </label>
                            <a href="#" className="text-sm font-medium text-slate-600 hover:text-slate-900 hover:underline">
                                Forgot your password?
                            </a>
                        </div>
                        <div className="relative">
                            <input
                                name="password"
                                placeholder='********'
                                type={showPassword ? "text" : "password"}
                                className="h-10 w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-1"
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="h-10 w-full rounded-md bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-1"
                    >
                        Login
                    </button>
                </form>

                <div className="mt-6 text-center text-sm">
                    <span className="text-slate-600">Don't have an account?</span>{' '}
                    <Link to='/signup' className="font-medium text-black hover:underline">
                        Sign up
                    </Link>
                </div>
            </div>

            <p className="mt-6 text-center text-xs text-slate-500">
                By clicking continue, you agree to our{' '}
                <a href="#" className="underline underline-offset-2 hover:text-slate-700">
                    Terms of Service
                </a>
                {' '}and{' '}
                <a href="#" className="underline underline-offset-2 hover:text-slate-700">
                    Privacy Policy
                </a>
            </p>
        </div>
    );
};

export default Login;