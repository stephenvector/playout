// Database table names
export const USERS_COLLECTION_NAME = "users";
export const CONTENT_TYPES_COLLECTION_NAME = "contenttypes";
export const POSTS_COLLECTION_NAME = "posts";

// Label
export const COLUMN = "COLUMN";
export const ROW = "ROW";

export const AUTH_ACTION_SIGN_IN = "signin";
export const AUTH_ACTION_SIGN_UP = "signup";

export const AUTH_HASH_ROUNDS = 8;
export const MIN_ZXCVBN_SCORE = 3;

// Field Types
export const FIELD_TYPE_DATE: string = "date";
export const FIELD_TYPE_DATETIME: string = "datetime";
export const FIELD_TYPE_TEXT: string = "text";
export const FIELD_TYPE_IMAGE: string = "image";
export const FIELD_TYPE_LAYOUT: string = "layout";
export const FIELD_TYPE_SELECT: string = "select";
export const FIELD_TYPE_RELATIONSHIP: string = "relationship";

export const FIELD_TYPES: { label: string; value: string }[] = [
  { label: "Date", value: FIELD_TYPE_DATE },
  { label: "Date & Time", value: FIELD_TYPE_DATETIME },
  { label: "Text", value: FIELD_TYPE_TEXT },
  { label: "Image", value: FIELD_TYPE_IMAGE },
  { label: "Layout", value: FIELD_TYPE_LAYOUT },
  { label: "Select", value: FIELD_TYPE_SELECT },
  { label: "Relationship", value: FIELD_TYPE_RELATIONSHIP }
];
