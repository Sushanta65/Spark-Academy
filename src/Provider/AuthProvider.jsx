import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../../firebase.init';
import Swal from 'sweetalert2';


export const AuthContext = createContext()

const AuthProvider = ({children}) => {
    const [user, setUser] = useState([])
    const [loading, setLoading] = useState(true)

    const provider = new GoogleAuthProvider;

    const signUpUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }


    const signInUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }


    const googleSignIn = () => {
        signInWithPopup(auth, provider)
        .then(data => {
            setUser(data.user)
            Swal.fire({
                position: "middle-center",
                icon: "success",
                title: "Google SignIn Successfull.",
                showConfirmButton: false,
                timer: 2000
              });
        }) 
        .catch(error => {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text:  `${error.message}`,
                footer: 'Try to use another email'
              });
        })
    }


    const signOutUser = () => {
        signOut(auth)
        .then(() => {
            Swal.fire({
                position: "middle-center",
                icon: "success",
                title: "Logout Successfull.",
                showConfirmButton: false,
                timer: 2000
              });
        })
    }

    const authInfo = {
        signUpUser,
        signInUser,
        googleSignIn,
        signOutUser,
        setUser,
        user,
        setLoading,
        loading,
    }

    useEffect(() => {
        setLoading(true)
        const unsubsribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            console.log(currentUser)
            setLoading(false)
        })
        return (() => {
            unsubsribe()
        })
    }, [])

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;