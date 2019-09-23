import React from "react";
import { Form } from "react-final-form";
import uuidv4 from "uuid/v4";
import axios from "axios";
import SignUpSignInForm from "../components/SignUpSignInForm";
import LayoutBuilder from "../components/LayoutBuilder/LayoutBuilder";
import { Layout, SignUpSignInValues } from "../@types";
import { AUTH_ACTION_SIGN_IN, AUTH_ACTION_SIGN_UP } from "../constants";
import { useAuth, signUp, signIn } from "../contexts/auth";

const initialValues: { layout: Layout } = {
  layout: {
    id: uuidv4(),
    rows: []
  }
};

function Home() {
  const [authState, authDispatch] = useAuth();
  return (
    <div>
      <input
        type="file"
        multiple
        onChange={e => {
          console.log(e);
          const formData = new FormData();

          if (e.target.files !== undefined && e.target.files !== null) {
            const thumbURL = URL.createObjectURL(e.target.files[0]);
            formData.append(
              "filesfdsa",
              e.target.files[0],
              e.target.files[0].name
            );
          }

          const response = axios({
            url: "/api/upload",
            method: "post",
            headers: {
              "Content-Type": "multipart/form-data"
            },
            data: formData,
            onUploadProgress: function(progressEvent) {
              console.log(progressEvent);
            }
          });

          console.log(formData);
        }}
      />

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
