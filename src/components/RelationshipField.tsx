import React from "react";
import { useField } from "react-final-form";
import { useContentType } from "../hooks";
import { FieldControlProps, RelationshipField } from "../types";

export default function RelationshipField(
  props: FieldControlProps<RelationshipField>
) {
  const formField = useField(props.id);
  const { documents } = useContentType(props.field.relationshipWith);

  return (
    <pre>
      <code>{JSON.stringify(documents, null, 2)}</code>
    </pre>
  );
}
