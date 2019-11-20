import { useContext, useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { useField } from "react-final-form";
import { contentTypeSchema } from "../schema";
import { AuthContext } from "../contexts";
import {
  FieldControlProps,
  FieldWithConditions,
  ContentTypeField,
  StringKeyedObject,
  ReferenceOrQuery,
  PostValues,
  ContentType,
  Project
} from "../types";

function useFirestore<T>(referenceOrQuery: ReferenceOrQuery) {
  const [documents, setDocuments] = useState<StringKeyedObject<T>>({});
  const [hasError, setHasError] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    let ignore = false;

    setHasError(false);
    setHasLoaded(false);
    setDocuments({});
    setIsEmpty(false);

    async function getDocuments() {
      try {
        const response = await referenceOrQuery.get();

        if (response instanceof firebase.firestore.DocumentSnapshot) {
          if (!response.exists && !ignore) {
            setIsEmpty(true);
          } else if (!ignore) {
            setDocuments({ [response.id]: response.data() as T });
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
  const [reference, setReference] = useState(
    firebase
      .firestore()
      .collection("posts")
      .where("contentType", "==", contentTypeId)
  );

  useEffect(() => {
    setReference(
      firebase
        .firestore()
        .collection("posts")
        .where("contentType", "==", contentTypeId)
    );
  }, [contentTypeId]);

  return useFirestore<T>(reference);
}

export function usePost(postId: string) {
  const [postRef, setPostRef] = useState(
    firebase
      .firestore()
      .collection("posts")
      .doc(postId)
  );

  useEffect(() => {
    setPostRef(
      firebase
        .firestore()
        .collection("posts")
        .doc(postId)
    );
  }, [postId]);

  return useFirestore<PostValues>(postRef);
}

export function useContentTypes() {
  const [loaded, setLoaded] = useState(false);
  const [contentTypes, setContentTypes] = useState<
    StringKeyedObject<ContentType>
  >({});

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("content-types")
      .onSnapshot(snapshot => {
        const newContentTypes: StringKeyedObject<ContentType> = {};
        snapshot.forEach(doc => {
          newContentTypes[doc.id] = doc.data() as ContentType;
        });

        setContentTypes(newContentTypes);
        setLoaded(true);
      });
    return () => {
      setLoaded(false);
      unsubscribe();
    };
  }, []);

  return { loaded, contentTypes };
}

export function useContentType(contentTypeId: string) {
  const [loaded, setLoaded] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [contentType, setContentType] = useState<ContentType>();

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("content-types")
      .doc(contentTypeId)
      .onSnapshot(doc => {
        if (!doc.exists) {
          setNotFound(true);
        } else {
          setContentType(contentTypeSchema.cast(doc.data()));
          setNotFound(false);
        }
        setLoaded(true);
      });
    return () => {
      setLoaded(false);
      unsubscribe();
    };
  }, [contentTypeId]);

  return { loaded, contentType, notFound };
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

export function useProjects() {
  const [loaded, setLoaded] = useState(false);
  const [projects, setProjects] = useState<StringKeyedObject<Project>>();

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("projects")
      .onSnapshot(snapshot => {
        const newProjects: StringKeyedObject<Project> = {};
        snapshot.forEach(doc => {
          newProjects[doc.id] = doc.data() as Project;
        });

        setProjects(newProjects);
        setLoaded(true);
      });
    return () => {
      setLoaded(false);
      unsubscribe();
    };
  }, []);

  return { loaded, projects };
}
