import React from "react";
import { Form, Field } from "react-final-form";
import { Button } from "./primitives";
import { Project } from "../types";

const INITIAL_VALUES: Project = {
  name: "",
  description: ""
};

export default function ProjectForm() {
  async function onSubmit() {}

  return (
    <Form onSubmit={onSubmit} initialValues={INITIAL_VALUES}>
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Field name="name" />
          <Button>Save</Button>
        </form>
      )}
    </Form>
  );
}
