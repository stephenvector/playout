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
  comparisonTargetValue: string | string[];
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
  disabled: boolean;
};

export type PostValues = {
  [key: string]: any;
};

export type Post = {
  contentType: string;
  values: PostValues;
};

export type Posts = {
  [key: string]: {
    [key: string]: any;
  };
};

export type StringKeyedObject<T> = {
  [key: string]: T;
};

export type ReferenceOrQuery =
  | firebase.firestore.DocumentReference
  | firebase.firestore.Query
  | firebase.firestore.CollectionReference;

export type Labels = {
  [k: string]: string;
};

export type Project = {
  name: string;
  description: string;
};



export type ContentTypeFieldType =
  | "date"
  | "datetime"
  | "text"
  | "image"
  | "layout"
  | "select"
  | "relationship";

export interface ContentTypeField {
  type: ContentTypeFieldType;
  name: string;
}

export interface ContentType {
  name: string;
  labels: {
    plural: string;
    singular: string;
    slug: string;
  };
  fields: ContentTypeField[];
}

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

export interface EmotionTheme {
  colors: {
    background: string;
    foreground: string;
    accent: string;
  };
}

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
