import React, { createContext, useState } from 'react';


const AuthContext = createContext()

const AuthProvider = ({children}) => {
    const [user, setUser] = useState([])


    const signUpUser = () => {
        
    }


    const authInfo = {

    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;