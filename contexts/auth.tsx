import React, { createContext, useContext, useReducer } from "react";
import produce from "immer";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { AUTH_ACTION_SIGN_IN, AUTH_ACTION_SIGN_UP } from "../constants";
import {
  AuthAction,
  AuthContextState,
  AuthContextDispatch,
  SignUpSignInValues,
  SignInAuthAction,
  SignOutAuthAction
} from "../@types";

const defaultValue: AuthContextState = {
  loggedIn: false,
  token: undefined,
  tokenDecoded: undefined
};

const AuthStateContext = createContext<AuthContextState | undefined>(undefined);
const AuthDispatchContext = createContext<AuthContextDispatch | undefined>(
  undefined
);

function authReducer(
  state: AuthContextState,
  action: AuthAction
): AuthContextState {
  switch (action.type) {
    case "signIn":
      return produce(state, draftState => {
        draftState.loggedIn = true;
        draftState.token = action.token;

        const decodedToken: Object = jwtDecode(action.token);

        if (decodedToken !== undefined) {
          draftState.tokenDecoded = decodedToken;
        }
      });
    case "signOut":
      return produce(state, draftState => {
        draftState.loggedIn = false;
        draftState.token = undefined;
      });
    default:
      return state;
  }
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider(props: AuthProviderProps) {
  const [state, dispatch] = useReducer(authReducer, defaultValue);
  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {props.children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
}

export function useAuthState() {
  const context = useContext(AuthStateContext);

  if (context === undefined) {
    throw new Error("Must be used within a AuthStateContext.Provider!");
  }

  return context;
}

export function useAuthDispatch() {
  const context = useContext(AuthDispatchContext);

  if (context === undefined) {
    throw new Error("Must be used within a AuthDispatchContext.Provider!");
  }

  return context;
}

export function useAuth(): [AuthContextState, AuthContextDispatch] {
  return [useAuthState(), useAuthDispatch()];
}

export async function signIn(
  dispatch: AuthContextDispatch,
  { email, password, action }: SignUpSignInValues
) {
  try {
    if (action !== AUTH_ACTION_SIGN_IN) {
      throw new Error("Submitted with incorrect configuration.");
    }

    const result = await axios({
      url: "/api/auth",
      data: { email, password, action },
      method: "post"
    });

    console.log(result.data);

    const signInAction: SignInAuthAction = {
      type: "signIn",
      token: result.data.token
    };

    dispatch(signInAction);
  } catch (e) {
    console.log(e);
  }
}

export async function signUp(
  dispatch: AuthContextDispatch,
  { email, password, action }: SignUpSignInValues
) {
  try {
    if (action !== AUTH_ACTION_SIGN_UP) {
      throw new Error("Submitted with incorrect configuration.");
    }

    const result = await axios({
      url: "/api/auth",
      data: { email, password, action },
      method: "post"
    });

    signIn(dispatch, {
      email,
      password,
      action: AUTH_ACTION_SIGN_IN
    });
  } catch (e) {
    console.log(e);
  }
}

export async function signOut(dispatch: AuthContextDispatch) {
  const signOut: SignOutAuthAction = {
    type: "signOut"
  };
  dispatch(signOut);
}
