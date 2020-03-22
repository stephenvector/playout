import React from "react";

type AuthContextShape = {
  checkedAuth: boolean;
  isSignedIn: boolean;
  currentUser: null | firebase.User;
};

const authContextInitialState: AuthContextShape = {
  checkedAuth: false,
  isSignedIn: false,
  currentUser: null
};

export const AuthContext = React.createContext<AuthContextShape>(
  authContextInitialState
);
