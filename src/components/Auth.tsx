import React from "react";
import { Form } from "react-final-form";
import styled from "@emotion/styled";
import firebase from "firebase/app";
import "firebase/auth";
import { useAuth } from "../hooks";
import { Button, LargeText } from "./primitives";
import InputField from "./InputField";

const AuthStyled = styled.div`
  form {
    padding: 3rem;
  }
  footer {
    padding: 3rem;
    border-top: 1px solid #ddd;
  }
  background: #fff;
  max-width: 500px;
  margin: 3rem auto;
  border-radius: 0.5rem;
  box-shadow: 0 0.2rem 0.2rem 0 rgba(0, 0, 0, 0.1);
`;

type SignUpSignInValues = {
  email: string;
  password: string;
};

const initialValues: SignUpSignInValues = {
  email: "",
  password: ""
};

export default function Auth() {
  const { isSignedIn } = useAuth();

  async function handleSubmit({ email, password }: SignUpSignInValues) {
    firebase.auth().signInWithEmailAndPassword(email, password);
  }

  if (isSignedIn) {
    return <div>Signed In</div>;
  }

  return (
    <AuthStyled>
      <Form initialValues={initialValues} onSubmit={handleSubmit}>
        {({ handleSubmit }) => (
          <form noValidate onSubmit={handleSubmit}>
            <LargeText>Login</LargeText>
            <InputField placeholder="Email Address" type="email" name="email" />
            <InputField
              placeholder="Password"
              type="password"
              name="password"
            />
            <Button>Sign Up</Button>
          </form>
        )}
      </Form>
      <footer>
        <p>Need An Account? SignUp -> </p>
      </footer>
    </AuthStyled>
  );
}
