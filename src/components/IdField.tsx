import React, { useEffect } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import { useField } from "react-final-form";
import { ContentTypeField } from "../config";

type IdFieldProps = {
  field: ContentTypeField;
};

export default function IdField({ field }: IdFieldProps) {
  const {
    input: { value, onChange }
  } = useField(field.id);

  useEffect(() => {
    if (value === null || value === "" || value === undefined) {
      const randomId = firebase
        .firestore()
        .collection("anycollectionitdoesntmatter")
        .doc().id;
      onChange(randomId);
    }
  }, [field.id, value, onChange]);

  return <input type="hidden" value={value} />;
}
