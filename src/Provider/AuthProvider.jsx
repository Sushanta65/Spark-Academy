import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import { auth } from "../../firebase.init";
import Swal from "sweetalert2";
import useAxiosPublic from "../hooks/useAxiosPublic";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState([]);
  const axiosSecure = useAxiosPublic();

  const provider = new GoogleAuthProvider();

  const signUpUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((data) => {
        const newUser = {
          name: data.user.displayName,
          email: data.user.email,
          photoURL: data.user.photoURL,
          role: "student",
        };
        axiosSecure.post("/users", newUser).then((res) => {
          console.log(res);
          setUser(data.user)
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${error.message}`,
          footer: "Try to use another email",
        });
      });
  };

  const signOutUser = () => {
    signOut(auth).then(() => {
      Swal.fire({
        position: "middle-center",
        icon: "success",
        title: "Logout Successfull.",
        showConfirmButton: false,
        timer: 2000,
      });
    });
  };

  const authInfo = {
    signUpUser,
    signInUser,
    googleSignIn,
    signOutUser,
    setUser,
    user,
    setLoading,
    loading,
    currentUser,
  };

  

  useEffect(() => {
    setLoading(true);
    const unsubsribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log(currentUser);

      setLoading(false);
    });
    return () => {
      unsubsribe();
    };
  }, [axiosSecure, user?.email]);

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
