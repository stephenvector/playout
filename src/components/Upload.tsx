import React, { useCallback, useReducer, useRef } from "react";
import firebase from "firebase/app";
import "firebase/storage";
import styled from "@emotion/styled";
import { Button } from "./primitives";

const UploadStyled = styled.div`
  display: flex;
  input[type="file"] {
    display: none;
  }
`;

type UploadState = {
  uploadTasks: firebase.storage.UploadTask[];
};

type AddUploadTasksAction = {
  type: "addUploadTasks";
  payload: firebase.storage.UploadTask[];
};

type UploadTaskErrorAction = {
  type: "uploadTaskError";
};

type UploadTaskProgressAction = {
  type: "uploadTaskProgress";
};

type UploadAction =
  | AddUploadTasksAction
  | UploadTaskErrorAction
  | UploadTaskProgressAction;

const initialState: UploadState = {
  uploadTasks: []
};

function uploadReducer(state: UploadState, action: UploadAction) {
  switch (action.type) {
    default:
      return state;
  }
}

export default function Upload() {
  const [state, dispatch] = useReducer(uploadReducer, initialState);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  async function handleFilesAdded(e: React.ChangeEvent<HTMLInputElement>) {
    const inputFiles = e.target.files;

    if (inputFiles === null) return;

    const filesToUpload: File[] = [];
    for (let i = 0; i < inputFiles.length; i++) {
      const fileToUpload = inputFiles.item(i);
      if (fileToUpload === null) return;
      filesToUpload.push(fileToUpload);
    }

    const newUploadTasks: firebase.storage.UploadTask[] = [];
    const storageRef = firebase.storage().ref();

    filesToUpload.forEach(fileToUpload => {
      const uploadTask = storageRef.child(fileToUpload.name).put(fileToUpload);

      const unregisterCallbacks = uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        () => {
          console.log("ok");
        },
        error => {
          console.log(error);
        },
        () => {
          console.log("DONE");
        }
      );
    });
  }

  const openFilesDialog = useCallback(
    function openFilesDialog() {
      if (fileInputRef === null || fileInputRef.current === null) return;

      fileInputRef.current.click();
    },
    [fileInputRef]
  );

  return (
    <UploadStyled>
      <input
        ref={fileInputRef}
        type="file"
        multiple
        onChange={handleFilesAdded}
      />
      <Button onClick={openFilesDialog}>Upload Images</Button>
    </UploadStyled>
  );
}
