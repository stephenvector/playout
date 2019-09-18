import React from "react";
import { Form } from "react-final-form";
import uuidv4 from "uuid/v4";
import SignUpSignInForm from "../components/SignUpSignInForm";
import LayoutBuilder from "../components/LayoutBuilder/LayoutBuilder";
import { Layout } from "../@types";

const initialValues: { layout: Layout } = {
  layout: {
    id: uuidv4(),
    rows: []
  }
};

function Home() {
  return (
    <div>
      <h2>Sign Up</h2>
      <SignUpSignInForm onSubmit={async () => {}} />

      <h2>Sign In</h2>
      <SignUpSignInForm onSubmit={async () => {}} />

      <Form onSubmit={() => {}} initialValues={initialValues}>
        {() => (
          <form>
            <LayoutBuilder name="layout" />
          </form>
        )}
      </Form>
    </div>
  );
}

export default Home;
