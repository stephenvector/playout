import React, {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useState
} from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { useField } from "react-final-form";
import { AuthContext } from "../contexts";
import {
  FieldControlProps,
  FieldWithConditions,
  ContentTypeField
} from "../types";

type Posts = {
  [key: string]: {
    [key: string]: any;
  };
};

type StringKeyedObject<T> = {
  [key: string]: T;
};

type ReferenceOrQuery =
  | firebase.firestore.DocumentReference
  | firebase.firestore.Query
  | firebase.firestore.CollectionReference;

function useFirestore<T>(referenceOrQuery: ReferenceOrQuery) {
  const [documents, setDocuments] = useState<StringKeyedObject<T>>({});
  const [hasError, setHasError] = useState(false);
  const [hasLoaded, setHasLoaded] = useState();
  const [isEmpty, setIsEmpty] = useState();

  useEffect(() => {
    let ignore = false;
    async function getDocuments() {
      try {
        const response = await referenceOrQuery.get();

        if (response instanceof firebase.firestore.DocumentSnapshot) {
          if (!response.exists && !ignore) {
            setIsEmpty(true);
          }
        } else {
          const docs: StringKeyedObject<T> = {};

          response.forEach(doc => {
            const docData = doc.data() as T;
            docs[doc.id] = docData;
          });

          if (!ignore) setDocuments(docs);
        }
      } catch (e) {
        if (!ignore) setHasError(true);
      } finally {
        if (!ignore) setHasLoaded(true);
      }
    }

    getDocuments();

    return function cleanup() {
      ignore = true;
    };
  }, [referenceOrQuery]);

  return {
    documents,
    hasError,
    hasLoaded,
    isEmpty
  };
}

export function useContentTypePosts<T>(contentTypeId: string) {
  return useFirestore<T>(
    firebase
      .firestore()
      .collection("posts")
      .where("contentType", "==", contentTypeId)
  );
}

export function usePost<T>(postId: string) {
  return useFirestore<T>(
    firebase
      .firestore()
      .collection("posts")
      .doc(postId)
  );
}

export function useContentTypes<T>() {
  return useFirestore<T>(firebase.firestore().collection("content-types"));
}

export function useContentType<T>(contentTypeId: string) {
  return useFirestore<T>(
    firebase
      .firestore()
      .collection("content-types")
      .doc(contentTypeId)
  );
}

export function useConditionalField({
  id,
  field
}: FieldControlProps<ContentTypeField>) {
  const {
    comparisonTargetField,
    comparisonTargetValue,
    comparisonType
  } = field as ContentTypeField & FieldWithConditions;

  const {
    input: { value: targetValue }
  } = useField(comparisonTargetField);

  if (
    comparisonTargetValue === undefined ||
    comparisonTargetField === undefined ||
    comparisonType === undefined
  ) {
    return true;
  }

  if (comparisonType === "equalto" && targetValue !== comparisonTargetValue) {
    return false;
  }

  if (
    comparisonType === "notequalto" &&
    targetValue === comparisonTargetValue
  ) {
    return false;
  }

  return true;
}

export function useAuth() {
  return useContext(AuthContext);
}
