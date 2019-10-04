import React from "react";
import { FormApi } from "final-form";
import { Form, Field } from "react-final-form";
import zxcvbn from "zxcvbn";
import { isEmail } from "validator";
import { AuthFormAction, SignUpSignInValues } from "../@types";
import FieldErrorMessage from "./FieldErrorMessage";
import { MIN_ZXCVBN_SCORE } from "../constants";

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
        </form>
      )}
    </Form>
  );
}
