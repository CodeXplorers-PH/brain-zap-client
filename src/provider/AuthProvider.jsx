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
import Swal from "sweetalert2";

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
    loading,
  };

  useEffect(() => {
    setLoading(true);

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser || null);

      if (currentUser) {
        localStorage.removeItem("loginAttempt");

        const { displayName, photoURL, email } = currentUser;

        try {
          // Check if the account is locked
          const res = await axiosPublic.patch("/account_lockout", {
            email: email,
          });
          setIsLocked(res.data.isLocked);

          if (res.data.isLocked) {
            logOut();
            Swal.fire({
              icon: "warning",
              title: "Account Locked!",
              text: `Your account has been temporarily locked due to multiple failed login attempts. Please try again after 1 hour.`,
              background: "rgba(30, 30, 60, 0.85)",
              color: "#fff",
              backdrop: "rgba(0, 0, 0, 0.4)",
              customClass: {
                popup:
                  "rounded-xl shadow-lg border border-blue-500 backdrop-blur-lg",
                title: "text-blue-400 text-lg font-semibold",
                confirmButton:
                  "bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2 rounded mt-4",
                htmlContainer: "text-sm text-gray-300",
              },
            });
          }

          // Save user data in the database
          if (displayName && photoURL && email) {
            await axiosPublic.post("/post_user", {
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
  }, [axiosPublic]);

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
