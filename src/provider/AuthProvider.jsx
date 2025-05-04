import app from '@/firebase/firebase.config';
import React, { createContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import useAxiosPublic from '@/hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import { format } from 'date-fns';
import axios from 'axios';

export const AuthContext = createContext();
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userLevel, setUserLevel] = useState(null);
  const [userType, setUserType] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();

  // Credentials SignUp
  const createNewUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  // Credentials SignIn
  const userLogin = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  // Update User Profile
  const updateUserProfile = updatedData => {
    return updateProfile(auth.currentUser, updatedData);
  };
  // Reset Password
  const passwordResetEmail = email => {
    return sendPasswordResetEmail(auth, email);
  };
  // Logout
  const logOut = () => {
    localStorage.removeItem('loginAttempt');
    return signOut(auth);
  };
  // Google SignIn
  const signInWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };
  // Github SignIn
  const signInWithGithub = () => {
    return signInWithPopup(auth, githubProvider);
  };

  // On Auth State Change
  useEffect(() => {
    setLoading(true);

    const unsubscribe = onAuthStateChanged(auth, async currentUser => {
      if (currentUser) {
        localStorage.removeItem('loginAttempt');

        const { displayName, photoURL, email } = currentUser;

        try {
          // Store token
          const { data: token } = await axiosPublic.post('/jwt', { email });
          token?.token && localStorage.setItem('access_token', token.token);

          // Set Users
          setUser(currentUser);

          // Save user data in the database
          displayName &&
            photoURL &&
            email &&
            (await axiosPublic.post('/post_user', {
              name: displayName,
              photoURL,
              email,
            }));

          // Set User type and isAdmin

          const { data: userInfo } = await axios.get(
            `${import.meta.env.VITE_ServerUrl}/userInfo`,
            {
              headers: {
                Authorization: `Bearer ${token.token}`,
                email: currentUser?.email,
              },
            }
          );
          setUserLevel(userInfo?.userInfo?.level?.level || 0);
          setUserType(userInfo?.userInfo?.subscription || null);
          setIsAdmin(userInfo?.userInfo?.role === 'admin' ? true : false);

          // Check if the account is locked
          const res = await axiosPublic.patch('/account_lockout', { email });

          setIsLocked(res?.data?.isLocked);
          if (res?.data?.isLocked) {
            logOut();
            Swal.fire({
              icon: 'warning',
              title: 'Account Locked!',
              text: `Your account has been temporarily locked due to multiple failed login attempts. Please try again after ${format(
                new Date(res?.data?.unlockTime),
                'h:mm a'
              )}.`,
              background: 'rgba(30, 30, 60, 0.85)',
              color: '#fff',
              backdrop: 'rgba(0, 0, 0, 0.4)',
              customClass: {
                popup:
                  'rounded-xl shadow-lg border border-blue-500 backdrop-blur-lg',
                title: 'text-blue-400 text-lg font-semibold',
                confirmButton:
                  'bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2 rounded mt-4',
                htmlContainer: 'text-sm text-gray-300',
              },
            });
          }
          setLoading(false);
        } catch (err) {
          console.error('Auth side effects failed:', err);
          setLoading(false);
        }
      } else {
        localStorage.removeItem('access_token');
        setUser(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // Exported Auth Info
  const authInfo = {
    user,
    userLevel,
    userType,
    setUserType,
    isAdmin,
    createNewUser,
    logOut,
    userLogin,
    updateUserProfile,
    passwordResetEmail,
    signInWithGoogle,
    signInWithGithub,
    isLocked,
    loading,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
