import React from "react";
import { Form, Field } from "react-final-form";

interface Props {
  onSubmit(): Promise<void>;
}

export default function SignUpSignInForm({ onSubmit }: Props) {
  return (
    <Form onSubmit={onSubmit}>
      {({ handleSubmit }) => (
        <form noValidate>
          <label htmlFor="email">Email</label>
          <Field
            id="email"
            name="email"
            component="input"
            type="email"
            aria-required="true"
          />
          <label htmlFor="password">Password</label>
          <Field
            id="password"
            name="password"
            component="input"
            type="password"
            aria-required="true"
          />
          <button type="submit">Submit</button>
        </form>
      )}
    </Form>
  );
}
