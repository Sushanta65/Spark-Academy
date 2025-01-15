import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../../firebase.init';
import Swal from 'sweetalert2';


export const AuthContext = createContext()

const AuthProvider = ({children}) => {
    const [user, setUser] = useState([])
    const [loading, setLoading] = useState(true)


    const signUpUser = (email, password, name, photoURL) => {
        setLoading(true)
        createUserWithEmailAndPassword(auth, email, password)
        .then(data => {
            updateProfile(auth.currentUser, {
                displayName: name,
                photoURL
            })
            .then(() => {
                Swal.fire({
                    position: "middle-center",
                    icon: "success",
                    title: "SignUp Successfull.",
                    showConfirmButton: false,
                    timer: 2000
                  });
            })
            setUser(data.user)
            setLoading(false)
        })
        .catch(error => {
            let errorMessage;
            console.log(error.message)
            if(error.message === 'Firebase: Error (auth/email-already-in-use).'){
                errorMessage = 'This Email Used in Another Account.'
            }else{
                errorMessage = "Something Went Wrong"
            }
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text:  `${errorMessage}`,
                footer: 'Try to use another email'
              });
        })
    }


    const signInUser = (email, password) => {
        setLoading(true)
        signInWithEmailAndPassword(auth, email, password)
        .then(data => {
            setLoading(false)
            setUser(data.user)
            Swal.fire({
                position: "middle-center",
                icon: "success",
                title: "SignIn Successfull.",
                showConfirmButton: false,
                timer: 2000
              });
        })
    }


    const authInfo = {
        signUpUser,
        signInUser,
        setUser,
        user,
    }

    useEffect(() => {
        setLoading(true)
        const unsubsribe = onAuthStateChanged(auth, (user) => {
            setUser(user)
            console.log(user)
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