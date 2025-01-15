import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import React, { createContext, useState } from 'react';
import { auth } from '../../firebase.init';


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
                alert('worked!')
            })
            setUser(data.user)
            setLoading(false)
        })
        .catch(error => {
            console.log(error.message)
        })
    }


    const authInfo = {
        signUpUser,
        setUser,
        user,
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;