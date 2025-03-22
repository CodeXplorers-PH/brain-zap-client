import app from '@/firebase/firebase.config';
import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";


export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    console.log(user);

    const createNewUser = (email, password) =>{
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const userLogin = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    const updateUserProfile = (updatedData) => {
        return updateProfile(auth.currentUser, updatedData)
    }

    const passwordResetEmail = (email) => {
        return sendPasswordResetEmail(auth, email)
    }

    const logOut =  () => {
        return signOut(auth);
    }

    const authInfo = {
        user, 
        setUser,
        createNewUser,
        logOut,
        userLogin,
        updateUserProfile,
        passwordResetEmail
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
        })
        return () => {
            unsubscribe();
        }
    },[])

    return <AuthContext.Provider value={authInfo}>
        {children}
    </AuthContext.Provider>;
};

export default AuthProvider;