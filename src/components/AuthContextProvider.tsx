import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import { AuthContext } from "../contexts";

type AuthContextProviderProps = {
  children: React.ReactNode;
};

export default function AuthContextProvider({
  children
}: AuthContextProviderProps) {
  const [checkedAuth, setCheckedAuth] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<null | firebase.User>(null);

  useEffect(() => {
    let ignore = false;
    firebase.auth().onAuthStateChanged(user => {
      if (ignore) return;

      if (user === null) {
        setCurrentUser(null);
        setIsSignedIn(false);
      } else {
        setCurrentUser(user);
      }

      setCheckedAuth(true);
    });
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <AuthContext.Provider value={{ checkedAuth, isSignedIn, currentUser }}>
      {children}
    </AuthContext.Provider>
  );
}
