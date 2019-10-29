export type ConditionType = "equalto" | "notequalto";

interface FieldWithoutConditions {
  name: string;
  repeatable?: boolean;
}

interface FieldWithConditions {
  name: string;
  repeatable?: boolean;
  comparisonType: ConditionType;
  comparisonTargetField: string;
  comparisonTargetValue: string;
}

type FieldBase = FieldWithoutConditions | FieldWithConditions;

type FieldBaseWithOptions = FieldBase & {
  options: {
    label: string;
    value: string;
  }[];
};

type FieldWithChildren = FieldBase & {
  children: ContentTypeFields;
};

export type CheckboxField = FieldBaseWithOptions & {
  fieldType: "checkbox";
};

export type DateField = FieldBase & { fieldType: "date" };

export type FieldGroupField = FieldWithChildren & {
  fieldType: "fieldgroup";
};

export type RadioField = FieldBaseWithOptions & {
  fieldType: "radio";
};

export type RelationshipField = FieldBase & {
  fieldType: "relationship";
  relationshipWith: string;
};

export type SelectField = FieldBaseWithOptions & {
  fieldType: "select";
};

export type TextField = FieldBase & { fieldType: "text" };

export type TextareaField = FieldBase & { fieldType: "textarea" };

export type TimeField = FieldBase & { fieldType: "time" };

export type ContentTypeField =
  | CheckboxField
  | DateField
  | FieldGroupField
  | RadioField
  | RelationshipField
  | SelectField
  | TimeField
  | TextField
  | TextareaField;

type ContentTypeFields = {
  [id: string]: ContentTypeField;
};

export type ContentType = {
  name: string;
  fields: ContentTypeFields;
};

export type FieldControlProps<T> = {
  field: T;
  id: string;
};

export type PostValues = {
  [key: string]: any;
};

export type Post = {
  contentType: string;
  values: PostValues;
};
