import { InferType } from "yup";
import {
  contentTypeSchema,
  contentFieldTypeSchema,
  contentTypeFieldTypeSchema
} from "../schema";

export type DateField = {
  id: string;
  name: string;
  type: "date";
};

export type TimeField = {
  id: string;
  name: string;
  type: "time";
};

export type TextField = {
  id: string;
  name: string;
  type: "text";
};

export type LayoutField = {
  id: string;
  name: string;
  type: "layout";
};

export type RelationshipField = {
  id: string;
  name: string;
  type: "relationship";
  relationshipWith: string;
};

export type FieldGroupField = {
  id: string;
  name: string;
  type: "fieldgroup";
  children: ContentTypeField[];
};

export interface RepeatableField {
  id: string;
  name: string;
  type: "repeatable";
  children: ContentTypeField[];
}

export interface SelectField {
  id: string;
  name: string;
  type: "select";
  options: {
    label: string;
    value: string;
  }[];
}

export interface CheckboxField {
  id: string;
  name: string;
  type: "checkbox";
  options: {
    label: string;
    value: string;
  }[];
}

export interface RadioField {
  id: string;
  name: string;
  type: "radio";
  options: {
    label: string;
    value: string;
  }[];
}

export type ConditionType = "equalto" | "notequalto";

export interface ConditionalField {
  id: string;
  name: string;
  type: "conditional";
  children: ContentTypeField[];
  comparisonType: ConditionType;
  comparisonTargetField: string;
  comparisonTargetValue: (string | number)[];
}

export interface IdField {
  id: string;
  name: string;
  type: "id";
}

export type ContentTypeField =
  | DateField
  | TimeField
  | TextField
  | LayoutField
  | RepeatableField
  | RelationshipField
  | FieldGroupField
  | CheckboxField
  | RadioField
  | ConditionalField
  | ContentTypeField
  | SelectField
  | IdField;

export type ContentType = {
  name: string;
  fields: ContentTypeFields[];
};

export interface AuthContextState {
  loggedIn: boolean;
  token: string | undefined;
  tokenDecoded: { [key: string]: any } | undefined;
}

export interface SignOutAuthAction {
  type: "signOut";
}
export interface SignInAuthAction {
  type: "signIn";
  token: string;
}

export type AuthAction = SignOutAuthAction | SignInAuthAction;

export type AuthContextDispatch = (action: AuthAction) => void;

export type AuthFormAction = "signin" | "signup";

export type SignUpSignInValues = {
  email: string;
  password: string;
  action: AuthFormAction;
};

export interface ColumnBlock {
  id: string;
  value: string;
  type: string;
}

export interface Column {
  id: string;
  width: number;
}

export interface Row {
  id: string;
  columns: Column[];
}

export interface Layout {
  id: string;
  rows: Row[];
}
