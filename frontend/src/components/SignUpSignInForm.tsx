import React from "react";
import { FormApi } from "final-form";
import { Form, Field } from "react-final-form";
import zxcvbn from "zxcvbn";
import { isEmail } from "validator";
import styled from "@emotion/styled";
import { AuthFormAction, SignUpSignInValues } from "../@types";
import FieldErrorMessage from "./FieldErrorMessage";
import { MIN_ZXCVBN_SCORE } from "../constants";

const Wrapper = styled.div`
  background: #fff;
  border-radius: 0.3rem;
  margin: 2rem auto;
  box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.1);
  padding: 2rem;
  max-width: 22rem;

  label,
  input {
    display: block;
  }

  input {
    margin-bottom: 1rem;
    font: inherit;
    width: 100%;
    color: inherit;
  }
`;

interface Props {
  authAction: AuthFormAction;
  onSubmit(values: SignUpSignInValues, form: FormApi<SignUpSignInValues>): void;
}

export default function SignUpSignInForm({ onSubmit, authAction }: Props) {
  const initialValues = {
    email: "",
    password: "",
    action: authAction
  };

  function validateEmail(value: any) {
    if (typeof value !== "string" || !isEmail(value)) {
      return "Invalid email address.";
    }
    return;
  }

  function validatePassword(value: any) {
    const passwordRating = zxcvbn(value);
    if (passwordRating.score >= MIN_ZXCVBN_SCORE) {
      return;
    }

    return "Password not strongth enough.";
  }

  return (
    <Form onSubmit={onSubmit} initialValues={initialValues}>
      {({ handleSubmit, error, invalid, submitting }) => (
        <form onSubmit={handleSubmit} noValidate>
          <Wrapper>
            <label htmlFor="email">Email</label>
            <Field
              id="email"
              name="email"
              component="input"
              type="email"
              aria-required="true"
              validate={validateEmail}
            />
            <FieldErrorMessage name="email" />
            <label htmlFor="password">Password</label>
            <Field
              id="password"
              name="password"
              component="input"
              type="password"
              aria-required="true"
              validate={validatePassword}
            />
            <Field
              type="hidden"
              name="action"
              component="input"
              value={authAction}
            />
            <FieldErrorMessage name="password" />
            {error}
            <button disabled={error || invalid || submitting} type="submit">
              Submit
            </button>
          </Wrapper>
        </form>
      )}
    </Form>
  );
}
