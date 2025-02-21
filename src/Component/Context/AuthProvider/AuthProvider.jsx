import { createContext, useEffect, useState } from 'react';
import { auth } from './../../Firebase/firebase.init';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';

export let AuthContext = createContext();
const AuthProvider = ({ children }) => {

    let [user, setUser] = useState(null);
    let [loading, setloading] = useState(true);

    let googleProvider = new GoogleAuthProvider();
    let googleRegister = new GoogleAuthProvider();
    let createUser = (email, password) => {
        setloading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    let logInUser = (email, password) => {
        setloading(true)
        return signInWithEmailAndPassword(auth, email, password);

    }
    let googleLogin = () => {
        setloading(true)
        return signInWithPopup(auth, googleProvider);
    }
    let googleWithLogIn = () => {
        setloading(true)
        return signInWithPopup(auth, googleRegister);
    }
    let updateUserProfile = (updateData) => {
        return updateProfile(auth.currentUser, updateData);
    }
    let LogOutUser = () => {
        setloading(true)
        return signOut(auth);
    }

    useEffect(() => {
        let unsubscribe = onAuthStateChanged(auth, (currenUser) => {
            setUser(currenUser);
            setloading(false)
            return () => {
                unsubscribe();
            }
        })
    }, [])

    let authInfo = {
        user,
        setUser,
        createUser,
        updateUserProfile,
        logInUser,
        googleLogin,
        googleWithLogIn,
        LogOutUser,
        loading,
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;