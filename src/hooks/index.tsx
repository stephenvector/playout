import React, { useCallback, useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/firestore";

export function useFirebaseCollection<T>(
  collectionName: string,
  fieldPath?: string | firebase.firestore.FieldPath,
  opStr?: firebase.firestore.WhereFilterOp,
  value?: any
) {
  const [loaded, setLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [collectionItems, setCollectionItems] = useState<{
    [key: string]: T;
  }>({});

  useEffect(() => {
    let cancelled = false;

    async function fetchCollection() {
      try {
        let querySnapshotPromise = firebase
          .firestore()
          .collection(collectionName);

        if ("FDsaf") {
          querySnapshotPromise.where("contentType", "==", "posts");
        }

        const t = querySnapshotPromise.get();

        const result = await t;
        const newCOllectionItems: { [key: string]: T } = {};

        result.forEach(item => {
          const tempItem: T = {
            ...(item.data() as T)
          };
          newCOllectionItems[item.id] = tempItem;
        });
        if (!cancelled) {
          setCollectionItems(newCOllectionItems);
          setLoaded(true);
        }
      } catch (e) {
        if (!cancelled) {
          setHasError(true);
          setLoaded(true);
        }
      }
    }

    fetchCollection();

    return function cleanup() {
      cancelled = true;
    };
  }, []);

  return {
    loaded,
    hasError,
    collectionItems
  };
}

export function useFirebaseSetDocument(collectionName: string) {
  const setPost = useCallback(
    async function setPost(
      values: { [key: string]: any },
      id: string = firebase
        .firestore()
        .collection(collectionName)
        .doc().id
    ) {
      await firebase
        .firestore()
        .collection(collectionName)
        .doc(id)
        .set(values);
    },
    [collectionName]
  );

  return {
    setPost
  };
}
