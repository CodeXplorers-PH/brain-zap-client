import app from "@/firebase/firebase.config";
import React, { createContext, useEffect, useState } from "react";
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
} from "firebase/auth";
import useAxiosPublic from "@/hooks/useAxiosPublic";

export const AuthContext = createContext();
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLocked, setIsLocked] = useState(false);

  const axiosPublic = useAxiosPublic();

  const createNewUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const userLogin = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const updateUserProfile = (updatedData) => {
    return updateProfile(auth.currentUser, updatedData);
  };

  const passwordResetEmail = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  const logOut = () => {
    localStorage.removeItem("loginAttempt");
    return signOut(auth);
  };

  const signInWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  const signInWithGithub = () => {
    return signInWithPopup(auth, githubProvider);
  };

  useEffect(() => {
    axiosPublic
      .patch("/account_lockout", {
        email: user?.email,
      })
      .then((res) => {
        setIsLocked(res.data.isLocked);
      });
  }, [user]);

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
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser || null);

      if (currentUser) {
        console.log(currentUser);

        localStorage.removeItem("loginAttempt");

        const { displayName, photoURL, email } = currentUser;

        if (displayName && photoURL && email) {
          axiosPublic
            .post("/post_user", { name: displayName, photoURL, email })
            .then((data) => console.log(data.data));
        }
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
