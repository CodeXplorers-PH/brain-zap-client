import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiEye, FiEyeOff } from "react-icons/fi";

const Signup = () => {
    const [password, setPassword] = useState('');
    const [strength, setStrength] = useState(0);
    const [photoName, setPhotoName] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const fileInputRef = useRef(null);

    const calculateStrength = (pass) => {
        let score = 0;
        if (!pass) return 0;

        // Length check
        if (pass.length >= 8) score += 1;

        // Complexity checks
        if (/[A-Z]/.test(pass)) score += 1;
        if (/[a-z]/.test(pass)) score += 1;
        if (/[0-9]/.test(pass)) score += 1;
        if (/[^A-Za-z0-9]/.test(pass)) score += 1;

        return score;
    };

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        setStrength(calculateStrength(newPassword));
    };

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setPhotoName(e.target.files[0].name);
        }
    };

    const handleUploadClick = () => {
        fileInputRef.current.click();
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    // Get color and label for password strength
    const getStrengthData = () => {
        switch (strength) {
            case 0: return { color: 'bg-red-500', width: '0%', label: 'Very weak' };
            case 1: return { color: 'bg-red-500', width: '20%', label: 'Weak' };
            case 2: return { color: 'bg-yellow-500', width: '40%', label: 'Fair' };
            case 3: return { color: 'bg-yellow-500', width: '60%', label: 'Good' };
            case 4: return { color: 'bg-green-500', width: '80%', label: 'Strong' };
            case 5: return { color: 'bg-green-500', width: '100%', label: 'Very strong' };
            default: return { color: 'bg-red-500', width: '0%', label: 'Weak' };
        }
    };

    const strengthData = getStrengthData();

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4 py-8">
            <div className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-6 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Create an account</h1>
                    <p className="mt-2 text-sm text-slate-600">
                        Enter your details to get started
                    </p>
                </div>

                <form className="grid gap-4">
                    {/* Full Name */}
                    <div className="grid gap-2">
                        <label htmlFor="fullName" className="text-sm font-medium text-slate-700">
                            Full name
                        </label>
                        <input
                            type="text"
                            placeholder="John Doe"
                            className="h-10 w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-1"
                        />
                    </div>

                    {/* Profile Photo */}
                    <div className="grid gap-2">
                        <label className="text-sm font-medium text-slate-700">
                            Profile photo
                        </label>
                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                onClick={handleUploadClick}
                                className="inline-flex h-10 items-center justify-center rounded-md border border-slate-300 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-1"
                            >
                                Choose file
                            </button>
                            <span className="text-sm text-slate-500 truncate">
                                {photoName || "No file chosen"}
                            </span>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div className="grid gap-2">
                        <label htmlFor="email" className="text-sm font-medium text-slate-700">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="m@example.com"
                            className="h-10 w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-1"
                        />
                    </div>

                    {/* Password with Strength Meter */}
                    <div className="grid gap-2">
                        <label htmlFor="password" className="text-sm font-medium text-slate-700">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={handlePasswordChange}
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

                        {/* Password Strength Bar */}
                        {password && (
                            <div className="space-y-1 mt-1">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-slate-500">Password strength</span>
                                    <span className="text-xs font-medium"
                                        style={{
                                            color: strength <= 1 ? '#ef4444' : strength <= 3 ? '#eab308' : '#22c55e'
                                        }}>
                                        {strengthData.label}
                                    </span>
                                </div>
                                <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full ${strengthData.color} transition-all duration-300`}
                                        style={{ width: strengthData.width }}
                                    ></div>
                                </div>
                                <p className="text-xs text-slate-500">
                                    Use 8+ characters with a mix of letters, numbers & symbols
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Confirm Password */}
                    <div className="grid gap-2">
                        <label htmlFor="confirmPassword" className="text-sm font-medium text-slate-700">
                            Confirm password
                        </label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                className="h-10 w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-1"
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
                                onClick={toggleConfirmPasswordVisibility}
                            >
                                {showConfirmPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                            </button>
                        </div>
                    </div>

                    {/* Terms Agreement */}
                    <div className="flex items-center space-x-2 pt-2">
                        <input
                            type="checkbox"
                            className="h-4 w-4 rounded border-slate-300 text-black focus:ring-slate-400 focus:ring-offset-0"
                        />
                        <label htmlFor="terms" className="text-sm text-slate-600">
                            I agree to the{' '}
                            <a href="#" className="font-medium text-slate-900 hover:underline">Terms of Service</a>
                            {' '}and{' '}
                            <a href="#" className="font-medium text-slate-900 hover:underline">Privacy Policy</a>
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="mt-2 h-10 w-full rounded-md bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-1"
                    >
                        Create account
                    </button>
                </form>

                <div className="mt-6 text-center text-sm">
                    <span className="text-slate-600">Already have an account?</span>{' '}
                    <Link to='/login' className="font-medium text-black hover:underline">
                        Login
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

export default Signup;