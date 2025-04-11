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

export const AuthContext = createContext();
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLocked, setIsLocked] = useState(false);
  const [loading, setLoading] = useState(true);

  const axiosPublic = useAxiosPublic();

  const createNewUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const userLogin = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const updateUserProfile = updatedData => {
    return updateProfile(auth.currentUser, updatedData);
  };

  const passwordResetEmail = email => {
    return sendPasswordResetEmail(auth, email);
  };

  const logOut = () => {
    localStorage.removeItem('loginAttempt');
    return signOut(auth);
  };

  const signInWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  const signInWithGithub = () => {
    return signInWithPopup(auth, githubProvider);
  };

  const authInfo = {
    user,
    setUser,
    createNewUser,
    logOut,
    userLogin,
    updateUserProfile,
    passwordResetEmail,
    signInWithGoogle,
    signInWithGithub,
    isLocked,
    loading
  };



  useEffect(() => {
    setLoading(true);
    
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser || null);
  
      if (currentUser) {
        localStorage.removeItem('loginAttempt');
  
        const { displayName, photoURL, email } = currentUser;
  
        try {
          // Wait for account lock check
          const res = await axiosPublic.patch('/account_lockout', {
            email: email,
          });
          setIsLocked(res.data.isLocked);
  
          // Wait for user save
          if (displayName && photoURL && email) {
            await axiosPublic.post('/post_user', {
              name: displayName,
              photoURL,
              email,
            });
          }
        } catch (err) {
          console.error("Auth side effects failed:", err);
        }
      }
  
      setLoading(false); 
    });
  
    return () => unsubscribe();
  }, []);
  

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
