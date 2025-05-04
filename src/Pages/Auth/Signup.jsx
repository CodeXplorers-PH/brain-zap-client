import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import SocialLogin from './SocialLogin';
import { useAuthContext } from '@/hooks/useAuthContext';
import useAxiosPublic from '@/hooks/useAxiosPublic';
import useFormData from '@/hooks/useFormData';
import useAuth from '@/hooks/useAuth';

const Signup = () => {
  const { user } = useAuth();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [strength, setStrength] = useState(0);
  const [photoName, setPhotoName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

  const { createNewUser, updateUserProfile } = useAuthContext();
  const formData = useFormData();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  // Navigate to Home page
  useEffect(() => {
    user && navigate('/');
    document.title = 'Sign Up | BrainZap';
  }, [user]);

  const validatePassword = pass => {
    const errors = {};

    if (pass.length < 8) {
      errors.length = 'Password must be at least 8 characters';
    }
    if (!/[a-z]/.test(pass)) {
      errors.lowercase = 'Password must include at least one lowercase letter';
    }
    if (!/[A-Z]/.test(pass)) {
      errors.uppercase = 'Password must include at least one uppercase letter';
    }
    if (!/[0-9]/.test(pass)) {
      errors.number = 'Password must include at least one number';
    }

    return errors;
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate password requirements
    const passwordErrors = validatePassword(password);
    if (Object.keys(passwordErrors).length > 0) {
      newErrors.password = passwordErrors;
    }

    // Validate password confirmation
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Validate terms acceptance
    if (!termsAccepted) {
      newErrors.terms = 'You must accept the Terms and Conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const { name, photo, email, password } = formData(e.target);

    createNewUser(email, password)
      .then(() => {
        updateUserProfile({ displayName: name, photoURL: photo })
          .then(() => {
            // Add user to database
            axiosPublic.post('/post_user', {
              name,
              photoURL: photo,
              email,
            });
          })
          .catch(err => {
            console.log('Error updating user profile', err.message);
          });
      })

      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);

        // Handle Firebase authentication errors
        if (errorCode === 'auth/email-already-in-use') {
          setErrors({
            submit: 'Email already in use. Please use a different email.',
          });
        } else {
          setErrors({ submit: errorMessage });
        }
      });
  };

  const calculateStrength = pass => {
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

  const handlePasswordChange = e => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setStrength(calculateStrength(newPassword));
  };

  const handleConfirmPasswordChange = e => {
    setConfirmPassword(e.target.value);
  };

  const handleFileChange = e => {
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

  const handleTermsChange = e => {
    setTermsAccepted(e.target.checked);
  };

  // Get color and label for password strength
  const getStrengthData = () => {
    switch (strength) {
      case 0:
        return { color: 'bg-red-500', width: '0%', label: 'Very weak' };
      case 1:
        return { color: 'bg-red-500', width: '20%', label: 'Weak' };
      case 2:
        return { color: 'bg-yellow-500', width: '40%', label: 'Fair' };
      case 3:
        return { color: 'bg-yellow-500', width: '60%', label: 'Good' };
      case 4:
        return { color: 'bg-green-500', width: '80%', label: 'Strong' };
      case 5:
        return { color: 'bg-green-500', width: '100%', label: 'Very strong' };
      default:
        return { color: 'bg-red-500', width: '0%', label: 'Weak' };
    }
  };

  const strengthData = getStrengthData();

  return (
    <>
      <div className="flex py-40 flex-col items-center justify-center bg-gray-900 min-h-screen px-4">
        <div className="w-full max-w-lg rounded-lg border border-gray-800 bg-gray-800 p-8 shadow-2xl">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Create an account
            </h1>
            <p className="mt-3 text-gray-400">
              Enter your details to get started
            </p>
          </div>

          <SocialLogin />

          {/* Enhanced Submit Error */}
          {errors.submit && (
            <div className="mb-6 p-3 bg-red-900/80 border-2 border-red-600 text-red-200 rounded-md text-sm flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-red-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{errors.submit}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="grid gap-5">
            {/* Full Name */}
            <div className="grid gap-2">
              <label
                htmlFor="name"
                className="text-sm font-medium text-gray-300"
              >
                Full name
              </label>
              <input
                name="name"
                id="name"
                type="text"
                placeholder="John Doe"
                className="h-12 w-full rounded-md border border-gray-700 bg-gray-700/50 px-4 py-2 text-gray-200 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all duration-200"
                required
              />
            </div>

            {/* Photo URL */}
            <div className="grid gap-2">
              <label
                htmlFor="photo"
                className="text-sm font-medium text-gray-300"
              >
                Photo URL
              </label>
              <input
                name="photo"
                id="photo"
                type="text"
                placeholder="https://i.ibb.co.com/..."
                className="h-12 w-full rounded-md border border-gray-700 bg-gray-700/50 px-4 py-2 text-gray-200 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* Email */}
            <div className="grid gap-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-300"
              >
                Email
              </label>
              <input
                name="email"
                id="email"
                type="email"
                placeholder="m@example.com"
                className="h-12 w-full rounded-md border border-gray-700 bg-gray-700/50 px-4 py-2 text-gray-200 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all duration-200"
                required
              />
            </div>

            {/* Password with Strength Meter */}
            <div className="grid gap-2">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-300"
              >
                Password
              </label>
              <div className="relative">
                <input
                  name="password"
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={handlePasswordChange}
                  className={`h-12 w-full rounded-md border ${
                    errors.password ? 'border-red-500' : 'border-gray-700'
                  } bg-gray-700/50 px-4 py-2 text-gray-200 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all duration-200`}
                  required
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </button>
              </div>

              {/* Password Requirements and Errors */}
              {errors.password && (
                <div className="mt-1 space-y-1">
                  {Object.values(errors.password).map((error, idx) => (
                    <div
                      key={idx}
                      className="flex items-center space-x-2 bg-red-900/50 border border-red-700 p-2 rounded text-xs text-red-300"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-red-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>{error}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Password Strength Bar */}
              {password && (
                <div className="space-y-1 mt-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      Password strength
                    </span>
                    <span
                      className="text-xs font-medium"
                      style={{
                        color:
                          strength <= 1
                            ? '#ef4444'
                            : strength <= 3
                            ? '#eab308'
                            : '#22c55e',
                      }}
                    >
                      {strengthData.label}
                    </span>
                  </div>
                  <div className="h-1 w-full bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${strengthData.color} transition-all duration-300`}
                      style={{ width: strengthData.width }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500">
                    Use 8+ characters with a mix of letters, numbers & symbols
                  </p>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="grid gap-2">
              <label
                htmlFor="confirm-password"
                className="text-sm font-medium text-gray-300"
              >
                Confirm password
              </label>
              <div className="relative">
                <input
                  name="confirm-password"
                  id="confirm-password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  className={`h-12 w-full rounded-md border ${
                    errors.confirmPassword
                      ? 'border-red-500'
                      : 'border-gray-700'
                  } bg-gray-700/50 px-4 py-2 text-gray-200 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all duration-200`}
                  required
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {showConfirmPassword ? (
                    <FiEyeOff size={20} />
                  ) : (
                    <FiEye size={20} />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <div className="mt-1 flex items-center space-x-2 bg-red-900/50 border border-red-700 p-2 rounded text-xs text-red-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-red-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{errors.confirmPassword}</span>
                </div>
              )}
            </div>

            {/* Terms Agreement */}
            <div className="flex items-start space-x-3 pt-2">
              <input
                type="checkbox"
                id="terms"
                checked={termsAccepted}
                onChange={handleTermsChange}
                className="mt-1 h-4 w-4 rounded border-gray-600 bg-gray-700 text-purple-600 focus:ring-purple-600 focus:ring-offset-0 focus:ring-offset-gray-800"
              />
              <div>
                <label htmlFor="terms" className="text-sm text-gray-400">
                  I agree to the{' '}
                  <a
                    href="#"
                    className="font-medium text-purple-400 hover:text-purple-300 hover:underline"
                  >
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a
                    href="#"
                    className="font-medium text-purple-400 hover:text-purple-300 hover:underline"
                  >
                    Privacy Policy
                  </a>
                </label>
              </div>
            </div>
            {errors.terms && (
              <div className=" flex items-center space-x-2 bg-red-900/50 border border-red-700 p-2 rounded text-xs text-red-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-red-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{errors.terms}</span>
              </div>
            )}

            <button
              type="submit"
              className="mt-3 h-12 w-full rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-700 focus:ring-offset-1 focus:ring-offset-gray-800 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Create account
            </button>
          </form>

          <div className="mt-8 text-center text-sm">
            <span className="text-gray-400">Already have an account?</span>{' '}
            <Link
              to="/login"
              className="font-medium text-purple-400 hover:text-purple-300 hover:underline transition-colors"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
