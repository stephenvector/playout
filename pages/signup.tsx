import React, { useEffect } from "react";
import Router from "next/router";
import { AUTH_ACTION_SIGN_UP } from "../constants";
import SignUpSignInForm from "../components/SignUpSignInForm";
import { signIn, useAuth } from "../contexts/auth";
import { SignUpSignInValues } from "../@types";

export default function SignIn() {
  const [authState, authDispatch] = useAuth();

  useEffect(() => {
    if (authState.loggedIn) {
      Router.push("/dashboard");
    }
  }, [authState.loggedIn]);

  return (
    <div>
      <h2>Sign Up</h2>
      <SignUpSignInForm
        authAction={AUTH_ACTION_SIGN_UP}
        onSubmit={async function(values: SignUpSignInValues) {
          signIn(authDispatch, values);
        }}
      />
    </div>
  );
}
