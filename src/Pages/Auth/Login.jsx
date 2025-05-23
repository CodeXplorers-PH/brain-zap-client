import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { AuthContext } from '@/provider/AuthProvider';
import SocialLogin from './SocialLogin';
import useAxiosPublic from '@/hooks/useAxiosPublic';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';

const Login = () => {
  const { user } = useAuth();
  const { userLogin, passwordResetEmail } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const emailRef = useRef();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const [loginAttempt, setLoginAttempt] = useState(() => {
    const storedAttempt = localStorage.getItem('loginAttempt');
    return storedAttempt ? JSON.parse(storedAttempt) : 0;
  });

  // Scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Login | BrainZap';
  }, []);

  // Navigate to start-quiz if already login
  useEffect(() => {
    user && navigate('/start-quiz');
  }, [user]);

  useEffect(() => {
    const handleLoginAttempt = async () => {
      if (
        !errors?.submit ||
        (errors.submit !== 'Firebase: Error (auth/invalid-credential).' &&
          errors.submit !== 'auth/too-many-requests')
      ) {
        return;
      }

      const currentEmail = emailRef.current?.value;
      if (!currentEmail) return;

      const existingEmail = localStorage.getItem('loginAttemptEmail');

      if (existingEmail && existingEmail !== currentEmail) {
        localStorage.removeItem('loginAttempt');
        localStorage.removeItem('loginAttemptEmail');
        setLoginAttempt(0);
        return;
      }

      localStorage.setItem('loginAttemptEmail', currentEmail);

      if (loginAttempt >= 3) {
        const newUnlockTime = Date.now() + 60 * 60 * 1000;

        try {
          await axiosPublic.post('/account_lockout', {
            email: currentEmail,
            isLocked: true,
            date: new Date(),
            unlockTime: newUnlockTime,
          });

          setErrors({
            submit: `Your account has been temporarily locked due to multiple failed login attempts. Please try again after ${format(
              newUnlockTime,
              'h:mm a'
            )}.`,
          });
        } catch (err) {
          console.error('Error locking account:', err);
        }
      } else {
        const newAttempt = loginAttempt + 1;
        setLoginAttempt(newAttempt);
        localStorage.setItem('loginAttempt', JSON.stringify(newAttempt));

        const remaining = 3 - newAttempt;
        setErrors({
          submit: `Incorrect credentials. You have ${remaining} attempt${
            remaining !== 1 ? 's' : ''
          } remaining before your account is temporarily locked.`,
        });
      }
    };

    handleLoginAttempt();
  }, [errors, loginAttempt]);

  const handleSubmit = e => {
    e.preventDefault();

    setErrors({});
    setResetEmailSent(false);

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    const newErrors = {};
    if (!email) {
      newErrors.email = 'Email is required';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    userLogin(email, password)
      .then(() => {
        // Reset login attempts on successful login
        localStorage.removeItem('loginAttempt');
        localStorage.removeItem('loginAttemptEmail');
        setLoginAttempt(0);
      })
      .catch(error => {
        let errorMessage = 'Login failed. Please try again.';
        const errorCode = error.code;

        if (
          errorCode === 'auth/user-not-found' ||
          errorCode === 'auth/wrong-password'
        ) {
          errorMessage = 'Invalid email or password. Please try again.';
        } else if (errorCode === 'auth/too-many-requests') {
          errorMessage =
            'Too many failed login attempts. Please try again later.';
        } else if (errorCode === 'auth/invalid-email') {
          setErrors({ email: 'Invalid email format.' });
          return;
        } else {
          errorMessage = error.message;
        }

        setErrors({ submit: errorMessage });
      });
  };

  const handleForget = e => {
    e.preventDefault();
    setResetEmailSent(false);
    setErrors({});

    const email = emailRef.current?.value;
    if (!email) {
      setErrors({
        email: 'Please enter your email address for password reset.',
      });
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setErrors({ email: 'Please enter a valid email address.' });
      return;
    }

    setIsResetting(true);

    passwordResetEmail(email)
      .then(() => {
        setResetEmailSent(true);
        setErrors({});
      })
      .catch(error => {
        setIsResetting(false);
        const errorCode = error.code;
        if (errorCode === 'auth/user-not-found') {
          setErrors({ email: 'No account found with this email.' });
        } else if (errorCode === 'auth/invalid-email') {
          setErrors({ email: 'Invalid email format.' });
        } else if (errorCode === 'auth/too-many-requests') {
          setErrors({ email: 'Too many requests. Please try again later.' });
        } else {
          setErrors({ email: 'Failed to send reset email. Please try again.' });
        }
      })
      .finally(() => {
        setIsResetting(false);
      });
  };

  const handleLoginSuccess = () => {
    // Reset login attempts on successful login
    localStorage.removeItem('loginAttempt');
    localStorage.removeItem('loginAttemptEmail');
    setLoginAttempt(0);
  };

  const handleLoginError = errorMessage => {
    setErrors({ submit: errorMessage });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="flex py-40 flex-col items-center justify-center bg-gray-900 min-h-screen px-4">
        <div className="w-full max-w-lg rounded-lg border border-gray-800 bg-gray-800 p-8 shadow-2xl">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Welcome Back to BrainZap
            </h1>
            <h5 className="mt-3 text-gray-400">Login to test your knowledge</h5>
          </div>

          {errors.submit && (
            <div className="mb-6 p-3 bg-red-900/40 border border-red-800 text-red-300 rounded-md text-sm">
              {errors.submit}
            </div>
          )}

          {resetEmailSent && (
            <div className="mb-6 p-3 bg-green-900/40 border border-green-800 text-green-300 rounded-md text-sm">
              Password reset email has been sent. Please check your inbox.
            </div>
          )}

          <SocialLogin
            onLoginSuccess={handleLoginSuccess}
            onLoginError={handleLoginError}
          />

          <form onSubmit={handleSubmit} className="grid gap-5">
            <div className="grid gap-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-300"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                ref={emailRef}
                placeholder="m@example.com"
                className={`h-12 w-full rounded-md border ${
                  errors.email ? 'border-red-500' : 'border-gray-700'
                } bg-gray-700/50 px-4 py-2 text-gray-200 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all duration-200`}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-400">{errors.email}</p>
              )}
            </div>

            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-300"
                >
                  Password
                </label>
                <button
                  onClick={handleForget}
                  disabled={isResetting}
                  className={`text-sm font-medium text-purple-400 hover:text-purple-300 hover:underline focus:outline-none transition-colors ${
                    isResetting ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isResetting ? 'Sending...' : 'Forgot password?'}
                </button>
              </div>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  type={showPassword ? 'text' : 'password'}
                  className={`h-12 w-full rounded-md border ${
                    errors.password ? 'border-red-500' : 'border-gray-700'
                  } bg-gray-700/50 px-4 py-2 text-gray-200 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all duration-200`}
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-xs text-red-400">{errors.password}</p>
              )}
            </div>

            <div className="flex items-start space-x-3 pt-2">
              <input
                type="checkbox"
                id="remember"
                className="mt-1 h-4 w-4 rounded border-gray-600 bg-gray-700 text-purple-600 focus:ring-purple-600 focus:ring-offset-0 focus:ring-offset-gray-800"
              />
              <div>
                <label htmlFor="remember" className="text-sm text-gray-400">
                  Remember me
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="mt-3 h-12 w-full rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-700 focus:ring-offset-1 focus:ring-offset-gray-800 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Login
            </button>
          </form>

          <div className="mt-8 text-center text-sm">
            <span className="text-gray-400">Don't have an account?</span>{' '}
            <Link
              to="/signup"
              className="font-medium text-purple-400 hover:text-purple-300 hover:underline transition-colors"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
