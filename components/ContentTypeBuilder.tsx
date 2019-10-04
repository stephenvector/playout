import React from "react";
import PostForm from "./PostForm";
import { ContentTypeContentType } from "../built-in-content-types";

export default function ContentTypeBuilder() {
  return <PostForm contentType={ContentTypeContentType} />;
}
