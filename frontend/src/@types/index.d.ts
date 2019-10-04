import { InferType } from "yup";
import {
  contentTypeSchema,
  contentFieldTypeSchema,
  contentTypeFieldTypeSchema
} from "../schema";

export type ContentTypeFieldType =
  | "date"
  | "time"
  | "text"
  | "image"
  | "layout"
  | "id"
  | "relationship";

export interface ContentTypeFieldBase {
  id: string;
  name: string;
  type:
    | ContentTypeFieldType
    | "fieldgroup"
    | "repeatable"
    | "select"
    | "radio"
    | "checkbox";
}

export interface FieldGroupField extends ContentTypeFieldBase {
  type: "fieldgroup";
  children: ContentTypeField[];
}

export interface RepeatableField extends FieldGroupField {
  type: "repeatable";
}

export interface SelectField extends ContentTypeFieldBase {
  type: "select";
  options: {
    label: string;
    value: string;
  }[];
}

export interface CheckboxField extends SelectField {
  type: "checkbox";
}

export interface RadioField extends SelectField {
  type: "radio";
}

export type ContentTypeField =
  | ContentTypeFieldBase
  | FieldGroupField
  | RepeaterField
  | SelectField
  | RadioField
  | CheckboxField;

export type ContentType = {
  name: string;
  labels: {
    slug: string;
    plural: string;
    singular: string;
  };
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

export type DragDirection =
  | "left"
  | "right"
  | "top"
  | "bottom"
  | "topLeft"
  | "topRight"
  | "bottomRight"
  | "bottomLeft";

export interface LayoutBuilder {
  isDraggingRow: boolean;
  isResizingColumn: boolean;
  currentlyDraggedRowId: string | undefined;
  currentlyResizedColumnId: string | undefined;
  rowWidthsInPixels: { [rowId: string]: number };
  currentlyResizedColumnOriginalWidth: undefined | number;
  setRowWidth(rowId: string, widthInPixels: number): void;
  setRowDragging(rowId: string | undefined): void;
  setColumnResizing(
    columnId: string | undefined,
    width: number | undefined
  ): void;
  deleteRow(rowIndex: number, rowId: string): void;
  insertRow(newRowIndex: number): void;
  splitColumn(rowIndex: number, columnIndex: number, columnId: string): void;
  resizeColumn(
    deltaWidth: number,
    rowIndex: number,
    columnIndex: number,
    direction: DragDirection
  ): void;
  deleteColumn(rowIndex: number, columnIndex: number, columnId: string): void;
}
